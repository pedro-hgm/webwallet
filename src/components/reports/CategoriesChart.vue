<template>
  <div id="container-for-categories"></div>
</template>


<script>
import { mapState } from "vuex";
import Highcharts from "highcharts";
import axios from "axios";
export default {
  data() {
    return {
      chartValues: []
    };
  },
  computed: {
    ...mapState({
      list: state => state.list
    })
  },

  watch: {
    list() {
      this.dataSource();
    }
  },
  methods: {
    requestChartData() {
      axios
        .post("http://localhost:3000/categories/chart", {
          id: this.$store.getters.userId
        })
        .then(res => {
          if (res.status === 200) {
            this.chartValues = res.data;
            this.dataSource();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    dataSource() {
      const categories = this.chartValues.map(item => item.name);

      // const values = this.values.map(item => parseFloat(item.y));

      this.setup(categories);
    },
    setup(payload) {
      // Build the chart

      const categories = payload;

      Highcharts.chart("container-for-categories", {
        chart: {
          type: "column"
        },
        title: {
          text: "Expenses by Categories",
          style: {
            color: "grey",
            fontWeight: "bold",
            fontSize: "2.5em"
          }
        },
        subtitle: {
          text: "Source: WebWallet.com",
          style: {
            color: "grey",
            fontSize: "1.5em"
          }
        },
        xAxis: {
          categories: categories
        },
        yAxis: {
          title: {
            text: "Total amount",
            style: {
              color: "grey",
              fontSize: "1.4em"
            }
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: "$ {point.y:.1f}",
              style: {
                color: "grey",
                fontSize: "1.4em"
              }
            }
          }
        },

        tooltip: {
          headerFormat: '<span class="subheading">{series.name}</span><br>',
          pointFormat:
            '<span class="subheading" style="color:{point.color}">{point.name}</span class="subheading">: <b>$ {point.y:.2f}</b><br/>'
        },

        series: [
          {
            name: "Category",
            colorByPoint: true,
            data: this.chartValues
          }
        ]
      });
    }
  },
  created() {
    this.requestChartData();
    // TODO: maybe create a logic that everytime the user creates a new expense, this request is repeated to get the updated data
  },
  mounted() {}
};
</script>

<style>
@import "https://code.highcharts.com/5.0.0/css/highcharts.css";

/* #container-for-categories {
  min-width: 310px;
  max-width: 600px;
  height: 400px;
  margin: 15% auto;
} */
</style>


