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
      for(let i =0; i < this.datacollection.labels.length; i++) {
        this.datacollection.datasets[0].data.push(stockJSON[timeIntervall][this.datacollection.labels[i]]['1. open'])
      }
      this.renderChart(this.datacollection, this.options)
      this.$emit('graphRendered', {symbol: symbol, timeSeries: timeIntervall})
    }
  }
}