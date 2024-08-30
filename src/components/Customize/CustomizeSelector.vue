<script setup>
import { ref, watchEffect } from 'vue';
import { Button } from '@/components/ui/button';

const props = defineProps({
  title: String,
  options: Array,
  modelValue: String,
});

const emit = defineEmits(['optionSelected']);

const selectedOption = ref(props.modelValue);

watchEffect(() => {
  selectedOption.value = props.modelValue;
});

const selectOption = (option) => {
  emit('optionSelected', option.name || option);
  selectedOption.value = option;
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <p class="text-base">{{ title }}</p>
    <ul class="flex flex-wrap gap-1">
      <li v-for="option in options" class="flex items-center">
        <Button
          v-model="selectedOption"
          :value="option.name"
          class="gap-2"
          variant="outline"
          @click="selectOption(option)">
          <component :is="option.icon" v-if="option.icon" class="h-4 w-4" stroke-width="1.5" aria-hidden="true" />
          {{ option.displayName || option }}
        </Button>
      </li>
    </ul>
  </div>
</template>
