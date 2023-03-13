<template>
  <Layout>
    <section id="acts">
      <SwiperAdBanner />

      <section class="SearchFilterContainer">
        <SearchFilter position="Acts" />
      </section>

      <Loading v-if="!acts" />

      <section class="actContainer" v-else>
        <!-- 僅顯示可報名活動及選擇排序方式 -->
        <article class="filterBox">
          <div class="custom-control custom-switch">
            <input
              type="checkbox"
              class="custom-control-input"
              id="customSwitch1"
              v-model="isApply"
            />
            <label class="custom-control-label" for="customSwitch1"
              >僅顯示可報名活動</label
            >
          </div>

          <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label
              class="btn btn-outline-primary btn-sm"
              v-bind:class="orderby === 'asc' ? 'active' : ''"
            >
              <input
                type="radio"
                name="options"
                autocomplete="off"
                value="asc"
                v-model="orderby"
              />
              日期由近到遠
            </label>
            <label
              class="btn btn-outline-primary btn-sm"
              v-bind:class="orderby === 'desc' ? 'active' : ''"
            >
              <input
                type="radio"
                name="options"
                autocomplete="off"
                value="desc"
                v-model="orderby"
              />
              日期由遠到近
            </label>
          </div>
        </article>

        <!-- 篩選後活動結果 -->
        <article class="resultArea">
          <div class="resultCard" v-for="(item, name) in sortdata">
            <div class="titleBox">
              <span>{{ name.split("-")[0] }}</span> 年
              <span>{{ name.split("-")[1] }}</span> 月
            </div>

            <!-- 活動卡片區域 -->
            <div class="cardArea">
              <!-- 單張活動卡片 -->
              <div
                class="actCard"
                :class="mobileMode ? 'mobileCard' : 'commonCard'"
                v-for="element in item"
                v-show="element.canSignUp || !isApply"
              >
                <!-- 左邊圖片區域 -->
                <router-link
                  :to="element.actCode"
                  class="imgBox"
                  :class="{ canSignUp: element.canSignUp }"
                >
                  <div
                    class="image"
                    :class="{ actover: element.displayLabel == '活動結束' }"
                    :style="`background-image:url(${element.square})`"
                    v-if="element.square"
                  ></div>
                  <div
                    class="image"
                    :class="{ actover: element.displayLabel == '活動結束' }"
                    style="background-image: url(/default-square.png)"
                    v-else
                    :alt="element.actName"
                  ></div>
                </router-link>
                <!-- 右邊info(相對定位)-->
                <div class="contentBox">
                  <!-- 報名按鈕(絕對定位) -->
                  <router-link
                    v-if="element.canSignUp"
                    v-bind:to="`/${element.actCode}#signup`"
                    class="btn-info signupBtn"
                  >
                    我要報名
                  </router-link>

                  <div class="topBox">
                    <div class="h5">
                      <span
                        class="statusSpan"
                        :class="labelStyle(element.displayLabel)"
                        >{{ element.displayLabel }}</span
                      >
                      <span class="titleSpan">
                        {{ element.actName }}
                      </span>
                    </div>
                  </div>
                  <div class="middleBox">
                    <div class="content">
                      <span
                        data-toggle="tooltip"
                        data-placement="top"
                        title="活動日期"
                      >
                        <strong> <i class="fas fa-calendar-day"></i> </strong>
                        {{ actDate(element.actDate) }}
                      </span>
                    </div>
                    <div class="content">
                      <span
                        data-toggle="tooltip"
                        data-bs-placement="top"
                        title="活動地點"
                      >
                        <strong> <i class="fas fa-map-marker-alt"></i> </strong>
                        {{ element.address }}
                      </span>
                    </div>
                    <div class="content">
                      <span
                        data-toggle="tooltip"
                        data-bs-placement="top"
                        title="報名時間"
                      >
                        <strong> <i class="fas fa-calendar-minus"></i> </strong>
                        {{ shortDate(element.regSTime) }} ~
                        {{ shortDate(element.regETime) }}
                      </span>
                    </div>
                    <div class="tagContent" v-if="element.Tags">
                      <span
                        class="badge bgc-secondary-l3 text-secondary-d3 text-80 px-2 mr-1"
                        v-for="tag in element.Tags?.split(',')"
                      >
                        {{ tag }}
                      </span>
                    </div>
                  </div>

                  <div class="bottomBox" v-if="element.canSignUp">
                    <router-link
                      v-if="element.canSignUp"
                      v-bind:to="`/${element.actCode}#signup`"
                      class="btn-info signupBtnPad"
                    >
                      我要報名
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </section>
  </Layout>
</template>

