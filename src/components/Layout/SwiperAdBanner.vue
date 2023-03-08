<template>
  <swiper
    :spaceBetween="0"
    :centeredSlides="true"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }"
    :navigation="true"
    :modules="modules"
    :loop="true"
    :breakpoints="{

      535: { slidesPerView: 1 },
      768: { slidesPerView: 1.25 },
      1300: { slidesPerView: 1.5 },
    }"
    class="myAdBannerSwiper"
  >
    <swiper-slide v-for="item in ads" class="swiperCard">
      <a :href="item.urls" target="_blank">
        <img :src="item.src" :alt="item.alt" />
      </a>
    </swiper-slide>

    <div class="shadowMask"></div>
  </swiper>
</template>

<script>
  import axios from "axios";

  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from "swiper/vue";

  // Import Swiper styles
  import "swiper/css";

  import "swiper/css/effect-fade";
  import "swiper/css/navigation";

  import "@/styles/swiper.css";

  // import required modules
  import { Autoplay, Navigation, EffectFade } from "swiper";

  export default {
    name: "SwiperAdBanner",
    components: {
      Swiper,
      SwiperSlide,
    },
    data() {
      return {
        ads: [],
      };
    },
    setup() {
      return {
        modules: [EffectFade, Autoplay, Navigation],
      };
    },
    methods: {},
    mounted() {
      axios.get("/api/webSetting/ads").then(({ data }) => (this.ads = data));
    },
  };
</script>

<style lang="scss">
  @import "@/scss/mixin";

  :root {
    --swiper-theme-color: black;
    --swiper-navigation-size: 40px;
  }

  .myAdBannerSwiper {
    max-width: 1403px;
    padding: 0 15px;
    width: 100%;
    height: auto;
    margin-top: 50px;
    position: relative;

    .shadowMask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      box-shadow: inset 50px 0 50px -50px white, inset -50px 0 50px -50px white;
      pointer-events: none;
    }
    .swiperCard {
      width: 100%;
      height: auto;

      a {
        width: 100%;
        cursor: default;
        text-decoration: none;

        img {
          width: 100%;
        }
      }
    }

    .swiper-button-prev,
    .swiper-button-next {
      &::after {
        transform: scaleY(1.3) scaleX(0.8);
      }

      @include bkpt(535px) {
        display: none !important;
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

    .swiperCard {
      opacity: 0.3;
    }
    .swiper-slide-active {
      opacity: 1 !important;
    }
  }
</style>
