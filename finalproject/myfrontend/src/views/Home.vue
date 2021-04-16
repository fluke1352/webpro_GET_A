<template>
  <div>
    <div class="columns">
      <div class="column is-full has-background-primary">nev Bar</div>
    </div>
    <div class="columns">
      <div class="slideshow-container">
        <div class="mySlides fade">
          <img
            :src="slide[0]"
            
            style="width: 100%; object-fit: cover"
          />
        </div>

        <a class="prev" @click="indexslide--">&#10094;</a>
        <a class="next" @click="indexslide++">&#10095;</a>
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
  methods: {
    fetchdb() {},
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

@-webkit-keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
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
