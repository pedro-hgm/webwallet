<template>
  <div>
    <v-card height="80px" max-width="250px">
      <v-layout justify-space-around row wrap>
        <v-flex xm6 class="my-2 ml-4">
          <v-btn large flat icon color="green">
            <v-icon color="green" large>trending_up</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xm6 class="my-3 mr-4">
          <h3 class="subheading grey--text">Monthly Incomes:</h3>
          <h3 class="green--text">$ {{ currentIncomes }}</h3>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "currentIncomes",
  data() {
    return {
      // incomes: null,
      year: null,
      month: null
    };
  },
  methods: {
    requestIncomesByDate() {
      axios
        .post("http://localhost:3000/incomes/find", {
          year: this.year,
          month: this.month,
          id: this.$store.getters.userId
        })
        .then(res => {
          if (res.status === 201) {
            this.$store.commit("setCurrentIncomes", res.data);
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
    incomes() {
      return this.$store.getters.getCurrentIncomes;
    },
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
  created() {
    this.getDate();
    this.requestIncomesByDate();
  }
};
</script>

<style scoped>
</style>
