<template>
  <v-app>
    <v-content>
      <Navbar/>
      <transition name="fade" mode="”out-in”">
        <v-container class="container">
          <v-row>
            <v-col
              cols="12"
              sm="10"
              lg="8"
              offset-lg="2"
              offset-sm="1"
            >
              <router-view/>
            </v-col>
          </v-row>
        </v-container>
      </transition>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
  import Navbar from "./components/Navbar";
  import Footer from "./components/Footer";

  export default {
    name: "App",

    components: {
      Navbar,
      Footer
    },

    data: () => ({
      //
    })
  };
</script>
<style scoped>
  .fade-enter-active {
    transition-duration: 0.8s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>