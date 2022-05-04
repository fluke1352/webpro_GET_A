<template>
  <div class="bg">
    <div class="columns">
      <div class="column is-6 is-offset-3 is-centered">
        <!-- card -->
        <section v-for="product in products" :key="product.id">
          <div class="card mt-5" style="background-color: #1b1b1b">
            <header
              class="card-header"
              style="border-bottom: 1px solid #ffdd57"
            >
              <h3
                class="card-header-title is-centered has-text-warning"
                style="margin-left: 7%"
              >
                รายละเอียดสินค้า
              </h3>
              <button
                @click="
                  (isModal = true),
                    (brand = product.brand),
                    (category = product.category),
                    (id_wantCancle = product.product_id)
                "
                style="
                  background: none;
                  border: none;
                  border-color: none;
                  height: 5%;
                "
                class="button"
              >
                <i class="fas fa-window-close has-background-warning"></i>
              </button>
            </header>
            <div class="columns">
              <div class="columm is-6 mt-5" style="width: 50%">
                <div class="card-content has-text-black">
                  <div class="content has-text-warning">
                    <p style="margin-top: -15px">
                      Brand is <span style="color: white">:</span>
                      {{ product.brand }}
                    </p>
                    <p>
                      Category is <span style="color: white">:</span>
                      {{ product.category }}
                    </p>
                    <p style="margin-top: -15px">
                      Other spec is
                      <span style="color: white">:</span>
                      {{ product.other_spec }}
                    </p>
                  </div>
                </div>
              </div>
              <!-- -->
              <div
                class="columm is-3 ml-2"
                style="text-align: left; margin-top: 14vh; width: 25%"
              >
                <div class="card-content has-text-black">
                  <div class="content has-text-warning">
                    <p style="margin-top: -20px">x{{ product.orderamount }}</p>
                    <p style="margin-top: -20px">ราคา {{ product.price }} ฿</p>
                    <p style="margin-top: -20px">
                      ราคารวม {{ product.orderamount * product.price }} ฿
                    </p>
                  </div>
                </div>
              </div>

              <div class="column is-3 mt-4 mr-5" style="width: 25%">
                <div class="card-image mx-auto">
                  <figure class="image">
                    <img
                      style="width: 300px; height: 150px"
                      :src="imagePath(product.image)"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- finish card -->
      </div>
    </div>

    <!-- //modal cancle order-->
    <div class="modal" :class="{ 'is-active': isModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head has-background-black">
          <p class="modal-card-title has-text-warning">Are you sure?</p>
          <button
            class="delete"
            aria-label="close"
            @click="resetModalData()"
          ></button>
        </header>
        <section class="modal-card-body has-background-warning">
          <!-- Content ... -->
          <h1 class="is-size-3">
            Cancle order <b> {{ brand }}</b>
          </h1>
          <p>Category is {{ category }}</p>
        </section>
        <footer class="modal-card-foot has-background-black">
          <button
            class="button has-text-black has-background-warning is-dark border"
            @click="cancleProduct(), resetModalData()"
          >
            <b>Sure</b>
          </button>
          <button
            class="button has-text-warning is-dark has-background-black"
            @click="resetModalData()"
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>

    <!--  modal no order in cart  -->
    <div
      class="modal"
      :class="{ 'is-active': totalPrice == 0 && totalAmount == 0 }"
    >
      <div class="modal-background has-background-black"></div>
      <div class="modal-card">
        <header class="modal-card-head has-background-dark">
          <p class="modal-card-title has-text-warning">Your cart is blank</p>
          <router-link to="../allproduct">
          <button class="delete" aria-label="close">       
          </button>
          </router-link>
        </header>
        <section class="modal-card-body has-background-warning">
          <!-- Content ... -->
          <h1 class="is-size-3 has-text-black">
            Let get order and comeback again.
          </h1>
          <p><i class="fas fa-car"></i> 999 Auto.</p>
        </section>
        <footer class="modal-card-foot has-background-dark">
          <router-link to="../allproduct">
            <button
              class="button has-text-black has-background-warning is-dark border"
            >
              <b>Get order!</b>
            </button>
          </router-link>
          <router-link to="/" class="ml-1">
            <button
              class="button has-text-black has-background-warning is-dark border"
            >
              <b> Home page. </b>
            </button>
          </router-link>
        </footer>
      </div>
    </div>

    <div class="columns" v-show="totalPrice != 0 && totalAmount != 0">
      <div class="column is-3 is-offset-6">
        <div
          class="card has-text-warning"
          style="background-color: #1b1b1b; text-align: center"
        >
          <p class="is-size-4">Total Amount : {{ totalAmount }} ชิ้น</p>
          <p class="is-size-4">Total Price : {{ totalPrice }} ฿</p>
        </div>
      </div>
    </div>

    <div class="columns" v-show="totalPrice != 0 && totalAmount != 0">
      <div class="column is-4 is-offset-5" style="margin-top: 150px">
        <div class="card" style="background-color: #1b1b1b">
          <div class="columns">
            <div class="column is-4">
              <p class="has-text-warning mt-2 ml-3" style="text-align: center">
                <b> วันที่ต้องการเข้ามาติดตั้ง </b>
              </p>
            </div>
            <div class="column is-4">
              <input
                type="date"
                class="input"
                style="text-align: center"
                v-model="date_deliver"
              />
            </div>
            <div class="column is-4 ml-3">
              <button
                class="button has-background-warning"
                style="height: 4vh; text-align: center"
                @click="Confirm()"
              >
                <b>Confirm order</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import axios from "@/plugins/axios";
