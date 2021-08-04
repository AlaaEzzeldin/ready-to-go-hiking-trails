<template>
  <div id="nav">
    <router-link to="/home">Hiking Trails</router-link> |
    <span v-if="isLoggedIn">
      <a @click="logout">Logout</a>
    </span>
    <span v-else>
      <router-link to="/register">Register</router-link> |
      <router-link to="/">Login</router-link>|
      <router-link to="/location">location</router-link> 
    </span>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["isAuthenticated"]),
    isLoggedIn: function () {
      return this.isAuthenticated;
    },
  },
  methods: {
    ...mapActions(["LogOut"]),
    async logout() {
      await this.LogOut();
      this.$router.push("/");
    },
  },
};
</script>
<style>
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
a:hover {
  cursor: pointer;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>