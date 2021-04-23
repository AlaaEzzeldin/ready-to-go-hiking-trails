<template>
  <div id="login">
    <v-container fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" @submit.prevent="submit">
                <v-text-field
                  id="email"
                  v-model="form.email"
                  :rules="[rules.email]"
                  prepend-icon="email"
                  name="email"
                  label="Email"
                  type="email"
                ></v-text-field>
                <v-text-field
                  id="password"
                  v-model="form.password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                ></v-text-field>
                <v-checkbox
                  v-model="checkbox"
                  :rules="[rules.required]"
                  filled
                  :label="`Remember me`"
                ></v-checkbox>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" to="/register">Register</v-btn>
              <v-btn color="primary" type="submit" @click="submit">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      showError: false,
      checkbox: false,
      rules: {
        email: (v) => !!(v || "").match(/@/) || "Please enter a valid email",
        required: (v) => !!v || "This field is required",
      },
    };
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    ...mapActions(["LogIn"]),
    async submit() {
      this.$refs.form.validate();

      const User = new FormData();
      User.append("username", this.form.username);
      User.append("password", this.form.password);
      try {
        await this.LogIn(User);
        this.$router.push("/home");
        this.showError = false;
      } catch (error) {
        this.showError = true;
      }
    },
  },
};
</script>


