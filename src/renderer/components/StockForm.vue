<template>
  <div>
    <form class="form-inline" @submit.prevent="formSubmitted">
      <input type="text" id="nameInput" class="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="Enter Symbol" v-model="inputStockSymbol">
      <input type="submit" class="btn btn-secondary">
      <div>
        <div class="checkbox">
          <label><input type="checkbox" value="">Option 1</label>
        </div>
        <div class="checkbox">
          <label><input type="checkbox" value="">Option 2</label>
        </div>
        <div class="checkbox disabled">
          <label><input type="checkbox" value="" disabled>Option 3</label>
        </div>
      </div>

    </form>   
  </div>
</template>

<script>
  export default {
    data() {
      return {
        inputStockSymbol: 'MSFT',
        inputStockIntervall: 'Daily',
        stockDataForm: {
          stockSymbol: '',
          stockIntervall: ''
        }        
      }
    },
    methods: {
      formSubmitted: function() {
        this.stockDataForm.stockSymbol = this.inputStockSymbol
        this.stockDataForm.stockIntervall = this.inputStockIntervall
        this.$emit('stockDataSubmitted', this.stockDataForm)
      },
      changeText(event) {
        console.log('Form: '+ event.target.value)
        this.inputStockSymbol = event.target.value
      }
    }
  }
</script>
