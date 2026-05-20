<script setup lang="ts">
import { type HTMLAttributes } from 'vue';
import { cn } from '@popup/lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
</script>

<template>
  <div data-slot="dialog-header" :class="cn('flex flex-col gap-1 text-left', props.class)">
    <slot />
  </div>
</template>
