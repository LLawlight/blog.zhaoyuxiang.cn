<template lang="html">
  <div id="app">
    <router-view></router-view>
    <z-footer v-if="!~$route.path.indexOf('/admin/')"></z-footer>
  </div>
</template>

<script>
import zFooter from '@/components/footer'

export default {
  name: 'app',

  components: {
    zFooter
  }
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
  line-height: 1;
}

input, textarea {
  font-size: inherit;
  font-family: inherit;
}

i, em {
  font-style: normal;
}
</style>
