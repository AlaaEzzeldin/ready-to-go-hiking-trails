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
      :items="desserts"
      :search="search"
      :sort-by="['userID', 'name']"
      :sort-desc="[false, true]"
      multi-sort
      class="elevation-1"
    ></v-data-table>
  </v-card>
</template>


<script>
export default {
  name: "UsersTable",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "userID",
          align: "start",
          filterable: false,
          value: "userID",
        },
        { text: "name", value: "name" },
        { text: "email", value: "email" },
        { text: "phone number", value: "phones" },
      ],
      desserts: [
        {
          userID: "Frozen Yogurt",
          name: 159,
          email: 6.0,
          phones: 24,
        },
        {
          userID: "Ice cream sandwich",
          name: 237,
          email: 9.0,
          phones: 37,
        },
        {
          userID: "Eclair",
          name: 262,
          email: 16.0,
          phones: 23,
        },
        {
          userID: "Cupcake",
          name: 305,
          email: 3.7,
          phones: 67,
        },
        {
          userID: "Gingerbread",
          name: 356,
          email: 16.0,
          phones: 49,
        },
        {
          userID: "Jelly bean",
          name: 375,
          email: 0.0,
          phones: 94,
        },
        {
          userID: "Lollipop",
          name: 392,
          email: 0.2,
          phones: 98,
        },
        {
          userID: "Honeycomb",
          name: 408,
          email: 3.2,
          phones: 87,
        },
        {
          userID: "Donut",
          name: 452,
          email: 25.0,
          phones: 51,
        },
        {
          userID: "KitKat",
          name: 518,
          email: 26.0,
          phones: 65,
        },
      ],
    };
  },
};
</script>