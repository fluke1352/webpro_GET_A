import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


import router from './router/index'

// other code ...

new Vue({
  router,  // add router here
  render: h => h(App),
}).$mount('#app')