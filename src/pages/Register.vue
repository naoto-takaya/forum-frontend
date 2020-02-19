<template>
  <div>
    <p class="font-weight-bold">登録</p>
    <v-form ref="form" @submit.prevent="register">
      <v-text-field v-model="name" outlined label="名前" required></v-text-field>
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
      <v-text-field
        v-model="passwordConfirm"
        :rules="passwordConfirmRules"
        outlined
        label="パスワードの確認"
        prepend-icon="mdi-key-variant"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        required
      ></v-text-field>
      <v-btn x-large class="loginbutton" type="submit" color="primary">登録</v-btn>
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
    name: "Register",
    data: function () {
      return {
        showForm: true,
        mailaddress: null,
        password: null,
        showPassword: false,
        emailRules: [
          value => !!value || "メールアドレスは必須です",
          value => /.+@.+/.test(value) || "メールアドレスの形式に誤りがあります"
        ],
        passwordRules: [
          value => !!value || "パスワードは必須です",
          v => v.length >= 6 || "パスワードは6文字以上必要です"
        ],
        passwordConfirmRules: [
          value => !!value || "パスワードは必須です",
          v => v === this.password || "パスワードが異なります"
        ]
      };
    },
    methods: {
      register: async function () {
        this.showForm = false;
        this.$store.commit("loading/setLoading", true);
        await this.axios.post("/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirm
        });
        await this.sleep(1); //TODO: loginApiを呼び出す
        this.$store.commit("loading/setLoading", false);
        this.$store.commit("auth/setAuth", true);
        this.loginSuccess = true;
        this.$router.push("/");
      },
      printHoge: () => {
        this.console.log("hoge");
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

  .loginbutton {
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