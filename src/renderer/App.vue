<template>
  <div class="container">
    <h1 class="text-center">Stockvueer 1.0</h1><hr>
    <stock-graph></stock-graph>  
  </div>
</template>

<script>
  import StockGraph from './components/StockGraph/StockGraph.vue'
  export default {
    components: {
      stockGraph: StockGraph
    }
  }
</script>

<style>
  h1 {
    margin-top: 10px;
  }
</style>