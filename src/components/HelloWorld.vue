<template>
  <div class="hello">
    <h2>Essential Links</h2>
    <form @submit.prevent="createForum">
      <input type="text" id="title" v-model="param" />
      <button type="submit">submit</button>
      <div class="text-center">
        <v-badge>
          <template v-slot:badge>0</template>
          <v-icon>mdi-email</v-icon>
        </v-badge>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      param: null
    };
  },
  methods: {
    async createForum() {
      // const res = await this.axios.get("http://localhost/test");
      const response = await this.axios.post("http://localhost/forums", {
        title: this.param
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
