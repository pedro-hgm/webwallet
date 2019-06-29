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
      list: state => state.userAccounts
    })
  },

  watch: {
    list() {
      this.dataSource();
    }
  },
  methods: {
    dataSource() {
      const accounts = this.list.map(account => {
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
      Highcharts.chart("container-for-balance", {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie"
        },
        title: {
          text: "Accounts balance shares",
          style: {
            color: "#9E9E9E",
            fontSize: "2.5em"
          }
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
        },
        plotOptions: {
          pie: {
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
            colorByPoint: true,
            data: percentage
          }
        ]
      });
    }
  },
  created() {},
  mounted() {
    this.dataSource();
  }
};
</script>

<style>
@import "https://code.highcharts.com/5.0.0/css/highcharts.css";

#container-for-balance {
  /* min-width: 310px;
  max-width: 600px;
  height: 400px;
  margin: 15% auto; */
  border-radius: 30px;
}
</style>


