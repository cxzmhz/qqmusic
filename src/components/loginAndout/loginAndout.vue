<template>
  <div class="loginAndout">
    <h1>User</h1>
    <div v-if="!loginedname">
      <input type="text" v-model="username" name="username" placeholder="username">
      <input type="password" v-model="password" name="password" placeholder="password">
      <div style="margin-top:10px">
        <button class="btn" @click="register">注册</button>
        <button class="btn" @click="login">登录</button>
      </div>
    </div>
    <div v-else>
      <div>当前登录用户名： {{loginedname}}</div>
      <button class="btn" @click="logout">注销</button>
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
      username: "",
      password: "",
      loginedname: ""
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      try {
        let res = await axios.get("/test/users");
        res.data &&
          res.data.code == 1 &&
          (this.loginedname = res.data.loginedname);
      } catch (err) {
        console.log(err);
      }
    },
    async logout() {
      let res = await axios.post("/test/account/logout");
      if (res.data.code == 1) {
        this.loginedname = "";
      }
    },
    login() {
      if (!this.username || !this.password) {
        alert("用户名和密码都必填");
        return;
      }
      let params = {
        username: this.username,
        password: this.password
      };
      axios.post("/test/account/login", params).then(res => {
        let data = res.data;
        if (data.code == 1) {
          this.loginedname = data.loginedname;
          console.log(data.message);
        } else {
          console.log(data.message);
        }
      });
    },
    register() {
      if (!this.username || !this.password) {
        alert("用户名和密码都必填");
        return;
      }
      let params = {
        username: this.username,
        password: this.password
      };
      axios.post("/test/account/register", params).then(res => {
        let data = res.data;
        if (data.code == 1) {
          console.log(data.message);
        } else {
          console.log(data.message);
        }
      });
    }
  }
};
</script>


