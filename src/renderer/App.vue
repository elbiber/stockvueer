<template>
  <div class="container">
    <stock-header></stock-header>
    <div class="row">
        <stock-graph class="col-sm-6" :displayText="stockData"></stock-graph>
        <stock-form class="col-sm-6" @stockDataReceived="onStockDataReceived"></stock-form>    
    </div>  
  </div>
</template>

<script>
  import StockHeader from "./components/StockHeader"
  import StockForm from './components/StockForm'
  import StockGraph from './components/StockGraph'
  export default {
    data() {
      return {
        stockData: null
      }
    },
    components: {
      stockHeader: StockHeader,
      stockForm: StockForm,
      stockGraph: StockGraph
    },
    methods: {
      onStockDataReceived (value) {
        this.stockData = value

      }
    }  
  }
</script>
<style>
  @import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css");
  /* body {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: #333333;
  } */
  .btn {
    cursor: pointer;
  }
</style>