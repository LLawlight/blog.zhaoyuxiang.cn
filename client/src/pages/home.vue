<template lang="html">
  <div class="page-home">
    home
  </div>
</template>

<script>
export default {
  name: 'home',

  created() {
    this.test()
  },

  methods: {
    test() {
      this.$http.post('http://localhost:3000/api/v1/signup',
        {
          'loginname' : 'test',
          'email'     : ' ',
          'pass'      : '123',
          're_pass'   : '123'
        }
      )
    }
  }
};
</script>
