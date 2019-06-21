<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <!-- <div v-for="(user, index) in users" :key="index">
      <p>{{ user.email }}</p>
    </div>-->
    <p>{{ this.user.email }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Dashboard",
  data() {
    return {
      user: {
        email: ""
      }
    };
  },
  created() {
    axios
      .get(`http://localhost:3000/users/${this.$store.getters.userId}`)
      .then(res => {
        console.log(res);
        this.user.email = res.data;
      })
      .catch(err => console.log(err));
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$store.getters.userLogin === true) {
        next();
      } else {
        next({ name: "home" });
      }
    });
  }
};
</script>

<style>
</style>
