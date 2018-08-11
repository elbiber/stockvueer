<template>
  <div>
    <form class="form-inline" v-on:submit.prevent="formSubmitted">
      <input type="text" id="nameInput" class="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="Jane Doe" v-model="stockName">
      <input type="submit" class="btn btn-secondary">
    </form>
   
  </div>
</template>

<script>
  const axios = require('axios')
  const api = require('../api.json')
  console.log(axios)
  export default {
    data() {
      return {
        stockData: null,
        stockName: null
      }
    },
    methods: {
      formSubmitted: function() {
        console.log("Submitted")
        axios
          .get(
            "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=Acc&interval=1min&apikey=" + api.key
          )
          .then(response => ( this.stockData = response.data))
      }
    },
    watch: {
      stockData: function(val) {
        //console.log(val["Meta Data"]["2. Symbol"])
        this.$emit('stockDataReceived', val)
      }
    }
  }
</script>

<style>

</style>