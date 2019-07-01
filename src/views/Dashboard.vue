<template>
  <v-container>
    <div class="mt-1">
      <p v-if="!hasAccount">Looks like you don't have an account yet, let's create one to start!</p>
      <v-layout justify-space-around row wrap>
        <v-flex xs12 sm6 md4 lg3>
          <CurrentBalance v-if="hasAccount" />
        </v-flex>
        <v-flex xs12 sm6 md4 lg3>
          <CurrentIncomes v-if="hasAccount" />
        </v-flex>
        <v-flex xs12 sm6 md4 lg3>
          <CurrentExpenses v-if="hasAccount" />
        </v-flex>
      </v-layout>
    </div>

    <v-layout justify-space-around row wrap class="my-5">
      <v-flex xs12 md5 class="mb-3">
        <Balance />
      </v-flex>
      <v-flex xs12 md5 class="mb3">
        <Categories />
      </v-flex>
    </v-layout>

    <v-layout class="btns" justify-space-around row wrap>
      <v-spacer></v-spacer>
      <v-flex xs7 md3>
        <v-card class="text-xs-center my-card">
          <v-card-text>
            <v-layout class="mb-1" row>
              <v-flex class="mx-1" xs4>
                <NewAccount />
              </v-flex>
              <v-flex class="mx-1" xs4>
                <NewIncome v-if="hasAccount" @newIncome="requestAccount" />
              </v-flex>
              <v-flex class="mx-1" xs4>
                <NewExpense @newExpense="requestAccount" v-if="hasAccount" />
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-spacer></v-spacer>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import NewAccount from "@/components/accounts/NewAccount.vue";
import NewExpense from "@/components/expenses/NewExpense.vue";
import NewIncome from "@/components/incomes/NewIncome.vue";
import CurrentBalance from "@/components/accounts/CurrentBalance.vue";
import CurrentIncomes from "@/components/incomes/CurrentIncomes.vue";
import CurrentExpenses from "@/components/expenses/CurrentExpenses.vue";
import Balance from "@/components/charts/Balance.vue";
import Categories from "@/components/charts/Categories.vue";

export default {
  name: "Dashboard",
  components: {
    NewAccount,
    NewExpense,
    NewIncome,
    CurrentBalance,
    CurrentIncomes,
    CurrentExpenses,
    Balance,
    Categories
  },
  computed: {
    hasAccount() {
      let account = this.$store.getters.getAccounts;
      if (account.length) {
        return true;
      } else {
        return false;
      }
    }
  },
  data() {
    return {
      snackbar: {
        value: false,
        color: "",
        message: ""
      }
    };
  },
  methods: {
    requestAccount() {
      if (this.$store.getters.userId) {
        axios
          .get(`http://localhost:3000/accounts/${this.$store.getters.userId}`)
          .then(res => {
            this.$store.commit("setAccount", res.data);
          })
          .catch(err => console.log(err));
      }
    },
    requestCategories() {
      axios
        .get(`http://localhost:3000/categories`)
        .then(res => {
          this.$store.commit("setCategories", res.data);
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this.requestAccount();
    this.requestCategories();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$store.getters.userLogin === true) {
        next();
      } else {
        next({ name: "home" });
      }
    });
  }
};

// TODO: the pages (routes) of the app:
// I thinking of the following main pages:
// * dashboard - completed:

// * accounts - work in progress
// just missing the ability to delete accounts,
// the problem is how this action is going to affect other components that work with accounts
// * reports - work in progress:
// the future of this page is unclear since I moved the charts to the dashboard, but maybe its a god possibility to use this space to implement other functionalities like integration with other apis etc

// * cycles - completed:

// * home - completed:

// TODO: time ? study more about axios and async/await : move on
</script>

<style scoped>
.btns {
  margin-top: 5em;
}
.my-card {
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  -moz-box-shadow: 2px 2px 2px 2px #ccc;
  -webkit-box-shadow: 2px 2px 2px 2px #ccc;
  box-shadow: 2px 2px 2px 2px #ccc;
}
</style>
