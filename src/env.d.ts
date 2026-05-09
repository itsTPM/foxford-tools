declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent;
  export default component;
}

import type { Icon } from '@tabler/icons-vue';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    icon: Icon;
  }
}
