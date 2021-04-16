<template>
  <div class="container is-widescreen">
    <section class="section" v-if="error">
      <div class="container is-widescreen">
        <div class="notification is-danger">
          <!-- <%= error.code + ': ' + error.sqlMessage %> -->
          <!---->
          {{ error }}
        </div>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body">
        <p class="title">ข้อมูลสินค้า</p>
      </div>
    </section>
    <section class="px-6">
      <input
        class="mb-5"
        multiple
        type="file"
        accept="image/png, image/jpeg, image/webp"
        @change="selectImages"
      />

      <div v-if="images" class="columns is-multiline">
        <div
          v-for="(image, index) in images"
          :key="image.id"
          class="column is-one-quarter"
        >
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="showSelectImage(image)" alt="Placeholder image" />
              </figure>
            </div>
            <footer class="card-footer">
              <a
                @click="deleteSelectImage(index)"
                class="card-footer-item has-text-danger"
                >Delete</a
              >
            </footer>
          </div>
        </div>
      </div>

      <div class="field mt-5">
        <label class="label">ชื่อสินค้า</label>
        <div class="control">
          <input
            v-model="productname"
            class="input is-primary"
            type="text"
            placeholder="ชื่อสินค้า"
          />
        </div>
      </div>
      <div class="field mt-5">
        <label class="label">ประเภทสินค้า</label>
        <div class="select is-primary">
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
        <label class="label">ชนิดสินค้า</label>
        <div class="control">
          <input
            v-model="producttype"
            class="input is-primary"
            type="text"
            placeholder="ชนิดสินค้า"
          />
        </div>
      </div>
      <div class="field mt-5">
        <label class="label">ยี่ห้อ</label>
        <div class="control">
          <input
            v-model="productbrand"
            class="input is-primary"
            type="text"
            placeholder="ยี่ห้อสินค้า"
          />
        </div>
      </div>

      <div class="field mt-5">
        <label class="label">ราคา</label>
      </div>
      <div class="field has-addons">
        <p class="control">
          <span class="select is-primary">
            <select>
              <option>฿</option>
            </select>
          </span>
        </p>
        <p class="control">
          <input
            class="input is-primary"
            type="text"
            v-model="productprice"
            placeholder="ราคาสินค้า"
          />
        </p>
      </div>
      <div class="field mt-5">
        <label class="label">จำนวนสินค้า</label>
        <p class="control"></p>
        <p class="control">
          <input
            class="input is-primary"
            type="number"
            v-model="productamount"
            placeholder="จำนวน"
            min="0"
          />
        </p>
      </div>
      <div class="field">
        <label class="label">รายละเอียด</label>
        <div class="control">
          <textarea
            v-model="description"
            class="textarea"
            placeholder="รายละเอียดสินค้า"
          ></textarea>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button @click="submitproduct" class="button is-link">Submit</button>
        </div>
        <div class="control">
          <button @click="$router.go(-1)" class="button is-link is-light">
            Cancel
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
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
      alertadd:"",
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
          alert(this.alertadd)
        })
        .catch((e) => console.log(e.response.data));
    },
  },
};
</script>

<style>
</style>