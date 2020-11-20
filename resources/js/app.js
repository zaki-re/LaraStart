require('./bootstrap'); 

window.Vue = require('vue');

import VueRouter from 'vue-router'

Vue.use(VueRouter)


let routes = [
    { path: '/dashboard', component: require('./components/Dashboard.vue').default},
    { path: '/profile', component: require('./components/Profile.vue').default }
  ]
  const router = new VueRouter({
      mode:'history',
    routes // short for `routes: routes`
  })




Vue.component('exemple-component',require('./components/ExempleComponent.vue'));
const app = new Vue({
    el: '#app',
    router
})
