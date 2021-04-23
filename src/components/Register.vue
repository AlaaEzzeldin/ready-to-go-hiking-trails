
<template>
  <div id="Register">
    <v-container fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Register</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" @submit.prevent="submit">
                <v-text-field
                  id="name"
                  :rules="[rules.required, rules.length(3)]"
                  v-model="form.first_name"
                  prepend-icon="person"
                  name="name"
                  label="Name"
                  type="text"
                ></v-text-field>
                <v-text-field
                  id="email"
                  v-model="form.email"
                  :rules="[rules.email, rules.length(10)]"
                  prepend-icon="email"
                  name="email"
                  label="Email"
                  type="email"
                ></v-text-field>
                <v-text-field
                  id="phone_number"
                  v-model="form.phone_number"
                  :rules="[rules.length(8)]"
                  prepend-icon="phone"
                  name="phone_number"
                  label="Phone number"
                  type="phone"
                ></v-text-field>
                <v-text-field
                  id="password"
                  v-model="form.password"
                  :rules="[rules.password, rules.length(6)]"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                ></v-text-field>
                <v-text-field
                  id="confirm_password"
                  :rules="[
                    form.password === confirm_password || 'Password must match',
                    rules.password,
                  ]"
                  v-model="confirm_password"
                  prepend-icon="lock"
                  name="confirm_password"
                  label="Confirm password"
                  type="password"
                ></v-text-field>
                <p v-if="showError" id="error">Username already exists</p>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit" @click="submit"
                >Register</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import USER from "@/store/User.js";
export default {
  name: "Register",
  components: {},
  data() {
    return {
      form: {
        first_name: "",
        email: "",
        phone_number: "",
        password: "",
      },
      confirm_password: "",
      showError: false,
      rules: {
        email: (v) => !!(v || "").match(/@/) || "Please enter a valid email",
        length: (len) => (v) =>
          (v || "").length >= len ||
          `Invalid character length, required ${len}`,
        password: (v) =>
          !!(v || "").match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
          ) ||
          "Password must contain an upper case letter, a numeric character, and a special character",
        required: (v) => !!v || "This field is required",
        isNumebr: (v) => isNaN(v) || "Not a valid numebr",
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

    ...mapActions(["Register"]),
    async submit() {
      this.$refs.form.validate();
      try {
        const userObject = Object.create(USER);
        userObject.email = this.form.email;
        userObject.password = this.form.password;
        userObject.phone_number = this.form.phone_number;
        userObject.first_name = this.form.first_name;
        this.Register(userObject);
        this.$router.push("/home");
        this.showError = false;
      } catch (error) {
        this.showError = true;
      }
    },
  },
};
</script>
