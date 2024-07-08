import { createApp } from 'vue'
import './style.css'
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";
import App from './App.vue'
import router from './routes'
import store from './store'


createApp(App)
  .use(store)
  .use(Toast)
  .use(router)
  .mount('#app')
