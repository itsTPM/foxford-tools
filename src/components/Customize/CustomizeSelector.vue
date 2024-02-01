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
  emit('optionSelected', option);
  selectedOption.value = option;
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <span class="text-base">{{ title }}</span>
    <div class="flex flex-wrap gap-1">
      <div v-for="option in options" class="flex items-center">
        <Button v-model="selectedOption" :value="option" variant="outline" @click="selectOption(option)">
          {{ option }}
        </Button>
      </div>
    </div>
  </div>
</template>
