<template>
  <div id="cycles">
    <div v-if="cycles">
      <div v-if="!currentCycle">
        <v-container>
          <v-layout justify-center row wrap>
            <v-flex xs12>
              <h5
                class="headline grey--text mb-1 text-xs-center"
              >You don't have any active cycles at the moment! Select an older cycle or create a new one.</h5>
            </v-flex>
          </v-layout>
          <NewCycle />
        </v-container>
      </div>
      <div>
        <v-layout v-if="currentCycle" justify-center row wrap>
          <v-flex xs12>
            <v-alert v-model="alert" color="blue-grey" outline dismissible icon="new_releases">
              <h5
                class="subheading"
              >This is the cycle's area. Here you can see all your cycles or create a new one. But remember, in order to create a new cycle you must end the current first.</h5>
            </v-alert>
          </v-flex>
        </v-layout>
      </div>
      <v-container class="mt-1">
        <v-layout justify-space-around row wrap>
          <v-flex xs12 sm6 md4 lg3>
            <v-card class="text-xs-center ma-3 my-card">
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xm6>
                    <v-icon large color="#5C6BC0" class="mb-2">account_balance_wallet</v-icon>
                  </v-flex>
                  <v-flex xm6>
                    <h3 class="subheading grey--text">Balance:</h3>
                    <div class="subheading text-balance">$ {{ totalBalance }}</div>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs12 sm6 md4 lg3>
            <v-card class="text-xs-center ma-3 my-card">
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xm6>
                    <v-icon large color="#81c784" class="mb-2">trending_up</v-icon>
                  </v-flex>
                  <v-flex xm6>
                    <h3 class="subheading grey--text">Incomes:</h3>
                    <div class="subheading text-income">$ {{ incomesTotalValue }}</div>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs12 sm6 md4 lg3>
            <v-card class="text-xs-center ma-3 my-card">
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xm6>
                    <v-icon large color="#E57373" class="mb-2">trending_down</v-icon>
                  </v-flex>
                  <v-flex xm6>
                    <h3 class="subheading grey--text">Expenses:</h3>
                    <div class="subheading text-expense">$ {{ expensesTotalValue }}</div>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container id="expenses">
        <v-layout justify-center row>
          <h2 class="blue-grey--text mb-1">Expenses</h2>
        </v-layout>
        <v-card v-for="(expense, index) in expenses" :key="index">
          <v-layout row wrap class="pa-3 expense">
            <v-flex xs12 md3>
              <div class="caption grey--text">Description</div>
              <div>{{ expense.description }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Value</div>
              <div>$ {{ expense.value }}</div>
            </v-flex>
            <v-flex xs6 sm2 md2>
              <div class="caption grey--text">Account</div>
              <div>{{ expense.account_name }}</div>
            </v-flex>
            <v-flex xs6 sm2 md2>
              <div class="caption grey--text">Category</div>
              <div>{{ expense.category_name }}</div>
            </v-flex>
            <v-flex xs6 sm2 md1>
              <div class="caption grey--text">Date</div>
              <div>{{ expense.date }}</div>
            </v-flex>
            <v-flex xs2>
              <v-layout row justify-space-around>
                <v-flex class="mx-2 mt-1" xs4>
                  <UpdateExpense
                    @updateExpense="requestCycleValues(activeCycleId)"
                    :description="expense.description"
                    :id="expense.id"
                    :category="expense.category_id"
                  />
                </v-flex>
                <v-flex class="mx-2" xs4>
                  <v-tooltip top>
                    <v-btn
                      slot="activator"
                      @click="deleteExpense(expense.id, expense.value, expense.account_id)"
                      icon
                    >
                      <v-icon color="grey">delete</v-icon>
                    </v-btn>
                    <span>delete expense</span>
                  </v-tooltip>
                </v-flex>
                <v-spacer />
              </v-layout>
            </v-flex>
          </v-layout>
          <v-divider />
        </v-card>
      </v-container>

      <v-container id="incomes">
        <v-layout justify-center row>
          <h2 class="blue-grey--text mb-1">Incomes</h2>
        </v-layout>
        <v-card v-for="(income, index) in incomes" :key="index">
          <v-layout row wrap class="pa-3 income">
            <v-flex xs12 md3>
              <div class="caption grey--text">Description</div>
              <div>{{ income.description }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Value</div>
              <div>$ {{ income.value }}</div>
            </v-flex>
            <v-flex xs6 sm2 md2>
              <div class="caption grey--text">Account</div>
              <div>{{ income.account_name }}</div>
            </v-flex>
            <v-flex xs6 sm2 md2>
              <div class="caption grey--text">Date</div>
              <div>{{ income.date }}</div>
            </v-flex>
            <v-flex xs2>
              <v-layout row justify-space-around>
                <v-flex class="mx-2 mt-1" xs4>
                  <UpdateIncome
                    @updateIncome="requestCycleValues(activeCycleId)"
                    :description="income.description"
                    :id="income.id"
                  />
                </v-flex>
                <v-flex class="mx-2" xs4>
                  <v-tooltip top>
                    <v-btn
                      slot="activator"
                      @click="deleteIncome(income.id, income.value, income.account_id)"
                      icon
                    >
                      <v-icon color="grey">delete</v-icon>
                    </v-btn>
                    <span>delete income</span>
                  </v-tooltip>
                </v-flex>
                <v-spacer />
              </v-layout>
            </v-flex>
          </v-layout>
          <v-divider />
        </v-card>
      </v-container>

      <v-layout justify-center row>
        <CycleSelector :cycles="this.cycles" @cycleSelected="findCycle" />
        <v-btn
          v-if="currentCycle.id === activeCycleId"
          @click="endCycle"
          dark
          small
          color="blue-grey"
          class="mt-3 mb-5"
        >end cycle</v-btn>
      </v-layout>

      <NewCycle v-if="!currentCycle" @newCycle="requestCycles" />
    </div>
    <div v-else>
      <v-container>
        <v-layout justify-center row wrap>
          <v-flex xs12>
            <h3 class="display-2 mb-1 text-xs-center">Looks like you don't have a cycle yet!</h3>
          </v-flex>
          <v-flex xs12>
            <h4
              class="display-1 blue-grey--text mb-1 text-xs-center"
            >Feel free to create one and take a better control over your finances.</h4>
            <h5
              class="headline grey--text mb-1 text-xs-center"
            >To create a new cycle you just have to click the buttom on the bottom right of your screen.</h5>
          </v-flex>
        </v-layout>
        <NewCycle />
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NewCycle from "@/components/cycles/NewCycle.vue";
import CycleSelector from "@/components/cycles/cycleSelector.vue";
import UpdateExpense from "@/components/expenses/UpdateExpense.vue";
import UpdateIncome from "@/components/incomes/UpdateIncome.vue";
import { EventBus } from "@/event-bus.js";
export default {
  name: "Cycles",
  components: { NewCycle, CycleSelector, UpdateExpense, UpdateIncome },
  data() {
    return {
      cycles: [],
      activeCycleId: null,
      incomes: [],
      expenses: [],
      alert: true
    };
  },
  computed: {
    currentCycle() {
      if (this.cycles.length > 0) {
        let cycles = this.cycles;
        let currentCycle = cycles.filter(cycle => {
          return cycle.current;
        });
        if (currentCycle.length > 0) {
          this.activeCycleId = currentCycle[0].id;
          return currentCycle[0];
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    expensesTotalValue() {
      if (this.expenses) {
        const expenses = this.expenses;
        let value = 0.0;
        for (const expense of expenses) {
          value += parseFloat(expense.value);
        }
        return value;
      } else {
        const value = 0.0;
        return value;
      }
    },
    incomesTotalValue() {
      if (this.incomes) {
        const incomes = this.incomes;
        let value = 0.0;
        for (const income of incomes) {
          value += parseFloat(income.value);
        }
        return value;
      } else {
        const value = 0.0;
        return value;
      }
    },
    totalBalance() {
      return this.incomesTotalValue - this.expensesTotalValue;
    }
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
    },
    requestCycles() {
      axios
        .get(`api/v1/cycles/${this.$store.getters.userId}`)
        .then(res => {
          this.cycles = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    requestCycleValues(id) {
      axios
        .post("api/v1/cycles/complete_cycle", {
          id: id
        })
        .then(res => {
          this.incomes = res.data[0];
          this.expenses = res.data[1];
        })
        .catch(err => {
          console.log(err);
        });
    },
    findCycle(payload) {
      this.requestCycleValues(payload.id);
      this.activeCycleId = payload.id;
    },
    endCycle() {
      if (confirm("Are you sure?")) {
        axios
          .post("api/v1/cycles/current", {
            id: this.currentCycle.id
          })
          .then(res => {
            this.incomes = [];
            this.expenses = [];
            this.activeCycleId = null;
            this.requestCycles();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    newCycle(payload) {
      this.requestCycles();
      this.requestCycleValues(payload.id);
    },
    deleteExpense(expenseId, value, accountId) {
      if (confirm("Are you sure? This action is permanent.")) {
        axios
          .delete(`api/v1/expenses/${expenseId}`)
          .then(res => {
            this.setBalance(accountId, parseFloat(value));
            EventBus.$emit("snackbar", {
              value: true,
              color: "#81C784",
              message: "Expense successfuly deleted"
            });
          })
          .catch(err => {
            console.log(err);
            EventBus.$emit("snackbar", {
              value: true,
              color: "#E57373",
              message: "Sorry, but we couldn't delete your expense"
            });
          });
      }
    },
    deleteIncome(incomeId, value, accountId) {
      if (confirm("Are you sure? This action is permanent.")) {
        axios
          .delete(`api/v1/incomes/${incomeId}`)
          .then(res => {
            this.setBalance(accountId, -parseFloat(value));
            EventBus.$emit("snackbar", {
              value: true,
              color: "#81C784",
              message: "Income successfuly deleted"
            });
          })
          .catch(err => {
            console.log(err);
            EventBus.$emit("snackbar", {
              value: true,
              color: "#E57373",
              message: "Sorry, but we couldn't delete your income"
            });
          });
      }
    },
    setBalance(id, value) {
      axios
        .post("api/v1/accounts/set_balance", {
          id,
          value
        })
        .then(res => {
          this.requestCycleValues(this.activeCycleId);
          this.requestAccount();
        })
        .catch(err => {
          console.log(err);
        });
    },
    requestAccount() {
      if (this.$store.getters.userId) {
        axios
          .get(`api/v1/accounts/${this.$store.getters.userId}`)
          .then(res => {
            this.$store.commit("setAccount", res.data);
          })
          .catch(err => console.log(err));
      }
    }
  },
  created() {
    this.requestCycles();
    // setTimeout(() => {
    //   if (this.currentCycle) {
    //     this.requestCycleValues(this.currentCycle.id);
    //   }
    // }, 1000);
  },
  watch: {
    currentCycle() {
      if (this.currentCycle) {
        this.requestCycleValues(this.currentCycle.id);
      }
    }
  }
};
</script>

<style scoped>
.expense {
  border-left: 4px solid #e57373;
}
.income {
  border-left: 4px solid #81c784;
}
.my-card {
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  -moz-box-shadow: 2px 2px 2px 2px #ccc;
  -webkit-box-shadow: 2px 2px 2px 2px #ccc;
  box-shadow: 2px 2px 2px 2px #ccc;
}
.text-expense {
  color: #e57373;
}
.text-income {
  color: #81c784;
}
.text-balance {
  color: #5c6bc0;
}
</style>
