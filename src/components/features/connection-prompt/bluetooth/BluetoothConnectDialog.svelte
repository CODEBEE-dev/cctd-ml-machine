<!--
  (c) 2023-2025, Center for Computational Thinking and Design at Aarhus University and contributors
 
  SPDX-License-Identifier: MIT
 -->

<script lang="ts">
  import PatternMatrix from '../../../ui/PatternMatrix.svelte';
  import { t } from '../../../../i18n';
  import { onDestroy, onMount } from 'svelte';
  import {
    btPatternInput,
    btPatternOutput,
    isInputPatternValid,
  } from '../../../../lib/stores/connectionStore';
  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';
  import Microbits from '../../../../lib/microbit-interfacing/Microbits';
  import StaticConfiguration from '../../../../StaticConfiguration';
  import Logger from '../../../../lib/utils/Logger';
  import { MBSpecs } from 'microbyte';
  import { DeviceRequestStates, state } from '../../../../lib/stores/Stores';
  import StandardButton from '../../../ui/buttons/StandardButton.svelte';

  // callbacks
  export let deviceState: DeviceRequestStates;
  export let onBluetoothConnected: () => void;

  let isConnecting = false;

  let attemptedToPairWithInvalidPattern = false;

  let patternMatrixState: Writable<boolean[]> =
    deviceState === DeviceRequestStates.INPUT ? btPatternInput : btPatternOutput;

  let timeoutProgress = writable<number>(0);

  let timeouted = writable<boolean>(false);

  const connectUsingPatternName = () => {
    if (!isInputPatternValid()) {
      attemptedToPairWithInvalidPattern = true;
      return;
    }

    const name = MBSpecs.Utility.patternToName($patternMatrixState);
    attemptToConnect(name);
  };

  const attemptToConnect = async (name?: string) => {
    timeoutProgress.set(0);
    if (isConnecting) {
      // Safeguard to prevent trying to connect multiple times at once
      return;
    }
    isConnecting = true;
    const connectionResult = async () => {
      Logger.log('BluetoothConnectDialog', 'Attempting to connect to micro:bit');
      if (deviceState == DeviceRequestStates.INPUT) {
        await Microbits.connectInput(name);
      } else {
        await Microbits.connectOutput(name);
      }
    };

    const connectTimeout = setTimeout(() => {
      Logger.log('BluetoothConnectDialog', 'Connection timed-out');
      timeouted.set(true);
    }, StaticConfiguration.connectTimeoutDuration);

    try {
      await connectionResult();
      clearTimeout(connectTimeout);
      timeouted.set(false);
      onBluetoothConnected();
    } catch (error) {
      Logger.log('BluetoothConnectDialog', 'Failed to connect to micro:bit', error);
    } finally {
      isConnecting = false;
    }
  };

  function connectOnEnterClick(event: KeyboardEvent): void {
    if (event.code !== 'Enter') {
      return;
    }
    void connectUsingPatternName();
  }

  function updateMatrix(matrix: boolean[]): void {
    $patternMatrixState = matrix;
    attemptedToPairWithInvalidPattern = false;
  }

  onMount(() => {
    document.addEventListener('keypress', connectOnEnterClick);
  });
  onDestroy(() => {
    document.removeEventListener('keypress', connectOnEnterClick);
  });

  onMount(() => {
    // Resets the bluetooth connection prompt for cancelled device requests
    $state.requestDeviceWasCancelled = false;
  });

  const handleSearchWithoutName = () => {
    attemptToConnect();
  };

  const base = import.meta.env.BASE_URL ?? '/';
</script>

<main>
  <h1 class="mb-5 font-bold">
    {$t('popup.connectMB.bluetooth.heading')}
  </h1>

  {#if $state.requestDeviceWasCancelled && !isConnecting}
    <p class="text-warning mb-1">{$t('popup.connectMB.bluetooth.cancelledConnection')}</p>
    <p class="text-warning mb-1">
      {$t('popup.connectMB.bluetooth.cancelledConnection.noNameDescription')}
      <span
        class="underline text-link cursor-pointer select-none"
        on:click={handleSearchWithoutName}>
        {$t('popup.connectMB.bluetooth.cancelledConnection.noNameLink')}
      </span>
    </p>
  {/if}
  {#if attemptedToPairWithInvalidPattern}
    <p class="text-warning mb-1">{$t('popup.connectMB.bluetooth.invalidPattern')}</p>
  {/if}
  {#if isConnecting}
    <!-- Show spinner while connecting -->
    <div class="w-650px flex flex-col justify-center items-center">
      <p>{$t('popup.connectMB.bluetooth.connecting')}</p>
      <img alt="loading" src={`${base}imgs/loadingspinner.gif`} width="100px" />
    </div>
    {#if $timeouted}
      <div>
        <p class="text-red-500">{$t('popup.connectMB.bluetooth.timeouted')}</p>
      </div>
    {/if}
  {:else}
    <div class="grid grid-cols-3 mb-5 w-650px">
      <div class="col-span-2 pt-5">
        <p>1. {$t('popup.connectMB.bluetooth.step0')}</p>
        <p>2. {$t('popup.connectMB.bluetooth.step1')}</p>
        <p>3. {$t('popup.connectMB.bluetooth.step2')}</p>
        <p>4. {$t('popup.connectMB.bluetooth.step3')}</p>
      </div>
      <div>
        <PatternMatrix matrix={$patternMatrixState} onMatrixChange={updateMatrix} />
      </div>
    </div>
    <div class="flex justify-center">
      <StandardButton onClick={connectUsingPatternName}>
        {$t('popup.connectMB.bluetooth.connect')}
      </StandardButton>
    </div>
  {/if}
  <!-- </div> -->
</main>
