<template lang="html">
  <div class="page-admin">
    <div class="siderbar">
      <router-link to="/admin/list">列表</router-link>
      <router-link to="/admin/create">写文章</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {},
  ready() {},
  attached() {},
  methods: {},
  components: {}
};
</script>

<style lang="less">
.page-admin {
  padding-left: 100px;
  height: 100%;

  .siderbar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background-color: blue;
    width: 100px;

    a {
      color: white;
      text-decoration: none;
      display: block;
      text-align: center;
      padding: 10px 0;

      &:hover {
        background-color: white;
        color: black;
      }

      &.router-link-active {
        background-color: white;
        color: black;
      }
    }
  }
}
</style>
