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
        .post("api/v1/categories/chart", {
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
          type: "column",
          styledMode: true
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
#container-for-categories {
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  -moz-box-shadow: 2px 2px 2px 2px #ccc;
  -webkit-box-shadow: 2px 2px 2px 2px #ccc;
  box-shadow: 2px 2px 2px 2px #ccc;
}

.highcharts-point.highcharts-color-0,
.highcharts-legend-item.highcharts-color-0 .highcharts-point,
.highcharts-tooltip .highcharts-color-0 {
  fill: #e57373;
}
.highcharts-tooltip.highcharts-color-0,
.highcharts-data-label-connector.highcharts-color-0 {
  stroke: #e57373;
}

.highcharts-point.highcharts-color-1,
.highcharts-legend-item.highcharts-color-1 .highcharts-point,
.highcharts-tooltip .highcharts-color-1 {
  fill: #81c784;
}
.highcharts-tooltip.highcharts-color-1,
.highcharts-data-label-connector.highcharts-color-1 {
  stroke: #81c784;
}

.highcharts-point.highcharts-color-2,
.highcharts-legend-item.highcharts-color-2 .highcharts-point,
.highcharts-tooltip .highcharts-color-2 {
  fill: #5c6bc0;
}
.highcharts-tooltip.highcharts-color-2,
.highcharts-data-label-connector.highcharts-color-2 {
  stroke: #5c6bc0;
}

.highcharts-point.highcharts-color-3,
.highcharts-legend-item.highcharts-color-3 .highcharts-point,
.highcharts-tooltip .highcharts-color-3 {
  fill: #fff176;
}
.highcharts-tooltip.highcharts-color-3,
.highcharts-data-label-connector.highcharts-color-3 {
  stroke: #fff176;
}

.highcharts-point.highcharts-color-4,
.highcharts-legend-item.highcharts-color-4 .highcharts-point,
.highcharts-tooltip .highcharts-color-4 {
  fill: #90a4ae;
}
.highcharts-tooltip.highcharts-color-4,
.highcharts-data-label-connector.highcharts-color-4 {
  stroke: #90a4ae;
}

.highcharts-point.highcharts-color-5,
.highcharts-legend-item.highcharts-color-5 .highcharts-point,
.highcharts-tooltip .highcharts-color-5 {
  fill: #a1887f;
}
.highcharts-tooltip.highcharts-color-5,
.highcharts-data-label-connector.highcharts-color-5 {
  stroke: #a1887f;
}

.highcharts-point.highcharts-color-6,
.highcharts-legend-item.highcharts-color-6 .highcharts-point,
.highcharts-tooltip .highcharts-color-6 {
  fill: #4db6ac;
}
.highcharts-tooltip.highcharts-color-6,
.highcharts-data-label-connector.highcharts-color-6 {
  stroke: #4db6ac;
}

.highcharts-point.highcharts-color-7,
.highcharts-legend-item.highcharts-color-7 .highcharts-point,
.highcharts-tooltip .highcharts-color-7 {
  fill: #dce775;
}
.highcharts-tooltip.highcharts-color-7,
.highcharts-data-label-connector.highcharts-color-7 {
  stroke: #dce775;
}
.highcharts-title {
  fill: #9e9e9e !important;
  font-size: 2em !important;
}
.highcharts-subtitle {
  fill: #9e9e9e !important;
}
.highcharts-axis-title {
  fill: #9e9e9e !important;
  font-size: 1.2em !important;
}
.highcharts-axis-labels {
  fill: #9e9e9e !important;
  font-size: 1.2em !important;
}
.highcharts-data-label text {
  fill: #9e9e9e !important;
  font-size: 1.2em !important;
}
</style>


