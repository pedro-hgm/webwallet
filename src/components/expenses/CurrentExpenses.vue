<template>
  <div>
    <v-card height="80px" max-width="250px">
      <v-layout justify-space-around row wrap>
        <v-flex xm6 class="my-2 ml-4">
          <v-btn large flat icon color="red">
            <v-icon color="red" large>trending_down</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xm6 class="my-3 mr-4">
          <h3 class="subheading grey--text">Monthly Expenses:</h3>
          <h3 class="red--text">$ {{ currentExpenses }}</h3>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
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
</style>
