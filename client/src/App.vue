<template lang="html">
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style lang='less'>
@import '../node_modules/highlight.js/styles/github.css';
* {
  margin: 0;
  padding: 0;
}

body {
  font-size: 16px;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Noto Sans CJK SC,WenQuanYi Micro Hei,Arial,sans-serif;
  word-break: break-all;
  line-height: 1.5;
}

input, textarea {
  font-size: inherit;
  font-family: inherit;
}

i, em {
  font-style: normal;
}

a {
  text-decoration: none;
  color: #333;
}
</style>
