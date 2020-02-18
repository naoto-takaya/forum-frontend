<template>
  <div class="reset-mail">
    <h1>パスワード再設定用のメールを送信する</h1>
    <p class="description">登録したメールアドレスにパスワード再設定用メールアドレスを送信します。</p>
    <v-form @submit.prevent="sendPasswordResetMail" ref="mailForm">
      <v-text-field
        v-model="email"
        :rules="emailRules"
        outlined
        label="メールアドレス"
        prepend-icon="mdi-email"
        required
        class="mail-form"
      ></v-text-field>
      <div class="submit-result">
        <v-btn
          v-show="!submitSendMail"
          class="submit white--text"
          type="submit"
          color="#ffc107"
          width="150"
          :disabled="disableSubmit"
        >
          送信
        </v-btn>
          <v-progress-circular
            :size="50"
            color="amber"
            indeterminate
            v-show="sendingMail"
          ></v-progress-circular>
        <p v-show="sentMail" class="result-message">{{resultMessage}}</p>
      </div>
    </v-form>
  </div>
</template>
<script>
  export default {
    name: "PasswordSendMail",
    data: () => ({
      email: null,
      emailRules: [
        value => !!value || "メールアドレスを入力してください",
        value => /.+@.+/.test(value) || "メールアドレスの形式に誤りがあります"
      ],
      resultMessage: 'メールの送信に成功しました。',
      disableSubmit: true,
      submitSendMail:false,
      sendingMail:false,
      sentMail: false,
    }),
    updated() {
      this.disableSubmit = !(this.$refs.mailForm.validate());
    },
    methods: {
      sendPasswordResetMail: async function () {
        this.submitSendMail = true;
        this.sendingMail = true;
        await this.axios.post("/password/reset_mail", {email: this.email})
          .then(result => {
            this.resultMessage = result.data.message;
          }).catch();
        this.sendingMail = false;
        this.sentMail = true;
      },
    }
  };
</script>

<style scoped>
  .reset-mail h1 {
    font-size: 1.3rem;
    color: #455a64;
    margin: 2rem 0 0;
  }
  .reset-mail .description{
    font-size: 0.8rem;
    color: #455a64;
    margin: 1rem 0 0;
  }

  .reset-mail .mail-form {
    margin: 2rem 0 0;
    height: 10rem;
  }

  .reset-mail .submit {
    margin: 2rem 0 0;
  }
  .submit-result{
    text-align: center;
  }
  .reset-mail .result-message {
    text-align: center;
    color: #455a64;
  }
</style>
