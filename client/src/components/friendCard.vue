<template lang="html">
  <div class="friend-card">
    <div class="basic-info">
      <div class="avatar-container">
        <img :src="friendInfo.avatar" alt="">
      </div>
      <div class="name">{{friendInfo.name}}</div>
      <div class="intro">{{friendInfo.intro}}</div>
    </div>
    <a :href="friendInfo.link" target="_blank">探索</a>
  </div>
</template>

<script>
export default {
  props: {
    friendInfo: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="less">
.friend-card {
  border: 1px solid #efd7ef;
  border-radius: 5px;
  box-sizing: border-box;
  width: e("calc(25% - 16px * 2)");
  margin: 16px;
  float: left;
  text-align: center;

  .basic-info {
    padding: 16px;
  }

  .avatar-container {
    width: 80px;
    height: 80px;
    border-radius: 80px;
    border: 1px solid rgba(0, 0, 0, .08);
    overflow: hidden;
    margin: auto;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .name {
    margin: 16px 0;
  }

  .intro {
    color: gray;
    font-size: 14px;
    height: 38px;
  }

  a {
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    border-top: 1px solid #efd7ef;
    display: block;

    &:hover {
      background-color: #e6e6e6;
    }
  }
}

@media screen and (max-width: 1020px) {
  .friend-card {
    width: e("calc(33.33% - 16px * 2)");
    margin: 16px;
  }
}

@media screen and (max-width: 660px) {
  .friend-card {
    width: e("calc(50% - 16px * 2)");
    margin: 16px;
  }
}
</style>
