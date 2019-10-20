<template>
  <div class="upload">
    <h1>Photos Upload</h1>
    <input type="text" v-model="photoName" name="photoName">
    <input type="file" name="photo" @change="handleFile">
    <div style="clear:both">
      <button class="btn" @click="upload">upload</button>
    </div>
  </div>
</template>
<style scoped>

</style>
<script>
import axios from "axios";
export default {
  data() {
    return {
      photoName: "",
      photo: null
    };
  },
  methods: {
    handleFile(e) {
      this.photo = e.target.files[0];
    },
    upload() {
      let formData = new FormData();
      formData.append("photoName", this.photoName);
      formData.append("photo", this.photo);
      // let config = { headers: { "Content-Type": "multipart/form-data" } };
      axios.post("/test/upload", formData).then(res => {
        console.log(res);
      });
    }
  }
};
</script>


