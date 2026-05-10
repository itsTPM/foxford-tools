<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { Primitive, type PrimitiveProps } from 'reka-ui';
import { cn } from '@/lib/utils';
import { buttonVariants, type ButtonVariants } from '.';

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  class?: HTMLAttributes['class'];
  type?: string;
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  type: 'button',
});

const buttonType = computed(() => (props.as === 'button' && !props.asChild ? props.type : undefined));
</script>

<template>
  <Primitive
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    :as="as"
    :as-child="asChild"
    :type="buttonType"
    :class="cn(buttonVariants({ variant, size }), props.class)">
    <slot />
  </Primitive>
</template>
