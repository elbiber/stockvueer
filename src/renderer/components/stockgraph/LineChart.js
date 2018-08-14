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
            pointRadius: 1,
            //Data to be represented on y-axis
           data: []
          },
          {
            label: 'Close',
            //backgroundColor: '#f87979',
            borderWidth: 10,
            borderColor: 'red',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: 'red',
            lineTension: 0,
            fill: false,
            pointRadius: 1,
            //Data to be represented on y-axis
            data: []
          }
        ]
      },
      options: {
        annotation: {
          annotations: [{
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: 5,
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 4,
            label: {
              enabled: false,
              content: 'Test label'
            }
          }]
        }
      }         
    }   
  },
  props: ['query'],
  computed: {
    queryUpdated() {
      return this.query
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
      const symbol = stockJSON['Meta Data']['2. Symbol']
      const timeIntervall = Object.keys(stockJSON)[1]
      this.datacollection.labels = Object.keys(stockJSON[timeIntervall]).reverse()
      this.datacollection.datasets[0].data = []
      this.datacollection.datasets[1].data = []
      for(let i =0; i < this.datacollection.labels.length; i++) {
        this.datacollection.datasets[0].data.push(stockJSON[timeIntervall][this.datacollection.labels[i]]['1. open'])
        this.datacollection.datasets[1].data.push(stockJSON[timeIntervall][this.datacollection.labels[i]]['4. close'])
      }
      this.renderChart(this.datacollection, this.options)
      this.$emit('graphRendered', {symbol: symbol, timeSeries: timeIntervall})
    }
  }
}