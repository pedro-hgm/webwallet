<template>
  <div id="container-for-transactions"></div>
</template>


<script>
import { mapState } from "vuex";
import Highcharts from "highcharts";
import axios from "axios";
export default {
  data() {
    return {
      incomes: [],
      expenses: []
    };
  },
  computed: {
    ...mapState({
      // incomesList: state => state.currentIncomes,
      // expensesList: state => state.currentExpenses
    })
  },

  watch: {
    incomes() {
      this.dataSource();
    },
    expenses() {
      this.dataSource();
    }
  },
  methods: {
    requestChartIncomes() {
      axios
        .get(`http://localhost:3000/incomes/${this.$store.getters.userId}`)
        .then(res => {
          if (res.status === 200) {
            this.incomes = res.data;
            // this.dataSource();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    requestChartExpenses() {
      axios
        .get(`http://localhost:3000/expenses/${this.$store.getters.userId}`)
        .then(res => {
          if (res.status === 200) {
            this.expenses = res.data;
            // this.dataSource();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    dataSource() {
      // const incomes = this.list.map(income => {
      //   return {
      //     day: income.day,
      //     value: parseFloat(income.value)
      //   };
      // });

      // console.log(incomes);

      const totalIncomes = this.incomes.reduce((acc, item) => {
        return acc + parseFloat(item.value);
      }, 0);

      const totalExpenses = this.expenses.reduce((acc, item) => {
        return acc + parseFloat(item.value);
      }, 0);

      const data = [
        { name: "Incomes", y: totalIncomes },
        { name: "Expenses", y: totalExpenses }
      ];

      console.log(data);

      // const percentage = accounts.map(item => {
      //   item.y = (item.y / total) * 100;
      //   return item;
      // });

      this.setup(data);
    },
    setup(data) {
      Highcharts.chart("container-for-transactions", {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie"
        },
        title: {
          text: "All transactions",
          style: {
            color: "#9E9E9E",

            fontSize: "2.5em"
          }
        },
        subtitle: {
          text: "Source: WebWallet.com",
          style: {
            color: "#9E9E9E",
            fontSize: "1.5em"
          }
        },
        tooltip: {
          pointFormat: "{series.name}: <b>$ {point.y:.1f}</b>"
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: $ {point.y:.1f} ",
              style: {
                color:
                  (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                  "black"
              }
            }
          }
        },
        series: [
          {
            name: "Transactions",
            colorByPoint: true,
            data: data
          }
        ]
      });
    }
  },
  created() {},
  mounted() {
    this.requestChartIncomes();
    this.requestChartExpenses();
  }
};
</script>

<style>
@import "https://code.highcharts.com/5.0.0/css/highcharts.css";

#container-for-transactions {
  /* min-width: 310px;
  max-width: 600px;
  height: 400px;
  margin: 15% auto; */
  border-radius: 30px;
}
</style>


