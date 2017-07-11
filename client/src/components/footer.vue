<template lang="html">
  <footer>
    <p>Made with <i class="iconfont icon-heart"></i> by zhaoyuxiang</p>
    <p>Copyright &copy; 2016-2017<a target="_blank" href="http://www.miitbeian.gov.cn/">浙ICP备16047464号</a></p>
  </footer>
</template>

<script>
export default {
  name: 'z-footer'
};
</script>

<style lang="less">
footer {
  width: 100%;
  padding: 16px 0;
  color: #999;
  text-align: center;
  font-size: 12px;

  p {
    height: 16px;
    line-height: 16px;

    & + p {
     margin-top: 5px;
    }

    .icon-heart {
      display: inline-block;
      vertical-align: middle;
      color: red;
      animation: heart 60/72s ease-in-out infinite alternate;
    }

    a {
      text-decoration: none;
      color: #999;
      border-left: 1px solid #999;
      margin-left: 5px;
      padding-left: 5px;
    }
  }
}

@keyframes heart
{
  0% {
    transform: scale(.8);
  }

  100% {
    transform: scale(1);
  }
}
</style>
