<template>
  <div class="container">
    <div class="box box-primary">
      <div class="box-header with-border">
        <h3 class="box-title">{{metaData.symbol | upperCase}}</h3>
        <p>{{metaData.timeSeries}}</p>
      </div>
      <div class="row">
        <line-chart class="col-7 line-chart" 
                    :investmentHorizon="investmentHorizon" 
                    :query="query" 
                    @graphRendered="metaData = $event" 
                    @maxHorizonChanged="maxHorizon = $event"
                    @yieldDataChanged="yieldData=$event">
        </line-chart>
        <stock-form class="col-4"
                    :maxHorizon="maxHorizon"
                    :yieldData="yieldData"
                    @querySubmitted="query = $event" 
                    @investmentHorizonChanged="investmentHorizon = $event">
        </stock-form>
      </div>
      
    </div>    
  </div>
</template>

<script>
  import LineChart from './LineChart.js'
  import StockForm from './StockForm/StockForm'
  export default {
    data() {
      return {
        query: "",        
        metaData: "",
        stockSymbol: '',
        investmentHorizon: 0,
        maxHorizon: 0,
        yieldData: null
      }
    },   
    components: {
      lineChart: LineChart,
      stockForm: StockForm
    },
    filters: {
      upperCase(val) {
        if (!val) return ''
        return val.toUpperCase()
      }
    }
  }
</script>

<style>
  .line-chart {
    margin-right: 50px;
  }
</style>


