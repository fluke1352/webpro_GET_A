<template>
  <div class="bg" >
    <div class="container">
      <div class="columns">
        <div class=" column is-12 is-centered">
          <table class="table is-bordered is-striped" style="width: 100%">
            <tr style="border: solid black">
              <th class="has-text-warning has-text-centered" style="border: solid black; width:20%">Owner name</th>
              <th class="has-text-warning has-text-centered" style="border: solid black; width:30%">Product name</th>
              <th class="has-text-warning has-text-centered" style="border: solid black; width:15%">Amount</th>
              <th class="has-text-warning has-text-centered" style="border: solid black; width:15%">Total price</th>
              <th class="has-text-warning has-text-centered" style="border: solid black; width:15%">Date inflow</th>
            </tr>
            <tr v-for="(info, index) in data" :key="index">
              <td
                class="has-background-white "
                v-if="index < valmax && index >= valmin"
              >
                {{ info.owner_username }}
              </td>
              <td
                class="has-background-white"
                v-if="index < valmax && index >= valmin"
              >
                {{ info.product_name }}
              </td>
              <td
                class="has-background-white"
                v-if="index < valmax && index >= valmin"
              >
                {{ info.inflow_amount }}
              </td>
              <td
                class="has-background-white"
                v-if="index < valmax && index >= valmin"
              >
                {{ info.inflow_price }}
              </td>
              <td
                class="has-background-white"
                v-if="index < valmax && index >= valmin"
              >
                {{
                info.inflow_date.slice(8, 10) +
                "/" +
                info.inflow_date.slice(5, 7) +
                "/" +
                info.inflow_date.slice(0, 4)
              }}
              </td>
            </tr>
          </table>
        </div>
      </div>
        <div class="columns  is-centered  mt-4">
          <button class="column is-1 " @click="valmax = 15; valmin = 0; page = 1;">&lt;&lt;</button>
          <button class="column is-1 ml-3" @click="valmax -= 15; valmin -= 15; page--;">&lt;</button>
         <div class="column is-8 has-text-warning"><p  style="text-align:center; width:100%;" class="is-size-6"><b>{{pages + '/' + maxpage}}</b></p></div>
          <button class="column is-1 mr-3" @click="valmax += 15; valmin += 15; page++;">&gt;</button>
          <button class="column is-1 " @click="setpage( 15*maxpage, 15*(maxpage-1), maxpage)">&gt;&gt;</button>
        </div>
    </div>
    
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import "bulma/css/bulma.css";
export default {
  created() {
    axios.post("http://localhost:3000/inflowhistory").then((response) => {
      this.data = response.data.message;
      this.maxpage = Math.ceil(this.data.length/15);
      // console.log(this.maxpage);
    });
  },
  methods: {
    setpage(max, min, page){
      this.valmax = max;
      this.valmin = min;
      this.page = page;
    }
  },
  computed:{
    pages(){
      let page = 1
      let maxpage = this.maxpage;
      // console.log(maxpage);
      if(this.page < 0 || this.valmin < 0){
        // console.log("<<<< 00");
        this.setpage(15,0,1)
        page = 1
      }
      else if(this.page > this.maxpage && this.valmax > this.data.length){
        page = this.maxpage;
        this.setpage(15*maxpage, 15*(maxpage-1), maxpage)
      }
      else{
        page = this.page
      }

      return page
    }
  }, 
  data() {
    return {
      data: null,
      valmax: 15,
      valmin: 0,
      page: 1,
      maxpage: null,
    };
  },
};
</script>

<style scoped>
.bg {
  background-image: url("../assets/stock1.jpg");
  height: 1080px;
  width: 100%;
}
table,
th {
  background-color: black;
  color: black;
}
</style>