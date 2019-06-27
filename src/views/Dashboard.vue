<template>
  <v-container>
    <v-snackbar v-model="snackbar.value" :timeout="6000" top :color="snackbar.color">
      <span>{{ snackbar.message }}</span>
      <v-btn color="white" flat @click="snackbar.value = false">Close</v-btn>
    </v-snackbar>
    <div class="ml-5 mt-4">
      <p v-if="!hasAccount">Looks like you don't have an account yet, let's create one to start!</p>
      <v-layout row wrap class="ml-5">
        <v-flex xm12 lg4>
          <CurrentBalance v-if="hasAccount"/>
        </v-flex>
        <v-flex xm12 lg4>
          <CurrentIncomes v-if="hasAccount"/>
        </v-flex>
        <v-flex xm12 lg4>
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

// TODO: complete the logic for managing current and older cycles, and the logic for ending one.

// TODO: adjust the component to create a cycle to reflect the changes done in te logic of it

// TODO: update the other forms to use the same layout as the cycle's form

// TODO: change the income/expense form to us v-select

// TODO: validate all the forms using v-select

// TODO: show in the dashboard top part three cards:

// TODO: the pages (routes) of the app:
// I thinking of the following main pages:
// * dashboard - work in progress:
// basically missing the things said above
// and some UX, UI adjustments like links, icons, etc
// * accounts - not created yet:
// a place to see and manage all your accounts
// * reports - not created yet:
//the place where the user data is displayed in charts
// * cycles - work in progress:
// a place to manage and see all of your cycles,
// the current and the previous
// here you can end a cycle by clicking a button who fires a function
// that set the last cycle in your database to false
// therefore it should also update the state in some way
// here the user should also be able to create a new cycle
// since the component for creating a new one should be present
// in more than one route, it should be made in a way that is possible to
// be nested in multiple components,
// but it only should show up in the dashboard if the user has no cycle
// or at least no active one
// also an user shouldn't be able to create a new cycle if he has an active
// cycle already, because if he does, than once i try to get the current
// cycle to display on the dashboard, it would mess the things up

// TODO: think about the possibility of moving the snackbar utility
// to the navbar, therefore using it in other places of the app than only
// dashboard. This can be done by changing the activation by events for
// state properties, getters, mutations, etc

// TODO: adjust the navbar for smaller screens

// ! last but not least, be aware of the power of computed properties
</script>

<style>
</style>
