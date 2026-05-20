<script setup lang="ts">
import { type HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { DialogTitle, useForwardProps, type DialogTitleProps } from 'reka-ui';
import { cn } from '@/entrypoints/popup/lib/utils';

interface Props extends DialogTitleProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();

const delegatedProps = reactiveOmit(props, 'class');

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <DialogTitle
    data-slot="dialog-title"
    v-bind="forwardedProps"
    :class="cn('font-heading text-sm font-medium', props.class)">
    <slot />
  </DialogTitle>
</template>
