<template>
  <div id="container-for-balance"></div>
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
      accountsList: state => state.userAccounts
    })
  },

  watch: {
    accountsList() {
      this.dataSource();
    }
  },
  methods: {
    dataSource() {
      const accounts = this.accountsList.map(account => {
        return {
          name: account.name,
          y: parseFloat(account.balance)
        };
      });

      const total = accounts.reduce((acc, item) => {
        return acc + item.y;
      }, 0);

      const percentage = accounts.map(item => {
        item.y = (item.y / total) * 100;
        return item;
      });

      this.setup(percentage);
    },
    setup(percentage) {
      Highcharts.theme = {
        colors: [
          "#E57373",
          "#7986CB",
          "#4DB6AC",
          "#DCE775",
          "#FFB74D",
          "#A1887F",
          "#BA68C8",
          "#81C784",
          "#6AF9C4"
        ],
        chart: {
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [[0, "rgb(255, 255, 255)"], [1, "rgb(240, 240, 255)"]]
          },
          // borderWidth: 2,
          plotBackgroundColor: "rgba(255, 255, 255, .9)",
          plotShadow: true,
          plotBorderWidth: 1
        },
        title: {
          style: {
            color: "#9E9E9E",
            fontFamily: "Roboto",
            fontSize: "2em",
            fontWeight: "regular"
          }
        },
        subtitle: {
          style: {
            color: "#9E9E9E",
            fontFamily: "Roboto",
            fontSize: "1em",
            fontWeight: "regular"
          }
        },
        xAxis: {
          gridLineWidth: 1,
          lineColor: "#000",
          tickColor: "#000",
          labels: {
            style: {
              color: "#9E9E9E",
              font: "14px Roboto"
            }
          },
          title: {
            style: {
              color: "#9E9E9E",
              fontWeight: "bold",
              fontSize: "12px",
              fontFamily: "Roboto"
            }
          }
        },
        yAxis: {
          minorTickInterval: "auto",
          lineColor: "#000",
          lineWidth: 1,
          tickWidth: 1,
          tickColor: "#000",
          labels: {
            style: {
              color: "#9E9E9E",
              font: "14px Roboto"
            }
          },
          title: {
            style: {
              color: "#9E9E9E",
              fontWeight: "bold",
              fontSize: "12px",
              fontFamily: "Roboto"
            }
          }
        },
        legend: {
          itemStyle: {
            color: "#9E9E9E",
            fontWeight: "bold",
            fontSize: "12px",
            fontFamily: "Roboto"
          },
          itemHoverStyle: {
            color: "#039"
          },
          itemHiddenStyle: {
            color: "gray"
          }
        },
        labels: {
          style: {
            color: "#99b"
          }
        },

        navigation: {
          buttonOptions: {
            theme: {
              stroke: "#CCCCCC"
            }
          }
        }
      };

      // Apply the theme
      Highcharts.setOptions(Highcharts.theme);

      Highcharts.chart("container-for-balance", {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie"
        },
        title: {
          text: "Accounts balance shares"
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
        },

        plotOptions: {
          pie: {
            colorByPoint: true,
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.1f} %"
            }
          }
        },
        series: [
          {
            name: "share",
            data: percentage
          }
        ]
      });
    }
  },

  mounted() {
    this.dataSource();
  }
};
</script>

<style>
@import "https://code.highcharts.com/5.0.0/css/highcharts.css";

#container-for-balance {
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  -moz-box-shadow: 2px 2px 2px 2px #ccc;
  -webkit-box-shadow: 2px 2px 2px 2px #ccc;
  box-shadow: 2px 2px 2px 2px #ccc;
}
</style>


