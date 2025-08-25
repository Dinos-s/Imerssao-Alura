<script>
import UpLoadImg from './components/UpLoadImg.vue'
import ImageList from './components/ImageList.vue'

export default {
  name: 'App',
  components: {
    UpLoadImg,
    ImageList
  },
  methods: {
    refreshImages() {
      this.$refs.imageList.loadImages(); // Recarrega o componente com um novo upload;
    }
  }
}
</script>

<template>
  <div class="container">
    <UpLoadImg  @uploaded="refreshImages"/>
    <ImageList ref="imageList"/>
  </div>
</template>

<style scoped>
.container {
  margin: auto;
  padding: 20px;
}
</style>
