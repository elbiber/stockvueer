<template>
  <div class="container">
    <div class="box box-primary">
      <div class="box-header with-border">
        <h3 class="box-title">{{metaData.symbol}}</h3>
        <p>{{metaData.timeSeries}}</p>
      </div>
      <line-chart :query="query" @graphRendered="metaData = $event"></line-chart>
    </div>    
  </div>
</template>

<script>
  import LineChart from './LineChart.js'
  export default {
    data() {
      return {        
        metaData: "",
        stockSymbol: '',
        timeSeries: '',
        timeStamps: '',
        open: []
      }
    },  
    props: ['query'],
    methods: {
      metaDataReceived(event){
        this.stockSymbol = event.symbol
        this.timeSeries = event.timeSeries
      }
    },
    components: {
      lineChart: LineChart
    }
  }
</script>

