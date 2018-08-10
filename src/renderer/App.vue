<template>
  <div class="container">
      <nav-header></nav-header>
      <stock-form></stock-form>
      {{info}}
    </div>
</template>

<script>
  import Header from "./components/Header"
  import StockForm from './components/StockForm'
  export default {
    data() {
      return {
        info: stockForm.info
      }
    },
    components: {
      navHeader: Header,
      stockForm: StockForm
    },
    methods: {

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