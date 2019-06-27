<template>
  <v-card class="text-xs-center ma-3 my-card">
    <v-card-text>
      <v-layout row wrap>
        <v-flex xm6>
          <v-icon large color="green" class="mb-2">trending_up</v-icon>
        </v-flex>
        <v-flex xm6>
          <h3 class="subheading grey--text">Monthly Incomes:</h3>
          <div class="subheading green--text">$ {{ currentIncomes }}</div>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
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
.my-card {
  border-radius: 20px;
}
</style>
