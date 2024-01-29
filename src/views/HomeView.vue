<script setup>
import { Switch } from '@/components/ui/switch/index.js';
import { Label } from '@/components/ui/label/index.js';
</script>

<template>
  <div class="flex flex-col gap-5">
    <div class="flex gap-3 items-center">
      <Switch id="airplane-mode" />
      <Label for="airplane-mode">Airplane Mode</Label>
    </div>

    <div class="flex gap-3 items-center">
      <Switch id="dark-mode" />
      <Label for="dark-mode">Dark Mode</Label>
    </div>
  </div>
</template>
