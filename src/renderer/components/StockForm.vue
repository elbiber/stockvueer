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
          <option v-for="option in options" :key="option.text" :value="option.value">
            {{ option.text }}
          </option>
        </select>        
      </div>
    </div>
    <div class="form-group row" v-if ="inputStockTimeSeries == 'TIME_SERIES_INTRADAY'">
      <label for="inputSymbol" class="col-4 col-form-label">Daily Interval:</label>
      <div class="col-8">
        <div class="custom-control custom-radio custom-control-inline" v-for="radioOption in radioOptions" :key="radioOption.label">
          <input type="radio" :id="'radio-' + radioOption.value" name="radio-option" class="custom-control-input" v-model="inputStockInterval" :value="radioOption.value">
          <label class="custom-control-label" :for="'radio-' + radioOption.value">{{ radioOption.label }}</label>          
        </div>  
      </div>
    </div>
    <input type="submit" class="btn btn-secondary"> 
  </form>
  </div>
</template>

<script>
  const api = require('./api.json')
  export default {
    mounted() {
      this.formSubmitted()
    },
    data() {
      return {
        inputStockSymbol: 'MSFT',
        inputStockInterval: '5min',
        inputStockTimeSeries: 'TIME_SERIES_DAILY',
        options: [
          {text: 'Intraday', value: 'TIME_SERIES_INTRADAY'},
          {text: 'Daily', value: 'TIME_SERIES_DAILY'},
          {text: 'Weekly', value: 'TIME_SERIES_WEEKLY'},
          {text: 'Monthly', value: 'TIME_SERIES_MONTHLY'}
        ],
        radioOptions: [
          {label: '1 min', value: '1min'},
          {label: '5 min', value: '5min'},
          {label: '15 min', value: '15min'},
          {label: '30 min', value: '30min'},
          {label: '60 min', value: '60min'}
        ]  
      }
    },
    methods: {
      formSubmitted: function() {        
        this.$emit('querySubmitted', this.query)
      }
    },
    computed: {
      query() {
        if(this.inputStockTimeSeries == 'TIME_SERIES_INTRADAY') {
          //return 'https://www.alphavantage.co/query?function=' + this.inputStockTimeSeries +'&symbol=' + this.inputStockSymbol + '&interval='+this.inputStockInterval+'&outputsize=full&apikey=' + api.key
          return 'https://www.alphavantage.co/query?function=' + this.inputStockTimeSeries +'&symbol=' + this.inputStockSymbol + '&interval='+this.inputStockInterval+'&apikey=' + api.key
        } else {
          //return 'https://www.alphavantage.co/query?function=' + this.inputStockTimeSeries +'&symbol=' + this.inputStockSymbol + '&outputsize=full&apikey=' + api.key
          return 'https://www.alphavantage.co/query?function=' + this.inputStockTimeSeries +'&symbol=' + this.inputStockSymbol + '&apikey=' + api.key
        }        
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

