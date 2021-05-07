import Vue from 'vue'
import App from './App.vue'

import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

Vue.use(Vuelidate)

import router from './router/index'

// other code ...

new Vue({
  router,  // add router here
  render: h => h(App),
}).$mount('#app')