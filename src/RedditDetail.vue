<template>
  <div class="detailCavas">
      <div v-if="post" class="post-detail clearfix" >
        <h2>{{ post.data.author }}</h2>
        <div class="text-center">
          <a v-if="post.data.thumbnail" :href=" post.data.url" target="_blank">

            <img  :src="post.data.thumbnail">
            </a>
        </div>

        <h4>{{ post.data.title }}</h4>

      </div>
  </div>
</template>

<script>
  export default {
      data() {
          return {

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
  img{
    margin: 30px auto;
    max-width: 100%;
  }
}
</style>
