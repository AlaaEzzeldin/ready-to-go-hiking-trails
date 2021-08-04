<template>
  <div class="d-flex justify-content-center">
    <div v-if="info" class="card weather p-5">
        <h1> hello</h1>

    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "location",

  data() {
    return {
      info: null,
      apiKey: "7e9fcc5fa8d03177f95f110fd1c05c08",
    };
  },
  mounted() {
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?lat=" +
          '47.49237' +
          "lon="+
          '11.08611'+
          "&appid=" +
          this.apiKey

          //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
      )
      .then((response) => (this.info = response.data));
  },
};
</script>
