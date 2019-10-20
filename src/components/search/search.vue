<template>
  <div>
    <button @click="postFn">post</button>
    <button @click="getFn">get</button>
    <button @click="deleteFn">delete</button>
    <button @click="putFn">put</button>
    <button @click="getFileFn">getFile</button>
    <div>{{resData}}</div>
    <img :src="imgUrl">
    <input type="text" v-model="inputData1">
    <input type="text" v-model="inputData2">
    <button @click="showListData">showList</button>
    <button @click="addListData">addList</button>
    <ul>
      <li v-for="item in listData" :key="item.value">{{item.value.one + item.value.two}}</li>
    </ul>
    <br />
    <div>-------------------fileinput------------------</div>
    <br />
    <input type="text" v-model="fileinputData" name="fileinput">
    <input type="file" name="file" @change="handleFile">
    <button @click="addFileData">addFile</button>
    <br/>
    <div>----------------mysql---------------------</div>
    <br/>
    <div>date: </div>
    <input type="text" v-model="sqlData.date">
    <div>hours: </div>
    <input type="text" v-model="sqlData.hours">
    <div>description: </div>
    <input type="text" v-model="sqlData.description">
    <br/>
    <button @click="searchSQL">searchSQL</button>
    <button @click="addSQL">addSQL</button>
    <ul>
      <li v-for="item in sqlList" :key="item.id">
        <ul>
          <li>{{item.date}}</li>
          <li>{{item.hours}}</li>
          <li>{{item.description}}</li>
        </ul>
      </li>
    </ul>
    <br/>
    <div>---------------connect----------------------</div>
    <br/>
    <button @click="testConnect">testConnect</button>
    <br/>
    <div>---------------router----------------------</div>
    <br/>
    <button @click="seachRouter">router</button>
    <br/>
    <div>---------------interConnect----------------------</div>
    <br/>
    <button @click="interConnect">interConnect</button>
    <br/>
    <div>---------------接口转发（反向代理）----------------------</div>
    <br/>
    <button @click="agent">接口转发</button>
  </div>
</template>
<script type="text/ecmascript-6">
import axios from "axios";
export default {
  data() {
    return {
      resData: "",
      imgUrl: "",
      listData: [],
      inputData1: "",
      inputData2: "",
      fileinputData: "",
      files: null,
      sqlData: {
        date: "",
        hours: "",
        description: ""
      },
      sqlList: []
    };
  },
  methods: {
    agent() {
      axios.get("/test/agent").then(res => {
        console.log(res);
      });
    },
    interConnect() {
      axios.get("/test/photo").then(res => {
        console.log(res);
      });
    },
    seachRouter() {
      axios.get("/test/users/cxz").then(res => {
        console.log(res);
      });
    },
    testConnect() {
      axios.get("/test/admin/users?user=cxz&password=cxz").then(res => {
        console.log(res);
      });
    },
    searchSQL() {
      axios.get("/test").then(res => {
        console.log(res);
        this.sqlList = res.data;
      });
    },
    addSQL() {
      axios.post("/test", this.sqlData).then(res => {
        console.log(res);
        this.sqlList = res.data;
      });
    },
    handleFile(e) {
      this.files = e.target.files[0];
    },
    addFileData() {
      let formData = new FormData();
      // formData.append("fileinput", this.fileinputData);
      formData.append("file", this.files);
      // let config = { headers: { "Content-Type": "multipart/form-data" } };
      axios.post("/test", formData).then(res => {});
    },
    showListData() {
      axios.get("/test").then(res => {
        console.log(res);
        this.listData = res.data;
      });
    },
    addListData() {
      let params = {
        one: this.inputData1,
        two: this.inputData2
      };
      axios.post("/test", params).then(res => {
        console.log(res);
        this.listData = res.data;
      });
    },
    postFn() {
      let params = `fuck you ${+new Date()}`;
      axios.post("/test", params).then(res => {
        console.log(res);
      });
    },
    getFn() {
      axios.get("/test").then(res => {
        console.log(res.data);
        this.resData = res.data;
      });
    },
    deleteFn() {
      axios.delete("/test/2").then(res => {
        console.log(res);
      });
    },
    putFn() {
      axios.put("/test/1", `bitch ${+new Date()}`).then(res => {
        console.log(res);
        this.resData = res.data;
      });
    },
    getFileFn() {
      axios({
        method: "get",
        url: "/test/a.jpg",
        responseType: "blob"
      }).then(res => {
        let blob = res.data;
        let fileName = "test.jpg";
        if (window.navigator.msSaveOrOpenBlob) {
          //兼容ie10/11
          navigator.msSaveOrOpenBlob(blob, fileName);
        } else {
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          console.log(link.href);
          this.imgUrl = link.href;
          return;
          link.download = fileName;
          link.style.display = "none";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(link.href);
        }
      });
    }
  }
};
</script>
<style scoped>

</style>