<template>
  <div id="app">
    <div v-for="post in top" :key="post.data.id" >
      Title: {{ post.data.title }} <br>
      Author: {{ post.data.author }} <br>
      Entry Date: {{ post.data.created }} <br>
      Thumbail: {{ post.data.thumbnail }} <br>
      Comments: {{ post.data.num_comments }} <br>
       Readed: {{ post.data.visited }} <br>
      <hr>
      </div>
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
