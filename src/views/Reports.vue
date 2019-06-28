<template></template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      values: [
        {
          name: "transport",
          value: "10.0"
        },
        {
          name: "leisure",
          value: 0
        },
        {
          name: "habitation",
          value: 0
        },
        {
          name: "health",
          value: "5.0"
        },
        {
          name: "education",
          value: "55.0"
        },
        {
          name: "payments",
          value: "30.0"
        }
      ]
    };
  },
  // computed: mapState({
  //   list: state => state.list
  // }),
  // watch: {
  //   list() {
  //     this.dataSource();
  //   }
  // },
  methods: {
    dataSource() {
      const categories = this.values.map(item => item.name);

      const values = this.values.map(item => parseFloat(item.value));

      this.setup({ categories, values });
    },
    setup(obj) {}
  },
  mounted() {
    this.dataSource;
  }
};
</script>

<style>
</style>
