<template lang="html">
  <div class="page-admin-create">
    <edit-panel
      @submit="submit"
    ></edit-panel>
  </div>
</template>

<script>
import editPanel from '@/components/editPanel'

export default {
  components: {
    editPanel
  },

  methods: {
    submit(title, theme, content) {
      this.$http.post(`${__apiBase}v1/post/create`,
        {
          title: title,
          theme: theme,
          content: content
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
.page-admin-create {
  height: 100%;
}
</style>
