<template>
  <div class="bg">
    <!-- <div class="container"> -->
    <div class="" style="margin-left: 170px; margin-right: 170px">
      <p class="has-text-centered is-size-1 mb-5 has-text-warning">ALL USERS</p>
      <div class="columns is-multiline">
        <div class="column is-3" v-for="(user, index) in data" :key="index">
          <div class="card has-background-black" style="border-radius: 10%" :class="{'has-background-warning has-text-black' : user.user_status != 'customer'}">
            <div class="card-image">
              <figure class="image">
                <img
                  :src="imagePath(user.user_image)"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div
              class="card-content has-text-centered has-background-black "
              style="opacity: 0.95"
            >
              <h3 class="has-text-warning is-size-6">
                Username : {{ user.user_username }}
              </h3>
              <h3 class="has-text-warning is-size-5">
                {{ user.user_fname + " " + user.user_lname }}
              </h3>
              <h3 class="has-text-warning is-size-6">
                Phone :
                {{
                  user.user_phone.slice(0, 3) +
                  "-" +
                  user.user_phone.slice(3, 6) +
                  "-" +
                  user.user_phone.slice(6)
                }}
              </h3>
              <h3 class="has-text-warning is-size-6">Role : {{user.user_status}}</h3>
            </div>
            <footer class="card-footer"  v-if="user.user_status == 'customer'">
              <a href="#" class="card-footer-item" @click="addadmin(user.user_id)" 
                >ADD TO ADMIN</a
              >
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import "bulma/css/bulma.css";
import bcrypt from "bcryptjs";
export default {
  created() {
    axios.post("10.0.142.187:3000/alluser").then((response) => {
      this.data = response.data.message;
      
      
    });
     axios.get("/user/me").then((res) => {
        this.info = res.data;
      });
  },
  methods: {
    imagePath(file_path) {
      if (file_path) {
        return "10.0.142.187:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    addadmin(id) {
      var password = prompt("Please enter your password:", "");
      if (bcrypt.compareSync(password , this.info.user_password)) {
        // this.showEdit = !this.showEdit;
        alert("correct password");
        axios.put("10.0.142.187:3000/alluser", {id: id}).then(() => {
          alert("add complete")
  
        });
      } else {
        alert("incorect password");
      }
    },
  },
  data() {
    return {
      data: [],
      info: [],
      // img: URL.createObjectURL(data.user_image),
    };
  },
};
</script>

<style scoped>
.bg {
  background-image: url("../assets/allcustomer.jpeg");
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.card {
  /* position: relative; */
  /* height: 360px; */
  overflow: hidden;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  transition: height 0.3s, box-shadow 0.3s;
}
.card:hover {
  /* height: 375px; */
  box-shadow: 10px 10px 20px 0px #202020;
}
.card-content {
  position: relative;
}
.card-image {
  /* position: absolute; */
  /* left: 1px;
  right: 1px; */
  /* margin: auto; */

  width: 70%;
  height: 300px;
  padding-top: 5%;
  padding-bottom: 5%;
  margin-left: 15%;
  margin-right: 15%;
  transition: 1s;
}
.card-image:hover {
  width: 90%;
  height: 300px;
  padding-top: 0%;
  padding-bottom: 0%;
  margin-left: 5%;
  margin-right: 5%;
}
body,
html {
  height: 100%;
}
</style>