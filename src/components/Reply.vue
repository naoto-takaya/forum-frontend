<template>
  <div class="reply">
    <v-form v-model="valid" @submit.prevent="submitReply">
      <div class="content">
        <v-textarea name="input-7-1" hint="Hint text" class="text-field" v-model="content"></v-textarea>
      </div>
      <div class="under-area">
        <div class="underline"></div>
        <v-btn
          depressed
          color="primary"
          type="submit"
          class="button"
          :disabled="!activateSubmit"
        >送信
        </v-btn>
      </div>
    </v-form>
  </div>
</template>
<script>
  export default {
    name: "Reply",
    data: () => ({
      content: ""
    }),
    props: {
      response: {
        type: Object
      }
    },
    computed: {
      activateSubmit() {
        const content_string = this.content.trim();
        return content_string.length > 0;
      }
    },
    methods: {
      submitReply: async function () {
        this.$emit("replied");
        await this.axios
          .post("/responses",
            {content: this.content, forum_id: this.response.forum_id, response_id: this.response.id})
          .then(response => {
            this.responses = response.data;
          });
        this.content = "";
      }
    }
  };
</script>
<style scoped>
  .reply {
    margin: 1rem;
    border: 0.08rem solid grey;
    border-radius: 0.4rem;
    width: 100%;
    overflow: hidden;
  }

  .reply .content {
    margin: 1.5rem;
  }

  .reply .under-area {
    background-color: #efebeb;
    text-align: right;
  }

  .reply .under-area .button {
    margin-bottom: 0.4rem;
    margin-right: 0.4rem;
  }

  .reply .underline {
    border-top: 0.05rem solid grey;
    margin-bottom: 0.4rem;
  }

  .text-field {
  }
</style>