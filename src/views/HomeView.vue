<script setup>
import { Switch } from '@/components/ui/switch/index.js';
import { Label } from '@/components/ui/label/index.js';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button/index.js';
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <Popover>
      <PopoverTrigger class="flex-grow"><Button class="w-full" variant="outline">Проценты</Button></PopoverTrigger>
      <PopoverContent>
        <div class="flex flex-col gap-5">
          <div class="flex gap-3 items-center">
            <Switch id="dark-mode" />
            <Label for="dark-mode">ДЗ</Label>
          </div>
          <div class="flex gap-3 items-center">
            <Switch id="airplane-mode" />
            <Label for="airplane-mode">Вебинары</Label>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  </div>
</template>