import "bulma/css/bulma.css";
export default {
  created() {
    this.fetchDatabase();
  },
  computed: {
  },

  methods: {
    imagePath(file_path) {
      // console.log(file_path);

      if (file_path) {
        let img = file_path.slice(10, file_path.length - 1).split(",");
        // console.log(img[0]);
        return "http://localhost:3000/images/" + img[0];
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },

    fetchDatabase() {
      if (localStorage.getItem("cart")) {
        this.cart = JSON.parse(localStorage.getItem("cart"));

        axios
          .post("http://localhost:3000/usercart", { cart: this.cart })
          .then((response) => {
            this.products = response.data.message;

            this.products.forEach((item) => {
              this.cart.forEach((incart) => {
                if (parseInt(incart.id) === parseInt(item.product_id)) {
                  //add  orderamount to products
                  item.orderamount = incart.orderamount;

                  this.totalPrice += item.price * item.orderamount;
                  this.totalAmount += incart.orderamount;
                }
              });
            });
          });
      }
    },
    cancleProduct() {
      this.products.forEach((item, index) => {
        if (item.product_id == this.id_wantCancle) {
          this.deleteIndex = index;
        }
      });
      this.totalPrice -=
        this.products[this.deleteIndex].price *
        this.products[this.deleteIndex].orderamount;
      this.totalAmount -= this.products[this.deleteIndex].orderamount;

      this.products = this.products.filter(
        (_, index) => index != this.deleteIndex
      );
      this.cart = this.cart.filter((_, index) => index != this.deleteIndex);
      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(this.cart));
      
    },
    resetModalData() {
      (this.isModal = false),
        (this.brand = null),
        (this.category = null),
        (this.id_wantCancle = null);
    },
    Confirm() {
      if(!this.date_deliver){
        alert('กรุณาเลือก วันที่ต้องการเข้ามาติดตั้ง')
      }
      else{
      axios
        .post("http://localhost:3000/usercart/confirm", {
          products: this.products,
          delivery_date: this.date_deliver
        })
        .then((response) => {
          this.alertAddOrder = response.data.message;
          alert(this.alertAddOrder);
        })
        .catch((e) => console.log(e.response.data));
        localStorage.removeItem("cart");
        location.reload();
        alert('Confirm order!!')
        }
    },
  },
  data() {
    return {
      brand: null,
      category: null,
      id_wantCancle: null,
      deleteIndex: null, //index in cart

      isModal: false,
      date_deliver: null,
      cart: [], //from localhost
      products: [], //data product from database
      totalPrice: 0,
      totalAmount: 0,
      alertAddOrder:''
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
