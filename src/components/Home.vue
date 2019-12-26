<template name="fade">
  <v-container class="container">
    <v-row>
      <v-col col="12" lg="10" xl="8">
        <Forum v-for="forum in forums" :forum="forum" v-bind:key="forum.id" />
      </v-col>
    </v-row>
  </v-container>
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
    await this.axios.get("http://localhost:3000/forums").then(response => {
      this.forums = response.data;
    });
  }
};
</script>

<style scoped>
</style>