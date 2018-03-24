<template>
  <div  class="post clearfix" @click="selectPost(post)">
    <transition name="fade"><div v-if="!post.data.visited" class="unreaded"></div> </transition>
    <h4>{{ post.data.author }} <small>{{ post.data.created_utc | date}}</small></h4>
    <div class="clearfix">
      <img v-if="post.data.thumbnail && post.data.thumbnail != 'default' && post.data.thumbnail != 'self'" class="thumb"  :src="post.data.thumbnail">
      {{ post.data.title }}
    </div>
    <br>
    <button @click.stop="dismissPost(index)" class="btn btn-outline-light">Dismiss Post</button>
    <span class="float-right">{{post.data.num_comments}} comments</span>
  </div>
</template>

<script>
  export default {
      data() {
          return {

          }
      },
      props:['post','index'],
      filters: {
        date: function (value) {
          if (!value) return ''
          return moment.unix(value).fromNow()
        }
      },
      methods:{
        selectPost(post){
          this.$emit('selectPost', post)
        },
        dismissPost(post){
          this.$emit('dismissPost', post)
        }

      }
  }
</script>

<style lang="scss">
  .post{
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
    padding-bottom: 10px;
    padding: 10px 20px;
    h4{
      margin-left:20px;
    }
  }

  .thumb{
    width: 100px;
    margin-right: 10px;
    margin-bottom: 10px;
    float: left;
  }
  .unreaded{
    background: #4286f4;
    width: 14px;
    height: 14px;
    position: absolute;
    border-radius: 20px;
    margin: 10px 0px;
  }

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
