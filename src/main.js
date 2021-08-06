import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';
import store from './store';


//import some components for vue-router
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

//setup axios globally
import axiosApi from 'axios';
const axios = axiosApi.create({
    baseURL: "http://localhost:3001/"
})

//Use the window object to make it available globally.
window.axios = axios;


Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: "Login",
      component: Login
    },

    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: "Register",
      component: Register
    }
    
  ]
});

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');