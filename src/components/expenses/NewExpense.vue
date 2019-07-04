<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-tooltip :disabled="disabled" top>
        <v-btn :disabled="disabled" slot="activator" v-on="on" icon dark small>
          <v-icon large color="#E57373">trending_down</v-icon>
        </v-btn>
        <span>New Expense</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-card-title>
        <v-layout justify-center row>
          <h2 class="grey--text">New Expense</h2>
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
            color="#E57373"
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
                color="#E57373"
                v-model="date"
                label="Date"
                hint="YYYY/MM/DD format"
                persistent-hint
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker :rules="rules" v-model="date" no-title></v-date-picker>
          </v-menu>
          <v-textarea
            color="#E57373"
            prepend-icon="notes"
            label="Description"
            v-model="description"
          ></v-textarea>

          <v-container>
            <v-layout row justify-space-around>
              <v-flex xs6>
                <h3 class="grey--text mb-2">
                  <v-icon class="mr-2">account_balance</v-icon>Account:
                </h3>

                <v-layout column>
                  <v-radio-group
                    v-for="account in accounts"
                    :key="account.id"
                    v-model="account_id"
                    :mandatory="true"
                  >
                    <v-radio color="#E57373" :label="account.name" :value="account.id"></v-radio>
                  </v-radio-group>
                </v-layout>
              </v-flex>

              <v-flex xs6>
                <h3 class="grey--text mb-2">
                  <v-icon class="mr-1">category</v-icon>Category:
                </h3>

                <v-layout column>
                  <v-radio-group
                    v-for="category in categories"
                    :key="category.id"
                    v-model="category_id"
                    :mandatory="true"
                    :prepend-icon="category.icon"
                  >
                    <v-radio color="#E57373" :label="category.name" :value="category.id"></v-radio>
                  </v-radio-group>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>

          <v-layout justify-center row>
            <v-btn
              @click="create"
              :loading="loading"
              depressed
              small
              color="#E57373"
              class="pa-1 mt-3 white--text"
            >Create</v-btn>
            <v-btn
              @click="closeDialog"
              depressed
              small
              color="#E57373"
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
import { EventBus } from "@/event-bus.js";
import { mapState } from "vuex";
export default {
  name: "NewExpense",
  data() {
    return {
      value: 0,
      date: "",
      account_id: "",
      category_id: 1,
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
      categories: state => state.categories,
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

        const expense = {
          value: this.value,
          year: formattedYear,
          month: formattedMonth,
          day: formattedDay,
          description: this.description,
          account_id: this.account_id,
          category_id: this.category_id,
          user_id: this.user_id
        };
        axios
          .post("api/v1/expenses", {
            expense
          })
          .then(res => {
            this.loading = false;
            this.dialog = false;

            this.setBalance(this.account_id, expense.value);

            EventBus.$emit("newExpense");
            EventBus.$emit("snackbar", {
              value: true,
              color: "#81C784",
              message: "Expense successfuly created"
            });

            this.value = 0;
            this.description = "";
          })
          .catch(err => {
            console.log(err);
            this.dialog = false;
            EventBus.$emit("snackbar", {
              value: true,
              color: "#E57373",
              message: "Sorry, but we couldn't create your expense"
            });
          });
      }
    },
    setBalance(id, value) {
      value = -parseFloat(value);
      axios
        .post("api/v1/accounts/set_balance", {
          id,
          value
        })
        .then(res => {
          this.$emit("newExpense");
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

