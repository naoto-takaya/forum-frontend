<template>
  <div class="response d-flex flex-no-wrap">
    <div class="boarder" :class="response.sentiment"></div>
    <div class="content">
      <span class="user-name">{{response.user_name}}</span>
      <v-icon color="#BDBDBD" class="up" small @click="likeButton">mdi-thumb-up</v-icon>
      <span>{{response.like_count}}</span>
      <p class="text">{{response.content}}</p>
      <div class="option">
        <v-btn @click="moreReply" small text color="grey" v-if="response.replies">...</v-btn>
        <v-btn @click="writeReply = !writeReply" small text color="grey">返信</v-btn>
      </div>
      <transition name="fade">
        <div v-show="writeReply" class="write-reply">
          <v-container>
            <v-row>
              <v-col cols="sm-8">
                <Reply @replied="submittedReply" />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </transition>
      <transition name="fade">
        <div v-show="hideReply" class="reply">
          <Response v-for=" reply in response.replies" :response="reply" v-bind:key="reply.id" />
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
    hideReply: false,
    count: 0,
    writeReply: false
  }),
  props: {
    response: {
      type: Object
    }
  },
  methods: {
    moreReply: function() {
      this.hideReply = !this.hideReply;
    },
    countUp: function() {
      this.count++;
    },
    likeButton: function() {
      this.response.liked = !this.response.liked;
      if (this.response.liked) {
        this.response.like_count++;
      } else {
        this.response.like_count--;
      }
    },
    submittedReply: function() {
      this.writeReply = !this.writeReply;
      this.$emit("replied");
    }
  }
};
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

.response .boarder.natural {
  border-left: 0.15rem solid #c5e1a5;
  border-radius: 5px;
}
.response .boarder.negative {
  border-left: 0.15rem solid #d1c4e9;
  border-radius: 5px;
}
.response .boarder.positive {
  border-left: 0.15rem solid #fff59d;
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