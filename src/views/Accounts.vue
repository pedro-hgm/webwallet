<template>
  <div id="accounts">
    <v-container class="my-5">
      <v-layout justify-center row wrap>
        <v-flex xs12>
          <h1 class="display-1 grey--text mb-5 text-xs-center">My Accounts</h1>
        </v-flex>
      </v-layout>
      <v-expansion-panel inset expand>
        <v-expansion-panel-content v-for="(account,index) in accounts" :key="index">
          <template v-slot:header>
            <div class="subheading">{{account.name}}</div>
          </template>
          <v-card>
            <v-layout justify-center row wrap class="pa-3">
              <v-flex xs12 md2>
                <div class="caption grey--text ml-2">Balance</div>
                <div class="ml-2">$ {{account.balance}}</div>
              </v-flex>
              <v-flex xs12 sm2>
                <div class="caption grey--text ml-2">Type</div>
                <div class="ml-2">{{account.kind}}</div>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs12 sm1>
                <UpdateAccount :name="account.name" :kind="account.kind" :id="account.id" />
              </v-flex>
            </v-layout>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
import UpdateAccount from "@/components/accounts/UpdateAccount.vue";
export default {
  name: "Accounts",
  components: { UpdateAccount },
  data() {
    return {};
  },
  methods: {
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (vm.$store.getters.userLogin === true) {
          next();
        } else {
          next({ name: "home" });
        }
      });
    }
  },
  computed: {
    accounts() {
      return this.$store.getters.getAccounts;
    }
  }
};
</script>

<style scoped>
</style>
