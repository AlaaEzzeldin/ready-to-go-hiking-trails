<template>
  <div class="d-flex justify-content-center">
    <div v-if="info" class="card weather p-5">
      <h4>{{ info.name }}, {{ info.sys.country }}</h4>
      <h4><span>Wind speed:</span> {{ info.wind.speed }}mph</h4>
      <h4><span>feals like:</span> {{ (info.main.feels_like - 273.15).toFixed(2) }}</h4>
      <h4><span>weather description:</span> {{ info.weather[0].description }}</h4>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "Weather",
   props:['location'],
  data() {
    return {
      info: null,
      apiKey: "7e9fcc5fa8d03177f95f110fd1c05c08",
    };
  },
  mounted() {
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?q=" +
          this.location +
          "&appid=" +
          this.apiKey
      )
      .then((response) => (this.info = response.data));
  },
};
</script>
