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
          <NewCycle/>
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
                    <v-icon large color="blue" class="mb-2">account_balance_wallet</v-icon>
                  </v-flex>
                  <v-flex xm6>
                    <h3 class="subheading grey--text">Balance:</h3>
                    <div class="subheading blue--text">$ {{ totalBalance }}</div>
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
                    <v-icon large color="green" class="mb-2">trending_up</v-icon>
                  </v-flex>
                  <v-flex xm6>
                    <h3 class="subheading grey--text">Incomes:</h3>
                    <div class="subheading green--text">$ {{ incomesTotalValue }}</div>
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
                    <v-icon large color="red" class="mb-2">trending_down</v-icon>
                  </v-flex>
                  <v-flex xm6>
                    <h3 class="subheading grey--text">Expenses:</h3>
                    <div class="subheading red--text">$ {{ expensesTotalValue }}</div>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container>
        <v-layout justify-center row>
          <h2 class="blue-grey--text mb-1">Expenses</h2>
        </v-layout>
        <v-card v-for="(expense, index) in expenses" :key="index">
          <v-layout row wrap class="pa-3 expense">
            <v-flex xs12 md4>
              <div class="caption grey--text">Description</div>
              <div>{{expense.description}}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Value</div>
              <div>$ {{expense.value}}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Account</div>
              <div>{{expense.account_name}}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Category</div>
              <div>{{expense.category_name}}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Date</div>
              <div>{{expense.date}}</div>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
        </v-card>
      </v-container>

      <v-container>
        <v-layout justify-center row>
          <h2 class="blue-grey--text mb-1">Incomes</h2>
        </v-layout>
        <v-card v-for="(income, index) in incomes" :key="index">
          <v-layout row wrap class="pa-3 income">
            <v-flex xs12 md6>
              <div class="caption grey--text">Description</div>
              <div>{{income.description}}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Value</div>
              <div>$ {{income.value}}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Account</div>
              <div>{{income.account_name}}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Date</div>
              <div>{{income.date}}</div>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
        </v-card>
      </v-container>
      <v-layout justify-center row>
        <CycleSelector :cycles="this.cycles" @cycleSelected="findCycle"/>
        <v-btn
          v-if="currentCycle.id === activeCycleId"
          @click="endCycle"
          dark
          small
          color="blue-grey"
          class="mt-3 mb-5"
        >end cycle</v-btn>
      </v-layout>

      <NewCycle v-if="!currentCycle" @newCycle="requestCycles"/>
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
        <NewCycle/>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NewCycle from "@/components/cycles/NewCycle.vue";
import CycleSelector from "@/components/cycles/cycleSelector.vue";
export default {
  name: "Cycles",
  components: { NewCycle, CycleSelector },
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
        .get(`http://localhost:3000/cycles/${this.$store.getters.userId}`)
        .then(res => {
          this.cycles = [];
          this.cycles.push(...res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    requestCycleValues(id) {
      axios
        .post("http://localhost:3000/cycles/complete_cycle", {
          id: id
        })
        .then(res => {
          this.incomes.push(...res.data[0]);
          this.expenses.push(...res.data[1]);
        })
        .catch(err => {
          console.log(err);
        });
    },
    findCycle(payload) {
      this.incomes = [];
      this.expenses = [];
      this.requestCycleValues(payload.id);
      this.activeCycleId = payload.id;
    },
    endCycle() {
      if (confirm("Are you sure?")) {
        axios
          .post("http://localhost:3000/cycles/current", {
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
    }
  },
  created() {
    this.requestCycles();
    setTimeout(() => {
      if (this.currentCycle) {
        this.requestCycleValues(this.currentCycle.id);
      }
    }, 1000);
  }
};
</script>

<style scoped>
.expense {
  border-left: 4px solid tomato;
}
.income {
  border-left: 4px solid #4caf50;
}
.my-card {
  border-radius: 20px;
}
</style>
