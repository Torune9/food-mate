import './css/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import library from './service/icon'

const app = createApp(App)

app.use(router)
app.use(library)

app.component("font-awesome-icon",FontAwesomeIcon)

app.mount('#app')
