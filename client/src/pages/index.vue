<template lang="html">
  <div class="page-index">
    <i class="iconfont icon-logo"></i>
    <a @click="goUrl">登录</a>
  </div>
</template>

<script>
export default {
  name: 'page-index',

  methods: {
    goUrl() {
      window.location.href = __config.GITHUB_OAUTH_ADDRESS
    }
  }
};
</script>

<style lang='less'>
.page-index {
  height: 100%;
  background: linear-gradient(to bottom left, #a9e2ff, #78a7ff);

  i {
    position: fixed;
    left: 50%;
    top: 35%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 300px;
  }

  a {
    position: fixed;
    left: 50%;
    top: 65%;
    transform: translate(-50%, -50%);
    border: 1px solid white;
    padding: 10px 50px;
    border-radius: 5px;
    color: white;
  }
}
</style>
