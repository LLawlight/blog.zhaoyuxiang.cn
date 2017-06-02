<template lang="html">
  <div class="page-index">
    <div class="posts">
      <post-card
        v-for="post in posts"
        :key="post.id"
        :post-info="post"
      ></post-card>
    </div>
  </div>
</template>

<script>
import postCard from '@/components/postCard'

export default {
  name: 'page-index',

  data() {
    return {
      posts: [],
      backgroundImage: 'https://www.dujin.org/sys/bing/1920.php'
    }
  },

  components: {
    postCard
  },

  created() {
    this.getPosts()
  },

  methods: {
    goUrl() {
      window.location.href = __config.GITHUB_OAUTH_ADDRESS
    },

    getPosts() {
      this.$http.get(`${__apiBase}v1/posts`)
      .then((res) => {
        this.posts = res.data.data
      })
    }
  }
};
</script>

<style lang='less'>
.page-index {
  height: 100%;
  background-position: center;
  background-attachment: fixed;
}
</style>
