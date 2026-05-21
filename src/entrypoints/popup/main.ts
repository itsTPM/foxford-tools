import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { runPopupMigrations } from './migrations';

await runPopupMigrations();

createApp(App).use(router).mount('#app');
