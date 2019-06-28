<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-tooltip left>
        <v-btn slot="activator" v-on="on" flat icon class="px-3">
          <v-icon>edit</v-icon>
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
            color="indigo"
          ></v-text-field>

          <v-select
            prepend-icon="account_balance"
            :items="type"
            label="Type"
            required
            color="indigo"
            v-model="accountKind"
          ></v-select>

          <v-layout justify-center row>
            <v-btn
              @click="update"
              depressed
              small
              color="indigo"
              class="mx-0 mt-3 white--text"
            >Update</v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
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
      type: ["Checking Account", "Money", "Savings", "Investments", "Others"]
    };
  },
  methods: {
    update() {
      if (this.$refs.form.validate()) {
        const account = {
          name: this.accountName,
          kind: this.accountKind
        };

        console.log(account, this.id);
        axios
          .put(`http://localhost:3000/accounts/${this.id}`, {
            account
          })
          .then(res => {
            if (res.status === 200) {
              this.dialog = false;
              this.requestAccount();
              // this.$store.commit("newAccount", res.data);
              // this.$emit("activateSnackbar", {
              //   value: true,
              //   color: "success",
              //   message: "Account successfuly created"
              // });
              // this.$router.push({
              //   name: "dashboard"
              // });
            }
          })
          .catch(err => {
            console.log(err);
            this.dialog = false;
            // this.$emit("activateSnackbar", {
            //   value: true,
            //   color: "error",
            //   message: "Sorry, but we couldn't create your account"
            // });
          });

        // this.name = "";
        // this.balance = "";
        // this.kind = "";
      }
    },
    requestAccount() {
      if (this.$store.getters.userId) {
        axios
          .get(`http://localhost:3000/accounts/${this.$store.getters.userId}`)
          .then(res => {
            if (res.status === 200) {
              this.$store.commit("setAccount", res.data);
            }
          })
          .catch(err => console.log(err));
      }
    }
  }
};
</script>

<style>
</style>
