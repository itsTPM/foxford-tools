import { createApp } from 'vue';
import '@/lib/chromePolyfill';
import '@/global.css';
import App from '@/App.vue';
import router from '@/router';

createApp(App).use(router).mount('#app');
