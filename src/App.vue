<template>
<Slideout  menu="#menu" panel="#panel" padding="300" :toggleSelectors="['.toggle-button']">
      <nav id="menu">
        <div v-for="post in top" :key="post.data.id" @click="selectPost(post)">
        Title: {{ post.data.title }} <br>
        Author: {{ post.data.author }} <br>
        Entry Date: {{ post.data.created_utc | date}} <br>
        Thumbail: {{ post.data.thumbnail }} <br>
        Comments: {{ post.data.num_comments }} <br>
        Readed: {{ post.data.visited }} <br>

        <hr>
      </div>
      </nav>
      <main id="panel">
        <header>
            <button class="btn btn-secondary toggle-button">☰</button>
        </header>
        <div v-if="selected">
        <h4>{{ selected.data.author }}</h4>
        <img :src="selected.data.thumbnail">
        <pre>{{ selected }}</pre>
      </div>
      </main>
    </Slideout>

</template>

<script>
let axios = require('axios')

import Slideout from 'vue-slideout'

export default {
  name: 'app',
  components:{
    Slideout,

  },
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

  body {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  .slideout-menu {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 300px;
    height: 100vh;
    //overflow-y: scroll;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    z-index: 0;
    display: none;
    background-color: #1D1F20;
    color: white;
  }

  .slideout-menu-left {
    left: 0;
  }

  .slideout-menu-right {
    right: 0;
  }

  .slideout-panel {
    background-color: white;
    color: black;
    position: relative;
    z-index: 1;
    will-change: transform;
    min-height: 100vh;
    transition: all .5s;
    overflow: hidden;
    -webkit-tap-highlight-color: #ccc;

  }
  .moving{
    box-shadow: 0px 0px 20px rgba(0,0,0,.5);
  }
.toggle-button{
  margin: 10px;
}
  .slideout-open,
  .slideout-open body,
  .slideout-open {
    overflow: hidden;
  }
  .slideout-open{
    .slideout-panel {
      margin-right: 300px;
    }
  }
  .slideout-open .slideout-menu {
    display: block;
  }
</style>
