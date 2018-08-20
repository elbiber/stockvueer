import { Line } from 'vue-chartjs'
import axios from 'axios'
import { IEXClient } from 'iex-api'
import * as _fetch from 'isomorphic-fetch'

export default {
  extends: Line,
  data() {
    return {
      chartData: null,
      chartMetaData: null,
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
            label: 'Min Yield',
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
            label: 'Max Yield',
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
    'stockData': [Object],
    'investmentHorizon': [Number]
  },
  computed: {
    maxHorizon() {
      return this.datacollection.labels.length - 1
    }
  },
  watch: {
    stockData(val) {
      const iex = new IEXClient(_fetch)
      iex.stockChart(val.symbol, val.range)
         .then(chart => this.chartData = chart)
      iex.stockCompany(val.symbol)
         .then(meta => this.chartMetaData = meta)
    },
    chartData(val) {      
      this.datacollection.datasets[1].data = new Array().fill(null)
      this.datacollection.datasets[2].data = new Array().fill(null)
      this.datacollection.labels = val.map(a => a.date)
      if(this.stockData.range === '1d') {
        this.datacollection.labels = val.map(a => a.minute)
      } else {
        this.datacollection.labels = val.map(a => a.date)
      }
      this.datacollection.datasets[0].data =val.map(a => a.open)
      this.options.animation.duration = 1000
      this.renderChart(this.datacollection, this.options)
    },
    chartMetaData(val) {
      console.log('Meta')
      console.log(val)
      this.$emit('graphRendered', val)
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