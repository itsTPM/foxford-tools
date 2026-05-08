<script setup>
import { reactiveOmit } from '@vueuse/core';
import { ProgressIndicator, ProgressRoot } from 'reka-ui';
import { cn } from '@/lib/utils';

const props = defineProps({
  modelValue: { type: [Number, null], required: false, default: 0 },
  max: { type: Number, required: false },
  getValueLabel: { type: Function, required: false },
  getValueText: { type: Function, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});

const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
  <ProgressRoot
    data-slot="progress"
    v-bind="delegatedProps"
    :class="cn('relative flex h-1 w-full items-center overflow-x-hidden rounded-none bg-muted', props.class)">
    <ProgressIndicator
      data-slot="progress-indicator"
      class="size-full flex-1 bg-primary transition-all"
      :style="`transform: translateX(-${100 - ((props.modelValue ?? 0) / (props.max ?? 100)) * 100}%);`" />
  </ProgressRoot>
</template>
