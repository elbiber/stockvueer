import { Line } from 'vue-chartjs'
import axios from 'axios'
const api = require('./api.json')

export default {
  extends: Line,
  mounted() {
      //this.setGraph()
  },
  data() {
    return {
      rawStockData: null,
      datacollection: {
        //Data to be represented on x-axis
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
           label: 'Data One',
           backgroundColor: '#f87979',
           pointBackgroundColor: 'white',
           borderWidth: 1,
           pointBorderColor: '#249EBF',
           //Data to be represented on y-axis
           data: [40, 20, 30, 50, 90, 10, 20, 40, 50, 70, 90, 100]
        }]
      }
    }   
  },
  props: ['stockDataForm2'],
  watch: {
    stockDataForm2 (value) {
      console.log(value)
      console.log('Line: '+ this.stockDataForm2.stockSymbol)
      // axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=Acc&interval=1min&apikey=" + api.key)
      // .then(response => ( this.stockData = response.data))
      // this.renderChart(this.datacollection, this.options)
      //this.setGraph()
    }
  },
  methods: {
    setGraph() {
      console.log(this.stockData)
      this.renderChart(this.datacollection, this.options)
    }
  }
}