<script setup>
import {
  IconBrandGithub,
  IconWorld,
  IconBrandTelegram,
  IconVersions,
  IconReload,
  IconSun,
  IconMoon,
} from '@tabler/icons-vue';
import { Button } from '@/components/ui/button/index.js';
import { useSettings } from '@/composables/useSettings';
import { useCustomization } from '@/composables/useCustomization';
import manifest from '@/../manifest.json';

const { isRefreshNeeded, setIsRefreshNeeded } = useSettings();
const { toggleTheme, theme } = useCustomization();
const { version } = manifest;

const links = [
  { name: 'GitHub', url: 'https://github.com/itsTPM/foxford-tools', icon: IconBrandGithub },
  { name: 'Telegram', url: 'https://t.me/foxfordclips', icon: IconBrandTelegram },
  { name: 'Сайт', url: 'https://fox.lyosha.dev', icon: IconWorld },
];

function refreshPage() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.reload(tabs[0].id);
  });

  setIsRefreshNeeded(false);
}
</script>

<template>
  <footer class="relative h-15 overflow-hidden">
    <div v-if="!isRefreshNeeded" class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <Button size="icon" variant="outline" :aria-label="theme === 'light' ? 'Переключить на тёмную тему' : 'Переключить на светлую тему'" @click="toggleTheme">
          <IconMoon v-if="theme === 'light'" stroke-width="1.5" aria-hidden="true" />
          <IconSun v-else stroke-width="1.5" aria-hidden="true" />
        </Button>
        <div class="text-muted-foreground text-sm leading-4">
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
      class="bg-background absolute inset-0 size-full -translate-x-full opacity-0 transition-[opacity,translate] duration-500"
      :class="{
        'translate-x-0': isRefreshNeeded,
        'opacity-100': isRefreshNeeded,
      }"
      :inert="!isRefreshNeeded">
      <p class="text-center text-xs leading-6">Настройки применятся после перезагрузки</p>
      <Button variant="outline" @click="refreshPage" size="lg" class="w-full">
        <IconReload />
        Перезагрузить страницу
      </Button>
    </div>
  </footer>
</template>
