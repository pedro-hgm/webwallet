<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" outline round class="ml-5" slot="activator">Sign Up</v-btn>
    </template>

    <v-card>
      <v-card-title>
        <v-layout justify-center row>
          <h2 class="grey--text">Sign Up</h2>
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
              @click="Signup"
              depressed
              small
              color="#212121"
              class="pa-1 mt-3 white--text"
            >Join us</v-btn>
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
  data() {
    return {
      email: "",
      password: "",
      rules: [value => value.length > 0 || "Can't be blank"],
      dialog: false
    };
  },
  methods: {
    Signup() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        };
        axios
          .post("http://localhost:3000/users", {
            user
          })
          .then(res => {
            console.log(res);
            if (res.statusText === "Created") {
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