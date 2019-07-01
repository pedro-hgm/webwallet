<template>
  <div id="container-for-categories"></div>
</template>


<script>
import { mapState } from "vuex";
import Highcharts from "highcharts";
import axios from "axios";
import { EventBus } from "@/event-bus.js";
export default {
  data() {
    return {
      chartValues: []
    };
  },
  methods: {
    requestChartData() {
      axios
        .post("http://localhost:3000/categories/chart", {
          id: this.$store.getters.userId
        })
        .then(res => {
          this.chartValues = res.data;
          this.dataSource();
        })
        .catch(err => {
          console.log(err);
        });
    },
    dataSource() {
      const categories = this.chartValues.map(item => item.name);

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
            color: "#9E9E9E",

            fontSize: "2em"
          }
        },

        subtitle: {
          text: "Source: WebWallet.com",
          style: {
            color: "#9E9E9E",
            fontSize: "1em"
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
              fontSize: "1.4em",
              fontWeight: "regular"
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
    EventBus.$on("newExpense", () => this.requestChartData());
  }
};
</script>

<style>
@import "https://code.highcharts.com/5.0.0/css/highcharts.css";

#container-for-categories {
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  -moz-box-shadow: 2px 2px 2px 2px #ccc;
  -webkit-box-shadow: 2px 2px 2px 2px #ccc;
  box-shadow: 2px 2px 2px 2px #ccc;
}
</style>


