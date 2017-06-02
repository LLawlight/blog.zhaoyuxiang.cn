<template lang="html">
  <div class="edit-panel">
    <div class="write">
      <input class="title" v-model="cTitle" placeholder="请输入标题" />
      <textarea v-model="cContent"></textarea>
      <div class="action">
        <input type="text" v-model="cTheme" placeholder="主题"/>
        <a @click="submit">提交</a>
      </div>
    </div>
    <div class="preview">
      <div class="title">{{cTitle ? cTitle : '无标题'}}</div>
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
  name: 'edit-panel',

  data() {
    return {
      cTitle: this.title,
      cTheme: this.theme,
      cContent: this.content,
      renderContent: ''
    };
  },

  props: {
    title: {
      type: String,
      default: ''
    },

    theme: {
      type: String,
      default: ''
    },

    content: {
      type: String,
      default: ''
    }
  },

  watch: {
    cContent() {
      this.render()
    }
  },

  created() {
    this.render()
  },

  methods: {
    submit() {
      this.$emit('submit', this.cTitle, this.cTheme, this.cContent)
    },

    render() {
      this.renderContent = md.render(this.cContent)
    }
  }
};
</script>

<style lang="less">
@import '../../node_modules/highlight.js/styles/github.css';

.edit-panel {
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
