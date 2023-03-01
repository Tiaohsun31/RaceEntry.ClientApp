<template>
  <swiper
    :spaceBetween="30"
    :autoplay="{
      delay: 6000,
      disableOnInteraction: false,
    }"
    :pagination="{
      clickable: true,
      dynamicBullets: true,
    }"
    :navigation="true"
    :modules="modules"
    :loop="true"
    class="myBannerSwiper"
  >
    <swiper-slide v-for="(item, index) in bannerArray">
      <router-link
        :to="{ name: 'HomePage', params: { code: item.actCode } }"
        class="swiperCard"
        target="_blank"
      >
        <img :src="item.rectangle" :alt="item.actName" />
      </router-link>
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
  import { Autoplay, Pagination, Navigation } from "swiper";

  export default {
    props: ["bannerArray"],
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [Autoplay, Pagination, Navigation],
      };
    },
  };
</script>

<style lang="scss">
  @import "@/scss/mixin";

  :root {
    --swiper-theme-color: black;
    --swiper-navigation-size: 40px;
  }

  .myBannerSwiper {
    width: 100%;
    height: auto;
    .swiperCard {
      width: 100%;
      height: auto;
      cursor: default;
    }

    .swiper-button-prev,
    .swiper-button-next {
      &::after {
        transform: scaleY(1.3) scaleX(0.8);
      }
    }

    .swiper-button-prev {
      margin-left: 15px;
      transform: translateX(-100px);
      transition: 0.5s;
      &::after {
        padding: 10px;
      }
    }

    .swiper-button-next {
      margin-right: 15px;
      transform: translateX(100px);
      transition: 0.5s;
      &::after {
        padding: 10px;
      }
    }

    &:hover .swiper-button-prev {
      transform: translateX(0);
    }
    &:hover .swiper-button-next {
      transform: translateX(0);
    }
  }
</style>
