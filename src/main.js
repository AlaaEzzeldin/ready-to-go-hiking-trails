import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import vuetify from './plugins/vuetify';


Vue.use(VueRouter);


const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Login
    },

    {
      path: '/home',
      component: Home
    },
    {
      path: '/register',
      component: Register
    }
  ]
});

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');