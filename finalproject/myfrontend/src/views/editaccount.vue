<template>
  <div class="bg">
    <div class="container">
      <div class="columns">
        <div class="column is-half has-text-centered mt-6" style="background-color:black; opacity: 100%;">
          <img
            v-if="info.user_image"
            :src="imagePath(info.user_image)"
            alt="myImage"
            style="width: 300px; height: 337px; object-fit: cover ; 
            border-bottom: 5px solid white; border-left: 10px solid white;
            border-top: 5px solid #ffdd57; border-right: 10px solid #ffdd57;"
            class="mt-5"
          />
          <!-- wellcome to 999auto -->
          <h1 class="is-size-4 mt-5" style="color:white; border: 1px solid white">Profile image</h1>
          <div v-if="!showEdit">
            <div class="column">
              <input
                class=""
                multiple
                type="file"
                accept="image/png, image/jpeg, image/webp"
                @change="selectImages"
              />
            </div>
            <div v-for="image in images" :key="image.id" class="is-one-quarter">
              <figure class="">
                <img
                  :src="showSelectImage(image)"
                  alt="Placeholder image"
                  style="width: 300px; height: 337px; object-fit: cover"
                />
              </figure>
            </div>
          </div>
        </div>
        <div class="column has-background-warning  mt-6">
          <p class="is-size-3 has-text-centered">Edit Account</p>
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
            <button class="button button is-dark" @click="edit()">Edit</button>
          </div>

          <div class="column mx-auto has-text-centered" v-show="!showEdit">
            <button class="button is-primary" @click="confirm()">
              confirm
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
  background-image: url("../assets/tecnicial.jpg");
  height: 1000px;
}
</style>