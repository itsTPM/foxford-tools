<script setup>
import { IconBrandGithub, IconWorld, IconBrandTelegram, IconVersions, IconReload } from '@tabler/icons-vue';
import { Button } from '@/components/ui/button/index.js';
import { useSettings } from '@/composables/useSettings';
import manifest from '@/../manifest.json';

const { isRefreshNeeded, setIsRefreshNeeded } = useSettings();
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
  <footer class="relative h-15">
    <div v-if="!isRefreshNeeded" class="flex items-center justify-between">
      <div class="text-muted-foreground flex items-center justify-center gap-1 text-sm">
        <IconVersions stroke-width="1.5" class="size-6" aria-hidden="true" />

        <div class="leading-3">
          <p>версия {{ version }}</p>
          <a
            class="text-muted-foreground/50 hover:text-secondary-foreground/75 text-xs transition-colors"
            href="https://github.com/itsTPM/foxford-tools/releases"
            target="_blank">
            что нового?
          </a>
        </div>
      </div>

      <ul class="flex gap-3">
        <li v-for="link in links" :key="link.name">
          <Button size="icon" variant="outline" as-child>
            <a :href="link.url" :title="link.name" :aria-label="link.name" target="_blank">
              <component :is="link.icon" class="text-foreground w-6" stroke-width="1.5" aria-hidden="true" />
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
