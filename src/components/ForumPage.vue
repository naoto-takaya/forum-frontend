<template>
  <v-container class="container">
    <v-row>
      <v-col cols="lg-10">
        <Forum :forum="forum" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="lg-10">
        <v-card color="white" class="forum-card">
          <Response
            v-for="response in responses"
            v-bind:key="response.id"
            v-bind:response="response"
            @replied="getResponse"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Forum from "./Forum";
import Response from "./Response";
export default {
  name: "FooterPage",
  components: {
    Forum,
    Response
  },
  data: () => ({ forum: null, responses: [] }),
  created: async function() {
    await this.axios.get("http://localhost:3000/forum").then(response => {
      this.forum = response.data;
    });
    await this.axios.get("http://localhost:3000/response").then(response => {
      this.responses = response.data;
    });
  },
  methods: {
    getResponse: async function() {
      await this.axios.get("http://localhost:3000/response").then(response => {
        this.responses = response.data;
      });
    }
  }
};
</script>

<style scoped>
.footer {
  height: 10rem;
}
</style>