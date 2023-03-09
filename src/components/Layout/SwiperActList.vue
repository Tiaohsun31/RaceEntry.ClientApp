<template>
  <section id="ActListSwiper">
    <swiper
      :slidesPerView="1.2"
      :spaceBetween="15"
      :initialSlide="3"
      :centeredSlides="true"
      :navigation="true"
      :modules="modules"
      :breakpoints="{
        535: { slidesPerView: 1.2 },
        768: { slidesPerView: 1.5 },
        850: { slidesPerView: 2 },
        1024: { slidesPerView: 2.5 },
        1200: { slidesPerView: 3 },
        1440: { slidesPerView: 3.5 },
      }"
      class="myActListSwiper"
    >
      <swiper-slide class="ActListCard" v-for="item in ActList">
        <h3 class="title" :data-year="item.year" :data-month="item.month">
          <span>{{ item.year }}</span
          >&nbsp;年&nbsp;<span>{{ item.month }}</span
          >&nbsp;月
        </h3>
        <router-link
          class="ActCard"
          v-for="insideItem in item.objList"
          :to="{ name: 'HomePage', params: { code: insideItem.actCode } }"
        >
          <div class="info-area">
            <img :src="insideItem.square" alt="" v-if="insideItem.square" />
            <img src="/body-bg-1.jpg" alt="" v-else />
            <div class="contentBox">
              <div class="contentTitle">
                <span class="act-location">{{ insideItem.category }}</span>
                <p class="act-name">
                  {{ insideItem.actName }}
                </p>
              </div>
              <div class="inside-box">
                <span>活動日期&nbsp;/&nbsp;</span>
                <p>{{ actDate(insideItem.actDate) }}</p>
              </div>
              <div class="inside-box">
                <span>報名截止&nbsp;/&nbsp;</span>
                <p>{{ shortDate(insideItem.regETime) }}</p>
              </div>
              <div class="inside-box">
                <span>活動地點&nbsp;/&nbsp;</span>
                <p>{{ insideItem.address }}</p>
              </div>
            </div>
          </div>
          <div :class="insideItem.tags ? 'btn-area' : 'btn-area-noTag'">
            <div class="leftbox" v-if="insideItem.tags">
              <span v-for="tag in insideItem.tags?.split(',')">{{ tag }}</span>
            </div>
            <div class="rightbox">
              <router-link
                :to="`/${insideItem.actCode}#signup`"
                class="signup-btn"
                v-if="insideItem.canSignUp"
                >我要報名</router-link
              >
            </div>
          </div>
        </router-link>
      </swiper-slide>
    </swiper>
    <div class="moreActArea">
      <SearchFilter position="ActListBtn" />
    </div>
  </section>
</template>

