<template>
  <swiper
    :slidesPerView="1.5"
    :spaceBetween="15"
    :centeredSlides="true"
    :navigation="true"
    :modules="modules"
    class="myActListSwiper"
  >
    <swiper-slide class="slide1">
      1111
    </swiper-slide>
    <swiper-slide class="slide2">
      222
    </swiper-slide>
    <swiper-slide class="slide3">
      3333
    </swiper-slide>
  </swiper>
</template>

<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from "swiper/vue";

  // Import Swiper styles
  import "swiper/css";

  import "swiper/css/pagination";
  import "swiper/css/navigation";

  import "@/styles/swiper.css";

  // import required modules
  import { Navigation } from "swiper";

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [Navigation],
      };
    },
  };
</script>

<style lang="scss">
  @import "@/scss/mixin";

  :root {
    --swiper-theme-color: #178481;
    --swiper-navigation-size: 40px;
  }


  .myActListSwiper{
    width: 100%;
    height: 200px;

    .slide1{
      background-color: black;
    }
    .slide2{
      background-color: red;
    }
    .slide3{
      background-color: green;
    }
  }


</style>
