<template>
  <div>
    <v-card height="80px" max-width="250px">
      <v-layout justify-space-around row wrap>
        <v-flex xm6 class="my-2 ml-4">
          <v-btn large flat icon color="blue">
            <v-icon color="blue" large>account_balance_wallet</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xm6 class="my-3 mr-4">
          <h3 class="subheading grey--text">Current Balance:</h3>
          <h3 class="blue--text">$ {{ currentBalance }}</h3>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "currentBalance",
  data() {
    return {};
  },
  computed: {
    currentBalance() {
      const accounts = this.$store.getters.getAccounts;
      let currentBalance = 0.0;
      for (const account of accounts) {
        currentBalance += parseFloat(account.balance);
      }
      return currentBalance;
    }
  }
};
</script>

<style scoped>
</style>
