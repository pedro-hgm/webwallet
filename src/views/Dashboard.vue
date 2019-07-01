<template>
  <v-container>
    <v-snackbar v-model="snackbar.value" :timeout="6000" top :color="snackbar.color">
      <span>{{ snackbar.message }}</span>
      <v-btn color="white" flat @click="snackbar.value = false">Close</v-btn>
    </v-snackbar>
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
                <NewAccount @activateSnackbar="Snackbar" />
              </v-flex>
              <v-flex class="mx-1" xs4>
                <NewIncome v-if="hasAccount" @activateSnackbar="Snackbar" />
              </v-flex>
              <v-flex class="mx-1" xs4>
                <NewExpense v-if="hasAccount" @activateSnackbar="Snackbar" />
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
            if (res.status === 200) {
              this.$store.commit("setAccount", res.data);
            }
          })
          .catch(err => console.log(err));
      }
    },
    requestCategories() {
      axios
        .get(`http://localhost:3000/categories`)
        .then(res => {
          if (res.status === 200) {
            this.$store.commit("setCategories", res.data);
          }
        })
        .catch(err => console.log(err));
    },
    Snackbar(payload) {
      this.snackbar = payload;
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

// * Review the data atualization when something changes. This check must be done for all components. There are a lot of stuff to fix, like the creation of new expenses and incomes and the update in the dashboard, accounts etc and a lot more

// TODO: the pages (routes) of the app:
// I thinking of the following main pages:
// * dashboard - work in progress:
// basically missing the charts
// the charts should be some sort of overwall summary
// maybe instead of repeating the cards from the cycle, the current elements could be an chart with the current balance and the monthly incomes/expenses
// * accounts - work in progress
// just missing the ability to delete accounts,
// the problem is how this action is going to affect other components that work with accounts
// * reports - work in progress:
//the expenses by categories chart is already created, maybe can see some improvements
// missing the creation of the other charts
// * cycles - completed:

// * home - completed:
// some has to be done about a logged user being able to enter the home and theregfore seeing the signup buttom. Also the requests for routes that aren't attended should be fixed

// TODO: think about the possibility of moving the snackbar utility
// to the navbar, therefore using it in other places of the app than only
// dashboard. This can be done by changing the activation by events for
// state properties, getters, mutations, etc

// TODO: adjust the navbar for smaller screens

// TODO: update the cycles page with the layout changes from the dashboard

// TODO: time ? study more about axios and async/await : move on

// ! last but not least, be aware of the power of computed properties
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
