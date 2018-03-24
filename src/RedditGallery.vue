<template>
  <div class="detailCavas">
      <div  class="post-detail clearfix" >
        <h3>Gallery</h3>
        <div v-for="item in gallery" :key="item.id" class="galleryImage">
          <img :src="item.thumbnail" :alt="item.title">
        </div>
      </div>
  </div>
</template>

<script>
  export default {
      data() {
          return {
            fullImage:false,
            gallery:[]
          }
      },
      mounted() {
        this.gallery= JSON.parse(localStorage.gallery)
        console.log(this.gallery)
      },
      methods:{
        saveInGallery(post){
          this.gallery.push(post)
          localStorage.setItem("gallery",JSON.stringify(this.gallery))
        }
      }
  }
</script>

<style lang="scss">
  .galleryImage{
    float: left;
    margin: 20px;
  }
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
