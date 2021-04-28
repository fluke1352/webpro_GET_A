<template>
  <div id="app">
    <!-- navbar -->
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

          <a class="navbar-item"> Documentation!!! </a>

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
            <div class="mr-5 is-size-4">
              <router-link to="../usercart">
                <div class="buttons has-text-black mb-1">
                  <i class="fas fa-cart-arrow-down"></i>
                </div>
              </router-link>
            </div>
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
    <!-- modal -->
    <div class="modal is-active" v-show="isModal" @close="isModal = false">
      <div
        class="modal-background"
        style="background-color: #181818; opacity: 95%"
      ></div>
      <div class="modal-content" style="overflow: hidden; width: 31%">
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

    <router-view
      :key="$route.fullPath"
      style="padding-bottom: 70px; padding-top: 40px"
    />

    <footer class="footer has-background-dark" style="height: 41vh">
      <div class="content has-text-centered has-text-white">
        <h1 style="color: #ffdd57">999Auto ประดับยนต์</h1>
        <h6 style="color: #ffdd57">เปิด 8.00-19.00 หยุดวันอาทิตย์</h6>
        <br />
        <div class="columns">
          <div class="column">
            <h4 style="color: #ffdd57">About Us</h4>
            <p class="has-text-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div class="column">
            <h4 style="color: #ffdd57">Product</h4>
            <!-- <ul> -->
            <a href="#" style="color: whitesmoke">Speaker</a><br />
            <a href="#" style="color: whitesmoke">Radio</a><br />
            <a href="#" style="color: whitesmoke">Film</a><br />
            <a href="#" style="color: whitesmoke">Camera</a><br />
            <a href="#" style="color: whitesmoke">Sensor</a>
            <!-- </ul> -->
          </div>
          <div class="column">
            <h4 style="color: #ffdd57">Address</h4>
            <p>
              ที่อยู่: 83/3 ถนน ลาดกระบัง แขวง ลาดกระบัง เขตลาดกระบัง
              กรุงเทพมหานคร 10520
            </p>
          </div>
          <div class="column">
            <h4 style="color: #ffdd57">Contact Us</h4>
            <a
              href="https://www.facebook.com/999auto-1673907482865058/"
              style="color: white"
              ><i class="fab fa-facebook-square is-size-5"> 999auto</i></a
            ><br />
            <i class="fas fa-mobile-alt is-size-5 my-2"> 02-329-1368</i><br />
            <a href="https://goo.gl/maps/h3vhMUBMAfXC9g1m7" style="color: white"
              ><i class="fas fa-map-marker-alt is-size-5"> Look on map</i></a
            ><br />
          </div>
        </div>
      </div>
    </footer>
    <div class="has-background-warning has-text-white bottom">
      <div class="container is-fluid">
        <div class="columns">
          <div class="column">
            <p style="color: black">999Auto 2020.</p>
          </div>
          <div class="column has-text-right">
            <!-- <i class="fa fa-facebook-square"></i>
            <i class="fa fa-twitter-square"></i>
            <i class="fa fa-google-plus-square"></i>
            <i class="fa fa-linkedin-square"></i> -->
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
            this.isModal = false;
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
  color: #2c3e50;
}
.footer,
textfoot {
  background-color: #1d1d1d;
  color: #ffdd57;
}
#Login {
  background-color: #252525;
  color: white;
  text-transform: uppercase;
}
.textInput input {
  margin-bottom: 5px;
  float: left;
  font-size: 18px;
  outline: none;
}
.iconInput {
  text-align: center;
}
.iconInput i {
  text-align: center;
  margin-top: 13px;
  margin-left: 7px;
}
</style>
