<template>
  <swiper
    :spaceBetween="0"
    :autoplay="{
      delay: 6000,
      disableOnInteraction: false,
    }"
    :pagination="{
      clickable: true,
      dynamicBullets: true,
    }"
    :centeredSlides="true"
    :navigation="true"
    :modules="modules"
    :loop="true"
    class="myBannerSwiper"
  >
    <swiper-slide v-for="(item, index) in bannerArray" class="swiperCard">
      <router-link
        :to="{ name: 'HomePage', params: { code: item.actCode } }"
        target="_blank"
      >
        <img :src="item.rectangle" :alt="item.actName" />

        <article class="bannerInfoCard">
          <div class="infoCardContainer">
            <div class="titleBox">
              {{ item.actName }}
            </div>
            <div class="contentBox">
              <span>活動時間 / {{ actDate(item.actDate) }}</span>
              <span>報名截止 / {{ shortDate(item.regETime) }}</span>
            </div>
          </div>
        </article>
      </router-link>
    </swiper-slide>
  </swiper>
</template>

<script>
  import moment from "moment";
  import "moment/dist/locale/zh-tw";
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
    methods: {
      actDate: function (value) {
        return moment(value).format("YYYY-MM-DD (dd)");
      },
      shortDate: function (value) {
        return moment(value).format("YYYY-MM-DD");
      },
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

      a {
        width: 100%;
        cursor: default;
        text-decoration: none;

        img {
          width: 100%;
        }

        .bannerInfoCard {
          width: 100%;
          height: 75px;
          background-color: rgba($color: black, $alpha: 0.25);
          color: white;

          @include pad{
            height: auto;
          }
          

          .infoCardContainer {
            margin: 0 auto;
            max-width: 1403px;
            height: 100%;
            padding: 0 15px;
            @include flex(space-between, center);

            @include pad{
              flex-direction: column;
              justify-content: center;
              padding: 15px 15px;
            }


            .titleBox {
              font-size: 20px;
            }

            .contentBox {
              span {
                font-size: 15px;
                margin-right: 20px;
                &:last-of-type {
                  margin-right: 0;
                }
              }
              @include bkpt(535px){
                span{
                  margin-right: 0;
                }
                @include flex;
                flex-direction: column;
              }
            }
          }
        }
      }
    }

    .swiper-pagination {
      bottom: 90px !important;
      @include pad{
        display: none;
      }

    }

    .swiper-button-prev,
    .swiper-button-next {
      &::after {
        transform: scaleY(1.3) scaleX(0.8);
      }
      @include pad{
        display: none;
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
