import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import vuetify from './plugins/vuetify';
//import axios from 'axios';
import store from './store';

//axios.defaults.withCredentials = true
//axios.defaults.baseURL = 'http://localhost:8080/';


Vue.use(VueRouter);


const router = new VueRouter({
  routes: [
    {
      path: '/',
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