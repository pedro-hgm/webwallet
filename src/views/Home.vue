<template>
  <div class="dashboard">
    <v-container my-5>
      <v-layout row wrap justify-space-around>
        <v-flex xs12 md4>
          <h3 class="display-2 ma-4">The best way to manage your financial life.</h3>
          <h4
            class="display-1 ma-4 grey--text"
          >Tired of complicated apps and just want something easy to go up and running? Sign up for free.</h4>
          <Signup/>
        </v-flex>
        <v-flex xs12 md6>
          <v-img class="ma-4" src="undraw_wallet_aym5.svg" alt="wallet"></v-img>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Signup from "@/components/user/Signup.vue";
export default {
  components: {
    Signup
  }
};
</script>
