<template>
  <div>
    <Forum :forum="forum" />
    <v-card color="white" class="forum-card">
      <div v-show="showResponses">
        <Response
          v-for="response in responses"
          v-bind:key="response.id"
          v-bind:response="response"
          v-bind:forum="forum"
        />
      </div>
      <div class="text-center">
        <v-progress-circular :size="50" color="amber" indeterminate v-show="loading"></v-progress-circular>
      </div>
      <div class="write-response">
        <v-container>
          <v-row>
            <v-col cols="8">
              <Reply :forum="forum" @responded="getMoreResponses" />
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-card>
  </div>
</template>
<script>
import Forum from "../components/Forum";
import Response from "../components/Response";
import Reply from "../components/Reply";

export default {
  name: "ForumPage",
  components: {
    Reply,
    Forum,
    Response
  },
  data: () => ({
    loading: false,
    showResponses: false,
    forum: null,
    responses: []
  }),
  mounted: async function() {
    this.loading = true;
    await this.axios
      .all([
        this.axios.get("/forums/" + this.$route.params.id),
        this.axios.get("forums/" + this.$route.params.id + "/responses")
      ])
      .then(
        this.axios.spread((forum, responses) => {
          this.forum = forum.data.forum;
          this.responses = responses.data.responses;
        })
      );
    this.loading = false;
    this.showResponses = true;
  },
  methods: {
    getMoreResponses: async function() {
      await this.axios
        .get("forums/" + this.$route.params.id + "/responses")
        .then(response => {
          this.responses = response.data.responses;
        });
    }
  }
};
</script>

<style scoped>
.forum-card {
  margin: 3rem 0 0;
}

.footer {
  height: 10rem;
}
</style>