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
      <div v-show="showForm">
        <v-btn x-large class="login-button" type="submit" color="primary" :disabled="disableLogin">ログイン</v-btn>
        <v-btn x-large class="login-button white--text" type="submit" color="grey">
          かんたんログイン
          <v-icon>mdi-incognito</v-icon>
        </v-btn>
        <span class="font-weight-thin thin-word">
              <router-link class="link" to="/password_send_mail">パスワードを忘れた場合</router-link>
            </span>
      </div>
      <div class="text-center">
        <v-progress-circular
          :size="50"
          color="amber"
          indeterminate
          v-show="$store.state.loading.loading"
        ></v-progress-circular>
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
      emailRules: [
        value => !!value || "メールアドレスは必須です",
        value => /.+@.+/.test(value) || "メールアドレスの形式に誤りがあります"
      ],
      passwordRules: [
        value => !!value || "パスワードは必須です",
      ],
      disableLogin: true
    }),
    updated() {
      this.disableLogin = !(this.$refs.loginForm.validate());
    },
    methods: {
      login: async function () {
        this.showForm = false;
        this.$store.commit("loading/setLoading", true);
        await this.axios.post("/login", {
          email: this.email,
          password: this.password
        });
        this.$store.commit("loading/setLoading", false);
        this.$store.commit("auth/setAuth", true);
        this.loginSuccess = true;
        this.$router.push("/");
      },
      sleep: waitSeconds => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, waitSeconds * 1000);
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
    margin-left: 2rem;
    width: 15em;
  }

  .thin-word {
    margin-left: 2rem;
  }

  .container {
    margin-top: 5rem;
  }
</style>