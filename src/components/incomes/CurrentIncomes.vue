<template>
  <v-card class="text-xs-center ma-3 my-card">
    <v-card-text>
      <v-layout row wrap>
        <v-flex xm6>
          <v-icon large color="#81C784" class="mb-2">trending_up</v-icon>
        </v-flex>
        <v-flex xm6>
          <h3 class="subheading grey--text">Monthly Incomes:</h3>
          <div class="subheading text">$ {{ currentIncomes }}</div>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { EventBus } from "@/event-bus.js";
export default {
  name: "CurrentIncomes",
  data() {
    return {
      year: null,
      month: null
    };
  },
  watch: {
    accounts() {
      this.requestIncomesByDate();
    }
  },
  computed: {
    ...mapState({
      incomes: state => state.currentIncomes,
      accounts: state => state.userAccounts
    }),
    currentIncomes() {
      if (this.incomes) {
        const incomes = this.incomes;
        let currentIncomes = 0.0;
        for (const income of incomes) {
          currentIncomes += parseFloat(income.value);
        }
        return currentIncomes;
      } else {
        const currentIncomes = 0.0;
        return currentIncomes;
      }
    }
  },
  methods: {
    requestIncomesByDate() {
      axios
        .post("api/v1/incomes/find", {
          year: this.year,
          month: this.month,
          id: this.$store.getters.userId
        })
        .then(res => {
          this.$store.commit("setCurrentIncomes", res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDate() {
      const fullDate = new Date();
      this.year = fullDate.getFullYear();
      this.month = fullDate.getMonth() + 1;
    }
  },

  created() {
    this.getDate();
    this.requestIncomesByDate();
    EventBus.$on("newIncome", () => this.requestIncomesByDate());
  }
};
</script>

<style scoped>
.my-card {
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.7);
}
.text {
  color: #81c784;
}
</style>
