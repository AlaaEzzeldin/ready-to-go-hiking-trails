<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col cols>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search by trail name or city"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols>
          <v-select
            :items="getUniqueDescriptions"
            label="Filter by weather description"
            v-model="descriptionFilterValue"
          ></v-select>
        </v-col>
        <v-col cols>
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Please select your trip date whitin 7 days only"
                persistent-hint
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
      </v-row>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="getHikes"
      :items-per-page="100"
      item-key="HikeId"
      :search="search"
      :sort-by="['HikeId', 'temperature']"
      class="elevation-1"
    >
      <!--  <template v-slot:[`item.temp`]="{ item }">
        <h4> <span></span>  {{ (getWeather(item.city).main.feels_like - 273.15).toFixed(2) }} °C </h4>
      </template>
      _-->
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
//import Weather from "@/components/Weather.vue";
import axios from "axios";

export default {
  name: "hikesTable",
  components: {
    // Weather,
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "HikeID", value: "id" },
        { text: "Hiking trail ", value: "trail" },
        { text: "city", value: "city" },
        { text: "Temperature feals like", value: "temp" },
        {
          text: "description",
          value: "description",
          filter: this.descriptionFilter,
        },
      ],
      info: null,
      apiKey: "7e9fcc5fa8d03177f95f110fd1c05c08",

      // date picker
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,

      // filter
      descriptionFilterValue: null,
    };
  },
  computed: {
    ...mapGetters(["getHikes"]),
    getUniqueDescriptions() {
      return ["All", ...new Set(this.getHikes.map((hike) => hike.description))];
    },
  },

  created() {
    this.$store.dispatch("loadHikes");
  },
  methods: {
    getCity(city) {
      if (city) {
        console.log("city", city.split(",", 1)[0]);
        return city.split(",")[0];
      }
    },
    descriptionFilter(value) {
      if (!this.descriptionFilterValue || this.descriptionFilterValue=="All") {
        return true;
      }
      return value === this.descriptionFilterValue;
    },
    async getWeather(location) {
      await axios
        .get(
          "http://api.openweathermap.org/data/2.5/weather?q=" +
            location +
            "&appid=" +
            this.apiKey
        )
        .then((response) => (this.info = response.data));
      return this.info;
    },
  },
};
</script>