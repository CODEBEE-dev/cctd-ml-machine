<!--
  (c) 2023-2025, Center for Computational Thinking and Design at Aarhus University and contributors
 
  SPDX-License-Identifier: MIT
 -->

<style>
  div {
    transition: max-height 0.3s ease;
  }
</style>

<script lang="ts">
  import { t } from '../../i18n';
  import type { MenuProperties } from './Menus';
  import Information from '../ui/information/Information.svelte';

  export let title: string;
  export let helpTitle: string;
  export let helpDescription: string;
  export let onClickFunction: () => void;
  export let isExpanded: boolean;
  export let tooltipOffset: MenuProperties['tooltipOffset'] = { x: -100, y: 30 };
</script>

<div>
  <div
    class="border bg-opacity-75 border-solid border-3
           border-opacity-80 min-h-20
		   text-secondarytext border-secondary
		   select-none transition duration-300
		   rounded-full bg-primary"
    class:bg-secondary={isExpanded}
    class:bg-opacity-90={isExpanded}
    class:cursor-pointer={!isExpanded}
    class:hover:bg-border-opacity-30={!isExpanded}
    class:hover:bg-opacity-95={!isExpanded}
    class:rounded-3xl={isExpanded}
    on:click={onClickFunction}>
    <!-- Title -->
    <div class="h-full mt-6.2 relative">
      <p class="text-base font-medium text-center" class:underline={isExpanded}>
        {$t(title)}
      </p>
      <div class="absolute top-3px right-12">
        <Information
          bodyText={$t(helpDescription)}
          boxOffset={tooltipOffset}
          titleText={$t(helpTitle)}
          width={280} />
      </div>
    </div>
    <slot />
  </div>
</div>
