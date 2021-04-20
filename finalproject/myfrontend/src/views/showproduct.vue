<template>
  <div>
    <div class="container my-6">
      <p class="has-text-centered is-size-1 mb-2">{{category}} PRODUCT</p>
      <div class="columns">
        <i class="fas fa-search column is-size-5"></i>
        <input
          class="input column is-6"
          type="text"
          v-model="search"
          placeholder="ชื่อสินค้า/ชนิดสินค้า/แบลนสินค้า"
        />
        <p class="column has-text-centered">ช่วงราคาขั้นต่ำ</p>
        <input
          class="input column is-1"
          min="0"
          type="number"
          v-model="minrange"
        />
        <p class="column has-text-centered">ช่วงราคาขั้นสูงสุด</p>
        <input
          class="input column is-1"
          min="0"
          type="number"
          v-model="maxrange"
        />

        <div class="ml-5">
          <button
            type="submit"
            class="button is-primary"
            @click="searchProduct()"
          >
            ค้นหา
          </button>
        </div>
      </div>
      <div class="columns is-multiline">
        <div
          class="column is-3"
          v-for="(product, index) in allproduct"
          :key="index"
        >
        <router-link
            :to="{ name: 'detail', params: { id: product.product_id} }"
          >
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="imagePath(product.image)" alt="Placeholder image" />
              </figure>
            </div>
            <div class="card-content has-text-centered">
              <p>{{ product.product_name }}</p>
              <p>ราคา {{ product.price}} บาท</p>
            </div>
          </div>
          </router-link>

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
    axios.post("http://localhost:3000/showproduct/" + this.category).then((response) => {
      this.allproduct = response.data.message;
      console.log(this.allproduct);
    });
  },
  methods: {
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    searchProduct() {
      axios
        .post("http://localhost:3000/seaechproductincategory", {
          search: this.search,
          minrange: this.minrange,
          maxrange: this.maxrange,
          category: 'speaker'
        })
        .then((response) => {
          this.allproduct = response.data.message;
          console.log(this.allproduct);
        });
    },
  },

  data() {
    return {
      allproduct: [],
      search: null,
      minrange: 0,
      maxrange: 500000,
      category: this.$route.params.category,
    };
  },
};
</script>

<style scoped>
</style>