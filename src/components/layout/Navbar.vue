<template>
  <nav>
    <v-toolbar app flat color="grey lighten-2">
      <v-toolbar-side-icon v-if="userLogin" @click="drawer = !drawer" class="black--text"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase black--text">
        <span class="font-weight-light">web</span>
        <span>wallet</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <p v-if="email" class="mt-3 subheading">{{ email }}</p>
      <Login v-if="!userLogin"/>
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
          <!-- <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          <v-list-tile-content></v-list-tile-content>-->
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Login from "@/components/user/Login.vue";
export default {
  components: { Login },
  data() {
    return {
      drawer: false,
      links: [
        { icon: "dashboard", text: "Dashboard", route: "/dashboard" },
        { icon: "restore", text: "My Cycles", route: "/cycles" },
        { icon: "bar_chart", text: "Reports", route: "/reports" }
      ],
      snackbar: false,
      email: null
    };
  },
  methods: {
    logout() {
      this.$store.commit("changeStatus", false);
      this.$store.commit("changeId", null);
      this.$router.push({ name: "home" });
      this.email = null;
    },
    requestEmail() {
      if (this.$store.getters.userId) {
        axios
          .get(`http://localhost:3000/users/${this.$store.getters.userId}`)
          .then(res => {
            console.log(res);
            this.email = res.data;
          })
          .catch(err => console.log(err));
      }
    }
  },
  computed: {
    userLogin() {
      this.requestEmail();
      return this.$store.getters.userLogin;
    }
  },
  created() {}
};
</script>

<style>
</style>
