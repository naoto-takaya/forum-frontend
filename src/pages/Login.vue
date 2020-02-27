<template>
  <div>
    <p class="font-weight-bold">ログイン</p>
    <v-form @submit.prevent="login" ref="loginForm">
      <v-text-field
        v-model="email"
        :rules="emailRules"
        outlined
        label="メールアドレス"
        prepend-icon="mdi-email"
        required
      ></v-text-field>
      <v-text-field
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
      <p class="login-result" v-show="loginResult">{{loginResult}}</p>
      <div class="login-link" v-show="showForm">
        <v-btn
          class="login-button"
          large
          type="submit"
          color="primary"
          :disabled="disableLogin"
        >ログイン</v-btn>
        <br />
        <v-btn class="login-button white--text" large type="submit" color="grey">
          かんたんログイン
          <v-icon>mdi-incognito</v-icon>
        </v-btn>
        <p class="font-weight-thin thin-word">
          <router-link class="link" to="/password_send_mail">パスワードを忘れた場合</router-link>
        </p>
      </div>
      <div class="text-center">
        <v-progress-circular :size="50" color="amber" indeterminate v-show="loading"></v-progress-circular>
      </div>
    </v-form>
  </div>
</template>
<script>
export default {
  name: "Login",
  data: () => ({
    showForm: true,
    email: null,
    password: null,
    showPassword: false,
    loginResult: "",
    emailRules: [
      value => !!value || "メールアドレスは必須です",
      value => /.+@.+/.test(value) || "メールアドレスの形式に誤りがあります"
    ],
    passwordRules: [value => !!value || "パスワードは必須です"],
    disableLogin: true,
    loading: false
  }),
  updated() {
    this.disableLogin = !this.$refs.loginForm.validate();
  },
  methods: {
    login: async function() {
      this.showForm = false;
      this.loading = true;
      await this.axios
        .post("/login", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.$store.commit("user/setAuth", response.data);
          this.loading = false;
          this.$router.push("/");
        })
        .catch(err => {
          this.loading = false;
          this.showForm = true;
          this.loginResult = err.response.data.message;
        });
    }
  }
};
</script>

<style scoped>
.link {
  font-size: 80%;
  text-decoration: inherit;
}

.login-button {
  margin-top: 1rem;
  width: 15rem;
}

.login-link {
  margin-top: 1rem;
  margin-left: 2rem;
}
.login-result {
  height: 2rem;
  margin-top: 1rem;
  text-align: center;
  color: #f44336;
}

.thin-word {
  margin-top: 2rem;
  margin-left: 3rem;
}

.container {
  margin-top: 5rem;
}
</style>