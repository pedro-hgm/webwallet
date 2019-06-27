<template>
  <v-app class="grey lighten-4">
    <Navbar/>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/layout/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>
