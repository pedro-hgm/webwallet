<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-tooltip top>
        <v-btn slot="activator" v-on="on" icon dark small class="btn">
          <v-icon large color="#5C6BC0">account_balance</v-icon>
        </v-btn>
        <span>New Account</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-card-title>
        <v-layout justify-center row>
          <h2 class="grey--text">New Account</h2>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field
            label="Account's name"
            v-model="name"
            prepend-icon="assignment"
            :rules="rules"
            color="#5C6BC0"
          ></v-text-field>
          <v-text-field
            label="Initial balance"
            v-model="balance"
            type="number"
            step="0.1"
            min="0"
            prepend-icon="attach_money"
            :rules="rules"
            color="#5C6BC0"
          ></v-text-field>
          <v-select
            prepend-icon="account_balance"
            :items="type"
            :rules="rules"
            label="Type"
            required
            color="#5C6BC0"
            v-model="kind"
          ></v-select>

          <v-layout justify-center row>
            <v-btn
              @click="create"
              depressed
              small
              color="#5C6BC0"
              class="pa-1 mt-3 white--text"
            >create</v-btn>
            <v-btn
              @click="closeDialog"
              depressed
              small
              color="#5C6BC0"
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
  name: "NewAccount",
  data() {
    return {
      name: "",
      balance: "",
      kind: "",
      rules: [value => value.length > 0 || "Can't be blank"],
      feedback: null,
      dialog: false,
      type: ["Checking Account", "Money", "Savings", "Investments", "Others"]
    };
  },
  methods: {
    create() {
      if (this.$refs.form.validate()) {
        const account = {
          name: this.name,
          balance: this.balance,
          kind: this.kind,
          user_id: this.$store.getters.userId
        };

        axios
          .post("http://localhost:3000/accounts", {
            account
          })
          .then(res => {
            if (res.status === 201) {
              this.dialog = false;
              this.$store.commit("newAccount", res.data);
              this.$emit("activateSnackbar", {
                value: true,
                color: "success",
                message: "Account successfuly created"
              });
              // this.$router.push({
              //   name: "dashboard"
              // });
            }
          })
          .catch(err => {
            console.log(err);
            this.dialog = false;
            this.$emit("activateSnackbar", {
              value: true,
              color: "error",
              message: "Sorry, but we couldn't create your account"
            });
          });

        this.name = "";
        this.balance = "";
        this.kind = "";
      }
    },
    closeDialog() {
      this.dialog = false;
    }
  }
};
</script>

<style scoped>
</style>

