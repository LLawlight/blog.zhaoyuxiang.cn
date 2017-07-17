<template lang="html">
  <section class="post-card">
    <img v-if="postInfo.titleImage" :src="postInfo.titleImage" @click="readPost(postInfo.id)" />
    <div class="main">
      <div class="title" @click="readPost(postInfo.id)">{{postInfo.title}}</div>
      <div class="summary" @click="readPost(postInfo.id)">
        {{postInfo.summary}}...<span>查看全文></span>
      </div>
      <div class="info">
        <span class="create-at">发布于 <em>{{postInfo.create_at_ago}}</em></span>
        <div class="count-info" v-if="false">
          <span class="visit-count"><em>{{postInfo.visit_count}}</em> 浏览</span>
          <span class="bull">·</span>
          <span class="reply-count"><em>{{postInfo.reply_count}}</em> 评论</span>
        </div>
      </div>
    </div>
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
  margin: 0 auto 56px;
  max-width: 660px;
  overflow: hidden;

  img {
    object-fit: cover;
    height: 180px;
    width: 240px;
    border-radius: 4px;
    float: left;
    margin-right: 16px;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
  }

  .info {
    font-size: 14px;
    color: gray;

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

    .count-info {
      float: right;

      .bull {
        margin: 0 4px;
      }
    }
  }

  .summary {
    padding: 10px 0;
    word-break: break-all;
    color: #666;
    line-height: 1.7;
    cursor: pointer;

    span {
      color: #b3b3b3;
    }
  }
}
</style>
