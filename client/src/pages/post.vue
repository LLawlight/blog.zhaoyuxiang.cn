<template lang="html">
  <div class="page-post">
    <z-header></z-header>
    <main>
      <h1>{{post.title}}</h1>
      <div class="post-content">
        {{post.content}}
      </div>
    </main>
    <z-footer></z-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      post: {}
    };
  },

  created() {
    this.id = this.$route.params.id
    this.getPost()
  },

  methods: {
    getPost() {
      this.$http.get(`${__apiBase}v1/post/${this.id}`)
      .then((res) => {
        const data = res.data.data

        this.post = {
          title: data.title,
          content: data.content
        }
      })
    }
  }
};
</script>

<style lang="css">
</style>
