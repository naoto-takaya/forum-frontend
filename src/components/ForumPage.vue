<template>
  <v-container class="container">
    <v-row>
      <v-col cols="lg-10">
        <Forum />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Forum from "./Forum";
export default {
  name: "FooterPage",
  components: {
    Forum
  },
  data: () => ({})
};
</script>

<style scoped>
.footer {
  height: 10rem;
}
</style>