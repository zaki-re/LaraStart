require('./bootstrap'); 

window.Vue = require('vue');
import { Form, HasError, AlertError } from 'vform';
import moment from 'moment';
import VueProgressBar from 'vue-progressbar'
import swal from 'sweetalert2'
import Gate from './Gate'
Vue.prototype.$gate = new Gate(window.user);

window.swal =swal;
const toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', swal.stopTimer)
    toast.addEventListener('mouseleave', swal.resumeTimer)
  }
});
window.toast =toast;

window.Fire= new Vue();

Vue.use(VueProgressBar, {
  color: '#bffaf3',
  failedColor: '#874b4b',
  height:'3px',
 
})

window.Form= Form; 
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
import VueRouter from 'vue-router'
import Vue from 'vue';


Vue.use(VueRouter)


let routes = [
    { path: '/dashboard', component: require('./components/Dashboard.vue').default},
    { path: '/developer', component: require('./components/Developer.vue').default},
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
Vue.component('not-found',require('./components/NotFound.vue'));

const app = new Vue({
    el: '#app',
    router
})
