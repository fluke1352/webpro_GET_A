<template>
  <div>
    <div class="columns">
      <div class="column is-full has-background-primary">nev Bar</div>
    </div>
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
    <div class="columns mx-5 has-text-centered mb-5" >
      <div class="column has-background-primary" style="position: relative; height: 275px;">
        <img
          src="https://th-test-11.slatic.net/shop/cd5cec15f2b01477c7d153cfd35e4e2a.jpeg"
          alt=""
          class="showimage"
        />
        <div class="showproduct">Speaker</div>
      </div>

      <div
        class="column has-background-primary mx-3"
        style="position: relative; height: 275px;"
      >
        <img
          src="https://www.tuek-klongthom.com/wp-content/uploads/wpsc/product_images/2DIN-DNX4330.jpg"
          alt=""
          class="showimage"
        />
        <div class="showproduct">Radio</div>
      </div>

      <div
        class="column has-background-primary mx-3"
        style="position: relative; height: 275px; object-fit: cover"
      >
        <img
          src="https://image.makewebeasy.net/makeweb/0/FpbNivp4p/lamina/09_lamina_POP.jpg"
          alt=""
          class="showimage"
        />
        <div class="columns">
        <div class="showproduct">film</div></div>
      </div>

    </div>

    <div class="columns mx-5 has-text-centered mb-5" >
      <div class="column has-background-primary" style="position: relative; height: 275px;">
        <img
          src="https://th-live-01.slatic.net/p/69b9b7e209fd466812122bb458af45be.jpg"
          alt=""
          class="showimage"
        />
        <div class="showproduct">camere</div>
      </div>

      <div
        class="column has-background-primary mx-3"
        style="position: relative; height: 275px;"
      >
        <img
          src="https://lh3.googleusercontent.com/proxy/3GeJAEH5YINEXeJ6iGbX4_a7P-E7e9uZVSLcwBhynma3bzzIGu8CZJiThxw_JoHw6TGNh5ZzQbAquO7oRmOBX3f341UILo3fg8FmBR8"
          alt=""
          class="showimage"
        />
        <div class="showproduct">sensor</div>
      </div>

      <div
        class="column has-background-primary mx-3"
        style="position: relative; height: 275px; object-fit: cover"
      >
        <img
          src="https://cdn.discordapp.com/attachments/603631846525501460/832636104422719499/unknown.png"
          alt=""
          class="showimage"
        />
        <div class="columns">
        <div class="showproduct">All</div></div>
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
  methods: {
    fetchdb() {},
    indexvalue(a) {
      this.indexslide = a;
    },
    fade() {
      console.log("reani");
      var element = document.getElementById("fade");
      element.classList.remove("fade");
      void element.offsetWidth; 
      element.classList.add("fade");
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
    };
  },
};
</script>

<style scoped>
.showproduct {
  position: absolute;
  padding: 10px;
  margin-top: -50%;
  font-size: 6em;
}

.showimage {
  height: 100%;
  object-fit: cover
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