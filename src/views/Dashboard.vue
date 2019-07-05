<template>
  <div id="dashboard">
    <div>
      <v-layout
        v-if="!hasAccount"
        justify-center
        row
        wrap
      >
        <v-flex xs12>
          <v-alert
            v-model="alert"
            color="blue-grey"
            outline
            dismissible
            icon="new_releases"
          >
            <h5
              class="subheading"
            >
              Looks like you don't have an account yet, let's create one to start!
            </h5>
          </v-alert>
        </v-flex>
      </v-layout>
    </div>
    <v-container>
      <div class="mt-1">
        <v-layout
          justify-space-around
          row
          wrap
        >
          <v-flex
            xs12
            sm6
            md4
            lg3
          >
            <CurrentIncomes v-if="hasAccount" />
          </v-flex>
          <v-flex
            xs12
            sm6
            md4
            lg3
          >
            <CurrentBalance v-if="hasAccount" />
          </v-flex>
          <v-flex
            xs12
            sm6
            md4
            lg3
          >
            <CurrentExpenses v-if="hasAccount" />
          </v-flex>
        </v-layout>
      </div>

      <v-layout
        justify-space-around
        row
        wrap
        class="my-5"
      >
        <v-flex
          xs12
          md5
          class="mb-3"
        >
          <Balance v-if="hasAccount" />
        </v-flex>
        <v-flex
          xs12
          md5
          class="mb-3"
        >
          <Categories v-if="hasAccount" />
        </v-flex>
      </v-layout>

      <v-layout
        class="btns"
        justify-space-around
        row
        wrap
      >
        <v-spacer />
        <v-flex
          xs7
          md3
        >
          <v-card class="text-xs-center my-card">
            <v-card-text>
              <v-layout
                class="mb-1"
                row
              >
                <v-flex
                  class="mx-1"
                  xs4
                >
                  <NewIncome @newIncome="requestAccount" />
                </v-flex>
                <v-flex
                  class="mx-1"
                  xs4
                >
                  <NewAccount />
                </v-flex>
                <v-flex
                  class="mx-1"
                  xs4
                >
                  <NewExpense @newExpense="requestAccount" />
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-spacer />
      </v-layout>
    </v-container>
  </div>
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
      },
      alert: true
    };
  },
  methods: {
    requestAccount() {
      if (this.$store.getters.userId) {
        axios
          .get(`api/v1/accounts/${this.$store.getters.userId}`)
          .then(res => {
            this.$store.commit("setAccount", res.data);
          })
          .catch(err => console.log(err));
      }
    },
    requestCategories() {
      axios
        .get(`api/v1/categories`)
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

// TODO: check the layout for big screens

// TODO: the pages (routes) of the app:
// I thinking of the following main pages:
// * dashboard - completed:
// * accounts - completed
// * reports - work in progress:
// the future of this page is unclear since I moved the charts to the dashboard, but maybe its a god possibility to use this space to implement other functionalities like integration with other apis etc
// * cycles - completed:
// * home - completed:

// TODO: time ? study more about axios and async/await : move on
</script>

<style scoped>
.btns {
  margin-top: 4em;
}
.my-card {
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  -moz-box-shadow: 2px 2px 2px 2px #ccc;
  -webkit-box-shadow: 2px 2px 2px 2px #ccc;
  box-shadow: 2px 2px 2px 2px #ccc;
}
</style>
