<template lang="html">
  <section class="post-card">
    <div class="title">{{postInfo.title}}</div>
    <div class="info">
      <span class="create-at">发布于 <i>{{postInfo.create_at_ago}}</i></span>
      <span class="visit-count">浏览{{postInfo.visit_count}}</span>
      <span class="reply-count">评论{{postInfo.reply_count}}</span>
    </div>
    <div class="summary">
      {{postInfo.summary}}
    </div>
    <z-button type="primary" @click.native="readPost(postInfo.id)">阅读更多</z-button>
  </section>
</template>

<script>
export default {
  name: 'post-card',

  props: {
    postInfo: Object
  },

  methods: {
    readPost(id) {
      this.$router.push(`/post/${id}`)
    }
  }
};
</script>

<style lang="less">
.post-card {
  border: 1px solid #eee;
  border-radius: 5px;
  margin: 0 auto 18px;
  max-width: 800px;
  padding: 18px;

  .title {
    font-size: 24px;
    font-weight: bold;
  }

  .info {
    font-size: 14px;
    margin: 10px 0;

    .create-at {
      i {
        font-weight: 600;
      }
    }
  }

  .summary {
    margin: 10px 0;
  }
}
</style>
