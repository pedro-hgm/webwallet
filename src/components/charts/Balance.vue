<template>
  <div id="container-for-balance" />
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
      Highcharts.chart("container-for-balance", {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
          styledMode: true
        },
        title: {
          text: "Accounts balance shares"
        },
        subtitle: {
          text: "Source: WebWallet.com"
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
              enabled: false,
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


