import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './scss/app.scss'
import './registerServiceWorker'
import VueGtag from "vue-gtag";

const app = createApp(App);

app.use(router);

app.use(VueGtag, {
    config: { id: "UA-161433595-7" }
}, router);

app.mount('#app')