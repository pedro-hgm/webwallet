<template>
  <v-app class="grey lighten-4">
    <Navbar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
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
