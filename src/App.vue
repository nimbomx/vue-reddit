<template>
  <div id="app">
    <div class="menu">

      <div v-for="post in top" :key="post.data.id" @click="selectPost(post)">
        Title: {{ post.data.title }} <br>
        Author: {{ post.data.author }} <br>
        Entry Date: {{ post.data.created_utc | date}} <br>
        Thumbail: {{ post.data.thumbnail }} <br>
        Comments: {{ post.data.num_comments }} <br>
        Readed: {{ post.data.visited }} <br>

        <hr>
      </div>
    </div>
    <div class="detail">
      Detalle
      <div v-if="selected">
        <h4>{{ selected.data.author }}</h4>
        <img :src="selected.data.thumbnail">
        <pre>{{ selected }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
let axios = require('axios')


export default {
  name: 'app',
  data () {
    return {
      top: [],
      selected:null
    }
  },
  filters: {
    date: function (value) {
      if (!value) return ''
      return moment.unix(value).fromNow()
    }
  },
  mounted(){
    axios.get('https://www.reddit.com/r/all/top.json?limit=50')
    .then(({data}) => {
      this.top=data.data.children
    })
  },
  methods:{
    selectPost(post){
      this.selected=post
    }

  }
}
</script>

<style lang="scss">
  .menu{
    float: left;
    width: 50%;
    border: 1px solid #eee;
    padding: 20px;
    box-sizing: border-box;
  }
  .detail{
    float: right;
    width: 50%;
    border: 1px solid #eee;
    padding: 20px;
    box-sizing: border-box;
  }
</style>
