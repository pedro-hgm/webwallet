<template>
  <div id="charts">
    <!-- <v-layout justify-space-around row wrap>
      <v-flex xs12 md5 class="mb-5">
        <Categories />
      </v-flex>
      
      <v-flex xs12 md5 class="mb-5">
        <Transactions />
      </v-flex>
    </v-layout>-->
    <h2>TO:</h2>
    <v-select v-model="to" :items="currencies"></v-select>
    <h2>FROM:</h2>
    <v-select v-model="from" :items="currencies"></v-select>
  </div>
</template>


<script>
import Categories from "@/components/charts/Categories.vue";
import Transactions from "@/components/charts/Transactions.vue";
import axios from "axios";

export default {
  name: "Reports",
  components: { Categories, Transactions },
  data() {
    return {
      currencies: [],
      to: "",
      from: ""
    };
  },
  computed: {},
  watch: {},
  methods: {
    test() {
      axios({
        method: "get",
        url:
          "https://currency-converter5.p.rapidapi.com/currency/list?format=json",
        // data: { id: varID },
        headers: {
          "X-RapidAPI-Host": "currency-converter5.p.rapidapi.com",
          "X-RapidAPI-Key": "71c482d0aamshaad30d0a87f76a6p1af5c4jsnc30c26c376df"
        }
      })
        .then(res => {
          const currencies = res.data.currencies;
          const currenciesKeys = Object.keys(currencies);
          this.currencies = currenciesKeys;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.test();
  }
};

// TODO: maybe implement the money converter using the api

// TODO: think about other kinds of charts that is interesting to have in this page and implement them
// * ideas for charts:
// 1. a pie chart showing the percentual balance from each account. Maybe use that video with highcharts and vue to implement this.
// 2. a (maybe) line chart with the history off all expenses
// 3. the same but for incomes
</script>

<style scoped>
#charts {
  margin-top: 60px;
}
</style>
