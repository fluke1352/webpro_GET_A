<template>
  <div class="bg">
    <div class="columns">
      <!-- info user -->
      <div class="user is-3 column has-background-black is-centered">
        <div style="margin-top: 15px; margin-bottom: -20px; text-align: right">
          <a>
            <!-- edit account -->
            <router-link to="../editaccount">
              <i
                class="fas fa-pen-square has-text-warning is-size-5"
                title="Edit account"
              ></i>
            </router-link>
          </a>
        </div>

        <figure class="">
          <img
            :src="imagePath(user.user_image)"
            alt=""
            style="width: 50%; margin-top: 50px; box-shadow: 5px 5px #888888"
          />
        </figure>
        <br /><br />
        <h3 class="has-text-warning is-size-5">
          Username : {{ data2.user_username }}
        </h3>
        <h3 class="has-text-warning is-size-4">
          {{ data2.user_fname + " " + data2.user_lname }}
        </h3>
        <h3 class="has-text-warning is-size-5">
          Phone :
          {{
            data2.user_phone.slice(0, 3) +
            "-" +
            data2.user_phone.slice(3, 6) +
            "-" +
            data2.user_phone.slice(6)
          }}
        </h3>
      </div>

      <div class="is-1 column"></div>

      <!-- order history -->
      <div class="is-7 column">
        <section v-for="(info, index) in data" :key="index">
          
            <section
              v-if="index == 0 || info.order_id != data[index - 1].order_id"
            >
            
              <h1 class="has-text-warning">
                <b> Order ID: {{ info.order_id }} </b>
                at
                {{
                info.order_date.slice(8, 10) +
                "/" +
                info.order_date.slice(5, 7) +
                "/" +
                info.order_date.slice(0, 4)
              }}
              </h1>
              <div class="columns">
                <div class="column">
                  <table
                    class="table is-bordered is-striped has-background-black mb-5"
                    style="width: 100%"
                  >
                  <!-- header -->
                    <tr class="has-text-centered" style="border: solid black">
                      <th
                        style="border: solid black; width: 25%"
                        class="has-text-warning"
                      >
                        Product
                      </th>
                      <th
                        style="border: solid black; width: 20%"
                        class="has-text-warning"
                      >
                        Delivery date
                      </th>

                      <th
                        style="border: solid black; width: 15%"
                        class="has-text-warning"
                      >
                        Amount
                      </th>
                      <th
                        style="border: solid black; width: 20%"
                        class="has-text-warning"
                      >
                        Price
                      </th>
                      <th
                        style="border: solid black; width: 20%"
                        class="has-text-warning"
                      >
                        Sum
                      </th>
                    </tr>
                    <tr
                      v-for="(item, key_in) in data"
                      :key="key_in + item.product_name"
                    >
                      <template v-if="item.order_id == info.order_id">
                        <td class="has-background-light">
                          {{ item.product_name }}
                        </td>
                        <td class="has-background-light">
                          {{
                          item.delivery_date.slice(8, 10) +
                          "/" +
                          item.delivery_date.slice(5, 7) +
                          "/" +
                          item.delivery_date.slice(0, 4)
                        }}
                        </td>
                        <td class="has-background-light">
                          {{ item.item_amount }}
                        </td>
                        <td class="has-background-light">
                          {{ item.item_price }}
                        </td>
                        <td class="has-background-light">
                          {{ item.total_price }}
                        </td>
                      </template>
                    </tr>
                    <tr v-for="(theID, key_price) in list_id" :key="key_price">
                      <td
                        v-if="theID == info.order_id"
                        class="has-background-light has-background-white has-background-white-ter"
                        style="text-align: center"
                        colspan="5"
                      >
                        <p class="is-size-6">
                          Total price =
                          <b> {{ list_totalPrice[key_price] }}</b>
                        </p>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </section>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import "bulma/css/bulma.css";
export default {
  props: ["user"],
  data() {
    return {
      data: [],
      data2: [],
      list_totalPrice: [],
      list_id: [],
      valmax: 4,
      valmin: 0,
      page: 1,
      maxpage: null,
      count: 0,
    };
  },
  created() {
    axios.post("http://18.139.80.70:3000/orderhistory").then((response) => {
      this.data = response.data.message.orderDetail;
      this.count = response.data.message.count;
      this.data2 = response.data.message.userDetail[0];
      this.list_totalPrice = response.data.message.totalPrice;
      this.list_id = response.data.message.ArrayId;
    });
  },
  methods: {
    imagePath(file_path) {
      if (file_path) {
        return "http://18.139.80.70:3000/images/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    calcuPrice() {},
  },
};
</script>

<style scoped>
.bg {
  background-image: url("../assets/order.jpg");
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
body,
html {
  height: 100%;
}
.user {
  height: auto !important;
  min-height: 1000px;
  margin-bottom: -58px;
  margin-top: -45px;
  text-align: center;
  opacity: 70%;
  transition: 0.5s;
}
.user:hover {
  opacity: 100%;
}
th {
  width: 20%;
}
</style>