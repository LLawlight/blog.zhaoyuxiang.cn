<template lang="html">
  <div class="page-admin-list">
    <div class="post" v-for="list in lists">
      <h3 @click="readPost(list.id)">{{list.title}}</h3>
      <div class="tool">
        <span @click="editPost(list.id)">编辑</span>
        <span @click="deletePost(list.id)">删除</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: []
    };
  },

  created() {
    this.getPosts()
  },

  methods: {
    getPosts() {
      this.$http.get(`${__apiBase}v1/posts`)
      .then((res) => {
        this.lists = res.data.data
      })
    },

    readPost(id) {
      this.$router.push(`/post/${id}`)
    },

    editPost(id) {
      this.$router.push(`/admin/edit/${id}`)
    },

    deletePost(id) {

    }
  }
};
</script>

<style lang="css">
</style>
