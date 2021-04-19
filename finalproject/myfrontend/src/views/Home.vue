<template>
  <div class="bg">
    <div class="columns">
      <div class="slideshow-container">
        <div class="fade" id="fade">
          <img
            :src="slide[indexsslide]"
            style="width: 100%; object-fit: cover"
          />
        </div>

        <a
          class="prev"
          @click="
            indexslide--;
            fade();
          "
          >&#10094;</a
        >
        <a
          class="next"
          @click="
            indexslide++;
            fade();
          "
          >&#10095;</a
        >
      </div>
    </div>

    <div class="columns has-text-centered mb-5 mx-5" style="padding-top: 80px">
      <div class="column bgProduct" style="position: relative; height: 275px">
        <router-link
          :to="{ name: 'showproduct', params: { category: 'speaker' } }"
        >
          <img
            src="https://th-test-11.slatic.net/shop/cd5cec15f2b01477c7d153cfd35e4e2a.jpeg"
            alt=""
            class="showimage"
          />
          <div class="showproduct">Speaker</div></router-link
        >
      </div>

      <div class="column bgProduct" style="position: relative; height: 275px">
        <router-link
          :to="{ name: 'showproduct', params: { category: 'radio' } }"
        >
          <img
            src="https://www.tuek-klongthom.com/wp-content/uploads/wpsc/product_images/2DIN-DNX4330.jpg"
            alt=""
            class="showimage"
          />
          <div class="showproduct">Radio</div></router-link
        >
      </div>

      <div
        class="column bgProduct"
        style="position: relative; height: 275px; object-fit: cover"
      >
        <router-link
          :to="{ name: 'showproduct', params: { category: 'film' } }"
        >
          <img
            src="https://image.makewebeasy.net/makeweb/0/FpbNivp4p/lamina/09_lamina_POP.jpg"
            alt=""
            class="showimage"
          />
          <div class="columns">
            <div class="showproduct">Film</div>
          </div></router-link
        >
      </div>
    </div>

    <div
      class="columns has-text-centered mb-5 mx-5"
      style="padding-bottom: 80px"
    >
      <div class="column bgProduct" style="position: relative; height: 275px">
        <router-link
          :to="{ name: 'showproduct', params: { category: 'camera' } }"
        >
          <img
            src="https://th-live-01.slatic.net/p/69b9b7e209fd466812122bb458af45be.jpg"
            alt=""
            class="showimage"
          />
          <div class="showproduct">Camera</div></router-link
        >
      </div>

      <div class="column bgProduct" style="position: relative; height: 275px">
        <router-link
          :to="{ name: 'showproduct', params: { category: 'sensor' } }"
        >
          <img
            src="https://lh3.googleusercontent.com/proxy/3GeJAEH5YINEXeJ6iGbX4_a7P-E7e9uZVSLcwBhynma3bzzIGu8CZJiThxw_JoHw6TGNh5ZzQbAquO7oRmOBX3f341UILo3fg8FmBR8"
            alt=""
            class="showimage"
          />
          <div class="showproduct">Sensor</div></router-link
        >
      </div>

      <div
        class="column bgProduct"
        style="position: relative; height: 275px; object-fit: cover"
      >
        <router-link to="allproduct">
          <img
            src="https://cdn.discordapp.com/attachments/603631846525501460/832636104422719499/unknown.png"
            alt=""
            class="showimage"
          />
          <div class="columns">
            <div class="showproduct">All</div>
          </div></router-link
        >
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
  mounted: function () {
    clearInterval(this.fades);
    this.fade();
  },
  methods: {
    fetchdb() {},
    indexvalue(a) {
      this.indexslide = a;
    },
    fade() {
      this.fades = setInterval(() => {
        console.log("reani");
        var element = document.getElementById("fade");
        element.classList.remove("fade");
        void element.offsetWidth;
        element.classList.add("fade");
        this.indexslide++;
      }, 5000);
    },
  },
  data() {
    return {
      data: null,
      slide: [
        "https://www.w3schools.com/howto/img_nature_wide.jpg",
        "https://www.w3schools.com/howto/img_snow_wide.jpg",
        "https://www.w3schools.com/howto/img_mountains_wide.jpg",
      ],
      indexslide: 0,
      fades: null,
    };
  },
};
</script>

<style scoped>
.bg {
  background-color: black;
  background-repeat: no-repeat;
  background-size: auto;
  height: 100%;
  object-fit: cover;
  /* padding: 150px; */
}
html {
  background-color: black;
}
.bgProduct {
  background-color: #ffdd57;
  border-radius: 1%;

  margin-left: 10px;
  position: relative;
  width: 50%;
}

.bgProduct:hover .showimage {
  opacity: 0.3;
}

.bgProduct:hover .showproduct {
  opacity: 1;
}

.showproduct {
  position: absolute;
  padding: 10px;
  font-size: 6em;

  transition: 0.5s ease;
  opacity: 0;
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);
}

.showimage {
  height: 250px;
  object-fit: cover;
  border-radius: 5%;

  transition: 0.5s ease;
  backface-visibility: hidden;
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
</style>