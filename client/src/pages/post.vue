<template lang="html">
  <div class="page-post">
    <loading v-if="isLoading"></loading>
    <h1>{{post.title}}</h1>
    <div class="post-content" v-html="post.content"></div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js';
const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
})

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
          content: md.render(data.content)
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
  }
}
</style>
