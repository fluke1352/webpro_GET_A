import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'

import 'bulma/css/bulma.css'

// library.add(fas)

// Vue.component('icon', FontAwesomeIcon)

Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')