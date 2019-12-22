<template>
  <v-container class="container">
    <v-row v-for="n of 5" :key="n">
      <v-col cols="lg-10">
        <Forum />
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
  }
};
</script>

<style scoped>
</style>