<template>
  <div>
    <form @submit.prevent="formSubmitted">
      <div class="form-group row">
        <label for="inputSymbol" class="col-3 col-form-label col-form-label-lg">Symbol:</label>
        <input type="text" class="form-control col-5 symbol-text-input" id="inputSymbol" placeholder="AAPL" v-model="inputStockSymbol">        
        <input type="submit" class="btn btn-secondary" value="Search">
      </div>
      <div class="form-group row">
        <label for="inputSymbol" class="col-4 col-form-label">Time Series:</label>
        <div class="col-8">
          <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" v-model="inputStockTimeSeries" @change="formSubmitted">
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
      <div class="form-group">
        <label class="" for="horizonRange">Investment Horizon: {{ timeUnit }}</label>        
        <input class="custom-range" type="range" id="horizonRange" :min="minInvestmentHorizon" :max="maxHorizon" step="1" v-model="inputStockInvestmentHorizon">        
      </div>      
      <div class="form-group" v-if="inputStockInvestmentHorizon > 0 && yieldData">
        <div class="col">
          <label class="row" for="horizonRange">Minimum Yield:&nbsp;<span  style="color: red"> {{ yieldData.minYield | floorYield }}%</span></label>                  
          <label class="row" for="horizonRange">From: {{ yieldData.startMinDate }} to: {{ yieldData.endMinDate }}</label>
          <label class="row" for="horizonRange">Maximum Yield:&nbsp;<span  style="color: green"> {{ yieldData.maxYield | floorYield }} %</span></label>        
          <label class="row" for="horizonRange">From: {{ yieldData.startMaxDate }} to: {{ yieldData.endMaxDate }}</label>
        </div>                
      </div>  
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
        stockData: {
          symbol: 'AAPL'
        },
        inputStockSymbol: 'MSFT',
        inputStockInterval: '5min',
        inputStockTimeSeries: '1y',
        inputStockInvestmentHorizon: 20,
        minInvestmentHorizon: 0,
        maxInvestmentHorizon: 100,
        minYield: -2.3,
        maxYield: 23.78,
        options: [
          {text: '5 years', value: '5y'},
          {text: '2 years', value: '2y'},
          {text: '1 year', value: '1y'},
          {text: '6 months', value: '6m'},
          {text: '3 months', value: '3m'},
          {text: '1 months', value: '1m'},
          {text: '1 day', value: '1d'}
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
    props: ['maxHorizon','yieldData'],
    methods: {
      formSubmitted: function() {  
        this.inputStockInvestmentHorizon = 0
        this.$emit('stockDataSubmitted', {symbol: this.inputStockSymbol, range: this.inputStockTimeSeries})
      }
    },
    computed: {
 
      timeUnit() {
        switch(this.inputStockTimeSeries) {
          case 'TIME_SERIES_INTRADAY':
            switch(this.inputStockInterval) {
              case '1min': 
                return this.inputStockInvestmentHorizon +' minutes'
                break
              case '5min': 
                return this.inputStockInvestmentHorizon * 5 +' minutes'
                break
              case '15min': 
                return this.inputStockInvestmentHorizon * 15 + ' minutes'
                break
              case '30min': 
                return this.inputStockInvestmentHorizon * 30 +' minutes'
                break
              case '60min': 
                return this.inputStockInvestmentHorizon +' hours'
                break                                                               
            }
            break
          case 'TIME_SERIES_DAILY':
            return this.inputStockInvestmentHorizon +' days'
            break
          case 'TIME_SERIES_WEEKLY':
            return this.inputStockInvestmentHorizon +' weeks'
            break;
          case 'TIME_SERIES_MONTHLY':
            return this.inputStockInvestmentHorizon +' months'
            break
          default:
            return this.inputStockInvestmentHorizon +' days'
          }
      }
    },
    watch: {
      inputStockTimeSeries() {
        this.formSubmitted()
      },
      inputStockInterval() {
        this.formSubmitted()
      },
      inputStockInvestmentHorizon() {
        this.$emit('investmentHorizonChanged', parseFloat(this.inputStockInvestmentHorizon))
      }
    },    
    filters: {
      floorYield(val) {
        if (!val) return ''
        return Math.floor(val * 100) / 100;
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
  .symbol-text-input {
    margin-right: 10px;
  }
  
</style>

