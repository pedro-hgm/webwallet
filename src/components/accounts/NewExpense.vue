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
        <h2>New Expense</h2>
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
            color="orange"
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
                color="orange"
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
          <v-textarea color="orange" prepend-icon="notes" label="Description" v-model="description"></v-textarea>
          <!-- <v-select
            prepend-icon="account_balance"
            :items="accounts"
            label="Account"
            required
            color="orange"
            v-model="account_id"
          ></v-select>-->
          <v-container>
            <v-layout row justify-space-around>
              <v-flex xs6>
                <h3 class="grey--text mb-2">
                  <v-icon class="mr-2">account_balance</v-icon>Account:
                </h3>

                <form
                  :rules="rules"
                  class="ml-4 my-2"
                  v-for="account in accounts"
                  :key="account.id"
                >
                  <input v-model="account_id" type="radio" :name="account.name" :value="account.id">
                  <span class="ml-1 subheading grey--text font-weight-bold">{{ account.name }}</span>
                  <br>
                </form>
              </v-flex>

              <v-flex xs6>
                <h3 class="grey--text mb-2">
                  <v-icon class="mr-2">category</v-icon>Category:
                </h3>

                <form
                  :rules="rules"
                  class="ml-4 my-2"
                  v-for="category in categories"
                  :key="category.id"
                >
                  <v-icon class="mr-2">{{category.icon}}</v-icon>
                  <input
                    v-model="category_id"
                    type="radio"
                    :name="category.name"
                    :value="category.id"
                  >
                  <span class="ml-1 subheading grey--text font-weight-bold">{{ category.name }}</span>
                  <br>
                </form>
              </v-flex>
            </v-layout>
          </v-container>

          <v-btn @click="create" flat small color="orange" class="mx-0 mt-3">Create</v-btn>
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
      // accounts: [],
      // categories: []
    };
  },
  computed: {
    accounts() {
      return this.$store.getters.getAccounts;
    },
    categories() {
      return this.$store.getters.getCategories;
    },
    // account_id() {
    //   return this.accounts[0].id;
    // },
    user_id() {
      return this.$store.getters.userId;
    }
  },
  created() {
    // this.accounts = this.$store.getters.getAccounts;
    // console.log(this.accounts);
    // this.categories = this.$store.getters.getCategories;
    this.account_id = this.accounts[0].id;
  },
  methods: {
    create() {
      if (this.$refs.form.validate()) {
        let formattedDate = this.date.split("-");
        // formattedDate.pop();
        // formattedDate = formattedDate.join("");
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
              this.$emit("activateSnackbar", {
                value: true,
                color: "success",
                message: "Expense successfuly created"
              });
              // this.$store.commit("setAccount", res.data);
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
              message: "Sorry, but we couldn't create your expense"
            });
          });
        this.value = 0;
        this.description = "";
      }
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

