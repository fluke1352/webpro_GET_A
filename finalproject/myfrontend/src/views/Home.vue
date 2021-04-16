<template>
  <div class="container is-widescreen">
    <div class="columns">
      <div class="column is-full has-background-primary">nev Bar</div>
    </div>
    <section class="section" id="app">
      <div class="content">
        <div class="columns is-multiline">
          <div
            class="column is-3"
            v-for="product in products"
            :key="product.type_id"
          >
            <div class="card">
              <div class="card-image pt-5">
                <figure class="image is-1by1">
                  <img style="height: 120px" alt="Placeholder image" />
                </figure>
              </div>
              <div class="card-content">
                <div class="title">{{ product.type_name }}</div>
                <div class="content">
                  price: {{ product.price }}
                </div>
              </div>
              <footer class="card-footer">
                <p class="card-footer-item">
                  <span>
                    View
                  </span>
                </p>
                <p class="card-footer-item">
                  <i class="fas fa-shopping-cart"></i>
                  add to cart
                </p>
              </footer>
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
export default {
  name: "Home",
  data() {
    return {
      search: "",
      products: [],
    };
  },
  mounted() {
    this.getproduct();
  },
  methods: {
    getproduct() {
      axios
        .get("http://localhost:3000/", {})
        .then((response) => {
          this.products = response.data;
        })
        .catch((err) => {
          console.log(err);
          alert("error");
        });
    },
  },
};
</script>
