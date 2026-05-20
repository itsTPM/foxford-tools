<script setup lang="ts">
import { type HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  useForwardPropsEmits,
  type TooltipContentProps,
  type TooltipContentEmits,
} from 'reka-ui';
import { cn } from '@/entrypoints/popup/lib/utils';

defineOptions({
  inheritAttrs: false,
});

interface Props extends TooltipContentProps {
  class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
  sideOffset: 0,
});

const emits = defineEmits<TooltipContentEmits>();

const delegatedProps = reactiveOmit(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      data-slot="tooltip-content"
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        cn(
          'z-50 inline-flex w-fit max-w-xs origin-(--reka-tooltip-content-transform-origin) items-center gap-1.5 rounded-none bg-foreground px-3 py-1.5 text-sm text-background duration-300 has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-none data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
          props.class
        )
      ">
      <slot />

      <TooltipArrow
        class="z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-none bg-foreground fill-foreground" />
    </TooltipContent>
  </TooltipPortal>
</template>
