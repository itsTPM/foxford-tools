<script setup lang="ts">
import { type HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { SwitchRoot, SwitchThumb, useForwardPropsEmits, type SwitchRootProps, type SwitchRootEmits } from 'reka-ui';
import { cn } from '@/entrypoints/popup/lib/utils';

interface Props extends SwitchRootProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();

const emits = defineEmits<SwitchRootEmits>();

const delegatedProps = reactiveOmit(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <SwitchRoot
    v-slot="slotProps"
    data-slot="switch"
    v-bind="forwarded"
    :class="
      cn(
        'peer group/switch relative inline-flex aspect-11/6 h-6 shrink-0 cursor-pointer items-center rounded-full border-transparent p-0.5 ring-offset-2 transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50',
        props.class
      )
    ">
    <SwitchThumb
      data-slot="switch-thumb"
      class="pointer-events-none block aspect-square h-full rounded-full bg-background ring-0 transition-transform data-checked:translate-x-[calc(100%)] dark:data-checked:bg-primary-foreground data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground">
      <slot name="thumb" v-bind="slotProps" />
    </SwitchThumb>
  </SwitchRoot>
</template>
