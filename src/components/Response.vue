<template>
  <div class="response d-flex flex-no-wrap">
    <div class="boarder"
         :class="{positive : response.sentiment === 1, negative: response.sentiment === 2, newtral:response.sentiment === 3, mixed:response.sentiment === 4}">
    </div>
    <div class="content">
      <span class="user-name">{{response.user_name}}</span>
      <v-icon color="#BDBDBD">{{sentimentIcon}}</v-icon>
      <p class="text">{{response.content}}</p>
      <div class="option">
        <v-btn @click="getReplies" small text color="grey">{{response.replies_count}}件の返信</v-btn>
        <v-btn @click="writeReply = !writeReply" small text color="grey">返信</v-btn>
      </div>
      <transition name="fade">
        <div v-show="writeReply" class="write-reply">
          <v-container>
            <v-row>
              <v-col cols="sm-8">
                <Reply :response="response" :forum="forum" @replied="submittedReply"/>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </transition>
      <transition name="fade">
        <div v-show="hideReply" class="reply">
          <Response v-for=" reply in response.replies" :response="reply" :forum="forum" v-bind:key="reply.id"/>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  import Response from "./Response";
  import Reply from "./Reply";

  export default {
    name: "Response",
    components: {
      Response,
      Reply
    },
    data: () => ({
      count: 0,
      writeReply: false,
      hideReply: false,
    }),
    props: {
      response: {
        type: Object
      },
      forum:{
        type: Object
      }
    },
    computed: {
      sentimentIcon: function () {
        let emoji = "";
        switch (this.response.sentiment) {
          case 1:
            emoji = "mdi-emoticon-excited-outline";
            break;
          case 2:
            emoji = "mdi-emoticon-dead-outline";
            break;
          case 3:
            emoji = "mdi-emoticon-outline";
            break;
          case 4:
            emoji = "mdi-emoticon-confused-outline";
            break;
        }
        return emoji;
      }
    },
    methods: {
      getReplies: async function () {
        if (!this.response.replies) {
          await this.axios.get("/responses/" + this.response.id + "/replies").then(result => {
            this.response.replies = result.data.replies;
          });
        }
        this.hideReply = !this.hideReply;
      },
      submittedReply: function () {
        this.writeReply = !this.writeReply;
        this.$emit("replied");
      },

    }
  }
  ;
</script>

<style scoped>
  .response {
    padding: 1rem 0;
  }

  .response .text {
    font-size: 0.95rem;
  }

  .response .content {
    margin-left: 2rem;
    width: 100%;
  }

  .response .option {
    margin-left: 1rem;
    color: #bdbdbd;
  }


  .response .boarder.positive {
    border-left: 0.15rem solid #fff59d;
    border-radius: 5px;
  }

  .response .boarder.negative {
    border-left: 0.15rem solid #d1c4e9;
    border-radius: 5px;
  }

  .response .boarder.newtral {
    border-left: 0.15rem solid #c5e1a5;
    border-radius: 5px;
  }

  .response .boarder.mixed {
    border-left: 0.15rem solid #dfa0ff;
    border-radius: 5px;
  }

  .user-name {
    color: #ffc107;
    font-size: 0.9rem;
  }

  .fade-leave-active {
    transition: opacity 0.2s;
  }

  .fade-enter-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>