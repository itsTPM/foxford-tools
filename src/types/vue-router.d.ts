import type { Icon } from '@tabler/icons-vue';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    icon: Icon;
  }
}
