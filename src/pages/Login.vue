<template>
  <v-container class="container">
    <v-row justify="center">
      <v-col cols="lg-6">
        <p class="font-weight-bold">ログイン</p>
      </v-col>
    </v-row>
    <v-form ref="form" @submit.prevent="login">
      <v-row justify="center">
        <v-col cols="lg-6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            outlined
            label="メールアドレス"
            prepend-icon="mdi-email"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="lg-6">
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
        </v-col>
      </v-row>
      <div v-show="showForm">
        <v-row justify="center">
          <v-col cols="lg-6">
            <v-btn x-large class="login-button" type="submit" color="primary">ログイン</v-btn>
            <span class="font-weight-thin thin-word">
              <router-link class="link" to="/">パスワードを忘れた場合</router-link>
            </span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="lg-6">
            <v-btn x-large class="login-button white--text" type="submit" color="grey">
              かんたんログイン
              <v-icon>mdi-incognito</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <v-row justify="center">
        <v-col cols="lg-6">
          <div class="text-center">
            <v-progress-circular
              :size="50"
              color="amber"
              indeterminate
              v-show="$store.state.loading.loading"
            ></v-progress-circular>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
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
        v => v.length >= 8 || "パスワードは8文字以上必要です"
      ]
    }),
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