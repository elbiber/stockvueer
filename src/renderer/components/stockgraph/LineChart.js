import { Line } from 'vue-chartjs'
import axios from 'axios'
const api = require('./api.json')

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
        datasets: [{
           label: 'Open',
           //backgroundColor: '#f87979',
           pointBackgroundColor: 'white',
           borderWidth: 1,
           pointBorderColor: '#249EBF',
           //Data to be represented on y-axis
           data: []
        }]
      }
    }   
  },
  props: ['stockDataForm'],
  computed: {
    symbol() {
      return this.stockDataForm.stockSymbol
    },
    timeStamp() {
      return this.stockDataForm.stockDataIntervall
    }
  },
  watch: {
    symbol(val) {
      console.log(val)
      axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + val + '&outputsize=full&apikey=' + api.key)
        .then(response => {
          //console.log(response.data)
          this.rawStockData = response.data
        })            
    },
    timeStamp() {
      
    },
    rawStockData(stockJSON) {
      const timeIntervall = Object.keys(stockJSON)[1]
      this.datacollection.labels = Object.keys(stockJSON[timeIntervall]).reverse()
      this.datacollection.datasets[0].data = []
      for(let i =0; i < this.datacollection.labels.length; i++) {
        this.datacollection.datasets[0].data.push(stockJSON[timeIntervall][this.datacollection.labels[i]]['1. open'])
      }
      this.renderChart(this.datacollection, this.options)
    }
  },
  methods: {
    setGraph() {
      console.log(this.stockData)
      this.renderChart(this.datacollection, this.options)
    }
  }
}