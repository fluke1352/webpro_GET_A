<template>
  <div class="bg">
    <!-- banner -->
    <div class="container">
      <!-- <img src="../assets/banner1.png" alt=""> -->
      <div class="columns">
        <div class="slideshow-container">
          <div class="fade" id="fade">
            <img
              :src="slide[indexsslide]"
              style="width: 100%; object-fit: cover; height: 200px"
            />
          </div>

          <a
          class="prev"
          @click="
            indexslide--;
            clearTimeout(this.timeOut);
            fade();
          "
          >&#10094;</a
        >
        <a
          class="next"
          @click="
            indexslide++;
            clearTimeout(this.timeOut);
            fade();
          "
          >&#10095;</a
        >
        </div>
      </div>
    </div>

    <!-- serch -->
    <div class="container my-6 has-text-warning">
      <p class="has-text-centered is-size-1 mb-5 is-uppercase">
        {{ category }}
      </p>
      <div class="columns mt-5">
        <i
          class="fas fa-search column is-size-5"
          style="margin-right: -70px"
        ></i>
        <input
          class="input column is-6"
          type="text"
          v-model="search"
          placeholder="ชื่อสินค้า/ชนิดสินค้า/แบลนสินค้า"
        />
        <p class="column has-text-centered">ช่วงราคาขั้นต่ำ</p>
        <input
          class="input column is-1"
          min="0"
          type="number"
          v-model="minrange"
        />
        <p class="column has-text-centered">ช่วงราคาขั้นสูงสุด</p>
        <input
          class="input column is-1"
          min="0"
          type="number"
          v-model="maxrange"
        />

        <div class="ml-5">
          <button
            type="submit"
            class="button is-warning"
            @click="searchProduct()"
          >
            ค้นหา
          </button>
        </div>
      </div>

      <!-- card product -->
      <div class="columns is-multiline mt-5">
        <div
          class="column is-3"
          v-for="(product, index) in allproduct"
          :key="index"
        >
          <router-link
            :to="{ name: 'detail', params: { id: product.product_id } }"
          >
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img
                    :src="imagePath(product.image)"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div class="card-content has-text-centered">
                <p>{{ product.product_name }}</p>
                <p>ราคา {{ product.price }} บาท</p>
              </div>
            </div>
          </router-link>
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
    axios
      .post("10.0.142.187:3000//showproduct/" + this.category)
      .then((response) => {
        this.allproduct = response.data.message;
        console.log(this.allproduct);
      });
  },
  mounted: function () {
    clearInterval(this.fades);
    this.fade();
  },
  computed: {
    indexsslide() {
      let a = 0;
      if (this.indexslide < 0) {
        a = this.slide.length - 1;
      } else if (this.slide.length == this.indexslide) {
        a = 0;
      } else if (this.slide.length > this.indexslide && this.indexslide != 0) {
        a = this.indexslide;
      }
      this.indexvalue(a);
      return a;
    },
  },
  methods: {
    fetchdb() {},
    indexvalue(a) {
      this.indexslide = a;
    },
    fade() {
      try {
        // console.log("reani");
        var element = document.getElementById("fade");
        element.classList.remove("fade");
        void element.offsetWidth;
        element.classList.add("fade");
        this.indexslide++;
        this.timeOut = setTimeout(this.fade, 5000);
      } catch (error) {
        console.log("error");
      }
    },

    imagePath(file_path) {
      // console.log(file_path);

      if (file_path) {
        let img = file_path.slice(1, file_path.length-1).split(',')
      // console.log(img[0]);
        return "/" + img[0];
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    searchProduct() {
      axios
        .post("10.0.142.187:3000//seaechproductincategory", {
          search: this.search,
          minrange: this.minrange,
          maxrange: this.maxrange,
          category: "speaker",
        })
        .then((response) => {
          this.allproduct = response.data.message;
          console.log(this.allproduct);
        });
    },
  },

  data() {
    return {
      allproduct: [],
      search: null,
      minrange: 0,
      maxrange: 500000,
      category: this.$route.params.category,
      slide: [
        "https://images.pexels.com/photos/1006511/pexels-photo-1006511.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/4116224/pexels-photo-4116224.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/4488667/pexels-photo-4488667.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      ],
      indexslide: 0,
      fades: null,
      timeOut: null
    };
  },
};
</script>

<style scoped>
.bg{
  background-color:rgb(26, 26, 26)
}

.slideshow-container {
  width: 100%;
  position: relative;
  /* margin: auto; */
}

/* Next & previous buttons */
.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

/* Fading animation */
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}
@keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}

/* On smaller screens, decrease text size */
@media only screen and (max-width: 300px) {
  .prev,
  .next,
  .text {
    font-size: 11px;
  }
}

.card {
  position: relative;
  height: 360px;
  overflow: hidden;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  transition: height 0.3s, box-shadow 0.3s;
}

.card:hover {
  height: 375px;
  box-shadow: 10px 10px 20px 0px #ffdd57;
}

.card-image {
  /* position: absolute; */
  /* left: 1px;
  right: 1px; */
  /* margin: auto; */

  min-width: 100%;
  opacity: 0.90;
  transition: opacity 0.7s;
}
.card-image:hover {
  opacity: 1;
}

</style>