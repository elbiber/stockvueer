<template>
  <div class="container">
  <form @submit.prevent="formSubmitted">
    <div class="form-group row">
      <label for="inputSymbol" class="col-4 col-form-label col-form-label-lg">Symbol:</label>
      <div class="col-8">
        <input type="text" class="form-control" id="inputSymbol" placeholder="MFST" v-model="inputStockSymbol">
      </div>
    </div>
    <div class="form-group row">
      <label for="inputSymbol" class="col-4 col-form-label">Time Series:</label>
      <div class="col-8">
        <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" v-model="inputStockTimeSeries">
          <option v-for="option in options" :key="option.text" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>        
      </div>
    </div>
    <input type="submit" class="btn btn-secondary"> 
  </form>
  </div>
</template>

<script>
  const api = require('./api.json')
  export default {
    data() {
      return {
        inputStockSymbol: 'MSFT',
        inputStockIntervall: '',
        inputStockTimeSeries: 'TIME_SERIES_DAILY',
        options: [
          {text: 'Intraday', value: 'TIME_SERIES_INTRADAY'},
          {text: 'Daily', value: 'TIME_SERIES_DAILY'},
          {text: 'Weekly', value: 'TIME_SERIES_WEEKLY'},
          {text: 'Monthly', value: 'TIME_SERIES_MONTHLY'}
        ],
        stockDataForm: {
          stockSymbol: '',
          stockIntervall: '',
          timeSeries: ''
        }        
      }
    },
    methods: {
      formSubmitted: function() {        
        this.$emit('querySubmitted', this.query)
      }
    },
    computed: {
      query() {
        return 'https://www.alphavantage.co/query?function=' + this.inputStockTimeSeries +'&symbol=' + this.inputStockSymbol + '&'+this.inputStockIntervall+'&apikey=' + api.key
      }
    }
  }
</script>

<style>
  .time-series {
    padding-right: 10px;
  }
  .time-series-radio-group {
    margin-top: 30px;
  }
  form {
    border-left: 1px
  }
</style>

