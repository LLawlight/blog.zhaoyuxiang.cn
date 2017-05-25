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
html, body, #app {
  height: 100%;
}

body {
  margin: 0;
}
</style>
