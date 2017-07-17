<template lang="html">
  <div class="posts">
    <loading v-if="isLoading"></loading>
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
  name: 'page-home',

  data() {
    return {
      posts: [],
      isLoading: false
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
      this.isLoading = true
      this.$http.get(`${__apiBase}v1/posts`)
      .then((res) => {
        this.isLoading = false
        this.posts = res.data.data
      })
    }
  }
};
</script>

<style lang='less'>
.posts {
  padding: 32px 16px;
}
</style>
