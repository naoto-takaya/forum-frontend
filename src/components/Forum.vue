<template>
  <router-link class="forum-link" to="/forum">
    <v-card color="white" class="forum-card">
      <div class="d-flex flex-no-wrap">
        <v-img class="white--text thumnale" max-width="6rem" max-height="6rem" :src="forum.image"></v-img>
        <span class="title">{{forum.title}}</span>
      </div>
    </v-card>
  </router-link>
</template>
<script>
export default {
  name: "Forum",
  props: {
    forum: {
      type: Object
    }
  }
};
</script>

<style scoped>
.forum-card {
  padding: 2rem;
}
.forum-link {
  color: inherit;
  text-decoration: inherit;
}
.thumnale {
  width: 8rem;
  height: 8rem;
}
.title {
  padding-left: 2rem;
}
</style>