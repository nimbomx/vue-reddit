<template>
  <div id="app">
    <pre>{{ top }}</pre>
  </div>
</template>

<script>
let axios = require('axios')
export default {
  name: 'app',
  data () {
    return {
      top: null
    }
  },
  mounted(){
    axios.get('./src/top.json')
    .then(response => {
      this.top=response
    })
  }
}
</script>

<style>

</style>
