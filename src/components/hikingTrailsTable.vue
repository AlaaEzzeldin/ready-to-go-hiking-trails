<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="getHikes"
      :items-per-page= 20
      item-key="HikeId"
      :search="search"
      :sort-by="['HikeId', 'temperature']"
      :sort-desc="[false, true]"
      multi-sort
      class="elevation-1"
    >
    </v-data-table>
     <!-- <Weather v-for="(hike, i) in getHikes" :key="i" :location="hike.city"></Weather> -->
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
//import Weather from "@/components/Weather.vue";
export default {
  name: "hikesTable",
  components: {
  //  Weather
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "HikeID", value: "hikeId" },
        { text: "Hiking trail ", value: "trail" },
        { text: "city", value: "city" },
        { text: "weather", value: "this.getWeather" },
      ],
      info: null,
      apiKey: "7e9fcc5fa8d03177f95f110fd1c05c08",
    };
  },
  computed: {
    ...mapGetters(["getHikes"]),
    // getWeather() {
    //   return this.info.coord.lon;
    // },
  },
  created() {
    this.$store.dispatch("loadHikes");
  },
  // mounted() {
  //   axios
  //     .get(
  //       "http://api.openweathermap.org/data/2.5/weather?q=" +
  //         this.location +
  //         "&appid=" +
  //         this.apiKey
  //     )
  //     .then((response) => (this.info = response.data));
  // },
};
</script>