<template>
  <div id="app">
    <nav
      class="navbar"
      role="navigation"
      aria-label="main navigation"
      style="background-color: #ffdd57"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="../src/assets/logo999Auto.png" width="112" height="28" />
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item"> Home </a>

          
          <a class="navbar-item "> Documentation!!! </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"> More </a>

            <div class="navbar-dropdown">
              <a class="navbar-item"> About </a>
              <a class="navbar-item"> Jobs </a>
              <a class="navbar-item"> Contact </a>
              <hr class="navbar-divider" />
              <a class="navbar-item"> Report an issue </a>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons" @click="isModal = true">
              <a
                class="button has-text-warning"
                style="background-color: #252525"
              >
                <strong>Log in</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div
      class="modal is-active"
      v-show="isModal"
      @close="isModal = false"
      
    >
      <div
        class="modal-background"
        style="background-color: #181818; opacity: 95%"
      ></div>
      <div class="modal-content" style="overflow: hidden; width:31%;">
        <!-- Any other Bulma elements you want -->
        <div class="columns is-centered">
          <div class="column mt-6" id="Login">
            <p
              class="is-size-3 has-text-centered"
              style="
                color: white;
                border-bottom: 6px solid #ffdd57;
                margin-bottom: 10px;
                padding: 10px auto;
              "
            >
              Login
            </p>

            <div class="column is-12">
              <div class="columns">
                <div class="column is-1 iconInput">
                  <i class="fas fa-user"></i>
                </div>
                <div class="column textInput">
                  <input
                    class="input"
                    type="text"
                    id="Username"
                    placeholder="Username"
                    v-model="username"
                  />
                </div>
              </div>
            </div>
            <div class="column is-12">
              <div class="columns">
                <div class="column is-1 iconInput">
                  <i class="fas fa-lock"></i>
                </div>
                <div class="column textInput">
                  <input
                    class="input"
                    type="password"
                    id="Password"
                    placeholder="Password"
                    v-model="password"
                  />
                </div>
              </div>
            </div>

            <div class="column mx-auto has-text-centered">
              <button class="button is-warning" @click="login()">
                <strong>Login</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="isModal = false"
      ></button>
    </div>

    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import axios from "axios";
import "bulma/css/bulma.css";
export default {
  name: "App",
  created() {},
  methods: {
    login() {
      axios
        .post("http://localhost:3000/login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          this.alertlogin = response.data.message;
          alert(this.alertlogin);
          if (this.alertlogin === "login success") {
            this.$router.push("/");
            this.$router.isModal = false;
          }
        });
    },
  },
  data() {
    return {
      username: null,
      password: null,
      alertlogin: null,
      isModal: false,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 10px; */
}
#Login {
  background-color: #252525;
  color: white;
  text-transform: uppercase;
  /* padding: 5%; */
}
.textInput input {
  /* background: none; */
  /* border: none; */
  margin-bottom: 5px;
  /* padding: 10px; */
  /* color: white; */
  float: left;
  font-size: 18px;
  outline: none;
}
.iconInput {
  text-align: center;
  /* margin-top: 5px; */
}
.iconInput i{
  text-align: center;
  margin-top: 13px;
  margin-left: 7px;
  
}
</style>
