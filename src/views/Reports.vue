<template>
  <div id="charts">
    <h2>TO:</h2>
    <v-select
      v-model="to"
      :items="currencies"
    />
    <h2>FROM:</h2>
    <v-select
      v-model="from"
      :items="currencies"
    />
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
    },
    test2() {}
  },
  created() {
    this.test();
  }
};

// TODO: maybe implement the money converter using the api
</script>

<style scoped>
#charts {
  margin-top: 60px;
}
</style>
