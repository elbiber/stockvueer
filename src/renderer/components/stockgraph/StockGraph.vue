<template>
  <div class="container">
    <div class="box box-primary">
      <div class="box-header with-border">
        <h3 class="box-title">{{stockDataForm.stockSymbol}}</h3>
        <p>{{stockDataForm.stockIntervall}}</p>
      </div>
      <line-chart :stockDataForm="stockDataForm"></line-chart>
    </div>
    <!-- <p>{{metaData}}</p> -->
  </div>
  <!-- <div class="ActivityGraphWrapper">
    <div class="box box-primary">
      <div class="box-header with-border">
        <h3 class="box-title">Activity data</h3>
      </div>
      
      <div class="box-body">
        <div class="row">
          <div class="col-md-8">
            <line-chart></line-chart>
          </div>
          <div class="col-md-4">
            <p>Data points</p>
          </div>
        </div>
      </div>
    
    </div>
  </div> -->
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
    watch: {
 
      // stockDataForm(val) {
      //   this.stockSymbol = val.stockSymbol
      //   console.log('Graph: '+ this.stockSymbol)
      // }

      // rawStockData: function(val) {
      //   console.log(val)
      //   //this.metaData = val["Time Series (1min)"]
      //   this.stockSymbol = val['Meta Data']['2. Symbol']
      //   this.timeSeries = Object.keys(val)[1]
      //   this.timeStamps = Object.keys(val[this.timeSeries])
      //   this.open = []
      //   this.timeStamps.forEach(function(timeStamp){
          
      //   })
      //   for(let i =0; i < this.timeStamps.length; i++) {
      //     this.open.push(val[this.timeSeries][this.timeStamps[i]]['1. open'])
      //   }
      //   console.log(this.open.length)
        
      // },
  
    },
    components: {
      lineChart: LineChart
    }
  }
</script>

