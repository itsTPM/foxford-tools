<script setup lang="ts">
import { type HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { DialogOverlay, type DialogOverlayProps } from 'reka-ui';
import { cn } from '@/entrypoints/popup/lib/utils';

interface Props extends DialogOverlayProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();

const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
  <DialogOverlay
    data-slot="dialog-overlay"
    v-bind="delegatedProps"
    :class="
      cn(
        'fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
        props.class
      )
    ">
    <slot />
  </DialogOverlay>
</template>
