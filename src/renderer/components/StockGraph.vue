<template>
  <div>
    <p>{{displayText}}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        stockdata: this.displayText
      }
    },  
    props: ['displayText']
  }
</script>

<style>

</style>