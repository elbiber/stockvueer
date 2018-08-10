<template>
  <div class="container">
      <nav-header></nav-header>
      <form class="form-inline" v-on:submit.prevent="formSubmitted">
        <input type="text" id="nameInput" class="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="Jane Doe" v-model="stockName">
        <input type="submit" class="btn btn-secondary">
      </form>
      {{ info }}
    </div>
</template>

<script>
  const axios = require('axios')
  const api = require('./api.json')
  import Header from "./components/Header"
  export default {
    data() {
      return {
        info: null,
        stockName: null
      }
    },
    components: {
      navHeader: Header
    },
    methods: {
      formSubmitted: function() {
        console.log("Submitted");
        axios
          .get(
            "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=Acc&interval=1min&apikey=" + api.key
          )
          .then(response => (this.info = response));
      }
    }  
  }
</script>
<style>
  @import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css");
  /* body {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: #333333;
  } */
  .btn {
    cursor: pointer;
  }
</style>