<template>
  <div class="bgLogin">
    <!-- <div class="columns">
      <div class="column is-full has-background-warning">nev Bar</div>
    </div> -->

    <div class="container">
      <div class="columns">
        <div class="column is-half has-background-warning">
          <h2>Welcome to 999auto</h2>
        </div>
        <div class="column" id="Login">
          <p
            class="is-size-3 has-text-centered"
            style="color:white; border-bottom: 6px solid #ffdd57; margin-bottom: 10px; padding: 10px"
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
            <button class="button is-warning" @click="login()">login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "bulma/css/bulma.css";
export default {
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
          }
        });
    },
  },
  data() {
    return {
      username: null,
      password: null,
      alertlogin: null,
    };
  },
};
</script>

<style scoped>
#Login {
  background-color: #252525;
  color: white;
  text-transform: uppercase;
  padding: 5%;
}
.bgLogin {
  background-image: url("../assets/bgLogin.jpg");
}
.textInput input{
  /* background: none; */
  /* border: none; */
  margin-bottom: 10px;
  padding: 10px;
  color: white;
  float: left;
  font-size: 18px;
  outline: none;
}
.iconInput {
  text-align: center;
  margin-top: 5px;

}
</style>