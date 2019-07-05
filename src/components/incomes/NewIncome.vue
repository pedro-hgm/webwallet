<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-tooltip :disabled="disabled" top>
        <v-btn :disabled="disabled" slot="activator" v-on="on" icon dark small>
          <v-icon large color="#81C784">trending_up</v-icon>
        </v-btn>
        <span>New Income</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-card-title>
        <v-layout justify-center row>
          <h2 class="grey--text">New Income</h2>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field
            :rules="rules"
            type="number"
            min="0"
            step="0.1"
            label="Value"
            v-model="value"
            prepend-icon="attach_money"
            color="#81C784"
          ></v-text-field>
          <v-menu
            :close-on-content-click="true"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :rules="rules"
                color="#81C784"
                v-model="date"
                label="Date"
                hint="YYYY/MM/DD format"
                persistent-hint
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker :rules="rules" v-model="date" color="#81C784"></v-date-picker>
          </v-menu>
          <v-textarea
            color="#81C784"
            prepend-icon="notes"
            label="Description"
            v-model="description"
          ></v-textarea>

          <v-select
            :items="accounts"
            v-model="account_id"
            label="Accounts"
            item-value="id"
            item-text="name"
            prepend-icon="account_balance"
            color="#81C784"
            class="mt-2"
          ></v-select>

          <v-layout justify-center row>
            <v-btn
              @click="closeDialog"
              depressed
              small
              color="#81C784"
              class="pa-1 mt-3 white--text"
            >cancel</v-btn>
            <v-btn
              @click="create"
              :loading="loading"
              depressed
              small
              color="#81C784"
              class="pa-1 mt-3 white--text"
            >Create</v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { EventBus } from "@/event-bus.js";
import { mapState } from "vuex";
export default {
  name: "NewIncome",
  data() {
    return {
      value: 0,
      date: "",
      account_id: "",
      description: "",
      rules: [value => value.length > 0 || "Can't be blank"],
      dialog: false,
      loading: false
    };
  },
  watch: {
    accounts() {
      this.setAccountId();
    }
  },
  computed: {
    ...mapState({
      accounts: state => state.userAccounts,
      user_id: state => state.userId
    }),
    disabled() {
      if (!this.accounts.length) {
        return true;
      } else {
        return false;
      }
    }
  },

  methods: {
    create() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        let formattedDate = this.date.split("-");
        let formattedYear = parseInt(formattedDate[0], 10);
        let formattedMonth = parseInt(formattedDate[1], 10);
        let formattedDay = parseInt(formattedDate[2], 10);

        const income = {
          value: this.value,
          year: formattedYear,
          month: formattedMonth,
          day: formattedDay,
          description: this.description,
          account_id: this.account_id,
          user_id: this.user_id
        };
        axios
          .post("api/v1/incomes", {
            income
          })
          .then(res => {
            this.loading = false;
            this.dialog = false;
            this.setBalance(this.account_id, income.value);

            EventBus.$emit("newIncome");
            EventBus.$emit("snackbar", {
              value: true,
              color: "#81C784",
              message: "Income successfuly created"
            });

            this.value = 0;
            this.description = "";
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
            this.dialog = false;
            EventBus.$emit("snackbar", {
              value: true,
              color: "#E57373",
              message: "Sorry, but we couldn't create your income"
            });
          });
      }
    },
    setBalance(id, value) {
      value = parseFloat(value);
      axios
        .post("api/v1/accounts/set_balance", {
          id,
          value
        })
        .then(res => {
          this.$emit("newIncome");
        })
        .catch(err => {
          console.log(err);
        });
    },
    closeDialog() {
      this.dialog = false;
    },
    setAccountId() {
      this.account_id = this.accounts[0].id;
    }
  }
};
</script>

<style scoped>
</style>