<script>
  import SearchFilter from "./SearchFilter2.vue";
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
  import { Navigation } from "swiper";

  export default {
    props: ["ActList"],
    components: {
      Swiper,
      SwiperSlide,
      SearchFilter,
    },

    setup() {
      return {
        modules: [Navigation],
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
  @import "@/scss/variable";
  @import "@/scss/common";

  :root {
    --swiper-theme-color: black;
    --swiper-navigation-size: 40px;
    @include bkpt(768px) {
      --swiper-navigation-size: 25px;
    }
  }

  #ActListSwiper {
    width: 100%;
    position: relative;

    .myActListSwiper {
      width: 100%;
      height: auto;

      @include bkpt(768px) {
        position: relative;
      }

      .swiper-button-prev,
      .swiper-button-next {
        @include bkpt(768px) {
          position: absolute;
          top: 0;
        }

        &::after {
          transform: scaleY(1.3) scaleX(0.8);

          @include bkpt(768px) {
            transform: scaleY(1) scaleX(1);
            transform: translateY(35%);
          }
        }
      }

      .swiper-button-prev {
        margin-left: 15px;
        transform: translateX(-100px);
        transition: 0.5s;
        @include bkpt(768px) {
          transform: translateX(0);
        }
        &::after {
          padding: 10px;
        }
      }

      .swiper-button-next {
        margin-right: 15px;
        transform: translateX(100px);
        transition: 0.5s;
        @include bkpt(768px) {
          transform: translateX(0);
        }
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

      .ActListCard {
        @include flex(flex-start, flex-start);
        flex-direction: column;
        .title {
          text-align: start;
          width: 100%;
          font-size: 16px;
          font-weight: 500;
          padding: 5px 0 10px 5px;
          border-bottom: 1px solid $darkfontcolor;
          color: $darkfontcolor;
          margin-bottom: 0;
          @include flex(center, flex-end);
          span {
            font-weight: 700;
            font-size: 20px;
          }
        }

        .ActCard {
          width: 100%;
          padding: 10px 15px;
          border-bottom: 1px solid $lightborder;
          text-decoration: none;

          &:hover {
            background-color: $lighthoverbg;
          }

          .info-area {
            width: 100%;
            padding-bottom: 5px;
            @include flex(flex-start, flex-start);
            img {
              width: 150px;
              height: 90px;
            }
            .contentBox {
              width: 100%;
              padding-left: 10px;
              font-size: 14px;
              @include flex(flex-start, flex-start);
              flex-direction: column;
              color: $lightfontcolor;
              overflow: hidden;
              .contentTitle {
                width: 100%;
                font-size: 15px;
                margin-bottom: 5px;
                text-align: start;
                font-weight: 700;
                color: $maincolor;
                @include flex(flex-start, flex-start);
                //文字太多的話顯示...

                .act-location {
                  color: white;
                  background-color: $mainhovercolor;
                  padding: 2px 5px;
                  display: inline-block;
                  font-size: 13px;
                  margin-right: 5px;
                }

                .act-name {
                  margin-bottom: 0;
                  flex: 1;
                  transform: translateY(1px);
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                }
              }

              .inside-box {
                width: 100%;
                text-align: start;
                @include flex(flex-start, flex-start);
                span {
                  white-space: nowrap;
                }
                p {
                  margin: 0;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                }
              }
            }
          }

          &:hover .leftbox {
            span {
              background-color: $tagbghovercolor !important;
            }
          }

          .btn-area,
          .btn-area-noTag {
            margin-top: 5px;

            .leftbox {
              @include flex(flex-start, center);
              span {
                padding: 3px 8px;
                border-radius: 4px;
                font-size: 10px;
                color: $darkfontcolor;
                font-weight: 700;
                background-color: $tagbgcolor;
                margin-right: 3px;
              }
            }

            .rightbox {
              a {
                border: none;
                color: white;
                font-size: 13px;
                border-radius: 2px;
                padding: 3px 10px;
                display: inline-block;
                text-decoration: none;
                cursor: pointer;

                &:last-of-type {
                  margin-right: 0;
                }
              }
              .infopage-btn {
                background-color: $maincolor;
                &:hover {
                  background-color: $mainhovercolor;
                }
              }
              .signup-btn {
                background-color: $subcolor;
                &:hover {
                  background-color: $subhovercolor;
                }
              }
            }
          }

          .btn-area {
            @include flex(space-between, center);
          }

          .btn-area-noTag {
            @include flex(center, center);
            .rightbox {
              width: 100%;
              a {
                width: 100%;
              }
            }
          }
        }
      }

      .swiper-slide-active {
        .moreActArea {
          display: flex;
        }
      }
    }
  }

  .moreActArea {
    width: 100%;
    margin: 50px 0;
    @include flex;
    button {
      background: none;
      padding: 3px 50px;
      display: inline-block;
      border: 1px solid $darkfontcolor;
      color: $darkfontcolor;
      text-decoration: none;
      transition: 0.2s;
      font-size: 15px;

      &:hover {
        border: 1px solid $mainhovercolor;
        background-color: $mainhovercolor;
        color: white;
      }
    }
  }
</style>
