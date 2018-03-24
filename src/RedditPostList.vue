<template>
  <div class="menu">
    <div class="list">

     <transition-group name="slide">

       <reddit-post v-for="(post, index) in list" :key="post.id" :index="index" :post="post"
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
        if(localStorage.list)
          this.restorePostList()
        else
          this.getPosts()
      },
      methods:{
        getPosts(){
          axios.get('https://www.reddit.com/r/all/top.json?limit=50')
          .then(({data}) => {
            this.list=_.map(data.data.children,value => { return _.pick(value.data,
              'title',
              'id',
              'author',
              'created_utc',
              'visited',
              'thumbnail',
              'num_comments',
              'url'
            ) })
            this.preservePostList()
          })
        },
        restorePostList(){
          this.list = JSON.parse(localStorage.list)
        },
        preservePostList(){
          localStorage.setItem("list",JSON.stringify(this.list))
        },
        selectPost(post){
          post.visited = true;
          this.$emit('postSelected', post)
          this.preservePostList()
        },
        dismissPost(post){
          this.$delete(this.list, post);
          this.preservePostList()
        },
        dismissAllPost(){
          _.each(this.list,(el,key) => {
            _.delay(() => {
              this.list.shift()
              this.preservePostList()
            }, (60*((key<=5) ? key : 5)))
          })

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

.slide-enter-active, .slide-leave-active {
  transition: all .6s;
}
.slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  margin-left:-400px;
  margin-right:400px;
}
.slide-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
