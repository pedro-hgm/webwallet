<template>
  <v-container>
    <v-snackbar v-model="snackbar.value" :timeout="6000" top :color="snackbar.color">
      <span>{{ snackbar.message }}</span>
      <v-btn color="white" flat @click="snackbar.value = false">Close</v-btn>
    </v-snackbar>
    <div class="dashboard">
      <h2>Dashboard</h2>
      <p v-if="!hasAccount">Looks like you don't have an account yet, let's create one to start!</p>

      <p>{{ this.user.email }}</p>
      <NewIncome v-if="hasAccount" @activateSnackbar="Snackbar"/>
      <NewExpense v-if="hasAccount" @activateSnackbar="Snackbar"/>
      <NewAccount @activateSnackbar="Snackbar"/>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import NewAccount from "@/components/accounts/NewAccount.vue";
import NewExpense from "@/components/accounts/NewExpense.vue";
import NewIncome from "@/components/accounts/NewIncome.vue";

export default {
  name: "Dashboard",
  components: { NewAccount, NewExpense, NewIncome },
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
      user: {
        email: ""
      },
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
</script>

<style>
</style>
