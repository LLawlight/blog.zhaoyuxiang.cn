<template lang="html">
  <section class="post-card">
    <div class="title">{{postInfo.title}}</div>
    <div class="info">
      <span class="create-at">发布于 <em>{{postInfo.create_at_ago}}</em></span>
      <span class="visit-count"><i class="fa fa-eye" aria-hidden="true"></i><em>{{postInfo.visit_count}}</em></span>
      <span class="reply-count"><i class="fa fa-comments-o" aria-hidden="true"></i><em>{{postInfo.reply_count}}</em></span>
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
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  margin: 0 auto 16px;
  max-width: 800px;
  padding: 16px;

  .title {
    font-size: 24px;
    font-weight: bold;
  }

  .info {
    font-size: 14px;
    margin: 10px 0;

    i {
      margin-right: 4px;
    }

    em {
      color: #7FC9FE;
    }

    .create-at {
      em {
        font-weight: 600;
      }
    }
  }

  .summary {
    margin: 10px 0;
    word-break: break-all;
  }
}
</style>
