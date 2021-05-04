<template>
  <div class="container">
    <div
      class="columns my-5 has-background-danger"
      v-for="(order, index) in orders"
      :key="index"
    >
      <!-- <div class="column">s</div> -->
      <img
        :src="imagePath(order.user_image)"
        class="my-4 mx-4"
        style="width: 120px; object-fit: cover"
        alt=""
      />
      <div class="column">
        <p class="is-size-4">ORDER ID : {{ order.order_id }}</p>
        <p class="is-size-5">
          CUSTOMER NAME : {{ order.user_fname + " " + order.user_lname }}
        </p>
        <p class="is-size-6">DELIVERY DATE : {{ order.delivery_date }}</p>
        <p class="is-size-6">ORDER DATE : {{ order.order_date }}</p>
        <p class="is-size-6">TOTAL PRICE : {{ order.price_of_all_item }} ฿</p>
        <p class="is-size-6">ORDER LIST :</p>
        <div
          class="is-size-6"
          v-for="(product, index) in products"
          :key="index"
        >
          <div v-if="product.order_order_id == order.order_id">
            {{ product.product_name }}
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
    axios.post("http://localhost:3000/allorder").then((res) => {
      this.orders = res.data.message;
    });
    axios.post("http://localhost:3000/datailorder").then((res) => {
      this.products = res.data.message;
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
  },
  data() {
    return {
      orders: [],
      products: [],
    };
  },
};
</script>

<style scoped>
.bg {
  /* background-image: url("../assets/order.jpg"); */
  background-image: url(https://images.pexels.com/photos/3039049/pexels-photo-3039049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260);
  height: 100%;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
body,
html {
  height: 100%;
}
.card {
  opacity: 98%;
  transition: 0.5s;
}
.card:hover {
  opacity: 100%;
}
</style>
