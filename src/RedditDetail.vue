<template>
  <div class="detailCavas">
      <div v-if="post" class="post-detail clearfix" >
        <h2>{{ post.author }}</h2>
        <div class="text-center img">
          <a v-if="post.thumbnail" href="#" @click.stop="fullImage=true">
            <img  :src="post.thumbnail"> <br><small class="imgFooter">click to view full image</small>
          </a>
        </div>
        <div class="text-center fullImage img" v-if="fullImage">
          <img  :src="post.url">
        </div>
        <h4>{{ post.title }}</h4>

      </div>
  </div>
</template>

<script>
  export default {
      data() {
          return {
            fullImage:false
          }
      },
      props:['post'],
      mounted() {

      },
      methods:{

      }
  }
</script>

<style lang="scss">

  .post-detail{
    position: absolute;
    top:0px;
    bottom:0px;
    left:0px;
    right: 0px;
    padding: 60px 30px;
    overflow: auto;
    z-index: -1;
  .img{
    margin: 30px auto;
    a{
      text-decoration: none;
    }
    img{
      max-width: 100%;
    }

  }
}
</style>
