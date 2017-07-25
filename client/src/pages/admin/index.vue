<template lang="html">
  <div class="page-admin">
    <div class="siderbar">
      <router-link to="/admin" exact>列表</router-link>
      <router-link to="/admin/create" exact>写文章</router-link>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
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
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-left: 100px;

  .siderbar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #1da1f2;
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
