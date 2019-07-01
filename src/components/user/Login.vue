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
        <v-layout justify-center row>
          <h2 class="grey--text">Login</h2>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field
            color="#212121"
            label="Email"
            v-model="email"
            prepend-icon="email"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            color="#212121"
            label="Password"
            v-model="password"
            type="password"
            prepend-icon="vpn_key"
            :rules="rules"
          ></v-text-field>

          <v-layout justify-center row>
            <v-btn
              @click="login"
              depressed
              small
              color="#212121"
              class="pa-1 mt-3 white--text"
            >login</v-btn>
            <v-btn
              @click="closeDialog"
              depressed
              small
              color="#212121"
              class="pa-1 mt-3 white--text"
            >cancel</v-btn>
          </v-layout>
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
    },
    closeDialog() {
      this.dialog = false;
    }
  }
};
</script>

<style>
</style>

