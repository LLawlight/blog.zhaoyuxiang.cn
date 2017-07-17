<template lang="html">
  <transition-group name="friends" tag="div" class="friends">
    <friend-card v-for="(friendInfo, index) in friends" :key="index" :friend-info="friendInfo"></friend-card>
  </transition-group>
</template>

<script>
import friendCard from '@/components/friendCard'

export default {
  data() {
    return {
      lists: [
        {
          avatar: '//wx1.sinaimg.cn/large/a3fb75bfgy1fhjo0qoykvj20e80e8wfs.jpg',
          name: '阿瓜',
          intro: '阿瓜阿瓜顶瓜瓜',
          link: '//digua.me'
        },
        {
          avatar: '//avatars2.githubusercontent.com/u/19499958?v=3&s=100',
          name: '阿绿',
          intro: '小米大佬欧阳浩',
          link: '//oyhfe.com/'
        },
        {
          avatar: '//avatars0.githubusercontent.com/u/13888962',
          name: '阿夜',
          intro: '靠聊天月入百万的宅男',
          link: 'https://nightcat.win'
        },
        {
          avatar: '//wenqy.com/logo_xwzj.png',
          name: '行走在猿类世界',
          intro: '行走在猿类世界',
          link: '//wenqy.com'
        },
        {
          avatar: '//ofyaji162.bkt.clouddn.com/touxiang.jpg',
          name: '阿盖',
          intro: '很骚的老实人',
          link: '//xyxiao001.github.io/vue-blog/'
        },
        {
          avatar: '//ww4.sinaimg.cn/mw690/5eaec197gw1fbdfptvjnfj20cf0cfgmr.jpg',
          name: '阿树',
          intro: '什么都会，还有一个美国女朋友',
          link: '//geeku.net'
        },
        {
          avatar: '//tva2.sinaimg.cn/crop.40.22.507.507.180/9e56d277jw8fayq9lyt7qj20f80pewgh.jpg',
          name: '阿丹',
          intro: '主职：歌手，副业：前端',
          link: '//funnycoder.lofter.com/'
        },
        {
          avatar: '//avatars2.githubusercontent.com/u/7876498?v=3&s=100',
          name: '阿鱼',
          intro: 'everyone作者',
          link: '//blog.wanan.me/'
        },
        {
          avatar: '//avatars1.githubusercontent.com/u/5457564?v=3&s=100',
          name: '阿爆',
          intro: '爆栈大佬，尤其是PHP，爱哭的男子',
          link: '//www.daryl.red/'
        },
        {
          avatar: '//ooo.0o0.ooo/2016/11/14/5829a44a23886.png',
          name: '阿兔',
          intro: 'node大佬，著名暖男，钻石王者',
          link: '//www.noder.club/'
        },
        {
          avatar: '//ooo.0o0.ooo/2016/11/14/5829a8cc9802d.png',
          name: '抽筋的葡萄',
          intro: '',
          link: '//www.choujindeputao.com'
        },
        {
          avatar: '//ooo.0o0.ooo/2016/11/14/5829a8a2081fd.png',
          name: '花花丹',
          intro: '',
          link: '//daphnechang.github.io/'
        },
        {
          avatar: '//ooo.0o0.ooo/2016/11/14/5829a6b91281c.jpg',
          name: '羡辙',
          intro: '',
          link: '//zhangwenli.com/'
        },
        {
          avatar: '//avatars1.githubusercontent.com/u/1856466?v=3&s=200',
          name: 'Havee\'s Space',
          intro: '',
          link: '//havee.me/'
        }
      ],

      friends: []
    }
  },

  components: {
    friendCard
  },

  mounted() {
    for (let i = 0; i < this.lists.length; i++) {
      setTimeout(() => {
        this.friends.push(this.lists[i])
      }, 3000 / this.lists.length * i)
    }
  }
};
</script>

<style lang="less">
.friends {
  overflow: hidden;
  max-width: 1080px;
  margin: 0 auto;
}

.friends-enter-active, .friends-leave-active {
  transition: all 1s;
}
.friends-enter, .friends-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