<script>
  import Loading from "../components/Loading.vue";

  import SearchFilter from "../components/Layout/SearchFilter2.vue";
  import SwiperAdBanner from "../components/Layout/SwiperAdBanner.vue";

  import axios from "axios";
  import moment from "moment";
  import "moment/dist/locale/zh-tw";

  import { storeToRefs } from "pinia";
  import { useFilterStore } from "@/store/actFilter.js";
  import { groupBy } from "lodash";

  export default {
    components: {
      Loading,
      SearchFilter,
      SwiperAdBanner,
    },
    setup() {
      const store = useFilterStore();
      const { filter } = storeToRefs(store);
      return { filter };
    },
    data() {
      return {
        isApply: false,
        orderby: "desc",
        acts: null,
        month: [],
        mobileMode: false,
        ww: 0,
     };
    },
    created() {
      axios.get("/api/act")
      .then(({ data }) => (this.acts = data))
    },
    computed: {
      sortdata() {
        this.month = [];
        let data = JSON.parse(JSON.stringify(this.acts));

        if (this.filter.selectedYears.length > 0) {
          data = data.filter((x) => this.filter.selectedYears.includes(x.year));

          if (this.filter.selectedMonths.length > 0) {
            data = data.filter((x) =>
              this.filter.selectedMonths.includes(x.month)
            );
          }

        }

        if (this.filter.startTime != null) {
          data = data.filter(({ actDate }) => {
            return moment(actDate).isSameOrAfter(this.filter.startTime);
          });
        }

        if (this.filter.endTime != null) {
          data = data.filter(({ actDate }) => {
            return moment(actDate).isSameOrBefore(this.filter.endTime);
          });
        }
        if (this.filter.selectedCategories.length > 0) {
          data = data.filter(({ category }) => {
            return this.filter.selectedCategories.includes(category);
          });
        }

        if (this.orderby === "asc") {
          data.sort((a, b) => new Date(a.actDate) - new Date(b.actDate));
        } else {
          data.sort((a, b) => new Date(b.actDate) - new Date(a.actDate));
        }

        return groupBy(data, (b) => `${b.year}-${b.month}`);
      },
    },
    methods: {
      labelStyle(value) {
        switch (value) {
          case "報名當中":
            return "bg-success";
          case "報名截止":
            return "bg-danger";
          case "即將開報":
            return "sub-bg-color";
          case "活動規劃中":
            return "bg-warning";
          case "活動結束":
            return "bg-secondary";
          default:
            return "bg-info";
        }
      },
      actDate(value) {
        return moment(value).format("YYYY-MM-DD (dd)");
      },
      shortDate(value) {
        return moment(value).format("YYYY-MM-DD");
      },
      windowWidth() {
        this.ww = window.innerWidth;
        if (this.ww > 535) {
          this.mobileMode = false;
        } else {
          this.mobileMode = true;
        }
      },
    },
    mounted() {
      this.windowWidth();
      window.addEventListener("resize", this.windowWidth);
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/scss/mixin";
  @import "@/scss/variable";

  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap");

  .SearchFilterContainer {
    width: 100%;
    max-width: 1403px;
    padding: 0 15;
    margin: 50px auto 50px;
  }

  #acts {
    padding: 0 35px;

    @include bkpt(535px) {
      padding: 0 20px;
    }
  }
  .actContainer {
    font-family: $engFont, $chFont !important;
    width: 100%;
    max-width: 1403px;
    margin: 0 auto 150px;

    .filterBox {
      @include flex(space-between, center);

      @include bkpt(535px) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        .btn-group {
          margin-top: 10px;
        }
      }

      .custom-control-label {
        &::after {
          background-color: $maincolor;
        }
      }

      .custom-control-input:focus ~ .custom-control-label {
        &::before {
          box-shadow: 0 0 0 0.2rem #1eb0ac40;
        }
      }

      .custom-control-input:checked + .custom-control-label {
        &::before {
          background-color: $maincolor;
          border: 1px solid $maincolor;
        }
        &::after {
          background-color: white;
        }
      }

      .btn-outline-primary {
        &:hover {
          background-color: #188f8c33;
          color: #188f8c;
        }
      }
      .active {
        background-color: #188f8c !important;
        color: white !important;
      }
    }

    .resultArea {
      margin: 50px 0 0;
      .resultCard {
        margin-bottom: 30px;
        .titleBox {
          text-align: start;
          width: 100%;
          font-size: 16px;
          font-weight: 500;
          padding: 5px 0 10px;
          color: $lightfontcolor;
          margin-bottom: 0;
          border-bottom: 1px solid $lightborder;
          @include flex(center, flex-end);
          span {
            font-weight: 700;
            font-size: 20px;
            transform: translateY(3px);
            margin: 0 5px;
            color: $maincolor;
          }
        }

        .cardArea {
          width: 100%;
          @include flex(flex-start, flex-start);
          flex-wrap: wrap;

          .actCard {
            border-radius: 0.25rem;
            overflow: hidden;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            @include flex(flex-start, flex-start);
            width: calc((100% - 15px) / 2);
            margin: 15px 15px 0 0;
            transition: 0.3s;
            &:nth-child(2n) {
              margin: 15px 0 0 0;
            }

            @include bkpt(1300px) {
              width: 100%;
              margin: 15px 0 0 0;
            }

            @include bkpt(535px) {
              flex-direction: column;
              width: 100%;
              margin: 25px 10px 0 !important;
            }

            &:hover {
              transform: translateY(-8px);
              .contentBox{
                .middleBox{
                  .content{
                    span{
                      width: calc(100% - 100px);

                      @include pad{
                        width: 100%;
                      }
                    }
                  }
                }
              }
            }



            .imgBox {
              display: inline-block;
              text-decoration: none;
              width: 180px;
              height: 180px;
              min-width: 180px;

              @include bkpt(535px) {
                width: 100%;
                min-height: unset;
              }

              .image {
                width: 100%;
                height: 100%;
                background-size: cover;
                background-position: center;
              }

              .actover {
                filter: grayscale(1) blur(1px);
              }
            }

            .canSignUp {
              @include pad {
                height: 220px;
              }

              @include bkpt(535px) {
                height: 180px;
              }
            }

            .canSignUp + .contentBox {
              @include pad {
                height: 220px;
              }
            }

            .contentBox {
              flex: 1;
              padding: 13px 15px;
              height: 180px;
              @include flex(space-between, flex-start);
              flex-direction: column;
              width: calc(100% - 180px);
              max-width: 514px;
              position: relative;

              @include bkpt(1300px) {
                max-width: unset;
              }

              @include pad {
                height: unset;
                min-height: 180px;
              }

              @include bkpt(535px) {
                width: 100%;
              }

              &:hover .signupBtn {
                display: inline-block;
                @include pad {
                  display: none;
                }
              }

              .signupBtn {
                position: absolute;
                bottom: 13px;
                right: 15px;
                padding: 5px 15px;
                border-radius: 3px;
                color: white;
                font-size: 14px;
                text-decoration: none;
                z-index: 1;
                display: none;

                @include bkpt(1300px) {
                  display: inline-block;
                }

                @include pad {
                  display: none;
                }
              }

              .status {
                position: absolute;
                top: 0;
                right: 15px;
                padding: 5px 15px;
                border-radius: 0 0 5px 5px;
                color: white;
                font-size: 14px;
              }

              .topBox {
                width: 100%;
                .h5 {
                  width: 100%;
                  height: 26px;
                  color: $mainhovercolor;
                }
                .statusSpan {
                  padding: 5px 5px;
                  border-radius: 3px;
                  color: white;
                  font-size: 13px;
                  margin-right: 10px;
                  display: block;
                  float: left;

                  @include bkpt(535px) {
                    float: unset;
                    position: absolute;
                    top: 0px;
                    right: 5px;
                    border-radius: 0 0 3px 3px;
                  }
                }

                .titleSpan {
                  max-width: calc(100% - 80px);
                  font-size: 18px;
                  font-weight: 600;
                  line-height: 26px;
                  height: 26px;
                  display: inline-block;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }

              .bg-success {
                background-color: $maincolor !important;
              }
              .middleBox {
                width: 100%;
                .content {
                  height: 24px;
                  color: $darkfontcolor;
                  i {
                    color: $lightfontcolor;
                    margin-right: 5px;
                  }

                  span {
                    width: 100%;
                    display: inline-block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;

                    @include bkpt(1300px){
                      width: calc(100% - 100px);
                    }

                    @include pad{
                      width: 100%;
                    }
                  }
                }

                .tagContent {
                  width: 100%;
                  margin-top: 5px;
                  overflow: hidden;
                  white-space: nowrap;
                }
              }

              .bottomBox {
                display: none;
                width: 100%;
                margin-top: 15px;
                padding-top: 10px;
                border-top: 1px solid $lightborder;

                @include pad {
                  @include flex(flex-end, center);
                }

                @include bkpt(535px) {
                  border-top: none;
                }

                .signupBtnPad {
                  position: static;
                  display: inline-block;
                  padding: 5px 15px;
                  border-radius: 3px;
                  color: white;
                  font-size: 14px;
                  text-decoration: none;

                  @include bkpt(535px) {
                    width: 100%;
                    @include flex;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
