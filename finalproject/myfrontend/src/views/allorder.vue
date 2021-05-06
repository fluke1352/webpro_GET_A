<template>
  <div class="bg">
    <div class="container">
      <button class="button mx-1 has-background-warning has-text-black" @click="sortby('order_id')">SOTR BY ORDER ID</button>
    <button class="button mx-1 has-background-warning has-text-black" @click="sortby('delivery_date')">SOTR BY DELIVERY DATE</button>

      <!-- <template v-for="(order, index) in orders" :key="index"> -->
      <div
        class="columns mb-3 has-text-warning my-5"
        style="background: #363636"
        v-for="(order, index) in orders" :key="index"
        :class="{ 'is-hidden': !(index < valmax && index >= valmin) }">
        <div
          v-if="index < valmax && index >= valmin"
          
        >
          <img
            :src="imagePath(order.user_image)"
            class="columns my-4 mx-4 has-background-has-background-dark"
            style="width: 120px; object-fit: cover"
            alt=""
          />
        </div>
        <div
          v-if="index < valmax && index >= valmin"
          :class="{ 'is-hidden': !(index < valmax && index >= valmin) }"
        >
          <div class="column">
            <p class="is-size-4">ORDER ID : {{ order.order_id }}</p>
            <p class="is-size-5">
              CUSTOMER NAME : {{ order.user_fname + " " + order.user_lname }}
            </p>
            <p class="is-size-6">DELIVERY DATE : {{ order.delivery_date }}</p>
            <p class="is-size-6">ORDER DATE : {{ order.order_date }}</p>
            <p class="is-size-6">
              TOTAL PRICE : {{ order.price_of_all_item }} ฿
            </p>
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
      <!-- </template> -->
      <div class="columns  is-centered  mt-4">
          <button class="column is-1 " @click="valmax = 5; valmin = 0; page = 1;">&lt;&lt;</button>
          <button class="column is-1 ml-3" @click="valmax -= 5; valmin -= 5; page--;">&lt;</button>
         <div class="column is-8 has-text-warning"><p  style="text-align:center; width:100%;" class="is-size-6"><b>{{pages + '/' + maxpage}}</b></p></div>
          <button class="column is-1 mr-3" @click="valmax += 5; valmin += 5; page++;">&gt;</button>
          <button class="column is-1 " @click="setpage( 5*maxpage, 5*(maxpage-1), maxpage)">&gt;&gt;</button>
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
      this.maxpage = Math.ceil(this.orders.length / 5);
    });
    axios.post("http://localhost:3000/datailorder").then((res) => {
      this.products = res.data.message;
    });
    console.log(this.maxpage);
  },
  methods: {
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    setpage(max, min, page) {
      this.valmax = max;
      this.valmin = min;
      this.page = page;
    },
    sortby(status) {
      axios
        .post("http://localhost:3000/allorder", { status: status })
        .then((res) => {
          this.orders = res.data.message;
          this.maxpage = Math.ceil(this.orders.length / 5);
        });
    },
  },
  computed: {
    pages() {
      let page = 1;
      let maxpage = this.maxpage;
      // console.log(maxpage);
      if (this.page < 0 || this.valmin < 0) {
        // console.log("<<<< 00");
        this.setpage(5, 0, 1);
        page = 1;
      } else if (this.page > this.maxpage && this.valmax > this.orders.length) {
        page = this.maxpage;
        this.setpage(5 * maxpage, 5 * (maxpage - 1), maxpage);
      } else {
        page = this.page;
      }

      return page;
    },
  },
  data() {
    return {
      orders: [],
      products: [],
      valmax: 5,
      valmin: 0,
      page: 1,
      maxpage: null,
    };
  },
};
</script>

<style scoped>
.bg {
  /* background-image: url("../assets/order.jpg"); */
  background-image: url(https://images.pexels.com/photos/4488652/pexels-photo-4488652.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260);
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
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.7s;
}
.card:hover {
  opacity: 100%;
  box-shadow: 8px 8px 18px 0px #ffdd57;
}
</style>
