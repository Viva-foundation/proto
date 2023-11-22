import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './app.vue'
import router from './router'

const getBrowserLocale = () => {
  const forceLang = new URL(location.href).searchParams.get('lang');
  const lang = forceLang || navigator.language;
  return lang.split('-')[0];
}

const i18n = createI18n({
  fallbackLocale:'en',
  locale: getBrowserLocale(), // set locale
  legacy: false
})

const app = createApp(App)

app.use(i18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
