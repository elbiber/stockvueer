<template>
  <div>
    <form class="form-inline" v-on:submit.prevent="formSubmitted">
      <input type="text" id="nameInput" class="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="Enter Symbol" v-model="stockDataForm.stockSymbol">
      <input type="submit" class="btn btn-secondary">
    </form>   
  </div>
</template>

<script>
  export default {
    data() {
      return {
        stockDataForm: {
          stockSymbol: 'MSFT',
          stockIntervall: 'Daily'
        }        
      }
    },
    methods: {
      formSubmitted: function() {
        console.log('Form: '+ this.stockDataForm.stockSymbol)
        this.$emit('stockDataSubmitted', this.stockDataForm)
      }
    }
  }
</script>

<style>

</style>