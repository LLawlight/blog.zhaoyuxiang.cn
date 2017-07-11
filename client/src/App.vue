<template lang="html">
  <div id="app">
    <z-header></z-header>
    <main>
      <router-view></router-view>
    </main>
    <z-footer></z-footer>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style lang='less'>
* {
  margin: 0;
  padding: 0;
}

body {
  font-size: 16px;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Noto Sans CJK SC,WenQuanYi Micro Hei,Arial,sans-serif;
}

input, textarea {
  font-size: inherit;
  font-family: inherit;
}

i, em {
  font-style: normal;
}
</style>
