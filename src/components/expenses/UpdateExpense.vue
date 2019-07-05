<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
  >
    <template v-slot:activator="{ on }">
      <v-tooltip top>
        <v-btn
          slot="activator"
          v-on="on"
          icon
          dark
          small
        >
          <v-icon color="grey">
            edit
          </v-icon>
        </v-btn>
        <span>Edit Expense</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-card-title>
        <v-layout
          justify-center
          row
        >
          <h2 class="grey--text">
            Edit Expense
          </h2>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-form
          class="px-3"
          ref="form"
        >
          <v-textarea
            color="#E57373"
            prepend-icon="notes"
            label="Description"
            v-model="expenseDescription"
          />
          <v-select
            label="Categories"
            color="#E57373"
            v-model="category_id"
            :items="categories"
            item-text="name"
            item-value="id"
            prepend-icon="category"
          />

          <v-layout
            justify-center
            row
          >
            <v-btn
              @click="closeDialog"
              depressed
              small
              color="#E57373"
              class="pa-1 mt-3 white--text"
            >
              cancel
            </v-btn>
            <v-btn
              @click="update"
              :loading="loading"
              depressed
              small
              color="#E57373"
              class="pa-1 mt-3 white--text"
            >
              Update
            </v-btn>
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
  name: "UpdateAccount",
  props: {
    description: String,
    id: Number,
    category: Number
  },
  data() {
    return {
      expenseDescription: this.description,
      rules: [value => value.length > 0 || "Can't be blank"],
      dialog: false,
      loading: false,
      category_id: this.category
    };
  },
  computed: {
    ...mapState({
      categories: state => state.categories
    })
  },
  methods: {
    update() {
      if (confirm("Are you sure?")) {
        this.loading = true;

        const expense = {
          description: this.expenseDescription,
          category_id: this.category_id
        };

        axios
          .put(`api/v1/expenses/${this.id}`, {
            expense
          })
          .then(res => {
            this.loading = false;
            this.dialog = false;
            this.$emit("updateExpense");

            EventBus.$emit("snackbar", {
              value: true,
              color: "#81C784",
              message: "Expense successfuly updated"
            });
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
            this.dialog = false;
            EventBus.$emit("snackbar", {
              value: true,
              color: "#E57373",
              message: "Sorry, but we couldn't update your expense"
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
