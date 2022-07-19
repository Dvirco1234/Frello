import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { focusDirective, clickOutsideDirective } from './directives'
import './styles/styles.scss'

const app = createApp(App)
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
