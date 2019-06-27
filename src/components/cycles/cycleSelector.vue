<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn slot="activator" v-on="on" dark small color="blue-grey" class="mt-3 mb-5">
        <span>Select a cycle</span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <v-layout justify-center row>
          <h2 class="blue-grey--text">Choose the cycle</h2>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-container>
            <v-layout row wrap>
              <v-radio-group
                v-for="cycle in cycles"
                :key="cycle.id"
                v-model="selectedCycle"
                :mandatory="true"
              >
                <v-radio :label="`${cycle.month} / ${cycle.year}`" :value="cycle"></v-radio>
              </v-radio-group>
            </v-layout>
          </v-container>
          <v-layout justify-center row>
            <v-btn
              @click="select(selectedCycle)"
              depressed
              small
              color="blue-grey"
              class="mx-0 mt-3 white--text"
            >select</v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "cycleSelector",
  props: {
    cycles: Array
  },
  data() {
    return {
      selectedCycle: null,
      dialog: false
    };
  },
  computed: {},
  methods: {
    select(cycle) {
      this.dialog = false;
      this.$emit("cycleSelected", cycle);
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

