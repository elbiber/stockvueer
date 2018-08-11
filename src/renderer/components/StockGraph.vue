<template>
  <div>
    <p>{{metaData}}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        metaData: ""
      }
    },  
    props: ['displayText'],
    watch: {
      displayText: function(val) {
        //console.log(val)
        this.metaData = val["Time Series (1min)"]
      }
    }
  }
</script>

<style>

</style>