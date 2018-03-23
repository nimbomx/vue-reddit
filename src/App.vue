<template>
  <div id="app">
    <div v-for="post in top" :key="post.data.id" >{{ post.data }} <hr></div>
  </div>
</template>

<script>
let axios = require('axios')
export default {
  name: 'app',
  data () {
    return {
      top: []
    }
  },
  mounted(){
    axios.get('./src/top.json')
    .then(({data}) => {
      this.top=data.data.children
    })
  }
}
</script>

<style>

</style>
