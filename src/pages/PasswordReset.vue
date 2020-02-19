<template>
  <div class="reset-password">
    <h1>パスワードを新しく設定する</h1>
    <p class="description">新しく使用するパスワードを入力してください</p>
    <v-form @submit.prevent="passwordReset" ref="passwordForm">
      <v-text-field
        class="password-form"
        v-model="password"
        :rules="passwordRules"
        outlined
        label="パスワード"
        prepend-icon="mdi-key-variant"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        required
      ></v-text-field>
      <div class="submit-result">
        <v-btn
          v-show="!submitPasswordReset"
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
          v-show="resettingPassword"
        ></v-progress-circular>
        <p v-show="resetPassword" class="result-message">{{resultMessage}}</p>
      </div>
    </v-form>
  </div>
</template>
<script>
  export default {
    name: "PasswordReset",
    data: () => ({
      password: null,
      showPassword: false,
      passwordRules: [
        value => !!value || "パスワードは必須です",
        v => v.length >= 6 || "パスワードは6文字以上必要です"
      ],
      resultMessage: '',

      disableSubmit: true,
      submitPasswordReset: false,
      resettingPassword: false,
      resetPassword: false,
    }),
    updated() {
      this.disableSubmit = !(this.$refs.passwordForm.validate());
    },
    methods: {
      passwordReset: async function () {
        this.submitPasswordReset = true;
        this.resettingPassword = true;
        await this.axios.put("/password/reset/",
          {email: this.$route.query.email, password: this.password, token: this.$route.params['token']})
          .then(result => {
            this.resultMessage = result.data.message;
          }).catch();
        this.resettingPassword = false;
        this.resetPassword = true;
      },
    }
  };
</script>

<style scoped>
  .reset-password h1 {
    font-size: 1.3rem;
    color: #455a64;
    margin: 2rem 0 0;
  }

  .reset-password .description {
    font-size: 0.8rem;
    color: #455a64;
    margin: 1rem 0 0;
  }

  .reset-password .password-form {
    margin: 2rem 0 0;
    height: 10rem;
  }

  .reset-password .submit {
    margin: 2rem 0 0;
  }

  .submit-result {
    text-align: center;
  }

  .reset-password .result-message {
    text-align: center;
    color: #455a64;
  }
</style>
