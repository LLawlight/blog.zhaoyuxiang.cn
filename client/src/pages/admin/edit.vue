<template lang="html">
  <div class="page-admin-edit">
    <edit-panel
      v-if="content"
      :title="title"
      :theme="theme"
      :content="content"
      @submit="submit"
    ></edit-panel>
  </div>
</template>

<script>
import editPanel from '@/components/editPanel'

export default {
  data() {
    return {
      title: '',
      theme: '',
      content: '',
      id: ''
    }
  },

  components: {
    editPanel
  },

  created() {
    this.getPost()
  },

  methods: {
    getPost() {
      this.$http.get(`${__apiBase}v1/post/edit`,
        {
          params: {
            id: this.$route.params.id
          }
        }
      ).then((res) => {
        const data = res.data.data

        this.title = data.title
        this.theme = data.theme
        this.content = data.content
        this.id = data.post_id
      })
    },

    submit(title, theme, content) {
      this.$http.post(`${__apiBase}v1/post/update`, {
        title: title,
        theme: theme,
        content: content,
        post_id: this.id
      })
    }
  }
};
</script>

<style lang="less">
.page-admin-edit {
  height: 100%;
}
</style>
