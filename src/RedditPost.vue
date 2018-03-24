<template>
  <div  class="post clearfix" @click="selectPost(post)">
    <div v-if="!post.data.visited" > [unreaded]</div>
    <h4>{{ post.data.author }} <small>{{ post.data.created_utc | date}}</small></h4>
    <div class="clearfix">
      <img v-if="post.data.thumbnail && post.data.thumbnail != 'default' && post.data.thumbnail != 'self'" class="thumb"  :src="post.data.thumbnail">
      {{ post.data.title }}
    </div>
    <br>
    <span class="float-right">{{post.data.num_comments}} comments</span>
  </div>
</template>

<script>
  export default {
      data() {
          return {

          }
      },
      props:['post'],
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

      }
  }
</script>

<style lang="scss">

</style>
