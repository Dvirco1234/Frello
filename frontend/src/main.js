import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { focusDirective, clickOutsideDirective } from './directives'
//FONTAWSOME
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import { fas } from '@fortawesome/free-solid-svg-icons'
// library.add(fas);
// import { fab } from '@fortawesome/free-brands-svg-icons';
// library.add(fab);
// import { far } from '@fortawesome/free-regular-svg-icons';
// library.add(far);
// import { dom } from "@fortawesome/fontawesome-svg-core";
// dom.watch();
//
import './styles/setup/_typography.scss'
import './styles/styles.scss'

const app = createApp(App)
app.config.globalProperties.$filters = {
    userName(name) {
        return '@' + name
    },
}
// app.component("fa", FontAwesomeIcon);
app.directive('focus', focusDirective)
app.directive('click-outside', clickOutsideDirective)

app.use(router)
app.use(store)

app.mount('#app')
