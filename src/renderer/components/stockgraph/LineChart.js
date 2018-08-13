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
  props: ['stockDataForm'],
  computed: {
    symbol: function() {
      return this.stockDataForm.stockSymbol
    }
  },
  watch: {
    symbol(val) {
      this.rawStockData = val
      
    },
    rawStockData() {
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