import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import AppRouter from './router/index.js'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.use(AppRouter)
app.mount('#app')
