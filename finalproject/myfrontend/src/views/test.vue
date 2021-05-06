<template>
  <div class="">
    <section class="card--all">
      <div>
        <div class="image--">
          <img
            src="https://i.pinimg.com/originals/45/74/c6/4574c68d814dc0d3a64611ee401ea7dc.jpg"
          />
        </div>
        <p>Spacker</p>
      </div>
      <div>
        <div class="image--">
          <img src="https://wallpaperaccess.com/full/3047149.jpg" />
        </div>
        <p>Car</p>
      </div>
      <div>
        <div class="image--">
          <img
            src="https://wonderfulengineering.com/wp-content/uploads/2013/12/engine-wallpaper-7.jpg"
          />
        </div>
        <p>Engine</p>
      </div>
    </section>
    <section class="card--all">
      <div>
        <div class="image--">
          <img src="https://wallpaperaccess.com/full/5379.jpg" />
        </div>
        <p>Spacker</p>
      </div>
      <div>
        <div class="image--">
          <img
            src="https://cdn.statically.io/img/wallpapercart.com/wp-content/uploads/2019/04/Super-Car-Wallpaper-lighting-wheel-1920x1080.jpg?quality=100&f=auto"
          />
        </div>
        <p>Car</p>
      </div>
      <div>
        <div class="image--">
          <img
            src="https://cdn.wallpaper.com/main/styles/fp_1540x944/s3/2020/02/mercedes-car-of-future.jpg"
          />
        </div>
        <p>Engine</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'test',
}
</script>

<style>
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
</style>
