<template lang="html">
  <div class="page-post">
    <loading v-if="isLoading"></loading>
    <h1>{{post.title}}</h1>
    <div class="post-content" v-html="post.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      post: {},
      isLoading: false
    };
  },

  created() {
    this.id = this.$route.params.id
    this.getPost()
  },

  methods: {
    getPost() {
      this.isLoading = true
      this.$http.get(`${__apiBase}v1/post/${this.id}`)
      .then((res) => {
        this.isLoading = false

        const data = res.data.data

        this.post = {
          title: data.title,
          content: __md.render(data.content)
        }
      })
    }
  }
};
</script>

<style lang="less">
.page-post {
  padding: 16px;
  max-width: 1020px;
  margin: auto;

  h1 {
    margin: 24px 0;
  }

  .post-content {
    margin-top: 30px;

    h2 {
      margin: 20px 0;
    }

    p {
      margin: 20px 0;
    }

    img {
      max-width: 100%;
    }

    ul, ol {
      padding-left: 16px;
      margin: 20px 0;
    }

    hr {
      margin: 8px 0;
    }

    blockquote {
      border-left: 6px solid #b4b4b4;
      background-color: #f8f8f8;
      padding: 16px 0 16px 16px;

      p {
        margin: 0;
      }
    }
  }
}
</style>
