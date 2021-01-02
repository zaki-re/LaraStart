require('./bootstrap'); 

window.Vue = require('vue');
import { Form, HasError, AlertError } from 'vform';
import moment from 'moment';

window.Form= Form; 
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
import VueRouter from 'vue-router'


Vue.use(VueRouter)


let routes = [
    { path: '/dashboard', component: require('./components/Dashboard.vue').default},
    { path: '/profile', component: require('./components/Profile.vue').default },
    { path: '/users', component: require('./components/Users.vue').default }
  ]
  const router = new VueRouter({
      mode:'history',
    routes // short for `routes: routes`
  })

Vue.filter('upText',function(value){
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('myDate',function(created){
  return moment(created).format('MMMM Do YYYY');
  
})
Vue.component('exemple-component',require('./components/ExempleComponent.vue'));
const app = new Vue({
    el: '#app',
    router
})
