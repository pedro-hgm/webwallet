<template>
  <div id="accounts">
    <div>
      <v-layout
        v-if="!hasAccount"
        justify-center
        row
        wrap
      >
        <v-flex xs12>
          <v-alert
            v-model="alert"
            color="blue-grey"
            outline
            dismissible
            icon="new_releases"
          >
            <h5 class="subheading">
              There are no accounts to display
            </h5>
          </v-alert>
        </v-flex>
      </v-layout>
    </div>
    <v-container class="my-5">
      <v-layout
        justify-center
        row
        wrap
      >
        <v-flex xs12>
          <h1 class="display-1 grey--text mb-5 text-xs-center">
            My Accounts
          </h1>
        </v-flex>
      </v-layout>
      <v-expansion-panel
        inset
        expand
      >
        <v-expansion-panel-content
          v-for="(account,index) in accounts"
          :key="index"
        >
          <template v-slot:header>
            <div class="subheading">
              {{ account.name }}
            </div>
          </template>
          <v-card>
            <v-layout
              justify-center
              row
              wrap
              class="pa-3"
            >
              <v-flex
                xs4
                md2
              >
                <div class="caption grey--text ml-2">
                  Balance
                </div>
                <div class="ml-2">
                  $ {{ account.balance }}
                </div>
              </v-flex>
              <v-flex
                xs4
                sm2
              >
                <div class="caption grey--text ml-2">
                  Type
                </div>
                <div class="ml-2">
                  {{ account.kind }}
                </div>
              </v-flex>
              <v-spacer />
              <v-flex
                xs2
                sm1
              >
                <UpdateAccount
                  :name="account.name"
                  :kind="account.kind"
                  :id="account.id"
                  @updateAccount="requestAccount"
                />
              </v-flex>
              <v-flex
                xs2
                sm1
              >
                <v-tooltip top>
                  <v-btn
                    slot="activator"
                    @click="deleteAccount(account.id)"
                    icon
                  >
                    <v-icon color="grey">
                      delete
                    </v-icon>
                  </v-btn>
                  <span>delete account</span>
                </v-tooltip>
              </v-flex>
            </v-layout>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
import UpdateAccount from "@/components/accounts/UpdateAccount.vue";
import axios from "axios";
import { EventBus } from "@/event-bus.js";
export default {
  name: "Accounts",
  components: { UpdateAccount },
  data() {
    return {
      alert: true
    };
  },
  methods: {
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (vm.$store.getters.userLogin === true) {
          next();
        } else {
          next({ name: "home" });
        }
      });
    },
    deleteAccount(id) {
      if (confirm("Are you sure? This action can't be undone.")) {
        axios
          .delete(`api/v1/accounts/${id}`)
          .then(res => {
            this.requestAccount();
            EventBus.$emit("snackbar", {
              value: true,
              color: "#81C784",
              message: "Account successfuly deleted"
            });
          })
          .catch(err => {
            console.log(err);
            EventBus.$emit("snackbar", {
              value: true,
              color: "#E57373",
              message: "Sorry, but we couldn't delete your account"
            });
          });
      }
    },
    requestAccount() {
      if (this.$store.getters.userId) {
        axios
          .get(`api/v1/accounts/${this.$store.getters.userId}`)
          .then(res => {
            this.$store.commit("setAccount", res.data);
          })
          .catch(err => console.log(err));
      }
    }
  },
  computed: {
    accounts() {
      return this.$store.getters.getAccounts;
    },
    hasAccount() {
      if (this.accounts.length) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
</style>
