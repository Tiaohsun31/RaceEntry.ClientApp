<template>
  <Layout>
    <Transition v-if="marquee.length" name="slide-fade" appear>
      <div
        id="carouselExampleControls"
        class="carousel slide bgc-primary text-white py-2"
        data-ride="false"
      >
        <div class="carousel-inner">
          <div class="text-center">
            <template v-for="(item, index) in marquee">
              <div
                class="carousel-item"
                v-bind:class="index == 0 ? ' active' : ''"
              >
                <a
                  v-bind:href="item.urls"
                  class="text-white text-110 text-nowrap"
                  style="width: 21rem"
                  v-text="item.title"
                ></a>
              </div>
            </template>
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </Transition>
    <!-- End marquee-->

    <!-- Banner -->
    <SwiperBanner :bannerArray="banners" />
    <!-- End Banner-->
    <section id="homepage">
      <!-- marquee -->
      <!-- Search and Filter-->
      <div class="container" id="searchContainer">
        <SubTitle Title="條件篩選活動" />
        <SearchFilter position="Home"></SearchFilter>
      </div>
      <!-- End Search and Filter -->
    </section>

    <!-- Act List -->
    <SubTitle Title="眾點推薦活動" />
    <SwiperActList :ActList="actList" />

    <!-- End Act List -->
  </Layout>
</template>

<script>
  import SearchFilter from "../components/Layout/SearchFilter2.vue";
  import SwiperBanner from "@/components/Layout/SwiperBanner.vue";
  import SwiperActList from "@/components/Layout/SwiperActList.vue";
  import SubTitle from "@/components/Layout/SubTitle.vue";

  import axios from "axios";
  import moment from "moment";
  import "moment/dist/locale/zh-tw";

  export default {
    components: {
      SearchFilter,
      SwiperBanner,
      SwiperActList,
      SubTitle,
    },
    data() {
      return {
        marquee: [],
        recommendActs: [],
        banners: [],
        actList: [],
      };
    },
    created() {
      let endpoints = [
        `/api/webSetting/marquee`,
        `/api/webSetting/banners`,
        `/api/act?number=12`,
      ];
      Promise.all(endpoints.map((endpoint) => axios.get(endpoint)))
        .then(
          ([{ data: marquee }, { data: banners }, { data: recommendActs }]) => {
            this.marquee = marquee;
            this.banners = banners;
            this.recommendActs = recommendActs;
          }
        )
        .then(() => {
          this.createActList();
        });
    },
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
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/scss/mixin";
  @import "@/scss/variable";
  @import "@/scss/common";

  #homepage {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
  }

  .slide-fade-enter-active {
    transition: all 1s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }
</style>
