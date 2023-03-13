<template>
  <Layout>
    <section id="score">
      <SubTitle Title="活動成績查詢" />
      <section class="SearchFilterContainer">
        <SearchFilter position="Score" />
      </section>

      <Loading v-if="!acts" />

      <section class="actContainer" v-else>
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
              <a
                class="actCard"
                :class="mobileMode ? 'mobileCard' : 'commonCard'"
                v-for="element in item"
                :href="`https://score.focusline.com.tw/focusline/${element.actCode}`"
                target="_blank"
              >
                <div class="secondBox">
                  <div class="leftSide">
                    <div class="title">{{ element.actName }}</div>
                    <div class="actDate">
                      活動日期 / {{ shortDate(element.minTime) }}
                    </div>
                  </div>
                  <div class="rightSide">
                    <div class="linkbtn">
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </article>
      </section>
    </section>
  </Layout>
</template>

<script>
  import Loading from '@/components/Loading.vue';
  import SubTitle from '@/components/Layout/SubTitle.vue';
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
      SearchFilter,
      SwiperAdBanner,
      SubTitle,
      Loading
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
      axios
        .get("https://score.focusline.com.tw/api/activity")
        .then(({ data }) => (this.acts = data))
        .then((data)=>{
          console.log(data);
        })
    },
    computed: {
      sortdata() {
        this.month = [];
        let data = JSON.parse(JSON.stringify(this.acts));

        data.sort((a, b) => new Date(b.actDate) - new Date(a.actDate));

        return groupBy(data, (x) => `${x.year}-${x.month}`);
      },
    },
    methods: {
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
    max-width: 1100px;
    padding: 0 15;
    margin: 50px auto 50px;
  }

  #score {
    padding: 0 35px;

    @include bkpt(535px) {
      padding: 0 20px;
    }
  }
  .actContainer {
    font-family: $engFont, $chFont !important;
    width: 100%;
    max-width: 1100px;
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
            width: 100%;
            margin: 15px 0 0 0;
            transition: 0.3s;
            cursor: pointer;
            text-decoration: none;

            @include pad{
              flex-direction: column;
              width: calc(50% - 10px);
              margin-top: 20px;
              margin-right: 20px;
              
              &:nth-child(2n){
                margin-right: 0;
              }
            }

            @include bkpt(535px){
              width: 100%;
              margin-right: 0;
            }


            &:hover {
              transform: translateY(-8px);
              background-color: $lighthoverbg;
            }

            &:hover .secondBox {
              .leftSide{
                width: calc(100% - 70px);
                @include pad{
                  width: 100%;
                }
              }
              .title {
                color: $mainhovercolor;
              }
              .actDate {
                color: $darkfontcolor;
              }
              .linkbtn {
                opacity: 1 !important;
              }
            }


            .secondBox {
              width: 100%;
              padding: 25px;
              height: 100%;
              @include flex(space-between,center);

              @include pad{
                width: 100%;
                padding: 20px;
              }

              .leftSide {
                width:100%;
                .title {
                  width: 100%;
                  color: $maincolor;
                  font-size: $h5;
                  font-weight: bold;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .actDate {
                  color: $lightfontcolor;
                  margin-top: 5px;
                }
              }

              .rightSide {
                width: 50px;
                height: 100%;
                @include flex;

                @include pad{
                  display: none;
                }
                .linkbtn {
                  box-sizing: content-box;
                  border-radius: 50%;
                  width: 36px;
                  height: 36px;
                  justify-content: center;
                  align-items: center;
                  display: flex;
                  opacity: 0;
                  background-color: $lightfontcolor;
                  i {
                    font-size: 20px;
                    color: white;
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
