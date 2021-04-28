<template>
  <div class="bg">
    <div class="container mt-5">
      <div class="columns">
        <div class="column is-1">
          <div  v-for="image, index in img" :key="index">
            <img
              class="image mb-4 p-0"
              style="width: 96px; height: 120px; object-fit: cover"
              :src="imagePath(image)"
              alt=""
            />
          </div>
        </div>

        <div class="column is-5">
          <div v-for="image, index in img" :key="index">
            <img
              class="image mb-4 p-0"
              style="width: 100%; height: 100%; object-fit: cover"
              :src="imagePath(image)"
              alt=""
            />
          </div>
        </div>

        <div class="column has-text-warning">
          <p class="is-size-1 has-text-centered">
            {{ productdetial.product_name }}
          </p>
          <p class="is-size-3">ราคา {{ productdetial.price }} ฿</p>
          <p class="mt-5">
            <b class="is-size-5" style="border-bottom: 1px solid white">
              รายละเอียดต่างๆ </b
            ><br />
          </p>
          <p class="mt-1 ml-3">
            Category is <b class="has-text-light">:</b>
            {{ productdetial.category }} <br />
            Brand is <b class="has-text-light">:</b> {{ productdetial.brand }}
            <br />
            Amount product is <b class="has-text-light">:</b>
            {{ productdetial.amount_product }}<br />
            Other spec is <b class="has-text-light">:</b>
            {{ productdetial.other_spec }}
          </p>
          <!-- <div class="column"></div> -->
          <p class="mt-5"><b>จำนวน</b></p>
          <div class="columns p-0 m-0 mt-1 has-text-centered">
            <div class="column has-text-centered button" @click="orderamount--">
              −
            </div>
            <input
              class="column input has-text-centered is-9"
              v-model="computorderamount"
            />
            <div class="column has-text-centered button" @click="orderamount++">
              +
            </div>
          </div>

          <div class="column has-text-centered mt-5">
            <button
              class="button is-warning"
              v-if="productdetial.amount_product > 0"
            >
              <strong @click="addtocart()">Add to cart</strong>
            </button>
            <button
              class="button"
              v-if="productdetial.amount_product <= 0"
              disabled
            >
              add to cart
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
      .post("http://localhost:3000/productdetial/" + this.$route.params.id)
      .then((response) => {
        this.productdetial = response.data.message[0];
        this.img = this.productdetial.image
          .slice(1, this.productdetial.image.length - 1)
          .split(",");
        // console.log(this.img);
        // this.imagePath(this.productdetial.image);
      });
    this.id = this.$route.params.id;
    if (localStorage.getItem("cart")) {
      this.cart = JSON.parse(localStorage.getItem("cart"));
    }

    // console.log(this.$route.params.id);
  },
  computed: {
    computorderamount() {
      let val = 1;
      if (this.orderamount < 1) {
        val = 1;
      } else if (this.orderamount > this.productdetial.amount_product) {
        val = this.productdetial.amount_product;
      } else {
        val = this.orderamount;
      }
      this.changeorderamount(val);
      return val;
    },
  },
  methods: {
    changeorderamount(val) {
      this.orderamount = val;
    },
    addtocart() {
      // console.log(this.cart.filter((product) => (product.id = this.id)).length);

      if (this.cart.filter((product) => product.id === this.id).length > 0) {
        this.cart.forEach((product) => {
          if (product.id == this.id) {
            product.orderamount = this.orderamount;
            return true;
          }
        });
      } else {
        this.cart.push({ id: this.id, orderamount: this.orderamount });
      }

      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    imagePath(file_path) {
      // console.log(file_path);
      if (file_path) {
        // let img = file_path.slice(1, file_path.length - 1).split(",");
        // console.log(img[0]);
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
  },
  data() {
    return {
      id: null,
      productdetial: [],
      orderamount: 1,
      cart: [],
      img: null,
    };
  },
};
</script>

<style scoped>
body,
html {
  font-family: "Roboto", sans-serif;
}
.bg {
  background-color: rgb(26, 26, 26);
}
</style>