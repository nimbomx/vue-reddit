<template>
  <Slideout  menu="#menu" panel="#panel" padding="500" :toggleSelectors="['.toggle-button']">
    <nav id="menu">
      <reddit-post-list v-on:postSelected="postSelected"></reddit-post-list>
    </nav>
    <main id="panel">
      <header>
          <button class="btn btn-secondary toggle-button">☰</button>
      </header>
      <reddit-detail :post="selected"></reddit-detail>
    </main>
  </Slideout>
</template>

<script>

import Slideout from 'vue-slideout'
import RedditPostList from "./RedditPostList.vue";
import RedditDetail from "./RedditDetail.vue";

export default {
  name: 'app',
  components:{
    Slideout,
    RedditPostList,
    RedditDetail
  },
  data () {
    return {
      selected:null
    }
  },

  mounted(){
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  methods:{
    handleResize(){
      (window.innerWidth < 1000) ? this.closeSidebar() : this.openSidebar()
    },
    closeSidebar(){
      this.$children[0].slideout.close()
    },
    openSidebar(){
      this.$children[0].slideout.open()
    },
    postSelected(item){
      this.selected=item
    },

  }
}
</script>

<style lang="scss">

  $sidebarW: 500px;
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    background: #ccc;
  }

  .slideout-menu {
    position: fixed;
    top: 0;
    bottom: 0;
    width: $sidebarW;
    height: 100vh;
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
      margin-right: $sidebarW;
    }
  }
  .slideout-open .slideout-menu {
    display: block;
  }
</style>
