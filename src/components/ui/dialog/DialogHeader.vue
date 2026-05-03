<script setup>
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <div
    data-slot="dialog-header"
    :class="cn('gap-1 text-left flex flex-col', props.class)"
  >
    <slot />
  </div>
</template>
