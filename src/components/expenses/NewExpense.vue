<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-tooltip left>
        <v-btn slot="activator" v-on="on" fixed bottom right fab dark small color="red" class="btn">
          <v-icon>trending_down</v-icon>
        </v-btn>
        <span>Add a new Expense</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-card-title>
        <v-layout justify-center row>
          <h2 class="deep-orange--text">New Expense</h2>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field
            type="number"
            min="0"
            step="0.1"
            label="Value"
            v-model="value"
            prepend-icon="attach_money"
            color="deep-orange"
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
                color="deep-orange"
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
            color="deep-orange"
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

                <form class="ml-4 my-2">
                  <v-layout column>
                    <v-radio-group
                      v-for="account in accounts"
                      :key="account.id"
                      v-model="account_id"
                      :mandatory="true"
                    >
                      <v-radio color="deep-orange" :label="account.name" :value="account.id"></v-radio>
                    </v-radio-group>
                  </v-layout>
                </form>
              </v-flex>

              <v-flex xs6>
                <h3 class="grey--text mb-2">
                  <v-icon class="mr-2">category</v-icon>Category:
                </h3>

                <form class="ml-4 my-2">
                  <v-layout column>
                    <v-radio-group
                      v-for="category in categories"
                      :key="category.id"
                      v-model="category_id"
                      :mandatory="true"
                      :prepend-icon="category.icon"
                    >
                      <v-radio color="deep-orange" :label="category.name" :value="category.id"></v-radio>
                    </v-radio-group>
                  </v-layout>
                </form>
              </v-flex>
            </v-layout>
          </v-container>

          <v-layout justify-center row>
            <v-btn
              @click="create"
              depressed
              small
              color="deep-orange"
              class="mx-0 mt-3 white--text"
            >Create</v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
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
      feedback: null,
      dialog: false
    };
  },
  computed: {
    accounts() {
      return this.$store.getters.getAccounts;
    },
    categories() {
      return this.$store.getters.getCategories;
    },
    user_id() {
      return this.$store.getters.userId;
    }
  },
  created() {
    this.account_id = this.accounts[0].id;
  },
  methods: {
    create() {
      if (this.$refs.form.validate()) {
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
          .post("http://localhost:3000/expenses", {
            expense
          })
          .then(res => {
            console.log(res);
            if (res.status === 201) {
              this.dialog = false;
              this.setBalance(this.account_id, expense.value);
              this.$emit("activateSnackbar", {
                value: true,
                color: "success",
                message: "Expense successfuly created"
              });
              this.$store.commit("newExpense", expense);
            }
          })
          .catch(err => {
            console.log(err);
            this.dialog = false;
            this.$emit("activateSnackbar", {
              value: true,
              color: "error",
              message: "Sorry, but we couldn't create your expense"
            });
          });
        this.value = 0;
        this.description = "";
      }
    },
    setBalance(id, value) {
      value = -parseFloat(value);
      axios
        .post("http://localhost:3000/accounts/set_balance", { id, value })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.btn {
  margin-bottom: 90px;
  margin-right: 20px;
}
</style>

