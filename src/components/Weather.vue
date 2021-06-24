
<template>
  <div class="d-flex justify-content-center">
    <div v-if="info" class="card weather p-5">
      <h1>{{ info.name }}, {{ info.sys.country }}</h1>
      <h2>
        <span>Lon:</span> {{ info.coord.lon }} <span>Lat:</span>
        {{ info.coord.lat }}
      </h2>
      <h2><span>Wind speed:</span> {{ info.wind.speed }}mph</h2>
      <h2><span>Wind deg:</span> {{ info.wind.deg }}&deg;</h2>
      <h2><span>Pressure:</span> {{ info.main.pressure }}</h2>
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
