<template>
  <div class="container is-widescreen">
    <section class="section" id="app">
      <div class="columns">
        <div class="column is-12">
          <div class="card events-card">
            <div class="card-table">
              <div
                class="content"
                v-for="(product, index) in products"
                :key="index"
              >
                <table class="table is-fullwidth is-striped ">
                  <tbody>
                    <td>
                      <p>{{ product.product_name }}  <i class="fas fa-angle-down level-right " @click="(check = index), test(index)" ></i></p>
                    </td>
                    
                  </tbody>
                  <div v-show="isActive == true && index == check && editproduct == false">
                    <td class="column is-12">
                      ชื่อสินค้า : {{ product.product_name }}
                    </td>
                    <td class="column is-12">
                      ประเภทสินค้า : {{ product.category }}
                    </td>
                    <td class="column is-12">
                      ประเภทย่อย : {{ product.type_name }}
                    </td>
                    <td class="column is-12">ยี่ห้อ : {{ product.brand }}</td>
                    <!-- <td class="column is-12">
                      จำนวน : {{ product.amount_product }}
                    </td>
                    <td class="column is-12">ราคา : {{ product.price }}</td> -->
                    <td class="column is-12">
                      รายละเอียด : {{ product.other_spec }}
                    </td>
                    <a
                      class="button is-small is-primary"
                      @click="changeproduct()"
                      >EDIT</a
                    >
                    <a
                      class="button is-small is-warning"
                      @click="addamount()"
                      >ADD AMOUNT</a
                    >
                  </div>

                  <div
                    v-show="
                      isActive == true && index == check && editproduct == true
                    "
                  >
                    <td class="column is-12">
                      ชื่อสินค้า : <input type="text" v-model="changename" />
                    </td>
                    <td class="column is-12">
                      <div class="select is-primary">
                        <select v-model="changecategory">
                          <option>speaker</option>
                          <option>film</option>
                          <option>radio</option>
                          <option>camera</option>
                          <option>sensor</option>
                        </select>
                      </div>
                    </td>
                    <td class="column is-12">
                      ประเภทย่อย :
                      <input type="text" v-model="changetypename" />
                    </td>
                    <td class="column is-12">
                      ยี่ห้อ : <input type="text" v-model="changebrand" />
                    </td>
                    <!-- <td class="column is-12">
                      จำนวน : <input type="text" v-model="changeamount" />
                    </td>
                    <td class="column is-12">
                      ราคา : <input type="text" v-model="changeprice" />
                    </td> -->
                    <td class="column is-12">
                      รายละเอียด :
                      <input type="text" v-model="changeotherspec" />
                    </td>
                    <a
                      class="button is-small is-primary"
                      @click="saveproduct(index)"
                      >SAVE</a
                    >
                    <a
                      class="button is-small is-danger"
                      @click="cancel()"
                      >CANCEL</a>
                  </div>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import axios from "axios";
import "bulma/css/bulma.css";
// @ is an alias to /src
export default {
  name: "Home",
  data() {
    return {
      products: [],
      check: null,
      isActive: false,
      editproduct: false,
      changename: "",
      changecategory: "",
      changetypename: "",
      changebrand: "",
      changeprice: "",
      changeotherspec: "",
      changeamount: "",
      alertadd: "",
      diff: "",
      same:null
      
    };
  },
  mounted() {
    this.getproducts();
  },
  methods: {
    test(index) {
        if(this.same == index){
          this.isActive = !this.isActive;
        }else{
          this.same = index
        }
    },
    cancel(){
      this.editproduct = !this.editproduct;
    },
    saveproduct(index) {
      this.diff = this.changeamount - this.products[index].amount_product;

      axios
        .post("http://localhost:3000/changeproduct", {
          id: index,
          name: this.changename,
          category: this.changecategory,
          typename: this.changetypename,
          brand: this.changebrand,
          // amount: this.changeamount,
          // price: this.changeprice,
          description: this.changeotherspec,
          amountchange: this.diff,
        })
        .then((response) => {
          this.alertadd = response.data.message;
          alert(this.alertadd);
          location.reload();
        })
        .catch((e) => console.log(e.response.data));
    },

    changeproduct() {
      this.editproduct = !this.editproduct;
      this.changename = this.products[this.check].product_name;
      this.changecategory = this.products[this.check].category;
      this.changetypename = this.products[this.check].type_name;
      this.changebrand = this.products[this.check].brand;
      this.changeamount = this.products[this.check].amount_product;
      this.changeprice = this.products[this.check].price;
      this.changeotherspec = this.products[this.check].other_spec;
    },

    getproducts() {
      axios
        .get("http://localhost:3000/product")
        .then((response) => {
          this.products = response.data.message;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
  },
};
</script>
