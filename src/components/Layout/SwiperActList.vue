<template>
  <section id="ActListSwiper">
    <article class="swiper myActListSwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide ActListCard" v-for="item in actList">
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
                <span v-for="tag in insideItem.tags?.split(',')">{{
                  tag
                }}</span>
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
        </div>
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </article>

    <div class="moreActArea">
      <SearchFilter position="ActListBtn" />
    </div>

    <!-- <button @click="activeSlide">click me to find Slide</button> -->
  </section>
</template>


<script >
  import SearchFilter from "./SearchFilter2.vue";

  import axios from "axios";
  import moment from "moment";
  import "moment/dist/locale/zh-tw";
  // Import Swiper Vue.js components
  import Swiper from "swiper";

  // Import Swiper styles
  import "swiper/css";

  import "swiper/css/pagination";
  import "swiper/css/navigation";

  import "@/styles/swiper.css";

    // import required modules
    import { Navigation } from "swiper";

  export default {
    components: {
      SearchFilter,
    },

    data() {
      return {
        recommendActs: [],
        actList: [],
        closestMonthIndex: 0,
      };
    },

    created() {},

    methods: {
      actDate: function (value) {
        return moment(value).format("YYYY-MM-DD (dd)");
      },
      shortDate: function (value) {
        return moment(value).format("YYYY-MM-DD");
      },
      createActList() {
        // 獲得今天日期資訊
        const today = new Date();

        // 過濾符合條件的陣列
        const filteredArray = this.recommendActs.filter((obj) => {
          const objDate = new Date(obj.year, obj.month - 1);
          const sixMonthsAgo = new Date(
            today.getFullYear(),
            today.getMonth() - 4 //只擷取目前日期前兩個月
          );
          const twelveMonthsLater = new Date(
            today.getFullYear(),
            today.getMonth() + 11 //以及目前日期往後推算一年的活動
          );

          return objDate >= sixMonthsAgo && objDate <= twelveMonthsLater;
        });

        // 根據日期排序已篩選後的陣列
        const sortedArray = filteredArray.sort(function (a, b) {
          const dateA = new Date(a.year, a.month - 1, 1).getTime();
          const dateB = new Date(b.year, b.month - 1, 1).getTime();
          return dateA - dateB;
        });

        // 將他們歸納成新陣列
        this.actList = sortedArray.reduce((acc, obj) => {
          const index = acc.findIndex(
            (item) => item.year === obj.year && item.month === obj.month
          );

          if (index === -1) {
            acc.push({ year: obj.year, month: obj.month, objList: [obj] });
          } else {
            acc[index].objList.push(obj);
          }

          return acc;
        }, []);

        //新陣列內的objList只留下前3個物件，其餘刪除
        this.actList.forEach((item) => {
          item.objList.splice(3);
          //排序方式(當月份越早的活動越前面)
          item.objList.sort(
            (a, b) => new Date(a.actDate) - new Date(b.actDate)
          );
        });
      },
      findclosestMonthIndex() {
        // 取得當前日期
        const today = new Date();
        // 取得當前月份
        const thisMonth = today.getMonth() + 1;
        // 取得當前年份
        const thisYear = today.getFullYear();

        // 狀況一：陣列內「有」條件完全符合的物件
        // 使用 findIndex() 方法尋找完全符合當前月份及年份的物件，並返回該物件的索引值
        this.closestMonthIndex = this.actList.findIndex(
          (item) => item.month === thisMonth && item.year === thisYear
        );

        // 狀況二：陣列內「沒有」完全符合條件的物件
        if (this.closestMonthIndex === -1) {
          // 當前年份內，找到大於當前月份的物件
          let index = this.actList.findIndex(
            (item) => item.year === thisYear && item.month > thisMonth
          );
          if (index !== -1) {
            this.closestMonthIndex = index;
          } else {
            // 如果當前年份內沒有大於當前月份的物件，則尋找下一年的物件
            index = this.actList.findIndex(
              (item) => item.year === thisYear + 1 && item.month > 0
            );
            if (index !== -1) {
              this.closestMonthIndex = index;
            } else {
              // 如果下一年也沒有任何物件，則直接丟出actList的索引最大值
              this.closestMonthIndex = this.actList.length - 1;
            }
          }
        }
      },
    },
    watch: {},
    mounted() {
      let endpoints = [`/api/act?number=12`];
      Promise.all(endpoints.map((endpoint) => axios.get(endpoint)))
        .then(([{ data: recommendActs }]) => {
          this.recommendActs = recommendActs;
        })
        .then(() => {
          this.createActList();
          this.findclosestMonthIndex();
        })
        .then(() => {
          new Swiper(".myActListSwiper", {
            slidesPerView: 1,
            initialSlide: this.closestMonthIndex,
            spaceBetween: 15,
            centeredSlides: true,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            breakpoints: {
              535: { slidesPerView: 1.2},
              768: { slidesPerView: 1.5},
              850: { slidesPerView: 2 },
              1024: { slidesPerView: 2.5 },
              1200: { slidesPerView: 3 },
              1440: { slidesPerView: 3.5 },
            },
            modules: [Navigation],
          });
        });
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
          display: none;
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
        height: 100%;
        flex-direction: column;
        width: 100%;
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
