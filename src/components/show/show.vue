<template>
  <div class="show">
    <h1>Photos</h1>
    <div style="clear:both">
      <button class="btn" @click="search">getPhotoList</button>
    </div>
    <ul>
      <li class="list" v-for="item in photoList" :key="item.name">
        <h2>{{item.name}}</h2>
        <img :src="item.path" @click="download(item._id)">
      </li>
    </ul>
    <div style="clear:both;margin-top:20px;">
      <button class="btn" @click="up">上一页</button>
      <button class="btn" @click="down">下一页</button>
    </div>
  </div>
</template>
<style scoped>
.list {
  float: left;
  padding-left: 10px;
}
.list img {
  width: 300px;
}
</style>

<script>
import dePhoto from "common/image/default.png";
import axios from "axios";
export default {
  data() {
    return {
      photoList: [],
      pageSize: 5,
      pageNum: 0,
      total: 0
    };
  },
  methods: {
    up() {
      this.pageNum = Math.max(--this.pageNum, 0);
      this.getPhotoList(this.pageNum, this.pageSize);
    },
    down() {
      this.pageNum = Math.min(
        ++this.pageNum,
        Math.floor(this.total / this.pageSize)
      );
      this.getPhotoList(this.pageNum, this.pageSize);
    },
    search() {
      this.getPhotoList();
    },
    getPhotoList(pageNum, pageSize) {
      pageNum = pageNum || 0;
      pageSize = pageSize || 5;
      axios
        .get("/test/photo", {
          params: {
            pageNum,
            pageSize
          }
        })
        .then(res => {
          this.photoList = res.data.photos;
          this.total = res.data.total;
        });
    },
    download(id) {
      window.open(`/test/photo/${id}/download`);
    }
  }
};
</script>


