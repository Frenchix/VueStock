import './assets/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './database/firebase.js'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const app = createApp(App)
app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp
  })
app.use(ToastPlugin);
app.mount('#app')