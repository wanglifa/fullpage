// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
// import router from './router'
import Fullpage from '@/components/fullpage.vue'
import page1 from '@/components/pageone.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    background: ['red','green','black','orange'],
  },
  components: { Fullpage,page1 },
  // template: '<App/>'
})
