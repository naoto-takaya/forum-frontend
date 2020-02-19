<template name="fade">
  <div>
    <Forum v-for="forum in forums" :forum="forum" v-bind:key="forum.id"/>
    <div class="next-button">
      <v-btn
        v-if="nextPageUrl"
        class="more-forms"
        :loading="loading"
        :disabled="loading"
        rounded
        width="200"
        color="normal"
        @click="nextForums"
      >
        もっと見る
      </v-btn>
    </div>
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
      forums: [],
      nextPageUrl: '',
      loading: false,
    }),
    created: async function () {
      await this.axios.get("/forums").then(response => {
        this.forums = response.data.forums.data;
        this.nextPageUrl = response.data.forums.next_page_url;
      });
    },
    methods: {
      nextForums: async function () {
        this.loading = true;
        await this.axios.get(this.nextPageUrl).then(response => {
          this.forums = this.forums.concat(response.data.forums.data);
          this.nextPageUrl = response.data.forums.next_page_url;
          this.loading = false;
        })
      }
    }
  };
</script>

<style scoped>
  .next-button {
    text-align: center;
  }
  .more-forms{
    margin: 6rem 0 0;
  }
</style>