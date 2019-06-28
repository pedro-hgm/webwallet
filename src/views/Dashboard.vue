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
          <CurrentBalance v-if="hasAccount"/>
        </v-flex>
        <v-flex xs12 sm6 md4 lg3>
          <CurrentIncomes v-if="hasAccount"/>
        </v-flex>
        <v-flex xs12 sm6 md4 lg3>
          <CurrentExpenses v-if="hasAccount"/>
        </v-flex>
      </v-layout>
    </div>

    <NewIncome v-if="hasAccount" @activateSnackbar="Snackbar"/>
    <NewExpense v-if="hasAccount" @activateSnackbar="Snackbar"/>
    <NewAccount @activateSnackbar="Snackbar"/>
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

export default {
  name: "Dashboard",
  components: {
    NewAccount,
    NewExpense,
    NewIncome,
    CurrentBalance,
    CurrentIncomes,
    CurrentExpenses
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

// TODO: the pages (routes) of the app:
// I thinking of the following main pages:
// * dashboard - work in progress:
// basically missing the charts
// * accounts - not created yet:
// a place to see and manage all your accounts
// * reports - not created yet:
//the place where the user data is displayed in charts
// * cycles - completed:

// TODO: think about the possibility of moving the snackbar utility
// to the navbar, therefore using it in other places of the app than only
// dashboard. This can be done by changing the activation by events for
// state properties, getters, mutations, etc

// TODO: adjust the navbar for smaller screens

// TODO: think about changing the color pallet for some components, like using more pale colors to match the greyish of the app in general

// TODO: time ? study more about axios and async/await : move on

// ! last but not least, be aware of the power of computed properties
</script>

<style>
</style>
