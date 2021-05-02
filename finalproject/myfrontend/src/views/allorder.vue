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
  </div>
</template>

<script>
import axios from "axios";
import "bulma/css/bulma.css";
export default {
  created() {
    axios.post("http://localhost:3000/allorder").then((response) => {
    //   this.data = response.data.message;
      this.data1 = response.data.message.info;
      this.data2 = response.data.message.order;
      console.log(this.data);
    });
  },
  methods: {
    showSelectImage(image) {
      return URL.createObjectURL(image);
    },
  },
  data() {
    return {
      data1: [],
      data2: [],
      // img: URL.createObjectURL(data.user_image),
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
