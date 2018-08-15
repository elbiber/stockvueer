import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  mounted() {
    //this.renderChart(this.datacollection, this.options)
  },
  data() {
    return {
      rawStockData: null,
      datacollection: {
        //Data to be represented on x-axis
        labels: [],
        datasets: [
          {
            label: 'Open',
            //backgroundColor: '#f87979',
            borderWidth: 10,
            borderColor: 'rgba(0, 0, 0, 0.5)',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            lineTension: 0,
            fill: false,
            pointRadius: 0,
            //Data to be represented on y-axis
           data: []
          },
          {
            label: 'Min Payload',
            //backgroundColor: '#f87979',
            borderWidth: 10,
            borderColor: 'red',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: 'red',
            lineTension: 0,
            fill: false,
            pointRadius: 0,
            spanGaps: true,
            //Data to be represented on y-axis
            data: []
          }
        ]
      }         
    }   
  },
  props: ['query'],
  computed: {
    queryUpdated() {
      console.log("in Chart 1")
      return this.query
    }
  },
  watch: {
    queryUpdated(query) {
      console.log("in Chart 2")
      axios.get(query)
        .then(response => {
          this.rawStockData = response.data
        })            
    },
    rawStockData(stockJSON) {      
      const symbol = stockJSON['Meta Data']['2. Symbol']
      const timeIntervall = Object.keys(stockJSON)[1]
      this.datacollection.labels = Object.keys(stockJSON[timeIntervall]).reverse()
      const startX = 30
      const endX = 60
      const startY = stockJSON[timeIntervall][this.datacollection.labels[startX]]['1. open']
      const endY = stockJSON[timeIntervall][this.datacollection.labels[endX]]['1. open']
      const pitch = (endY-startY)/(endX-startX)      
      this.datacollection.datasets[0].data = []
      this.datacollection.datasets[1].data = new Array(100)
      this.datacollection.datasets[1].data.fill(null)
      for(let i =0; i < this.datacollection.labels.length; i++) {
        this.datacollection.datasets[0].data.push(stockJSON[timeIntervall][this.datacollection.labels[i]]['1. open'])
      }
      this.datacollection.datasets[1].data[startX] = this.datacollection.datasets[0].data[startX]
      this.datacollection.datasets[1].data[endX] = this.datacollection.datasets[0].data[endX] 
      this.renderChart(this.datacollection, this.options)
      this.$emit('graphRendered', {symbol: symbol, timeSeries: timeIntervall})
      console.log(this.datacollection.labels.length)
    }
  }
}