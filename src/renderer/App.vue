<template>
  <div class="container">
    <h1 class="text-center">Stockvueer 1.0</h1><hr>
    <div class="row">
        <stock-graph class="col-sm-8" :query="query"></stock-graph>
        <!-- <stock-form class="col-sm-4" @querySubmitted="query = $event"></stock-form>             -->
    </div>  
  </div>
</template>

<script>
  //import StockForm from './components/StockForm'
  import StockGraph from './components/StockGraph/StockGraph.vue'
  export default {
    data() {
      return {
        query: 'Apple'
      }
    },
    components: {
      //stockForm: StockForm,
      stockGraph: StockGraph
    }
  }
</script>

<style>
  h1 {
    margin-top: 10px;
  }
</style>

