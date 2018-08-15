<template>
  <div class="container">
    <div class="box box-primary">
      <div class="box-header with-border">
        <h3 class="box-title">{{metaData.symbol}}</h3>
        <p>{{metaData.timeSeries}}</p>
      </div>
      <line-chart :query="query" @graphRendered="metaData = $event"></line-chart>
      <stock-form @querySubmitted="query = $event" ></stock-form>
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
        stockSymbol: ''
      }
    },
    watch: {
      query(){
        console.log('in StockGraph')
        console.log(this.query)
      }
    },
    components: {
      lineChart: LineChart,
      stockForm: StockForm
    }
  }
</script>

