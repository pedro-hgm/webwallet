<template>
  <v-card class="text-xs-center ma-3 my-card">
    <v-card-text>
      <v-layout row wrap>
        <v-flex xm6>
          <v-icon large color="#E57373" class="mb-2">trending_down</v-icon>
        </v-flex>
        <v-flex xm6>
          <h3 class="subheading grey--text">Monthly Expenses:</h3>
          <div class="subheading text">$ {{ currentExpenses }}</div>
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
  name: "CurrentExpenses",
  data() {
    return {
      year: null,
      month: null
    };
  },
  computed: {
    ...mapState({
      expenses: state => state.currentExpenses
    }),

    currentExpenses() {
      if (this.expenses) {
        const expenses = this.expenses;
        let currentExpenses = 0.0;
        for (const expense of expenses) {
          currentExpenses += parseFloat(expense.value);
        }
        return currentExpenses;
      } else {
        const currentExpenses = 0.0;
        return currentExpenses;
      }
    }
  },
  methods: {
    requestExpensesByDate() {
      axios
        .post("api/v1/expenses/find", {
          year: this.year,
          month: this.month,
          id: this.$store.getters.userId
        })
        .then(res => {
          this.$store.commit("setCurrentExpenses", res.data);
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
    this.requestExpensesByDate();
    EventBus.$on("newExpense", () => this.requestExpensesByDate());
  }
};
</script>

<style scoped>
.my-card {
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.7);
}
.text {
  color: #e57373;
}
</style>
