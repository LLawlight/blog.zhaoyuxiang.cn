<template lang="html">
  <div class="page-auth-github">
    <loading>授权登录中，请稍候。。。</loading>
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
          params: {
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
