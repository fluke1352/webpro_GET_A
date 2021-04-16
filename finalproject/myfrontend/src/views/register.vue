<template>
<<<<<<< HEAD
  <div  style="background-color: #34495e">
=======
  <div>
>>>>>>> parent of 0c61030 (Merge branch 'main' of https://github.com/fluke1352/webpro_GET_A into main)
    <div class="columns">
      <div class="column is-full has-background-primary">nev Bar</div>
    </div>
    <div class="container mt-6">
      <div class="columns">
<<<<<<< HEAD
        <!-- <div class="column is-half">
          <div style="color: white">wellcome to 999auto</div>
        </div> -->
        <div class="column is-three-fifths is-offset-one-fifth my-5" id="SingUp">
=======
        <div class="column is-half has-background-info">
          wellcome to 999auto
        </div>
        <div class="column has-background-warning">
>>>>>>> parent of 0c61030 (Merge branch 'main' of https://github.com/fluke1352/webpro_GET_A into main)
          <p class="is-size-3 has-text-centered">Sign up</p>
          <p class="has-text-centered">check your email to confirmation</p>

          <div class="columns column">
            <div class="column is-half xxxx">
              <label><p>name</p></label>
              <input
                class="input"
                type="text"
                id="FirstName"
                placeholder="ชื่อ"
                v-model="firstName"
              />
            </div>

            <div class="column is-half">
              <label><p>lastname</p></label>
              <input
                class="input"
                type="text"
                id="LasttName"
                placeholder="นามสกุล"
                v-model="lastName"
              />
            </div>
          </div>
          <div class="column">
            <h1 class="is-size-4">Profile image</h1>
            <input
              class="mb-5"
              multiple
              type="file"
              accept="image/png, image/jpeg, image/webp"
              @change="selectImages"
            />
          </div>
          <div
            v-for="image in images"
            :key="image.id"
            class="column is-one-quarter"
          >
            <div class="card">
              <div class="card-image">
                <figure class="image is-square">
                  <img :src="showSelectImage(image)" alt="Placeholder image" />
                </figure>
              </div>
            </div>
          </div>

          <div class="column">
            <label><p>phone number</p></label>
            <input
              class="input"
              type="text"
              id="phone"
              placeholder="เบอร์โทร"
              v-model="phoneNumber"
              maxlength="10"
            />
          </div>

          <div class="column">
            <label><p>user name</p></label>
            <input
              class="input"
              type="text"
              id="phone"
              placeholder="ชื่อบัญชีผู้ใช้"
              v-model="userName"
            />
          </div>

          <div class="column">
            <label><p>password</p></label>
            <input
              class="input"
              type="password"
              id="phone"
              placeholder="รหัสผ่าน"
              v-model="password"
            />
          </div>

          <div class="column">
            <label><p>comfirm password</p></label>
            <input
              class="input"
              type="password"
              id="phone"
              placeholder="ยืนยันรหัสผ่าน"
              v-model="confirmPassword"
            />
          </div>

          <div class="column mx-auto has-text-centered">
            <button class="button is-primary" @click="resgister()">
              Sign up
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
    selectImages(event) {
      this.images = event.target.files;
      console.log(this.images);
      this.test.push(event.target.files);
      console.log(this.test);
    },
    showSelectImage(image) {
      return URL.createObjectURL(image);
    },

    resgister() {
      let formData = new FormData();
      formData.append("firstName", this.firstName);
      formData.append("lastName", this.lastName);
      formData.append("phoneNumber", this.phoneNumber);
      formData.append("userName", this.userName);
      formData.append("password", this.password);
      this.images.forEach((image) => {
        formData.append("myImage", image);
      });

      if (this.password === this.confirmPassword) {
        axios
        .post("http://localhost:3000/register", formData)
          .then((response) => {
            this.alertregister = response.data.message;
            alert(this.alertregister);
            if (this.alertregister === "Add Complete") {
              this.$router.push("/login");
            } else {
              alert("Please try again");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      phoneNumber: null,
      userName: null,
      password: null,
      confirmPassword: null,
      alertregister: null,
      images: null,
      test: [],
    };
  },
};
</script>

<style scoped>
<<<<<<< HEAD
/* #FirstName{background-color: coral;} */
#SingUp {
  background-color: #191919;
  color: white;
  text-transform: uppercase;
  /* font-weight: 50000; */
}
/* .input input[type = text], .input input[type = "file"], .input input[type = "password"] */
.xxxx input[type = "text"]{
  color: rgb(179, 179, 179) !important;
  background: none;
  margin: 3px auto;
  text-align: center;
  border: 2px solid #3498db;
  border-radius: 24px;
  padding: 14px 10px;
  transition: 0.25s;
  
  
}
=======
>>>>>>> parent of 0c61030 (Merge branch 'main' of https://github.com/fluke1352/webpro_GET_A into main)
</style>