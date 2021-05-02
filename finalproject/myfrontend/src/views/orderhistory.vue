<template>
  <div class="bg">
    <div class="columns">
      <div class="user is-3 column has-background-black is-centered">
        <div style="margin-top: 15px; margin-bottom: -20px; text-align: right">
          <a href=""
            ><i
              class="fas fa-pen-square has-text-warning is-size-5"
              title="Edit account"
            ></i
          ></a>
        </div>

        <img
          :src="imagePath(user.user_image)"
          alt=""
          style="width: 50%; margin-top: 50px; box-shadow: 5px 5px #888888"
        />
        <br /><br />
        <!-- <h3 class="has-text-warning">Username : {{info.user_username}}</h3> -->
        <!-- <h3 class="has-text-warning">FISTNAME LASTNAME : {{info.user_fname +' ' +info.user_lname}}</h3> -->
        <!-- <h3 class="has-text-warning">Phone : {{info.user_phone}}</h3> -->
      </div>

      <div class="is-1 column"></div>

      <div class="is-7 column">
        <!-- <div class="container"> -->
        <section v-for="(info, index) in data" :key="index">
          <h1 class="has-text-warning">{{info.order_date}}</h1>
          <!-- <h1 class="has-text-warning">History : {{
                      info.order_date.slice(8, 10) +
                      "/" +
                      info.order_date.slice(5, 7) +
                      "/" +
                      info.order_date.slice(0, 4)
                    }}</h1> -->
          <div class="columns">
            <div class="column">
              <table
                class="table is-bordered is-striped has-background-black mb-5"
                style="width: 100%"
              >
                <tr class="has-text-centered" style="border: solid black">
                  <th style="border: solid black" class="has-text-warning">
                    Product
                  </th>
                  <!-- <th style="border: solid black" class="has-text-warning">
                    Order Date
                  </th> -->
                  <th style="border: solid black" class="has-text-warning">
                    Delivery date
                  </th>
                  
                  <th style="border: solid black" class="has-text-warning">
                    Amount
                  </th>
                  <th style="border: solid black" class="has-text-warning">
                    Price
                  </th>
                  <th style="border: solid black" class="has-text-warning">
                    Total price
                  </th>
                </tr>
                <tr>
                  <!-- <td class="has-background-light">
                    {{
                      info.order_date.slice(8, 10) +
                      "-" +
                      info.order_date.slice(5, 7) +
                      "-" +
                      info.order_date.slice(0, 4)
                    }}
                  </td> -->
                  <td class="has-background-light">{{ info.product_name }}</td>
                  
                  <td class="has-background-light">
                    {{
                      info.delivery_date.slice(8, 10) +
                      "-" +
                      info.delivery_date.slice(5, 7) +
                      "-" +
                      info.delivery_date.slice(0, 4)
                    }}
                  </td>
                  
                  <td class="has-background-light">{{ info.item_amount }}</td>
                  <td class="has-background-light">{{ info.item_price }}</td>
                  <td class="has-background-light">{{ info.total_price }}</td>
                  <!-- <td class="has-background-dark">{{ info.inflow_date }}</td> -->
                </tr>
              </table>
            </div>
          </div>
        </section>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import "bulma/css/bulma.css";
export default {
  props: ['user'],
  created() {
    axios.post("http://localhost:3000/orderhistory")
    .then((response) => {
      this.data = response.data.message;
      // console.log(this.data);
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
      data: [],
    };
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
body, html{
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
th{
  width: 20%;
}
</style>