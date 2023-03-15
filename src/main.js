import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/vendor/fontawesome-free/css/all.min.css'
import './assets/css/sb-admin-2.min.css'
import './assets/css/custom.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
