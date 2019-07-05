<template>
  <div class="dashboard">
    <v-container class="mt-2">
      <v-layout
        row
        wrap
        justify-space-around
      >
        <v-flex
          xs12
          md4
        >
          <h3 class="display-2 ml-1 mt-1">
            The best way to manage your financial life.
          </h3>
          <h4
            class="display-1 ml-1 mt-1 grey--text"
          >
            Tired of complicated apps and just want something easy to go up and running?
          </h4>
          <Signup class="mt-5" />
        </v-flex>
        <v-flex
          xs12
          md6
        >
          <v-img
            class="ma-4"
            src="undraw_wallet_aym5.svg"
            alt="wallet"
          />
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
  },
  methods: {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$store.getters.userLogin) {
        next({ name: "dashboard" });
      } else {
        next();
      }
    });
  }
};
</script>
