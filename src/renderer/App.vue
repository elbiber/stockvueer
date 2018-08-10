<template>
  <div class="container">
      <nav-header></nav-header>
      <stock-form @stockDataRequested="onRequestStockData"></stock-form>
      {{stockData}}
    </div>
</template>

<script>
  import Header from "./components/Header"
  import StockForm from './components/StockForm'
  export default {
    data() {
      return {
        stockData: "stockForm.info"
      }
    },
    components: {
      navHeader: Header,
      stockForm: StockForm
    },
    methods: {
      onRequestStockData (value) {
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