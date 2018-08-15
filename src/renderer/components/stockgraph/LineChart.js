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
      horizon: {
        minStartX: 0,
        minEndX: 0,
        maxStartX: 0,
        maxEndX: 0
      },
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
          },
          {
            label: 'Max Payload',
            //backgroundColor: '#f87979',
            borderWidth: 10,
            borderColor: 'green',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: 'green',
            lineTension: 0,
            fill: false,
            pointRadius: 0,
            spanGaps: true,
            //Data to be represented on y-axis
            data: []
          }
        ]
        
      },
      options: {        
        animation: {
          duration: 0
        }
      }        
    }   
  },
  props: ['query','investmentHorizon'],
  computed: {
    queryUpdated() {
      return this.query
    },
    maxHorizon() {
      return this.datacollection.labels.length - 1
    }
  },
  watch: {
    queryUpdated(query) {
      axios.get(query)
        .then(response => {
          this.rawStockData = response.data
        })      
    },
    rawStockData(stockJSON) {      
      const timeIntervall = Object.keys(stockJSON)[1]
      this.datacollection.labels = Object.keys(stockJSON[timeIntervall]).reverse()
      this.datacollection.datasets[0].data = []
      for(let i =0; i < this.datacollection.labels.length; i++) {
        this.datacollection.datasets[0].data.push(parseFloat(stockJSON[timeIntervall][this.datacollection.labels[i]]['1. open']))
      }
      this.options.animation.duration = 1000
      this.datacollection.datasets[1].data = new Array(100).fill(null)
      this.datacollection.datasets[2].data = new Array(100).fill(null)
      this.renderChart(this.datacollection, this.options)
      this.$emit('graphRendered', {symbol: stockJSON['Meta Data']['2. Symbol'], timeSeries: timeIntervall})
    },
    investmentHorizon(val) {
      console.log(val)
      this.horizon.minStartX = 0
      this.horizon.minEndX = val
      this.horizon.maxStartX = 0
      this.horizon.maxEndX = val
      let min = this.datacollection.datasets[0].data[this.horizon.minStartX] - this.datacollection.datasets[0].data[this.horizon.minEndX = val]
      let max = min
      for(let i = val; i <= this.maxHorizon; i++) {
        if(this.datacollection.datasets[0].data[i] - this.datacollection.datasets[0].data[i - val] < min) {
          min = this.datacollection.datasets[0].data[i] - this.datacollection.datasets[0].data[i - val]
          this.horizon.minStartX = i - val
          this.horizon.minEndX = i
        }
        if(this.datacollection.datasets[0].data[i] - this.datacollection.datasets[0].data[i - val] > max) {
          max = this.datacollection.datasets[0].data[i] - this.datacollection.datasets[0].data[i - val]
          this.horizon.maxStartX = i - val
          this.horizon.maxEndX = i
        }
      }
      this.datacollection.datasets[1].data = new Array(100).fill(null)
      this.datacollection.datasets[1].data[this.horizon.minStartX] = this.datacollection.datasets[0].data[this.horizon.minStartX]
      this.datacollection.datasets[1].data[this.horizon.minEndX] = this.datacollection.datasets[0].data[this.horizon.minEndX]
      this.datacollection.datasets[2].data = new Array(100).fill(null)
      this.datacollection.datasets[2].data[this.horizon.maxStartX] = this.datacollection.datasets[0].data[this.horizon.maxStartX]
      this.datacollection.datasets[2].data[this.horizon.maxEndX] = this.datacollection.datasets[0].data[this.horizon.maxEndX]
      this.options.animation.duration = 0
      this.renderChart(this.datacollection, this.options)
    },
    maxHorizon(val) {
      console.log('Max Horizon: '+ val)
      this.$emit('maxHorizonChanged',val)
    }
  }
}