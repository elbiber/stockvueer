<template>
  <div class="container">
    <line-chart  :rawData="metaData"></line-chart>
    <p>{{metaData}}</p>
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
        metaData: ""
      }
    },  
    props: ['displayText'],
    watch: {
      displayText: function(val) {
        //console.log(val)
        this.metaData = val["Time Series (1min)"]
      }
    },
    components: {
      lineChart: LineChart
    }
  }
</script>

