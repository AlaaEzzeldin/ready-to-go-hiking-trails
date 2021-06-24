
<template>
  <v-app>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons"
        rel="stylesheet"
      />
    </head>
       <NavBar />
    <router-view/>
  </v-app>
</template>


<script>
import NavBar from '@/components/AppNav.vue'

export default {
  components: {
    NavBar
  }
}
</script>

