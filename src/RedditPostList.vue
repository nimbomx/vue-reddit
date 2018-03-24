<template>
  <div class="menu">
    <div class="list">

     <transition-group name="slide">

       <reddit-post v-for="(post, index) in listPaginated" :key="post.id" :index="index" :post="post"
          v-on:selectPost="selectPost"
          v-on:dismissPost="dismissPost"
        ></reddit-post>

      </transition-group>

    </div>
    <footer>
      <div v-if="list.length">
        <button :disabled="page<=1" @click.stop="prevPage" class="btn btn-outline-secondary"><</button>
         &nbsp; {{ page }} of {{ pages }}  &nbsp;
        <button :disabled="page>=pages" @click.stop="nextPage" class="btn btn-outline-secondary">></button>
        <button  @click.stop="dismissAllPost" class="btn btn-outline-secondary float-right">Dismiss All {{ num_posts }} Post</button>
      </div>

      <button v-else @click.stop="getPosts" class="btn btn-outline-secondary w100">Get Top 50 Post</button>
    </footer>
  </div>
</template>

<script>
  import axios from 'axios';

  import RedditPost from "./RedditPost.vue";


  export default {
      data() {
          return {
            list:[],

            perpage:10,
            page:1
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
      computed: {
        listPaginated: function () {
          return  this.list.slice((this.page-1)*this.perpage,((this.page-1)*this.perpage)+this.perpage)
        },
        pages: function () {
          return  Math.ceil(this.list.length/this.perpage)
        },
        num_posts: function () {
          return  this.list.length
        }
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
            this.goPage(1)
          })
        },
        restorePostList(){
          this.list = JSON.parse(localStorage.list)
          this.restorePage()
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
          this.list.splice(this.list.indexOf(post),1)
          this.preservePostList()
        },
        prevPage(){
          this.page--
          this.preservePage()
        },
        nextPage(){
          this.page++
          this.preservePage()
        },
        goPage(page){
          this.page=page
          this.preservePage()
        },
        preservePage(){
          localStorage.setItem("page",this.page)
        },
        restorePage(){
          this.page = localStorage.page || 1
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
    .w100{
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
