<template>
  <div class="menu">
    <div class="list">

     <transition-group name="slide">

       <reddit-post v-for="(post, index) in list" :key="post.data.id" :index="index" :post="post"
          v-on:selectPost="selectPost"
          v-on:dismissPost="dismissPost"
        ></reddit-post>

      </transition-group>

    </div>
    <footer>
      <button v-if="list.length" @click.stop="dismissAllPost" class="btn btn-primary-line">Dismiss All Post</button>
    </footer>
  </div>
</template>

<script>
  import axios from 'axios';

  import RedditPost from "./RedditPost.vue";

  export default {
      data() {
          return {
            list:[]
          }
      },
      components: {
        RedditPost
      },
      mounted() {
        this.getPosts()
      },
      methods:{
        getPosts(){
          axios.get('https://www.reddit.com/r/all/top.json?limit=50')
          .then(({data}) => {
            this.list=data.data.children
          })
        },
        selectPost(post){
          this.$emit('postSelected', post)
        },
        dismissPost(post){
          this.$delete(this.list, post);
        },
        dismissAllPost(){
          this.list = [];
        }
      }
  }
</script>

<style lang="scss" scoped>
$footerh : 60px;
.menu{
  .list{
    position: absolute;
    top:0px;
    bottom: $footerh;
    overflow: auto;
  }
  footer{
    height: $footerh;
    bottom: 0px;
    position: absolute;
    padding: 10px 20px;
    width: 100%;
    .btn{
      width: 100%;
    }
  }
}


</style>
