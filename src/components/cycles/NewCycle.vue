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
            <v-date-picker color="blue-grey" :rules="rules" v-model="date"></v-date-picker>
          </v-menu>
          <v-layout justify-center row>
            <v-btn
              @click="closeDialog"
              depressed
              small
              color="blue-grey"
              class="pa-1 mt-3 white--text"
            >cancel</v-btn>
            <v-btn
              @click="create"
              :loading="loading"
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
import { EventBus } from "@/event-bus.js";
export default {
  name: "NewCycle",
  data() {
    return {
      date: "",
      rules: [value => value.length > 0 || "Can't be blank"],
      dialog: false,
      loading: false
    };
  },
  computed: {
    user_id() {
      return this.$store.getters.userId;
    }
  },
  methods: {
    create() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        let formattedDate = this.date.split("-");
        let formattedYear = parseInt(formattedDate[0], 10);
        let formattedMonth = parseInt(formattedDate[1], 10);

        const cycle = {
          year: formattedYear,
          month: formattedMonth,
          current: true,
          user_id: this.user_id
        };

        axios
          .post("api/v1/cycles", {
            cycle
          })
          .then(res => {
            this.loading = false;
            this.dialog = false;
            this.date = "";
            this.account_id = [];

            this.$emit("newCycle", res.data);
            EventBus.$emit("snackbar", {
              value: true,
              color: "#81C784",
              message: "Cycle successfuly created"
            });
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
            this.dialog = false;
            EventBus.$emit("snackbar", {
              value: true,
              color: "#E57373",
              message: "Sorry, but we couldn't create your expense"
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

<style scoped>
.btn {
  margin-bottom: 40px;
  margin-right: 20px;
}
</style>

