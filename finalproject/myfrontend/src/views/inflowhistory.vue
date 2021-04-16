<template>
  <div>
    <div class="columns">
      <div class="column is-full has-background-primary">nev Bar</div>
    </div>
    <div class="container">
      <table class="table is-bordered is-striped" style="width: 100%" >
        <tr>
          <th>owner name</th>
          <th>product name</th>
          <th>amount</th>
          <th>total price</th>
          <th>date(ปี/เดือน/วัน)</th>
        </tr>
        <tr v-for="(info, index) in data" :key="index">
          <td>{{info.owner_username}}</td>
          <td>{{info.product_name}}</td>
          <td>{{info.inflow_amount}}</td>
          <td>{{info.inflow_price}}</td>
          <td>{{info.inflow_date}}</td>
        </tr>

      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "bulma/css/bulma.css";
export default {
  created() {
    axios
      .post("http://localhost:3000/inflowhistory")
      .then((response) => {
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
</style>