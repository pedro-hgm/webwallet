<template>
  <nav>
    <!-- <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>Awesome! You added a new project.</span>
      <v-btn color="white" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>-->

    <v-toolbar app flat color="grey lighten-2">
      <v-toolbar-side-icon v-if="userLogin" @click="drawer = !drawer" class="black--text"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase black--text">
        <span class="font-weight-light">web</span>
        <span>wallet</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <Login v-if="!userLogin"/>
      <v-btn v-else @click="logout" flat color="black">
        <span>Logout</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" class="blue-grey darken-4">
      <v-list class="mt-5">
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Login from "@/components/Login.vue";
export default {
  components: { Login },
  data() {
    return {
      drawer: false,
      links: [
        { icon: "dashboard", text: "Dashboard", route: "/dashboard" },
        { icon: "folder", text: "My Projects", route: "/projects" },
        { icon: "person", text: "Team", route: "/team" }
      ],
      snackbar: false
    };
  },
  methods: {
    logout() {
      this.$store.commit("changeStatus", false);
      this.$store.commit("changeId", null);
      this.$router.push({ name: "home" });
    }
  },
  computed: {
    userLogin() {
      return this.$store.getters.userLogin;
    }
  }
};
</script>

<style>
</style>
