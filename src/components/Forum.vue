<template>
  <router-link class="forum-link" v-bind:to="{ name: 'forums', params : { id: forum.id }}">
    <v-card color="white" hover class="forum-card">
      <div class="d-flex flex-no-wrap">
        <v-img class="white--text thumbnail"
               max-width="6rem" max-height="6rem"
               :src="thumbnail"
        ></v-img>
        <span class="title">{{forum.title}}</span>
      </div>
    </v-card>
  </router-link>
</template>
<script>
  export default {
    name: "Forum",
    data: function () {
      return {
        bucketUrl: process.env.VUE_APP_AWS_S3_URL
      }
    },
    computed: {
      thumbnail: function () {
        return this.forum.images[0] ?
          this.bucketUrl + '/' + this.forum.images[0].name : "https://placehold.jp/150x150.png";
      },
    },
    props: {
      forum: {
        type: Object
      }
    }
  };
</script>

<style scoped>
  .forum-card {
    padding: 2rem;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    margin: 1rem 0 0;
  }

  .forum-link {
    color: inherit;
    text-decoration: inherit;
  }


  .thumbnail {
    width: 8rem;
    height: 8rem;
  }

  .title {
    padding-left: 2rem;
    color: #37474f;


  }
</style>