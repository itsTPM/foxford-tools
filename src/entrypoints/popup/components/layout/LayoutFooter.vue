<script setup lang="ts">
import {
  IconBrandGithub,
  IconWorld,
  IconBrandTelegram,
  IconReload,
  IconSun,
  IconMoon,
  type Icon,
} from '@tabler/icons-vue';
import { browser } from 'wxt/browser';
import { Button } from '@popup/components/ui/button';
import { useSettings } from '@popup/composables/useSettings';
import { useCustomization } from '@popup/composables/useCustomization';

const { isRefreshNeeded } = useSettings();
const { toggleTheme, theme } = useCustomization();
const version = browser.runtime.getManifest().version;

const links: { name: string; url: string; icon: Icon }[] = [
  { name: 'GitHub', url: 'https://github.com/itsTPM/foxford-tools', icon: IconBrandGithub },
  { name: 'Telegram', url: 'https://t.me/foxfordclips', icon: IconBrandTelegram },
  { name: 'Сайт', url: 'https://fox.lyosha.dev', icon: IconWorld },
];

async function refreshPage() {
  await browser.tabs.reload();
  isRefreshNeeded.value = false;
}
</script>

<template>
  <footer class="relative h-15">
    <div v-if="!isRefreshNeeded" class="flex h-full items-center justify-between">
      <div class="flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          :aria-label="theme === 'light' ? 'Переключить на тёмную тему' : 'Переключить на светлую тему'"
          @click="toggleTheme">
          <IconMoon v-if="theme === 'light'" stroke-width="1.5" aria-hidden="true" />
          <IconSun v-else stroke-width="1.5" aria-hidden="true" />
        </Button>
        <div class="text-sm leading-4 text-muted-foreground">
          <p>версия {{ version }}</p>
          <a
            class="opacity-75 transition-opacity hover:opacity-100"
            href="https://github.com/itsTPM/foxford-tools/releases"
            target="_blank">
            что нового?
          </a>
        </div>
      </div>

      <ul class="flex gap-2">
        <li v-for="link in links" :key="link.name">
          <Button size="icon" variant="outline" as-child>
            <a :href="link.url" :title="link.name" :aria-label="link.name" target="_blank">
              <component :is="link.icon" stroke-width="1.5" aria-hidden="true" />
            </a>
          </Button>
        </li>
      </ul>
    </div>

    <div
      class="absolute inset-0 size-full -translate-x-full bg-background opacity-0 transition-[opacity,translate] duration-500"
      :class="{
        'translate-x-0': isRefreshNeeded,
        'opacity-100': isRefreshNeeded,
      }"
      :inert="!isRefreshNeeded">
      <p class="text-center text-xs leading-6">Настройки применятся после перезагрузки</p>
      <Button variant="outline" size="lg" class="w-full" @click="refreshPage">
        <IconReload />
        Перезагрузить страницу
      </Button>
    </div>
  </footer>
</template>
