<template>
  <div class="bg">
    <div class="container">
      <div class="columns">
        <div class="mt-6 column">
          <table class="table is-bordered is-striped" style="width: 100%">
            <tr>
              <th class="has-text-warning ">owner name</th>
              <th class="has-text-warning ">product name</th>
              <th class="has-text-warning ">amount</th>
              <th class="has-text-warning ">total price</th>
              <th class="has-text-warning ">
                date(ปี/เดือน/วัน)
              </th>
            </tr>
            <tr v-for="(info, index) in data" :key="index">
              <td class="has-background-dark">{{ info.owner_username }}</td>
              <td class="has-background-dark">{{ info.product_name }}</td>
              <td class="has-background-dark">{{ info.inflow_amount }}</td>
              <td class="has-background-dark">{{ info.inflow_price }}</td>
              <td class="has-background-dark">{{ info.inflow_date }}</td>
            </tr>
          </table>
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
    axios.post("http://localhost:3000/inflowhistory").then((response) => {
      this.data = response.data.message;
      // console.log(this.data);
    });
  },
  methods: {
    fetchdb() {},
  },
  data() {
    return {
      data: null,
    };
  },
};
</script>

<style scoped>
.bg {
  background-image: url("../assets/stock1.jpg");
  height: 1000px;
  width: 100%;
}
table, th {
  background-color: #252525;
  color: rgb(204, 204, 204);
  border: hsl(48, 100%, 67%) solid;
}
</style>