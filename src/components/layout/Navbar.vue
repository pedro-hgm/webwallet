<template>
  <nav>
    <v-snackbar v-model="snackbar.value" :timeout="6000" top :color="snackbar.color">
      <span>{{ snackbar.message }}</span>
      <v-btn color="white" flat @click="snackbar.value = false">Close</v-btn>
    </v-snackbar>

    <v-toolbar app flat color="#E0E0E0">
      <v-toolbar-side-icon v-if="userLogin" @click="drawer = !drawer" class="black--text" />
      <v-toolbar-title class="text-uppercase black--text">
        <span class="font-weight-light">web</span>
        <span>wallet</span>
      </v-toolbar-title>
      <v-spacer />

      <Login v-if="!userLogin" />
      <v-btn v-else @click="logout" flat color="black">
        <span>Logout</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer mini-variant app v-model="drawer" class="blue-grey darken-4">
      <v-list class="mt-5">
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-list-tile-action>
                <v-icon v-on="on" class="white--text">{{ link.icon }}</v-icon>
              </v-list-tile-action>
            </template>
            <span>{{ link.text }}</span>
          </v-tooltip>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Login from "@/components/user/Login.vue";
import { EventBus } from "@/event-bus.js";
export default {
  components: { Login },
  data() {
    return {
      drawer: false,
      links: [
        { icon: "dashboard", text: "Dashboard", route: "/dashboard" },
        { icon: "restore", text: "My Cycles", route: "/cycles" },
        { icon: "bar_chart", text: "Reports", route: "/reports" },
        { icon: "account_balance", text: "Accounts", route: "/accounts" }
      ],
      snackbar: {
        value: false,
        color: "",
        message: ""
      }
    };
  },
  computed: {
    userLogin() {
      return this.$store.getters.userLogin;
    }
  },
  methods: {
    logout() {
      this.$store.commit("changeStatus", false);
      this.$store.commit("changeId", null);
      this.drawer = false;
      this.$router.push({ name: "home" });
    }
  },

  created() {
    EventBus.$on("snackbar", payload => (this.snackbar = payload));
  }
};
</script>

<style>
</style>
