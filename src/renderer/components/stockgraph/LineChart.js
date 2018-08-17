import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
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
  props: {
    'query': [String],
    'investmentHorizon': [Number]
  },
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
          if(response.data['Meta Data']) {
            this.rawStockData = response.data
          } else if(response.data['Information']) {
            alert(response.data['Information'])
          } else if(response.data['Error Message']) {
            alert(response.data['Error Message'])
          } else {
            console.log('I dont know whats going on!')
          }         
        })      
    },
    rawStockData(stockJSON) {

      const timeIntervall = Object.keys(stockJSON)[1]

      this.datacollection.labels = Object.keys(stockJSON[timeIntervall]).reverse()      
      this.datacollection.datasets[0].data = []
      const graphOpenData = this.datacollection.datasets[0].data

      for(let i =0; i < this.datacollection.labels.length; i++) {
        graphOpenData.push(parseFloat(stockJSON[timeIntervall][this.datacollection.labels[i]]['1. open']))
      }

      this.options.animation.duration = 1000
      this.renderChart(this.datacollection, this.options)
      this.$emit('graphRendered', {symbol: stockJSON['Meta Data']['2. Symbol'], timeSeries: timeIntervall})

    },
    investmentHorizon(val) {

      const graphOpenData = this.datacollection.datasets[0].data

      this.datacollection.datasets[1].data = new Array().fill(null)
      const graphMinData = this.datacollection.datasets[1].data

      this.datacollection.datasets[2].data = new Array().fill(null)
      const graphMaxData = this.datacollection.datasets[2].data

      this.horizon.minStartX = 0
      this.horizon.minEndX = val
      this.horizon.maxStartX = 0
      this.horizon.maxEndX = val

      let min = graphOpenData[this.horizon.minStartX] - graphOpenData[this.horizon.minEndX = val]
      let max = min

      for(let i = val; i <= this.maxHorizon; i++) {
        if(graphOpenData[i] - graphOpenData[i - val] < min) {
          min = graphOpenData[i] - graphOpenData[i - val]
          this.horizon.minStartX = i - val
          this.horizon.minEndX = i
        }
        if(graphOpenData[i] - graphOpenData[i - val] > max) {
          max = graphOpenData[i] - graphOpenData[i - val]
          this.horizon.maxStartX = i - val
          this.horizon.maxEndX = i
        }
      }
      
      graphMinData[this.horizon.minStartX] = graphOpenData[this.horizon.minStartX]
      graphMinData[this.horizon.minEndX] = graphOpenData[this.horizon.minEndX]

      graphMaxData[this.horizon.maxStartX] = graphOpenData[this.horizon.maxStartX]
      graphMaxData[this.horizon.maxEndX] = graphOpenData[this.horizon.maxEndX]

      this.options.animation.duration = 0

      const yieldData = {
        startMinDate: this.datacollection.labels[this.horizon.minStartX],
        endMinDate: this.datacollection.labels[this.horizon.minEndX],
        minYield: (graphOpenData[this.horizon.minEndX] - graphOpenData[this.horizon.minStartX]) * 100 / graphOpenData[this.horizon.minEndX],
        startMaxDate: this.datacollection.labels[this.horizon.maxStartX],
        endMaxDate: this.datacollection.labels[this.horizon.maxEndX],
        maxYield:(graphOpenData[this.horizon.maxEndX] - graphOpenData[this.horizon.maxStartX]) * 100 / graphOpenData[this.horizon.maxEndX]
      }
      
      this.$emit('yieldDataChanged', yieldData)
      this.renderChart(this.datacollection, this.options)
    },
    maxHorizon(val) {
      this.$emit('maxHorizonChanged',val)
    }
  }
}