<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-tooltip left>
        <v-btn
          slot="activator"
          v-on="on"
          fixed
          bottom
          right
          fab
          dark
          small
          color="blue-grey"
          class="btn"
        >
          <v-icon>restore</v-icon>
        </v-btn>
        <span>Create a new Cycle</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-card-title>
        <v-layout justify-center row>
          <h2 class="blue-grey--text">New Cycle</h2>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <p
          class="title mx-5"
        >Choose a period of time to create your cycle. Only the selected month and year will be taken into account. The day will always be the first of the month.</p>
        <v-form class="px-3" ref="form">
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
                color="blue-grey"
                v-model="date"
                label="Date"
                hint="Year and Month only"
                persistent-hint
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker :rules="rules" v-model="date" no-title></v-date-picker>
          </v-menu>

          <!-- <v-select
            :rules="rules"
            prepend-icon="account_balance"
            v-model="account_id"
            :items="accounts"
            item-text="name"
            item-value="id"
            label="Accounts"
            class="mt-3"
            multiple
          ></v-select>-->

          <!-- <v-container>
            <v-layout row justify-space-around>
              <v-flex xs12>
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
            </v-layout>
          </v-container>-->
          <v-layout justify-center row>
            <v-btn
              @click="create"
              depressed
              small
              color="blue-grey"
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
  name: "NewCycle",
  data() {
    return {
      // value: 0,
      date: "",
      // category_id: 1,
      // description: "",
      rules: [value => value.length > 0 || "Can't be blank"],
      // feedback: null,
      dialog: false
      // accounts: [],
      // categories: []
    };
  },
  computed: {
    user_id() {
      return this.$store.getters.userId;
    }
  },
  created() {
    // this.account_id = this.accounts[0].id;
  },
  methods: {
    create() {
      if (this.$refs.form.validate()) {
        let formattedDate = this.date.split("-");
        let formattedYear = parseInt(formattedDate[0], 10);
        let formattedMonth = parseInt(formattedDate[1], 10);
        // let formattedDay = parseInt(formattedDate[2], 10);

        const cycle = {
          year: formattedYear,
          month: formattedMonth,
          current: true,
          user_id: this.user_id
        };

        // this.setCurrent(this.user_id);

        axios
          .post("http://localhost:3000/cycles", {
            cycle
          })
          .then(res => {
            if (res.status === 201) {
              this.dialog = false;
              this.date = "";
              this.account_id = [];

              this.$emit("newCycle", res.data);
              // this.$emit("activateSnackbar", {
              //   value: true,
              //   color: "success",
              //   message: "Income successfuly created"
              // });

              // this.$store.commit("setAccount", res.data);
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
            //   message: "Sorry, but we couldn't create your income"
            // });
          });
        // this.$emit("endCycle");
      }
    }
    // setCurrent(id) {
    //   axios
    //     .post("http://localhost:3000/cycles/current", { id })
    //     .then(res => {
    //       console.log(res.data);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
  }
};
</script>

<style scoped>
.btn {
  margin-bottom: 40px;
  margin-right: 20px;
}
</style>

