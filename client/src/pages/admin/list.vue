<template lang="html">
  <div class="page-admin-list">
    列表
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },

  created() {
    this.getPosts()
  },

  methods: {
    getPosts() {
      this.$http.get(`${__apiBase}v1/topics`)
      .then((res) => {console.log('获取成功');})
    }
  }
};
</script>

<style lang="css">
</style>
