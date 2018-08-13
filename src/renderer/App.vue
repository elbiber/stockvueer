<template>
  <div class="container">
    <stock-header></stock-header>
    <div class="row">
        <stock-graph class="col-sm-6" :stockDataForm="stockDataForm"></stock-graph>
        <stock-form class="col-sm-6" @stockDataSubmitted="onStockDataSubmitted"></stock-form>            
    </div>  
  </div>
</template>

<script>
  import StockHeader from "./components/StockHeader"
  import StockForm from './components/StockForm'
  import StockGraph from './components/StockGraph/StockGraph.vue'
  export default {
    data() {
      return {
        stockDataForm: 'Apple'
      }
    },
    components: {
      stockHeader: StockHeader,
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
  @import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css");
  .btn {
    cursor: pointer;
  }
</style>