import { createApp } from 'vue'
import App from './App.vue'
import dotenv from 'dotenv';
import store from './store/store';

dotenv.config();


createApp(App)
  .use(store)
  .mount('#app');

