<template>
  <v-app-bar class="nav-bar">
    <v-toolbar-title>
      <router-link class="toolbar-title" to="/">Page title</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-show="$store.state.auth.auth">
      <v-badge class="nav-item">
        <template v-slot:badge>
          <div v-if="notificationBadge">{{notificationCount}}</div>
        </template>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn text icon color="grey">
              <v-icon v-on="on">mdi-bell</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="n of 5" :key="n">
              <v-list-item-title>通知の内容を記述していく</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-badge>
      <v-btn class="nav-item-button" @click="logout" width="100px" outlined color="primary">ログアウト</v-btn>
    </div>
    <v-btn text icon color="grey" to="/forums/create">
      <v-icon >mdi-pencil</v-icon>
    </v-btn>
    <div v-show="!$store.state.auth.auth">
      <v-btn class="nav-item-button" to="/login" width="100px" outlined color="primary">ログイン</v-btn>
      <v-btn class="nav-item-button" to="/register" width="100px" depressed color="primary">登録</v-btn>
    </div>
  </v-app-bar>
</template>
<script>
  export default {
    name: "Navbar",
    data: () => ({
      notificationBadge: false,
      notificationCount: "99+"
    }),
    methods: {
      logout: async function () {
        await this.axios.get("/logout");
        this.$store.commit("auth/setAuth", false);
      }
    }
  };
</script>
<style scoped>
  .nav-item {
    margin: 30px;
  }

  .nav-item-button {
    margin: 5px;
  }

  .toolbar-title {
    color: inherit;
    text-decoration: inherit;
  }
</style>