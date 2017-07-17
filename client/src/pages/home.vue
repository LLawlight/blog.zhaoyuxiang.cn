<template lang="html">
  <div class="posts">
    <loading v-if="isLoading"></loading>
    <transition-group name="post" tag="div">
      <post-card
        v-for="post in posts"
        :key="post.id"
        :post-info="post"
      ></post-card>
    </transition-group>
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

        const data = res.data.data
        for (let i = 0; i < data.length; i++) {
          setTimeout(() => {
            this.posts.push(data[i])
          }, 3000 / data.length * i)
        }
      })
    }
  }
};
</script>

<style lang='less'>
.posts {
  padding: 32px 16px;
}

.post-enter-active, .post-leave-active {
  transition: all 1s;
}
.post-enter, .post-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
