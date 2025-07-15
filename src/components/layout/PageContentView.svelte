<!--
  (c) 2023-2025, Center for Computational Thinking and Design at Aarhus University and contributors
 
  SPDX-License-Identifier: MIT
 -->

<script lang="ts">
  import { currentPageComponent } from './currentComponentStore';
  const base = import.meta.env.BASE_URL ?? '/';
</script>

<div class="absolute -z-1 bottom-2 right-1">
  <img alt="theme graphic" src={`${base}imgs/arrow_group.svg`} width="350px" />
</div>
<svelte:component this={$currentPageComponent} />
