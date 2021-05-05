<template>
  <div class="bg">
    <div class="container is-widescreen">
      <section class="section" id="app">
        <div class="columns">
          <div class="column is-12">
            <!-- <div class="card events-card"> -->
            <!-- <div class="card-table"> -->
            <div
              class="card my-5"
              v-for="(product, index) in products"
              :key="index"
            >
              <table
                class="table is-fullwidth is-striped is-hoverable"
               
              >
                <tbody class=" has-background-black has-text-warning">
                  <td class="my-auto"  @click="(check = index), test(index)">
                    <div class="columns">
                      <div class="column is-11">
                        <p class=" is-size-5">
                          {{ product.product_name }}
                        </p>
                      </div>
                      <div class="column is-1">
                        <i class="fas fa-angle-down level-right" ></i>
                      </div>
                    </div>
                  </td>
                </tbody>
                <transition name="fade">
                <div
                  v-show="
                    isActive == true &&
                    index == check &&
                    editproduct == false &&
                    addproduct == false
                  "
                >
                  <!-- <td class="column is-12"> -->
                    <!-- <div class="columns"> -->
                    <div class="level-right mt-3 mr-2" v-if="isActive == true && index == check && editproduct == false && addproduct == false">
                    <a class="button is-size-7 is-warning has-text-black" @click="changeproduct()"><b>EDIT</b><i class=" ml-1 far fa-edit"></i> </a>
                    <a class="button is-size-7 is-warning has-text-black ml-2" @click="addamount()"><b>ADD AMOUNT</b><i class=" ml-1 fas fa-plus-circle"></i></a>
                    </div>
                    <!-- </div> -->
                  <!-- </td> -->
                  <td class="column is-12 ">
                    <p class="ml-2"><b> ชื่อสินค้า : </b> {{ product.product_name }}</p>
                    
                  </td>
                  <td class="column is-12">
                    <p class="ml-2"><b> ประเภทสินค้า : </b> {{ product.category }}</p>
                  </td>
                  <td class="column is-12">
                    <p class="ml-2"><b> ประเภทย่อย : </b> {{ product.type_name }}</p>
                  </td>
                  <td class="column is-12"><p class="ml-2"><b> ยี่ห้อ : </b> {{ product.brand }}</p></td>
                  <td class="column is-12">
                    <p class="ml-2"><b> จำนวน : </b> {{ product.amount_product }}</p>
                  </td>
                  <td class="column is-12"><p class="ml-2"><b> ราคา : </b> {{ product.price }}</p></td>
                  <td class="column is-12">
                    <p class="ml-2"><b> รายละเอียด : </b> {{ product.other_spec }}</p>
                  </td>
                </div>
                </transition>

                <transition name="fade">
                <!-- edit product -->
                <div
                  v-if="
                    isActive == true && index == check && editproduct == true
                  "
                >
                  <td class="column is-12">
                    <div class="columns">
                      <div class="label is-2 mx-5 my-3 mt-5"  style="width: 7%">ชื่อสินค้า</div>
                      <input class="input is-4 my-3"  style="width: 75%" type="text" v-model="changename" />
                    </div>
                  </td>
                  <td class="column is-12">
                    <div class="select is-black">
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
                    <div class="columns">
                      <div class="label is-2 mx-5 my-3 mt-5"  style="width: 7%">ประเภทย่อย</div>
                      <input class="input is-4 my-3"  style="width: 75%" type="text" v-model="changetypename" />
                    </div>
                  </td>
                  <td class="column is-12">
                    <div class="columns">
                      <div class="label is-2 mx-5 my-3 mt-5"  style="width: 7%">ยี่ห้อ</div>
                      <input class="input is-4 my-3"  style="width: 75%" type="text" v-model="changebrand" />
                    </div>
                  </td>
                  <td class="column is-12">
                    <div class="columns">
                      <div class="label is-2 mx-5 my-3 mt-5"  style="width: 7%">ราคา</div>
                      <input class="input is-4 my-3"  style="width: 75%" type="text" v-model="changeprice" />
                    </div>
                  </td>
                  <td class="column is-12">
                    <div class="columns">
                      <div class="label is-2 mx-5 my-3 mt-5"  style="width: 7%">รายละเอียด</div>
                      <input class="input is-4 my-3"  style="width: 75%" type="text" v-model="changeotherspec" />
                    </div>
                  
                  <td class="column is-12">
                  <a
                    class="button mx-1 has-text-black has-background-warning is-dark border"
                     style="border:black solid 2px"
                    @click="saveproduct(index)"
                    ><b>SAVE</b> </a
                  >
                  <a class="button mx-1 has-text-warning is-dark has-background-black" @click="cancel()"
                    >CANCEL</a
                  >
                  </td>
                </div>
                </transition>

                <transition name="fade">
                <!-- Add amount -->
                <div
                  v-show="
                    isActive == true && index == check && addproduct == true
                  "
                >
                <!-- <div class="label  mx-5 my-3 mt-5"  style="width: 7%">รายละเอียด</div> -->
                  <td class="column is-12 is-size-5">ชื่อสินค้า : {{ changename }}</td>
                  <td class="column is-12 is-size-5">
                    จำนวนชิ้น :
                    <i class="hand fas fa-minus mr-3" @click="amount()"></i>
                    {{ changeamount }}
                    <i class="hand fas fa-plus ml-3" @click="changeamount++"></i>
                  </td>
                  <td class="column is-12">
                 <a
                    class="button mx-1 has-text-black has-background-warning is-dark border"
                     style="border:black solid 2px"
                    @click="saveamount(index)"
                    ><b>SAVE</b> </a
                  >
                  <a class="button mx-1 has-text-warning is-dark has-background-black" @click="cancel()"
                    >CANCEL</a
                  >
                  </td>
                  
                </div>
                </transition>
              </table>
            </div>
            <!-- </div> -->
            <!-- </div> -->
          </div>
        </div>
      </section>
    </div>
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
      addproduct: false,
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
      same: null,
    };
  },
  mounted() {
    this.getproducts();
  },
  methods: {
    amount() {
      if (this.changeamount === 0) {
        this.changeamount = 0;
      } else {
        this.changeamount--;
      }
    },
    test(index) {
      if (this.same == index) {
        this.isActive = !this.isActive;
      } else {
        this.same = index;
      }
    },
    cancel() {
      this.editproduct = false;
      this.addproduct = false;
    },
    saveproduct(index) {
      axios
        .post("http://localhost:3000/changeproduct", {
          id: index,
          name: this.changename,
          category: this.changecategory,
          typename: this.changetypename,
          brand: this.changebrand,
          price: this.changeprice,
          description: this.changeotherspec,
        })
        .then((response) => {
          this.alertadd = response.data.message;
          alert(this.alertadd);
          location.reload();
        })
        .catch((e) => console.log(e.response.data));
    },

    saveamount(index) {
      this.diff = this.changeamount - this.products[index].amount_product;
      axios
        .post("http://localhost:3000/addamount", {
          id: index,
          price: this.changeprice,
          amount: this.changeamount,
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
      this.changeprice = this.products[this.check].price;
      this.changeotherspec = this.products[this.check].other_spec;
    },
    addamount() {
      this.addproduct = !this.addproduct;
      this.changename = this.products[this.check].product_name;
      this.changeamount = this.products[this.check].amount_product;
      this.changeprice = this.products[this.check].price;
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

<style scoped>
.bg {
  /* background-image: url("../assets/order.jpg"); */
  background-image: url(https://images.pexels.com/photos/3821385/pexels-photo-3821385.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260);
  height: 100%;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
body,
html {
  height: 100%;
}
.fade-enter-active{
  transition: opacity 2s;
}
.fade-leave-active {
 transition: opacity 0s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  /* transition: opacity 2s; */
}
.hand{
  cursor: pointer;
}
</style>