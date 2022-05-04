<template>
  <div :class="{ bg: true }">
    <div class="columns">
      <div class="slideshow-container">
        <div class="fade" id="fade">
          <img
            :src="slide[indexsslide]"
            style="width: 100%; object-fit: cover; height: 500px"
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
    <section class="card--all">
      <div>
        <router-link
          :to="{ name: 'showproduct', params: { category: 'speaker' } }"
        >
          <div class="image--">
            <img
              style="height: 420px"
              src="https://images.pexels.com/photos/157534/pexels-photo-157534.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            />
          </div>
          <p>Speaker</p>
        </router-link>
      </div>
      <div>
        <router-link
          :to="{ name: 'showproduct', params: { category: 'radio' } }"
        >
          <div class="image--">
            <img
              src="https://images.pexels.com/photos/3738982/pexels-photo-3738982.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            />
          </div>
          <p>Radio</p>
        </router-link>
      </div>
      <div>
        <router-link
          :to="{ name: 'showproduct', params: { category: 'film' } }"
        >
          <div class="image--">
            <img
              src="https://images.pexels.com/photos/3550674/pexels-photo-3550674.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
            />
          </div>
          <p>Film</p>
        </router-link>
      </div>
    </section>
    <section class="card--all">
      <div>
        <router-link
          :to="{ name: 'showproduct', params: { category: 'camera' } }"
        >
          <div class="image--">
            <img
              style="height: 420px"
              src="https://images.pexels.com/photos/4062452/pexels-photo-4062452.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
          </div>
          <p>Camera</p>
        </router-link>
      </div>
      <div>
        <router-link
          :to="{ name: 'showproduct', params: { category: 'sensor' } }"
        >
          <div class="image--">
            <img
              style="height: 420px"
              src="https://www.hitechcarsound.com.au/wp-content/uploads/2016/08/4-Head-Reversing-Sensors.jpg"
            />
          </div>
          <p>Sensor</p>
        </router-link>
      </div>
      <div>
        <router-link to="allproduct">
          <div class="image--">
            <img
              src="https://images.pexels.com/photos/4489708/pexels-photo-4489708.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            />
          </div>
          <p>All</p>
        </router-link>
      </div>
    </section>
  </div>
</template>



<script>
import axios from "axios";
import "bulma/css/bulma.css";
export default {
  created() {
    axios.post("http://18.139.80.70:3000/inflowhistory").then((response) => {
      this.data = response.data.message;
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
      try {
        var element = document.getElementById("fade");
        element.classList.remove("fade");
        void element.offsetWidth;
        element.classList.add("fade");
        this.indexslide++;
        this.timeOut = setTimeout(this.fade, 5000);
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      data: null,
      slide: [
        "https://images.pexels.com/photos/4489732/pexels-photo-4489732.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/4116193/pexels-photo-4116193.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/3822844/pexels-photo-3822844.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      ],
      indexslide: 0,
      fades: null,
      timeOut: null,
    };
  },
};
</script>

<style scoped>
.bg {
  /* background-image: url("../assets/bgSignUp.jpg"); */

  background-color: black;
  height: 100%;

  /* background-repeat: no-repeat;
  background-size: auto;
  height: 100%;
  object-fit: cover; */
  /* padding: 150px; */

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
body,
html {
  background-color: black;
  height: 100%;
  scroll-behavior: smooth;
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
/* -------HOVER PIC PRODUCT */
.card--all {
  display: flex;
}
.card--all div {
  position: relative;
  width: 33.33%;
}
.card--all div .image-- {
  height: auto;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.card--all div .image-- img {
  transition: all 0.5s 0s ease;
}
.card--all div:hover .image-- img {
  transform: scale(1.2);
}
.card--all div p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  color: #fff;
  font-weight: bold;
  font-size: 30px;
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