<template name="fade">
  <div>
        <Forum v-for="forum in forums" :forum="forum" v-bind:key="forum.id" />
  </div>
</template>

<script>
import Forum from "./Forum";
export default {
  name: "Home",
  components: {
    Forum
  },
  data: () => ({
    forums: null
  }),
  created: async function() {
    await this.axios.get("/forums").then(response => {
      this.forums = response.data.forums.data;
    });
  }
};
</script>

<style scoped>
</style>