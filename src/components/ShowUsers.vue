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
      :items="stateUsers"
      :search="search"
      :sort-by="['email', 'name']"
      :sort-desc="[false, true]"
      multi-sort
      class="elevation-1"
    ></v-data-table>
  </v-card>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  name: "UsersTable",
  data() {
    return {
      users: [],
      search: "",
      headers: [
        {
          text: "email",
          align: "start",
          filterable: true,
          value: "email",
        },
        { text: "name", value: "first_name" },
        //{ text: "email", value: "email" },
        { text: "phone number", value: "phone_number" },
      ],
    };
  },

  methods: {
    //    ...mapActions(["GetUsers"]),
  },
  computed: {
    ...mapGetters(["stateUsers"]),
  },
};
</script>