<!--
  (c) 2023-2025, Center for Computational Thinking and Design at Aarhus University and contributors
 
  SPDX-License-Identifier: MIT
 -->

<script lang="ts">
  import GestureCard from '../../components/ui/Card.svelte';
  import MediaQuery from '../../components/layout/MediaQuery.svelte';
  import ImageSkeleton from '../../components/ui/skeletonloading/ImageSkeleton.svelte';
  import { t, tr } from '../../i18n';

  const base = import.meta.env.BASE_URL ?? '/';
</script>

<GestureCard small>
  <div class="flex flex-row gap-4">
    <div class="relative float-left text-left h-30 justify-start flex">
      <div class="text-left float-left mt-auto mb-auto ml-3 min-w-120px">
        <ImageSkeleton
          height={95}
          width={140}
          src={base + 'imgs/microbit_record_guide.svg'}
          alt="microbit recording guide" />
      </div>
      <p class="self-center text-center pb-2">
        {$t('content.index.recordButtonDescription')}
      </p>
    </div>

    <MediaQuery query="(max-width: 1365px)" let:matches={isSmall}>
      <div class="self-center">
        <p class="font-bold">
          {$tr('content.validation.tutorial.title')}
        </p>
        <p class:text-xs={isSmall} class="text-sm">
          {$tr('content.validation.tutorial.description')}
        </p>
      </div>
    </MediaQuery>
  </div>
</GestureCard>
