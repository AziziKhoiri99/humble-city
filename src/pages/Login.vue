<template>
  <div class="login-page">
    <form
      @submit="(e) => (this.hadAccount ? this.signIn(e) : this.signUp(e))"
      class="login"
    >
      <div class="text-header">
        {{ this.hadAccount ? "Login" : "Register" }} To Humble City
      </div>
      <div class="input">
        <div v-if="!this.hadAccount">
          <label>Username:</label><br />
          <input v-model="this.username" type="text" required /><br />
        </div>
        <label>Email:</label><br />
        <input @keydown.space.prevent v-model="this.email" type="email" required /><br />
        <label>Password:</label><br />
        <input
          @keydown.space.prevent
          v-model="this.password"
          type="password"
          minlength="8"
          required
        /><br />
        <div style="text-align: center">
          <span v-if="this.hadAccount" @click="this.change"
            >i dont have an account</span
          >
          <span v-if="!this.hadAccount" @click="this.change"
            >i have an account</span
          >
        </div>
      </div>
      <div>
        <button
          type="button"
          class="button"
          style="background-color: grey"
          @click="this.$router.push('/')"
        >
          Back
        </button>
        <button type="submit" class="button" style="background-color: #1aad80">
          {{ this.hadAccount ? "Login" : "Register" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { API_URL } from "../components/utils";
export default {
  name: "login-page",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      hadAccount: true,
    };
  },
  props: {
    my: Object,
  },
  methods: {
    change() {
      (this.username = ""), (this.email = ""), (this.password = "");
      this.hadAccount ? (this.hadAccount = false) : (this.hadAccount = true);
    },
    saveData(payload) {
      this.$emit("loggingIn", payload);
      window.localStorage.setItem("user", JSON.stringify(payload));
      this.$router.push("/");
    },
    signUp(e) {
      e.preventDefault();
      const payload = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      axios.post(API_URL + "register", payload).then((res) => {
        if (res.data.failed) return alert(res.data.failed);

        this.saveData(res.data.payload);
      });
    },
    signIn(e) {
      e.preventDefault();
      const payload = {
        email: this.email,
        password: this.password,
      };
      axios.post(API_URL + "login", payload).then((res) => {
        if (res.data.failed) return alert(res.data.failed);

        this.saveData(res.data);
      });
    },
  },
};
</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login {
  background-color: white;
  width: 400px;
  padding: 40px 40px 20px 40px;
  border-radius: 30px;
}
.text-header {
  text-align: center;
  font-weight: 800;
  font-size: 1.5rem;
  padding: 10px;
}
.input {
  margin: 20px 0;
}
.input input {
  border: solid 1px black;
  width: 100%;
  border-radius: 16px;
  padding: 7px 20px;
}
.button {
  margin: 10px 0;
  width: 100%;
}
span {
  color: #0d6efd;
  text-decoration: underline;
  cursor: pointer;
}
</style>
