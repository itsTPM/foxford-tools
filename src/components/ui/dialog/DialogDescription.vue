<script setup lang="ts">
import { type HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { DialogDescription, useForwardProps, type DialogDescriptionProps } from 'reka-ui';
import { cn } from '@/lib/utils';

interface Props extends DialogDescriptionProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();

const delegatedProps = reactiveOmit(props, 'class');

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <DialogDescription
    data-slot="dialog-description"
    v-bind="forwardedProps"
    :class="
      cn(
        'text-xs/relaxed text-muted-foreground [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground',
        props.class
      )
    ">
    <slot />
  </DialogDescription>
</template>
