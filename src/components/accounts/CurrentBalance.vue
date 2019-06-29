<template>
  <v-card class="text-xs-center ma-3 my-card">
    <v-card-text>
      <v-layout row wrap>
        <v-flex xm6>
          <v-icon large color="#5C6BC0" class="mb-2">account_balance_wallet</v-icon>
        </v-flex>
        <v-flex xm6>
          <h3 class="subheading grey--text">Current Balance:</h3>
          <div class="subheading text">$ {{ currentBalance }}</div>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
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
.my-card {
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.7);
}
.text {
  color: #5c6bc0;
}
</style>
