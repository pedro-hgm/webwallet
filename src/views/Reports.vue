<template>
  <div id="charts">
    <v-layout justify-space-around row wrap>
      <v-flex xs12 md5 class="mb-5">
        <Categories />
      </v-flex>
      <!-- <v-spacer></v-spacer> -->
      <v-flex xs12 md5 class="mb-5">
        <Balance />
      </v-flex>
    </v-layout>
  </div>
</template>


<script>
import Categories from "@/components/reports/CategoriesChart.vue";
import Balance from "@/components/reports/BalanceChart.vue";

export default {
  name: "Reports",
  components: { Categories, Balance },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {}
};

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
