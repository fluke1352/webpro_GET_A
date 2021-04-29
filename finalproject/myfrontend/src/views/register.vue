<template>
  <div class="bgSignUp">
    <div class="container">
      <div class="columns">
        <div class="my-5 column is-half is-offset-one-quarter" id="SingUp">
          <p class="is-size-3 has-text-centered">Sign up</p>
          <p class="has-text-centered has-text-warning">
            check your email to confirmation
          </p>

          <div class="columns column">
            <div class="column is-half">

              <label><p>name</p></label>
              <input
              v-model="$v.firstName.$model"
              :class="{ 'is-danger': $v.firstName.$error }"
              class="input"
              id="firstName"
              placeholder="ชื่อ"
              type="text"
            />
            </div>

            <div class="column is-half">
              <label><p>lastname</p></label>
              <input
              v-model="$v.lastName.$model"
               :class="{ 'is-danger': $v.lastName.$error }"
              class="input"
              placeholder="นามสกุล"
              type="text"
            />
            </div>
          </div>
          <div class="column has-text-warning">
            <h1 class="is-size-4">Profile image</h1>
            <div class="control has-icons-left">
              <input
                class="mb-5"
                :class="{ 'is-danger': $v.images.$error }"
                multiple
                type="file"

                accept="image/png, image/jpeg, image/webp"
                @change="selectImages"
              />
            </div>
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
              v-model="$v.phoneNumber.$model"
              :class="{ 'is-danger': $v.phoneNumber.$error }"
              class="input"
              placeholder="เบอร์โทร"
              type="text"
            />
          </div>

          <div class="column">
            <label><p>username</p></label>
            <input
              v-model="$v.userName.$model"
              :class="{ 'is-danger': $v.userName.$error }"
              class="input"
              placeholder="ชื่อบัญชี"
              type="text"
            />
          </div>

          <div class="column">
            <label><p>password</p></label>
             <input
              v-model="$v.password.$model"
              :class="{ 'is-danger': $v.password.$error }"
              class="input"
              type="password"
              placeholder="รหัสผ่าน"
            />
          </div>

          <div class="column">
            <label><p>comfirm password</p></label>
            <input
              v-model="$v.confirmPassword.$model"
              :class="{ 'is-danger': $v.confirmPassword.$error }"
              class="input"
              type="password"
              placeholder="ยืนยันรหัสผ่าน"
            />
          </div>

          <div class="column mx-auto has-text-centered">
            <button class="button is-warning" @click="resgister()">
              <strong> Sign up</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {required,minLength,maxLength,sameAs} from "vuelidate/lib/validators";
import "bulma/css/bulma.css";


function mobile(value) {
  return !!value.match(/0[0-9]{9}/);
}
function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}
export default {
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
  methods: {
    selectImages(event) {
      this.images = event.target.files;
      this.test.push(event.target.files);
    },
    showSelectImage(image) {
      return URL.createObjectURL(image);
    },
    resgister() {
      this.$v.$touch();
      let formData = new FormData();
      formData.append("firstName", this.firstName);
      formData.append("lastName", this.lastName);
      formData.append("phoneNumber", this.phoneNumber);
      formData.append("userName", this.userName);
      formData.append("password", this.password);
      this.images.forEach((image) => {
        formData.append("myImage", image);
      });
      if (!this.$v.$invalid) {
        axios
          .post("http://localhost:3000/register", formData)
          .then((response) => {
            this.alertregister = response.data.message;
            alert(this.alertregister);
            this.$router.push("/login");    
          })
          .catch((err) => {
            alert(err.response.data.details.message);
          });
      }
    },

  },
      validations: {
      userName: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(20),
      },
      firstName: {
        required,
        maxLength: maxLength(100),
      },
      lastName: {
        required,
        maxLength: maxLength(100),
      },
      images: {
         required 
      },
      phoneNumber: {
        required: required,
        mobile: mobile,
      },
      password: {
        required: required,
        minLength: minLength(6),
        complex: complexPassword,
      },
      confirmPassword: {
        sameAs: sameAs("password"),
      },
    },

};
</script>

<style scoped>
/* #FirstName{background-color: coral;} */
#SingUp {
  background-color: #252525;
  color: white;
  text-transform: uppercase;
  border-radius: 1%;
  /* font-weight: 50000; */
  
}
.bgSignUp {
  background-image: url("../assets/bgSignUp.jpg");
}

/* .input input[type = text], .input input[type = "file"], .input input[type = "password"] */
</style>