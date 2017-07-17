<template lang="html">
  <header>
    <div class="header-wrapper">
      <nav>
        <ul>
          <li v-for="item in navList"><router-link :to="item.to" exact>{{item.name}}</router-link></li>
        </ul>
      </nav>

      <div class="header">
        <div class="avatar"><img src="../assets/avatar.jpg" /></div>
        <div class="name">天道寺</div>
      </div>

      <z-button v-if="!$store.state.user" class="signin-button" @click="goSignin">登录</z-button>
      <div v-else class="hello-tip">你好，<router-link v-if="$store.state.user.is_admin" to="/admin" class="admin-entry">管理员</router-link><span v-else>{{$store.state.user.loginname}}</span></div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'z-header',

  data() {
    return {
      navList: [
        {
          to: '/',
          name: '首页'
        },
        {
          to: '/friends',
          name: '友情链接'
        }
      ]
    }
  },

  methods: {
    goSignin() {
      window.location.href = __config.GITHUB_OAUTH_ADDRESS
    }
  }
};
</script>

<style lang='less'>
header {
  background-image: url("https://bing.ioliu.cn/v1");
  background-color: white;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  min-height: 300px;

  .header-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
    padding: 16px;
    color: white;

    nav {
      float: left;
      line-height: 19px;
      padding: 8px 0;

      li {
        list-style: none;
        float: left;
        margin-right: 16px;

        a {
          color: white;
          text-decoration: none;

          &.router-link-active {
            text-shadow: 1px 1px #efd7ef;
            font-size: 18px;
          }
        }
      }
    }

    .header {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;

      .name {
        color: #fff;
        margin-top: 10px;
        font-size: 24px;
      }
    }

    .signin-button, .hello-tip {
      float: right;
      color: #fff;
    }

    .signin-button {
      background-color: transparent;
      border-radius: 5px;
      min-width: 80px;
    }

    .hello-tip {
      line-height: 19px;
      padding: 8px 0;

      .admin-entry {
        color: white;
        text-decoration: underline;
      }
    }
  }

  .avatar {
    overflow: hidden;
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 200px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
