<template>
  <v-card v-if="getHikes">
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
                :value="computedDateFormattedMomentjs"
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
              <v-btn
                text
                color="primary"
                @click="
                  diffDate();
                  $refs.dialog.save(date);
                "
              >
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
      :items-per-page="15"
      item-key="id"
      :search="search"
      :sort-desc="[true]"
      multi-sort
      class="elevation-1"
    >
      <template v-slot:[`item.temp`]="{ item }">
        {{
          (item.weather.daily[selectedDate].feels_like.day - 273.15).toFixed(2)
        }}
        °C
      </template>
      <template v-slot:[`item.description`]="{ item }">
        {{ item.weather.daily[selectedDate].weather[0].description }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import { format, parseISO } from "date-fns";
export default {
  name: "hikesTable",
  components: {},
  data() {
    return {
      search: "",
      headers: [
        { text: "HikeID", value: "id" },
        { text: "Hiking trail ", value: "trail" },
        { text: "city", value: "city" },
        {
          text: "Temperature feals like",
          value: "temp",
        },
        {
          text: "description",
          value: "description",
          filter: this.descriptionFilter,
        },
      ],
      date: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
      menu: false,
      modal: false,
      descriptionFilterValue: null,
      outOfBound: false,
    };
  },
  computed: {
    ...mapGetters(["getHikes"]),
    getUniqueDescriptions() {
      return [
        "All",
        ...new Set(
          this.getHikes.map(
            (hike) =>
              hike.weather.daily[this.selectedDate].weather[0].description
          )
        ),
      ];
    },
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("dddd, MMMM Do YYYY") : "";
    },
    selectedDate() {
      let start = moment();
      let end = moment(this.date);
      let duration = moment.duration(end.diff(start));
      let days = duration.asDays();
      const diff = Math.ceil(days);
      if (diff <= 0 || diff > 7) return 0;
      else return diff;
    },
  },

  created() {
    this.$store.dispatch("loadHikes");
  },
  methods: {
    descriptionFilter(value) {
      if (
        !this.descriptionFilterValue ||
        this.descriptionFilterValue == "All"
      ) {
        return true;
      }
      return value === this.descriptionFilterValue;
    },
    diffDate() {
      let start = moment();
      let end = moment(this.date);
      let duration = moment.duration(end.diff(start));
      let days = duration.asDays();
      const diff = Math.ceil(days);
      if (diff > 7) this.outOfBound = true;
    },
  },
};
</script>