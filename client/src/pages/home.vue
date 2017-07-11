<template lang="html">
  <div class="posts">
    <post-card
      v-for="post in posts"
      :key="post.id"
      :post-info="post"
    ></post-card>
  </div>
</template>

<script>
import zHeader from '@/components/header'
import postCard from '@/components/postCard'
import zFooter from '@/components/footer'

export default {
  name: 'page-index',

  data() {
    return {
      posts: []
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
.posts {
  padding: 16px;
}
</style>
