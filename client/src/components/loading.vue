<template lang="html">
  <div class="blog-loading">
    <img src="../assets/loading.gif" alt="加载中">
    <div class="tip">
      <slot>
      加载中，请稍候。。。
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading'
};
</script>

<style lang="less">
.blog-loading {
  text-align: center;
  padding: 80px 0;

  .tip {
    color: gray;
    font-size: 14px;
    margin-top: 10px;
  }
}
</style>
