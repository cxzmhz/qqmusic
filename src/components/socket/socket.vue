<template>
  <div>
    <div>{{nowTime}}</div>
    <div>
      <button class="btn" @click="send">发送</button>
    </div>
  </div>
</template>
<style scoped>

</style>
<script>
export default {
  data() {
    return {
      nowTime: "",
      path: "ws://localhost:8881"
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.socket = new WebSocket(this.path);
      // 监听socket连接
      this.socket.onopen = this.open;
      // 监听socket错误信息
      this.socket.onerror = this.error;
      // 监听socket消息
      this.socket.onmessage = this.getMessage;
      this.socket.ontest = function(params) {
        console.log(params);
      };
    },
    open: function() {
      console.log("socket连接成功");
    },
    error: function() {
      console.log("连接错误");
    },
    getMessage: function(msg) {
      console.log(msg.data);
      this.nowTime = msg.data;
    },
    send() {
      let params = "fuck u";
      console.log(params);
      this.socket.send(params);
    },
    close: function() {
      console.log("socket已经关闭");
    }
  },
  beforeDestroy() {
    this.socket.onclose = this.close;
  }
};
</script>
