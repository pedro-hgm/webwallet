<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-tooltip left>
        <v-btn slot="activator" v-on="on" icon>
          <v-icon color="grey">edit</v-icon>
        </v-btn>
        <span>update account</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-card-title>
        <v-layout justify-center row>
          <h2 class="grey--text">Update Account</h2>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field
            label="Account's name"
            v-model="accountName"
            prepend-icon="assignment"
            color="#5C6BC0"
          ></v-text-field>

          <v-select
            prepend-icon="account_balance"
            :items="type"
            label="Type"
            required
            color="#5C6BC0"
            v-model="accountKind"
          ></v-select>

          <v-layout justify-center row>
            <v-btn
              @click="closeDialog"
              depressed
              small
              color="#5C6BC0"
              class="pa-1 mt-3 white--text"
            >cancel</v-btn>
            <v-btn
              @click="update"
              :loading="loading"
              depressed
              small
              color="#5C6BC0"
              class="pa-1 mt-3 white--text"
            >update</v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { EventBus } from "@/event-bus.js";
export default {
  name: "UpdateAccount",
  props: {
    name: String,
    kind: String,
    id: Number
  },
  data() {
    return {
      accountName: this.name,
      accountKind: this.kind,
      rules: [value => value.length > 0 || "Can't be blank"],
      dialog: false,
      type: ["Checking Account", "Money", "Savings", "Investments", "Others"],
      loading: false
    };
  },
  methods: {
    update() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        const account = {
          name: this.accountName,
          kind: this.accountKind
        };

        axios
          .put(`api/v1/accounts/${this.id}`, {
            account
          })
          .then(res => {
            this.loading = false;
            this.dialog = false;
            this.$emit("updateAccount");

            EventBus.$emit("snackbar", {
              value: true,
              color: "#81C784",
              message: "Account successfuly updated"
            });
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
            this.dialog = false;
            EventBus.$emit("snackbar", {
              value: true,
              color: "#E57373",
              message: "Sorry, but we couldn't update your account"
            });
          });
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
