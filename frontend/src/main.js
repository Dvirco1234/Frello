import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { focusDirective, clickOutsideDirective } from './directives'
import './styles/styles.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
library.add(faPhone);
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
app.config.globalProperties.$filters = {
    userName(name) {
        return '@' + name
    },
}

app.directive('focus', focusDirective)
app.directive('click-outside', clickOutsideDirective)

app.use(router)
app.use(store)

app.mount('#app')
