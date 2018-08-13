<template>
  <div class="container">
    <h1 class="text-center">Stockvueer 1.0</h1><hr>
    <div class="row">
        <stock-graph class="col-sm-8" :stockDataForm="stockDataForm"></stock-graph>
        <stock-form class="col-sm-4" @stockDataSubmitted="onStockDataSubmitted"></stock-form>            
    </div>  
  </div>
</template>

<script>
  import StockForm from './components/StockForm'
  import StockGraph from './components/StockGraph/StockGraph.vue'
  export default {
    data() {
      return {
        stockDataForm: 'Apple'
      }
    },
    components: {
      stockForm: StockForm,
      stockGraph: StockGraph
    },
    methods: {
      onStockDataSubmitted (value) {    
        this.stockDataForm = value
      }
    }
  }
</script>

<style>
  h1 {
    margin-top: 10px;
  }
</style>

