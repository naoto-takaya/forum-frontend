<template>
  <router-link class="forum-link" to="/forum">
    <v-card color="white" class="forum-card">
      <div class="d-flex flex-no-wrap">
        <v-img
          class="white--text thumnale"
          width="8rem"
          max-width="8rem"
          height="8rem"
          max-height="8rem"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        ></v-img>
        <span class="title">１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０</span>
      </div>
    </v-card>
  </router-link>
</template>
<script>
export default {
  name: "Forum"
};
</script>

<style scoped>
.forum-link {
  color: inherit;
  text-decoration: inherit;
}
.title {
  margin: 1.5rem;
}
.thumnale {
  margin: 1.5rem;
  width: 8rem;
  height: 8rem;
}
</style>