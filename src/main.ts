import { createApp } from 'vue'
import './style.css'
import 'virtual:uno.css'
import App from './App.vue'
import router from './router'
import DedsiComponents from './components'

const app = createApp(App)

app.use(router)
app.use(DedsiComponents)

app.mount('#app')

