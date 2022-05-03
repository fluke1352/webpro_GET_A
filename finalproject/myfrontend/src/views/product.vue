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
                <table class="table is-fullwidth is-striped">
                  <tbody>
                    <td width="5%">
                      <i
                        class="fa fa-bell-o"
                        @click="(check = index), test()"
                      ></i>
                      <p>{{ product.product_name }}</p>
                    </td>
                  </tbody>
                  <div
                    v-show="
                      isActive == true && index == check && editproduct == false
                    "
                  >
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
                    <td class="column is-12">
                      จำนวน : {{ product.amount_product }}
                    </td>
                    <td class="column is-12">ราคา : {{ product.price }}</td>
                    <td class="column is-12">
                      รายละเอียด : {{ product.other_spec }}
                    </td>
                    <a
                      class="button is-small is-primary"
                      @click="changeproduct(index)"
                      >edit</a
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
                    <td class="column is-12">
                      จำนวน : <input type="text" v-model="changeamount" />
                    </td>
                    <td class="column is-12">
                      ราคา : <input type="text" v-model="changeprice" />
                    </td>
                    <td class="column is-12">
                      รายละเอียด :
                      <input type="text" v-model="changeotherspec" />
                    </td>
                    <a
                      class="button is-small is-primary"
                      @click="saveproduct(index)"
                      >SAVE</a
                    >
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
import axios from "@/plugins/axios";
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
    };
  },
  mounted() {
    this.getproducts();
  },
  methods: {
    test() {
      this.isActive = !this.isActive;
    },
    saveproduct(index) {
      this.diff = this.changeamount - this.products[index].amount_product;

      axios
        .post("10.0.142.187:3000/changeproduct", {
          id: index,
          name: this.changename,
          category: this.changecategory,
          typename: this.changetypename,
          brand: this.changebrand,
          amount: this.changeamount,
          price: this.changeprice,
          description: this.changeotherspec,
          amountchange: this.diff,
        })
        .then((response) => {
          this.alertadd = response.data.message;
          alert(this.alertadd);
        })
        .catch((e) => console.log(e.response.data));
    },
    changeproduct(id) {
      this.editproduct = !this.editproduct;
      this.changename = this.products[id].product_name;
      this.changecategory = this.products[id].category;
      this.changetypename = this.products[id].type_name;
      this.changebrand = this.products[id].brand;
      this.changeamount = this.products[id].amount_product;
      this.changeprice = this.products[id].price;
      this.changeotherspec = this.products[id].other_spec;
    },

    getproducts() {
      axios
        .get("10.0.142.187:3000/product")
        .then((response) => {
          this.products = response.data.message;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    imagePath(file_path) {
      if (file_path) {
        return "10.0.142.187:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
  },
};
</script>
