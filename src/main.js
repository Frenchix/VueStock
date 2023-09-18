import './assets/reset.css'
import './assets/index.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'
import { VueFire } from 'vuefire'
import { firebaseApp } from './database/firebase.js'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';


const pinia = createPinia();

const app = createApp(App)
app.use(pinia);
app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp
  })
app.use(ToastPlugin);
app.use(router);

app.mount('#app')
