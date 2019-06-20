<template>
  <div class="dashboard">
    <v-container my-5>
      <v-layout row wrap justify-space-around>
        <v-flex xs12 md4>
          <h1 class="display-2 ma-4">The best way to manage your financial life</h1>
          <Popup/>
        </v-flex>
        <v-flex xs12 md6>
          <v-img class="ma-4" src="undraw_wallet_aym5.svg" alt="wallet"></v-img>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Popup from "@/components/Popup.vue";
export default {
  components: {
    Popup
  }
};
</script>
