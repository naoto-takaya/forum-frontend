<template>
  <div>
        <Forum :forum="forum"/>
        <v-card color="white" class="forum-card">
          <div v-show="showResponses">
            <Response
              v-for="response in responses"
              v-bind:key="response.id"
              v-bind:response="response"
              @replied="getResponse"
            />
          </div>
          <div class="text-center">
            <v-progress-circular
              :size="50"
              color="amber"
              indeterminate
              v-show="$store.state.loading.loading"
            ></v-progress-circular>
          </div>
          <div class="write-response">
            <v-container>
              <v-row>
                <v-col cols="8">
                  <Reply :forum="forum"/>
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
    props: {
      forum: {
        type: Object
      },
      response: {
        type: Object
      }
    },
    data: () => (
      {
        showResponses: false,
      }
    ),
    mounted: async function () {
      this.$store.commit("loading/setLoading", true);
      await this.axios.all(
        [this.axios.get("/forums/" + this.$route.params.id),
          this.axios.get("forums/" + this.$route.params.id + "/responses")
        ]).then(this.axios.spread((forum, responses) => {
          this.forum = forum.data.forum;
          this.responses = responses.data.responses;
        }
        )
      );
      this.$store.commit("loading/setLoading", false);
      this.showResponses = true;
    },
  };
</script>

<style scoped>
  .forum-card{
    margin: 3rem 0 0;
  }
  .footer {
    height: 10rem;
  }
</style>