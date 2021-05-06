<template>
  <div class="bgAddpro">
    <div
      class="container is-widescreen is-centered"
    >
      <section class="section" v-if="error">
        <div class="container is-widescreen">
          <div class="notification is-danger">
            {{ error }}
          </div>
        </div>
      </section>
      <section class="hero">
        <div class="hero-body" style="width: 40%; margin-left: 40%; margin-bottom: 20px">
          <p class="title text">ข้อมูลสินค้า&nbsp;&nbsp;<i class="fas fa-car">  </i></p>
          
        </div>
        <div style="background-color: #ffdd57; width: 60%; height:5px; margin-left: 19%; margin-top:-28px; margin-bottom:28px" ></div>
      </section>
      <section class="px-6">
        <label class="label text"
          ><i class="far fa-images">&nbsp;รูปภาพสินค้า</i></label
        >
        <input
          class="mb-5 text"
          multiple
          type="file"
          accept="image/png, image/jpeg, image/webp"
          @change="selectImages"
        />

        <div v-if="images" class="columns is-multiline is-centered" >
          <div
            v-for="(image, index) in images"
            :key="image.id"
            class="column is-one-quarter"
          >
            <div class="card" >
              <div class="card-image">
                <figure class="image is-4by3">
                  <img :src="showSelectImage(image)" alt="Placeholder image" />
                </figure>
              </div>
              <footer class="card-footer has-background-warning" style="border-top:black 3px solid">
                <a
                  @click="deleteSelectImage(index)"
                  class="card-footer-item has-text-black"
                  ><b>Delete</b> </a
                >
              </footer>
            </div>
          </div>
        </div>

        <div class="field mt-5">
          
          <label class="label text">ชื่อสินค้า</label>
          <div class="control">
            <input
              v-model="productname"
              class="input is-warning"
              type="text"
              placeholder="ชื่อสินค้า"
            />
          </div>
        </div>
        <div class="field mt-5">
          <label class="label text">ประเภทสินค้า</label>
          <div class="select is-warning">
            <select v-model="productcategory">
              <option>speaker</option>
              <option>film</option>
              <option>radio</option>
              <option>camera</option>
              <option>sensor</option>
            </select>
          </div>
        </div>
        <div class="field mt-5">
          <label class="label text">ชนิดสินค้า</label>
          <div class="control">
            <input
              v-model="producttype"
              class="input is-warning"
              type="text"
              placeholder="ชนิดสินค้า"
            />
          </div>
        </div>
        <div class="field mt-5">
          <label class="label text">ยี่ห้อ</label>
          <div class="control">
            <input
              v-model="productbrand"
              class="input is-warning"
              type="text"
              placeholder="ยี่ห้อสินค้า"
            />
          </div>
        </div>

        <div class="field mt-5">
          <label class="label text">ราคา</label>
        </div>
        <div class="field has-addons">
          <p class="control">
            <span class="select is-warning">
              <select>
                <option>฿</option>
              </select>
            </span>
          </p>
          <p class="control">
            <input
              class="input is-warning"
              type="text"
              v-model="productprice"
              placeholder="ราคาสินค้า"
            />
          </p>
        </div>
        <div class="field mt-5">
          <label class="label text">จำนวนสินค้า</label>
          <p class="control"></p>
          <p class="control">
            <input
              class="input is-warning"
              type="number"
              v-model="productamount"
              placeholder="จำนวน"
              min="0"
            />
          </p>
        </div>
        <div class="field">
          <label class="label text">รายละเอียด</label>
          <div class="control">
            <textarea
              v-model="description"
              class="textarea is-warning"
              placeholder="รายละเอียดสินค้า"
            ></textarea>
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button
              @click="submitproduct"
              class="button is-warning has-text-black"
            >
              <strong>Submit</strong>
            </button>
          </div>
          <div class="control">
            <button
              @click="$router.go(-1)"
              class="button is-black has-text-warning"
              
            ><b>Cancel</b>
              
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import "bulma/css/bulma.css";
export default {
  data() {
    return {
      blog: {},
      error: null,
      images: [],
      productname: "",
      producttype: "",
      productcategory: "speaker",
      productprice: 0,
      description: null,
      productamount: 0,
      productbrand: "",
      alertadd: "",
    };
  },
  methods: {
    selectImages(event) {
      this.images = event.target.files;
      console.log(this.images);
    },
    showSelectImage(image) {
      return URL.createObjectURL(image);
    },
    deleteSelectImage(index) {
      console.log(this.images);
      this.images = Array.from(this.images);
      this.images.splice(index, 1);
    },
    submitproduct() {
      let formData = new FormData();
      formData.append("name", this.productname);
      formData.append("category", this.productcategory);
      formData.append("type", this.producttype);
      formData.append("brand", this.productbrand);
      formData.append("price", this.productprice);
      formData.append("amount", this.productamount);
      formData.append("description", this.description);
      this.images.forEach((image) => {
        formData.append("myImage", image);
      });

      axios
        .post("http://localhost:3000/addproduct", formData)
        .then((response) => {
          this.alertadd = response.data.message;
          alert(this.alertadd);
        })
        .catch((e) => console.log(e.response.data));
    },
  },
};
</script>

<style>
.text {
  color: #ffdd57;
}

input, textarea, select,  button{
  border: #ffdd57;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  transition: height 0.3s, box-shadow 0.5s;
}
input:hover , textarea:hover, select:hover , button:hover{
   box-shadow: 8px 8px 18px 0px #ffdd57;
}
.bgAddpro {
  background-image: url("../assets/bgAdd.jpg");
}
.card {
  position: relative;
  overflow: hidden;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  transition: height 0.3s, box-shadow 0.3s;
}

.card:hover {
  box-shadow: 10px 10px 20px 0px #ffdd57;
}
</style>