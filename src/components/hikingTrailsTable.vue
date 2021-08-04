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
      :items-per-page="100"
      item-key="HikeId"
      :search="search"
      :sort-by="['HikeId', 'temperature']"
      :sort-desc="[false, true]"
      multi-sort
      class="elevation-1"
    >
      
      <template v-slot:[`item.weather`]="{ item }">
      <Weather :location="getCity(item.city)"> </Weather> 
      </template>
      
    </v-data-table>
    <!-- <Weather v-for="(hike, i) in getHikes" :key="i" :location="hike.city"></Weather> -->
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import Weather from "@/components/Weather.vue";

export default {
  name: "hikesTable",
  components: {
   Weather,
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "HikeID", value: "hikeId" },
        { text: "Hiking trail ", value: "trail" },
        { text: "city", value: "city" },
        { text: "weather", value: "weather" },
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
  methods: {
    getCity(city) {
      if (city) {
        console.log("city",city.split(",", 1)[0])
        return city.split(",")[0];
      }
    },
  },
};
</script>