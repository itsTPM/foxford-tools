<script setup lang="ts">
import { type HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from 'reka-ui';
import { cn } from '@popup/lib/utils';

interface Props extends ProgressRootProps {
  class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
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
