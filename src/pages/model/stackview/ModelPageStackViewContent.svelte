<!--
  (c) 2023-2025, Center for Computational Thinking and Design at Aarhus University and contributors
 
  SPDX-License-Identifier: MIT
 -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import Information from '../../../components/ui/information/Information.svelte';
  import { t } from './../../../i18n';
  import { state, stores } from '../../../lib/stores/Stores';
  import OutputGesture from '../../../components/features/model/ModelGesture.svelte';

  const gestures = stores.getGestures();
  // Bool flags to know whether output microbit popup should be show
  let hasClosedPopup = false;

  let hasInteracted = false;

  function onUserInteraction(): void {
    hasInteracted = true;
  }

  const base = import.meta.env.BASE_URL ?? '/';
</script>

<div>
  <div class="relative flex h-8">
    <div class="absolute left-5 flex">
      <Information
        isLightTheme={false}
        iconText={$t('content.model.output.prediction.iconTitle')}
        titleText={$t('content.model.output.prediction.descriptionTitle')}
        bodyText={$t('content.model.output.prediction.descriptionBody')} />
    </div>
    <div class="absolute left-78 flex">
      <Information
        isLightTheme={false}
        iconText={$t('content.model.output.ledOutput.descriptionTitle')}
        titleText={$t('content.model.output.ledOutput.descriptionTitle')}
        bodyText={$t('content.model.output.ledOutput.descriptionBody')} />
    </div>
    <div class="absolute left-125 flex">
      <Information
        isLightTheme={false}
        iconText={$t('content.model.output.sound.iconTitle')}
        titleText={$t('content.model.output.sound.descriptionTitle')}
        bodyText={$t('content.model.output.sound.descriptionBody')} />
    </div>
    <div class="absolute left-167 flex">
      <Information
        isLightTheme={false}
        iconText={$t('content.model.output.pin.iconTitle')}
        titleText={$t('content.model.output.pin.descriptionTitle')}
        bodyText={$t('content.model.output.pin.descriptionBody')} />
    </div>
  </div>

  <div class="pl-1">
    <!-- Display all gestures and their output capabilities -->
    {#each gestures.getGestures() as gesture}
      <OutputGesture variant="stack" {gesture} {onUserInteraction} />
    {/each}
  </div>
  {#if !$state.isOutputConnected && !hasClosedPopup && hasInteracted}
    <div transition:fade class="grid grid-cols-5 absolute bottom-5 w-full min-w-729px">
      <div
        class="flex relative col-start-2 rounded-lg col-end-5 h-35"
        style="background-color:rgba(231, 229, 228, 0.85)">
        <div class="m-4 mr-2 w-3/4">
          <p class="text-2xl font-bold">
            {$t('content.model.output.popup.header')}
          </p>
          <p>
            {$t('content.model.output.popup.body')}
          </p>
        </div>
        <div class="text-center ml-0 mb-2 mt-8">
          <img
            class="m-auto arrow-filter-color"
            src={`${base}imgs/down_arrow.svg`}
            alt="down arrow icon"
            width="80px" />
        </div>
        <div class="absolute right-2 top-2 svelte-1rnkjvh">
          <button
            class="hover:bg-gray-100 rounded outline-transparent w-8 svelte-1rnkjvh"
            on:click={() => {
              hasClosedPopup = true;
            }}>
            <i
              class="fas fa-plus text-lg text-gray-600 hover:text-gray-800 duration-75 svelte-1rnkjvh"
              style="transform: rotate(45deg);" />
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
