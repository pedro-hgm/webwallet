<template>
  <v-dialog max-width="600px">
    <v-btn outline round class="ml-5" slot="activator">Sign Up</v-btn>
    <v-card>
      <v-card-title>
        <h2>Sign Up</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field label="Email" v-model="email" prepend-icon="email" :rules="rules"></v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
            type="password"
            prepend-icon="vpn_key"
            :rules="rules"
          ></v-text-field>
          <v-btn @click="submit" flat class="mx-0 mt-3">Join us</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      rules: [value => value.length > 5 || "Choose at least five characters"]
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        console.log(this.email, this.password);
      }
    }
  }
};
</script>