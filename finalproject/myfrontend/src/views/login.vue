<template>
  <div>
    <div class="columns">
      <div class="column is-full has-background-primary">nev Bar</div>
    </div>
    <div class="container mt-6">
      <div class="columns">
        <div class="column is-half has-background-info">
          welcome to 999auto
        </div>
        <div class="column has-background-warning">
          <p class="is-size-3 has-text-centered">Login</p>

          <div class="columns column">
            <div class="column is-half">
              <label><p>Username</p></label>
              <input
                class="input"
                type="text"
                id="Username"
                placeholder="ชื่อบัญชี"
                v-model="username"
              />
            </div>

            <div class="column is-half">
              <label><p>Password</p></label>
              <input
                class="input"
                type="password"
                id="Password"
                placeholder="รหัสผ่าน"
                v-model="password"
              />
            </div>
          </div>

         

          <div class="column mx-auto has-text-centered">
            <button class="button is-primary" @click="login()">
              login
            </button>
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
      
        axios.post("http://localhost:3000/login", {
        username: this.username,
        password: this.password,
      });
      
      
    },
  },
  data() {
    return {
      username: null,
      password: null,
    };
  },
};
</script>

<style scoped>
</style>