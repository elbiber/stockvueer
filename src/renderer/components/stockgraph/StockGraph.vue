<template>
  <div class="container">
    <div class="box box-primary">
      <div class="box-header with-border">
        <h3 class="box-title">{{stockDataForm.stockSymbol}}</h3>
        <p>{{stockDataForm.stockIntervall}}</p>
      </div>
      <line-chart :stockDataForm="stockDataForm"></line-chart>
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
    props: ['stockDataForm'],
    components: {
      lineChart: LineChart
    }
  }
</script>

