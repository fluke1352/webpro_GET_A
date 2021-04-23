<template>
  <div class="bg">
    <div class="container" style="margin-top:100px;margin-bottom:100px">
      <div class="columns has-text-warning" >
        <div class="column is-1"></div>
        <div
          class="column is-5 has-text-centered mt-6"
          style="background-color: #1a1a1a; opacity: 100% ;margin-top:100px;margin-bottom:100px;"
        >
          <img
            v-if="info.user_image && !images"
            :src="imagePath(info.user_image)"
            alt="myImage"
            style="width: 35%; margin-top: 50px; box-shadow: 5px 5px #888888"
            class="mt-5"
          />
          <div v-for="image in images" :key="image.id" class="is-one-quarter">
            <figure class="">
              <img
                :src="showSelectImage(image)"
                alt="Placeholder image"
                style="
                  width: 35%;
                  margin-top: 50px;
                  box-shadow: 5px 5px #888888;
                  object-fit: cover;
                "
              />
            </figure>
          </div>
          

          <!-- wellcome to 999auto -->
          <h1 class="is-size-4 mt-3" v-if="!images"><b> Profile image</b></h1>
          <h1 class="is-size-4 mt-3" v-if="images"><b> New profile</b></h1>
          <div v-if="!showEdit" class="">
            <div class="column ml-6">
              <input
                class=""
                multiple
                type="file"
                accept="image/png, image/jpeg, image/webp"
                @change="selectImages"
              />
            </div>
          </div>
          <div style="background-color:#FFDD57; width:50%; height:2px;  margin-left:20px;"></div>
          <div style="background-color:#FFDD57; width:50%; height:2px; margin-top:20px; margin-left:250px;" ></div>
        </div>
        <div
          class="column is-5 mt-6"
          style="background-color: #111111; margin-top:100px;margin-bottom:100px;"
        >
          <p class="is-size-3 has-text-centered"><b> Edit Account</b></p>
          <p class="has-text-centered">check your info to confirmation</p>

          <div class="columns column">
            <div class="column is-half">
              <label><p>name</p></label>
              <input
                class="input"
                type="text"
                id="FirstName"
                placeholder="ชื่อ"
                :value="info.user_fname"
                :disabled="true"
              />
            </div>

            <div class="column is-half">
              <label><p>lastname</p></label>
              <input
                class="input"
                type="text"
                id="LasttName"
                placeholder="นามสกุล"
                :value="info.user_lname"
                :disabled="true"
              />
            </div>
          </div>

          <div class="column">
            <label><p>phone number</p></label>
            <input
              class="input"
              type="text"
              id="phone"
              placeholder="เบอร์โทร"
              maxlength="10"
              :value="info.user_phone"
              :disabled="true"
            />
          </div>

          <div class="column">
            <label><p>user name</p></label>
            <input
              class="input"
              type="text"
              id="username"
              placeholder="ชื่อบัญชีผู้ใช้"
              :disabled="showEdit"
              :value="info.user_username"
            />
          </div>

          <div class="column">
            <label><p>password</p></label>
            <input
              class="input"
              type="password"
              id="password"
              placeholder="รหัสผ่าน"
              :disabled="showEdit"
              :value="info.user_password"
            />
          </div>

          <div class="column mx-auto has-text-centered" v-show="showEdit">
            <button class="button button is-warning" @click="edit()">
              <strong>Edit</strong>
            </button>
          </div>

          <div class="column mx-auto has-text-centered" v-show="!showEdit">
            <button class="button is-warning" @click="confirm()">
              <strong> Confirm</strong>
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
  created() {
    axios
      .post("http://localhost:3000/editaccount", {
        id: 23,
      })
      .then((response) => {
        this.info = response.data.message;
        console.log(this.info);
      });
  },
  methods: {
    edit() {
      var password = prompt("Please enter your password:", "");
      if (password == this.info.user_password) {
        this.showEdit = !this.showEdit;
      } else {
        alert("incorect password");
      }
    },
    confirm() {
      let username = document.getElementById("username").value;
      let pass = document.getElementById("password").value;
      let formData = new FormData();
      formData.append("username", username);
      formData.append("pass", pass);
      formData.append("id", 23);
      if (this.images) {
        // console.log("aaa");
        this.images.forEach((image) => {
          formData.append("myImage", image);
        });
      }
      // else{
      //   formData.append("myImage", info.user_image);
      // }

      axios
        .put("http://localhost:3000/editaccount", formData)
        .then((response) => {
          console.log(response);
          // this.info.user_username = username;
          // this.info.user_password = pass;
          this.showEdit = !this.showEdit;
          // this.info.user_image = this.images[0];
          this.fetchdb();
          alert("update complete");
        });
    },
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    selectImages(event) {
      this.images = event.target.files;
      console.log(this.images);
      this.test.push(event.target.files);
      console.log(this.test);
    },
    showSelectImage(image) {
      return URL.createObjectURL(image);
    },
    fetchdb() {
      axios
        .post("http://localhost:3000/editaccount", {
          id: 23,
        })
        .then((response) => {
          this.info = response.data.message;
          console.log(this.info);
        });
    },
  },
  data() {
    return {
      info: [],
      showEdit: true,
      images: null,
    };
  },
};
</script>

<style scoped>
.bg {
  background-image: url("https://images.pexels.com/photos/1030766/pexels-photo-1030766.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260");
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
body,
html {
  height: 100%;
}
</style>