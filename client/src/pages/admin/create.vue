<template lang="html">
  <div class="page-admin-create">
    <div class="write">
      <input class="title" v-model="title" placeholder="请输入标题" />
      <textarea v-model="content"></textarea>
      <div class="action">
        <input type="text" v-model="theme" placeholder="主题"/>
        <a @click="submit">提交</a>
      </div>
    </div>
    <div class="preview">
      <div class="title">{{title ? title : '无标题'}}</div>
      <div class="content" v-html="renderContent"></div>
    </div>
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
      title: '',
      theme: '',
      content: '',
      renderContent: ''
    };
  },

  watch: {
    content() {
      this.renderContent = md.render(this.content)
    }
  },

  methods: {
    submit() {
      this.$http.post(`${__apiBase}v1/topic/create`,
        {
          title: this.title,
          theme: this.theme,
          content: this.content
        }).then((res) => {
          console.log('提交成功');
        }, (res) => {
          console.log('提交失败');
        })
    }
  }
};
</script>

<style lang="less">
@import '../../../node_modules/highlight.js/styles/github.css';

.page-admin-create {
  height: 100%;
  overflow: hidden;

  .write, .preview {
    float: left;
    height: 100%;
    width: 50%;
    box-sizing: border-box;
    padding: 20px;
  }

  .title {
    margin-bottom: 10px;
    font-size: 32px;
    padding-bottom: 10px;
  }

  .write {
    position: relative;

    .title {
      display: block;
      width: 100%;
      border-top: none;
      border-right: none;
      border-left: none;
      font-size: 32px;

      &:focus {
        outline: none;
      }
    }

    textarea {
      width: 100%;
      height: e("calc(100% - 80px)");
      resize: none;
      padding: 0;
      border: none;
      font-size: 16px;
      line-height: 1.5;

      &:focus {
        outline: none;
      }
    }

    .action {
      width: 100%;

      a {
        float: right;
      }
    }
  }

  .preview {
    border-left: 1px solid black;

    .content {
      height: e("calc(100% - 70px)");

      ul, ol {
        padding-left: 20px;
      }
    }
  }
}
</style>
