<template lang="html">
  <div class="page-auth-github">
    <img src="../assets/loading.gif" alt="加载中">
    <div class="tip">
      授权登录中，请稍候。。。
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.signupByGithub()
  },

  methods: {
    signupByGithub() {
      this.$http.get(`${__apiBase}v1/auth/github/callback`,
        {
          params:{
            'code': this.$route.query.code
          }
        }
      ).then((res) => {
        this.$store.commit('getUserInfo', res.data.data)
        this.$router.replace('/')
      }, (res) => {
        console.log('验证失败！');
        this.$router.replace('/')
      })
    }
  }
};
</script>

<style lang="less">
.page-auth-github {
  text-align: center;
  padding: 80px 0;

  .tip {
    color: gray;
    font-size: 14px;
    margin-top: 10px;
  }
}
</style>
