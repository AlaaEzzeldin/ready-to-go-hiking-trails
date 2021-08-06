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
      <template v-slot:[`item.temp`]="{ item }">
        <h4>
          {{ (item.weather.main.feels_like - 273.15).toFixed(2) }} °C
        </h4>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
//import Weather from "@/components/Weather.vue";

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
        { text: "Temperature feals like", value: "temp"},
        {
          text: "description",
          value: "weather.weather[0].description",
          filter: this.descriptionFilter,
        }
      ],

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
      return ["All", ...new Set(this.getHikes.map((hike) => hike.weather.weather[0].description))];
    },
  },

  created() {
    this.$store.dispatch("loadHikes");
  },
  
    descriptionFilter(value) {
      if (
        !this.descriptionFilterValue ||
        this.descriptionFilterValue == "All"
      ) {
        return true;
      }
      return value === this.descriptionFilterValue;
    },
};
</script>