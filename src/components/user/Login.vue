<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn flat color="black" v-on="on">
        <span>Login</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2>Login</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field label="Email" v-model="email" prepend-icon="email" :rules="rules"></v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
            type="password"
            prepend-icon="vpn_key"
            :rules="rules"
          ></v-text-field>
          <v-btn @click="login" flat class="mx-0 mt-3">Login</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      rules: [value => value.length > 0 || "Can't be blank"],
      feedback: null,
      dialog: false
    };
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        const { email, password } = {
          email: this.email,
          password: this.password
        };
        axios
          .post("http://localhost:3000/users/login", {
            email,
            password
          })
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              this.dialog = false;
              this.$store.commit("changeStatus", true);
              this.$store.commit("changeId", res.data);
              this.$router.push({
                name: "dashboard"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });

        this.email = "";
        this.password = "";
      }
    }
  }
};
</script>

<style>
</style>

