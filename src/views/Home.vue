<template>
  <Layout>
    <!-- marquee -->
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
    <!-- <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
            <div class="carousel-inner">
                <template v-for="(item,index) in banners">
                    <div class="carousel-item" v-bind:class="{ active:index == 0 }">
                        <div class="card border-0 mb-3">
                            <div class="row bgc-light">
                                <div class="col-md-4 align-self-center d-none d-md-block">
                                    <div class="card-body text-center text-secondary ">
                                        <h2 class="card-title text-primary font-bolder" v-text="item.actName"> </h2>
                                        <p class="card-text h3 mt-4" v-text="'活動時間:' + shortDate(item.actDate)"> </p>
                                        <p class="card-text h3 mt-4" v-text="'報名截止:' + shortDate(item.regETime)"> </p>
                                        <p class="card-text h3 mt-4" v-text="item.address"> </p>
                                        <RouterLink v-if="item.canSignUp" :to="`/${item.actCode}#signup`" 
                                            class="btn btn-lg btn-orange rounded-pill mt-5 px-5">
                                            我要報名
                                        </RouterLink>
                                        <router-link v-bind:to="{name:'HomePage',params:{code:item.actCode}}"
                                        class="btn btn-lg btn-info rounded-pill mt-5 px-5">
                                            活動詳情
                                        </router-link>
                                    </div>
                                </div>
                                <div class="col-md-8 col-12">
                                    <img v-bind:src="item.rectangle" class="img-fluid rounded-start d-none d-sm-block" v-bind:alt="item.actName">
                                    <img v-bind:src="item.square" class="img-fluid rounded-start d-block d-sm-none" v-bind:alt="item.actName">
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div> -->
    <!-- End Banner-->

    <!-- Search and Filter-->
    <div class="container mt-5">
      <SearchFilter position="Home"></SearchFilter>
    </div>
    <!-- End Search and Filter -->

    <!-- Act List -->
    <SwiperActList :ActList="actList" />
    <section class="moreActArea">
      <router-link to="/acts" >更多活動</router-link>
    </section>

    <!-- <div class="border-t-4 brc-orange mt-5 pb-5 bgc-primary-l3">
      <div class="my-5 container">
        <div class="row">
          <template v-for="item in recommendActs">
            <div class="col-md-3 col-12 mb-4">
              <div
                class="card pos-rel shadow-sm"
                v-bind:class="
                  item.displayLabel == '推薦賽事' ? 'border-3 brc-orange' : ''
                "
              >
                <span
                  v-show="item.displayLabel == '推薦賽事'"
                  class="badge bgc-orange-d2 text-white position-tl m-n25 badge-pill text-110 border-3 brc-white-tp6 radius-4"
                  style="z-index: 1"
                  >推薦賽事</span
                >
                <div class="d-style overflow-hidden">
                  <img
                    v-bind:src="item.square"
                    class="img-fluid d-zoom-2"
                    v-bind:alt="item.name"
                    style="height: 250px; z-index: 0"
                  />
                </div>
                <div class="card-body">
                  <div class="card-title text-primary h5 text-truncate">
                    {{ item.actName }}
                  </div>
                  <div class="card-text text-secondary mt-2">
                    活動日期: {{ actDate(item.actDate) }}
                  </div>
                  <div class="card-text text-secondary mt-2">
                    報名截止: {{ shortDate(item.shortDate) }}
                  </div>
                  <div class="card-text text-secondary mt-2">
                    {{ item.address }}
                  </div>
                  <div class="card-text mt-2">
                    <span
                      class="badge bgc-secondary-l3 text-secondary-d3 text-80 px-2 mr-1"
                      v-for="tag in item.kmTags?.split(',')"
                    >
                      {{ tag }}
                    </span>
                  </div>
                  <div class="row mt-4">
                    <div class="col">
                      <router-link
                        v-bind:to="{
                          name: 'HomePage',
                          params: { code: item.actCode },
                        }"
                        class="btn btn-block btn-info text-white rounded-pill px-4"
                      >
                        活動詳情
                      </router-link>
                    </div>

                    <div v-if="item.canSignUp" class="col">
                      <router-link
                        v-bind:to="`/${item.actCode}#signup`"
                        class="btn btn-block btn-orange rounded-pill px-4"
                      >
                        我要報名
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="text-center mt-5">
          <router-link to="/acts" class="btn btn-lg btn-orange px-5">
            更多賽事
          </router-link>
        </div>
      </div>
    </div> -->

    <!-- End Act List -->
  </Layout>
</template>

<script>
  import SearchFilter from "../components/Layout/SearchFilter2.vue";
  import SwiperBanner from "@/components/Layout/SwiperBanner.vue";
  import SwiperActList from "@/components/Layout/SwiperActList.vue";
  import axios from "axios";
  import moment from "moment";
  import "moment/dist/locale/zh-tw";

  export default {
    components: {
      SearchFilter,
      SwiperBanner,
      SwiperActList,
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

        
        //新陣列內的objList只留下前五個物件，其餘刪除
        this.actList.forEach(item=>{
            item.objList.splice(5)
        })
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/scss/mixin";
  @import "@/scss/variable";
  @import "@/scss/common";

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


  #ActListSwiper{
    margin-top: 80px;
  }

  .moreActArea {
    width: 100%;
    margin: 50px 0;
    @include flex;
    a {
      padding: 3px 50px;
      display: inline-block;
      border: 1px solid $darkfontcolor;
      color: $darkfontcolor;
      text-decoration: none;
      transition: .2s;

      &:hover{
        border: 1px solid $mainhovercolor;
        background-color: $mainhovercolor;
        color: white;
      }
    }
  }
</style>
