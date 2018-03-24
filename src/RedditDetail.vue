<template>
  <div class="detailCavas">
      <div v-if="post" class="post-detail clearfix" >
        <h2>{{ post.author }}</h2>
        <div v-if="isImage(post)"  class="text-center img">
          <a v-if="fullIsImage(post)" href="#" @click.stop="fullImage=true">
            <img  :src="post.thumbnail"> <br><small class="imgFooter">click to view full image</small>
          </a>

          <img v-if="!fullIsImage(post)" :src="post.thumbnail">

        </div>
        <div class="text-center fullImage img" v-if="fullImage">
          <img  :src="post.url">
          <br>
          <button @click="saveInGallery(post)" class="btn btn-outside-secondary">Save in my Gallery</button>
        </div>
        <h4>{{ post.title }}</h4>

      </div>
  </div>
</template>

<script>
  export default {
      data() {
          return {
            fullImage:false,
            gallery:[],
            formats:['jpg','png'],
          }
      },
      props:['post'],
      mounted() {
        this.gallery= JSON.parse(localStorage.gallery)
        console.log(this.gallery)
      },
      methods:{
        isImage(post){
          let a = this.formats.indexOf(post.thumbnail.split('.').pop());
          return (a >= 0);
        },
        fullIsImage(post){
          let a = this.formats.indexOf(post.url.split('.').pop());
          return (a >= 0);
        },
        saveInGallery(post){
          this.gallery.push(post)
          localStorage.setItem("gallery",JSON.stringify(this.gallery))
        }
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
