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
import axios from "axios";
export default {
  name: "currentExpenses",
  data() {
    return {
      // expenses: null,
      year: null,
      month: null
    };
  },
  methods: {
    requestExpensesByDate() {
      axios
        .post("http://localhost:3000/expenses/find", {
          year: this.year,
          month: this.month,
          id: this.$store.getters.userId
        })
        .then(res => {
          if (res.status === 201) {
            this.$store.commit("setCurrentExpenses", res.data);
          }
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
  computed: {
    expenses() {
      return this.$store.getters.getCurrentExpenses;
    },
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
  created() {
    this.getDate();
    this.requestExpensesByDate();
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
