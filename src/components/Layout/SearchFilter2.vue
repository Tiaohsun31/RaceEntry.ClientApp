<template>
  <template v-if="position === 'Home'">
    <section id="homeSearchFilter">
      <div class="row justify-content-md-center">
        <div class="col">
          <select
            ref="select"
            name="code"
            class="form-control"
            data-live-search="true"
            title="請選擇活動"
            v-model="code"
            @change="toActPage"
          >
            <template v-for="(item, name) in acts">
              <optgroup v-bind:label="name">
                <option
                  v-for="element in item"
                  v-bind:class="
                    Date.parse(element.actDate) <= Date.now()
                      ? 'bgc-grey-l1'
                      : ''
                  "
                  v-bind:value="element.actCode"
                >
                  {{ shortDate(element.actDate) }} &frasl; {{ element.actName }}
                </option>
              </optgroup>
            </template>

            <!-- <option v-for="item in acts" v-bind:class="Date.parse(item.date) <= Date.now() ? 'bgc-grey-l1' : ''" 
                            v-bind:value="item.code"> {{ item.date }} &frasl; {{ item.name }}
                        </option> -->
          </select>
        </div>
      </div>

      <div class="row my-md-4">
        <div class="col-md-5 col-12">
          <label class="col-form-label text-dark-l4 font-bold h5"> 年份 </label>
          <div class="btn-group-toggle" data-toggle="buttons">
            <template v-for="item in options.years">
              <label
                role="button"
                class="d-style btn btn-sm btn-outline-light btn-a-lighter-info text-110 mr-2 mb-1 overflow-hidden"
              >
                <input
                  type="checkbox"
                  name="SelectedYears"
                  v-bind:value="item"
                  v-model="filter.selectedYears"
                />
                {{ item }}
              </label>
            </template>
          </div>
        </div>
        <div class="col-md-5 col-12 dateRangeFilter">
          <label class="col-form-label text-dark-l4 font-bold h5">
            日期區間
          </label>
          <div class="inputBox">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"> 從 </span>
              </div>
              <Datepicker
                v-model:value="filter.startTime"
                format="YYYY-MM-DD"
                name="StartTime"
                placeholder="年 / 月 / 日"
                :lang="datepickerLangs.zh"
              />
            </div>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"> 到 </span>
              </div>
              <Datepicker
                v-model:value="filter.endTime"
                format="YYYY-MM-DD"
                name="EndTime"
                placeholder="年 / 月 / 日"
                :lang="datepickerLangs.zh"
              />
            </div>
          </div>
        </div>
        <div class="col-md-2 col-12">
          <label class="col-form-label text-white h5"> 搜尋 </label>
          <button
            type="button"
            class="btn searchBtn btn-block"
            v-on:click="toAct()"
          >
            搜尋
          </button>
        </div>
      </div>
    </section>
  </template>

  <template v-else-if="position === 'Aside'">
    <section id="asideFilterSection">
      <div class="modal-body">
        <div class="ace-scroll-inner">
          <div class="pos-rel mt-3">
            <div class="position-tl h-100 brc-secondary-l2 ml-425"></div>
            <div class="pos-rel mt-n3">
              <div class="row justify-content-md-center my-4">
                <div class="col-12">
                  <select
                    ref="select"
                    name="code"
                    class="form-control"
                    data-live-search="true"
                    title="請選擇活動"
                    v-model="code"
                    @change="toActPage"
                  >
                    <template v-for="(item, name) in acts">
                      <optgroup v-bind:label="name">
                        <option
                          v-for="element in item"
                          v-bind:class="
                            Date.parse(element.actDate) <= Date.now()
                              ? 'bgc-grey-l1'
                              : ''
                          "
                          v-bind:value="element.actCode"
                        >
                          {{ shortDate(element.actDate) }} &frasl;
                          {{ element.actName }}
                        </option>
                      </optgroup>
                    </template>
                  </select>
                </div>
              </div>
              <hr />

              <article class="dateFilterBox">
                <div class="yearFilter mr-5">
                  <label class="col-form-label text-dark-l4"> 年份 </label>
                  <div class="btn-group-toggle" data-toggle="buttons">
                    <template v-for="item in options.years">
                      <label
                        role="button"
                        class="d-style btn btn-sm btn-outline-light btn-a-lighter-info text-110 mr-2 overflow-hidden"
                        v-bind:class="
                          filter.selectedYears.includes(item) ? 'active' : ''
                        "
                      >
                        <input
                          type="checkbox"
                          name="SelectedYears"
                          v-bind:value="item"
                          v-model="filter.selectedYears"
                        />
                        {{ item }}
                      </label>
                    </template>
                  </div>
                </div>

                <div class="dateRangeFilter">
                  <label class="col-form-label text-dark-l4"> 日期區間 </label>
                  <div class="inputBox">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"> 從 </span>
                      </div>
                      <Datepicker
                        v-model:value="filter.startTime"
                        format="YYYY-MM-DD"
                        name="StartTime"
                        placeholder="年 / 月 / 日"
                        :lang="datepickerLangs.zh"
                      />
                    </div>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"> 到 </span>
                      </div>
                      <Datepicker
                        v-model:value="filter.endTime"
                        format="YYYY-MM-DD"
                        name="EndTime"
                        placeholder="年 / 月 / 日"
                        :lang="datepickerLangs.zh"
                      />
                    </div>
                  </div>
                </div>
              </article>

              <article class="typeFilterBox">
                <label class="col-form-label text-dark-l4"> 類別 </label>
                <div class="btn-group-toggle" data-toggle="buttons">
                  <template v-for="item in options.categories">
                    <label
                      role="button"
                      class="d-style btn btn-sm btn-outline-light btn-a-lighter-info text-110 mr-2 overflow-hidden"
                      v-bind:class="
                        filter.selectedCategories.includes(item) ? 'active' : ''
                      "
                    >
                      <input
                        type="checkbox"
                        name="SelectedCategories"
                        v-bind:value="item"
                        v-model="filter.selectedCategories"
                      />
                      {{ item }}
                    </label>
                  </template>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        class="btn px-4 border-2 searchBtn"
        v-on:click="toAct()"
      >
        搜尋
      </button>
    </section>
  </template>

  <template v-else-if="position === 'Acts'">
    <section id="actsFilterSection" class="card">
      <div class="filterTitle">篩選活動</div>

      <select
        ref="select"
        name="code"
        class="form-control"
        data-live-search="true"
        title="請選擇活動"
        v-model="code"
        @change="toActPage"
      >
        <template v-for="(item, name) in acts">
          <optgroup v-bind:label="name">
            <option
              v-for="element in item"
              v-bind:class="
                Date.parse(element.actDate) <= Date.now() ? 'bgc-grey-l1' : ''
              "
              v-bind:value="element.actCode"
            >
              {{ shortDate(element.actDate) }} &frasl; {{ element.actName }}
            </option>
          </optgroup>
        </template>
      </select>

      <article class="dateFilterBox">
        <div class="yearFilter mr-5">
          <label class="col-form-label text-dark-l4"> 年份 </label>
          <div class="btn-group-toggle" data-toggle="buttons">
            <template v-for="item in options.years">
              <label
                role="button"
                class="d-style btn btn-sm btn-outline-light btn-a-lighter-info text-110 mr-2 overflow-hidden"
                v-bind:class="
                  filter.selectedYears.includes(item) ? 'active' : ''
                "
              >
                <input
                  type="checkbox"
                  name="SelectedYears"
                  v-bind:value="item"
                  v-model="filter.selectedYears"
                />
                {{ item }}
              </label>
            </template>
          </div>
        </div>

        <div class="dateRangeFilter">
          <label class="col-form-label text-dark-l4"> 日期區間 </label>
          <div class="inputBox">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"> 從 </span>
              </div>
              <Datepicker
                v-model:value="filter.startTime"
                format="YYYY-MM-DD"
                name="StartTime"
                placeholder="年 / 月 / 日"
                :lang="datepickerLangs.zh"
              />
            </div>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"> 到 </span>
              </div>
              <Datepicker
                v-model:value="filter.endTime"
                format="YYYY-MM-DD"
                name="EndTime"
                placeholder="年 / 月 / 日"
                :lang="datepickerLangs.zh"
              />
            </div>
          </div>
        </div>
      </article>

      <article class="typeFilterBox">
        <label class="col-form-label text-dark-l4"> 類別 </label>
        <div class="btn-group-toggle" data-toggle="buttons">
          <template v-for="item in options.categories">
            <label
              role="button"
              class="d-style btn btn-sm btn-outline-light btn-a-lighter-info text-110 mr-2 overflow-hidden"
              v-bind:class="
                filter.selectedCategories.includes(item) ? 'active' : ''
              "
            >
              <input
                type="checkbox"
                name="SelectedCategories"
                v-bind:value="item"
                v-model="filter.selectedCategories"
              />
              {{ item }}
            </label>
          </template>
        </div>
      </article>
    </section>
  </template>

  <template v-else-if="position === 'Search'">
    <select
      ref="select"
      name="code"
      class="form-control"
      data-live-search="true"
      title="請選擇活動"
      v-model="code"
    >
      <template v-for="(item, name) in acts">
        <optgroup v-bind:label="name">
          <option
            v-for="element in item"
            v-bind:class="
              Date.parse(element.actDate) <= Date.now() ? 'bgc-grey-l1' : ''
            "
            v-bind:value="element.actCode"
          >
            {{ shortDate(element.actDate) }} &frasl; {{ element.actName }}
          </option>
        </optgroup>
      </template>
    </select>
  </template>
</template>

<script>
  import Datepicker from "vue-datepicker-next";
  import "vue-datepicker-next/index.css";
  import { datepickerLangs } from "@/js/datepickerLang";

  import axios from "axios";
  import "bootstrap-select/dist/css/bootstrap-select.min.css";
  import "bootstrap-select";
  import moment from "moment";
  import { storeToRefs } from "pinia";
  import { useFilterStore } from "@/store/actFilter";

  import { groupBy } from "lodash";

  export default {
    name: "SearchFilter",
    props: ["position"],
    components: {
      Datepicker,
    },
    computed: {
      datepickerLangs() {
        return datepickerLangs;
      },
    },
    setup() {
      const store = useFilterStore();
      const { filter } = storeToRefs(store);
      return { store, filter };
    },
    data() {
      return {
        acts: {},
        options: [],
        code: "",
      };
    },
    created() {
      axios.get("/api/act").then(({ data }) => {
        this.acts = groupBy(data, (x) => `${x.year}-${x.month}`);
      });
      axios
        .get("/api/webSetting/filter")
        .then(({ data }) => (this.options = data));
    },
    // watch:{
    //     code(){
    //         $('#aside').modal('hide');
    //         this.$router.push({ name: 'HomePage', params: { code:`${this.code}` } });
    //     }
    // },
    updated() {
      $(this.$refs.select).selectpicker("refresh");
    },
    methods: {
      shortDate: function (value) {
        return moment(value).format("YYYY-MM-DD");
      },
      toAct() {
        $("#aside").modal("hide");
        this.$router.push({ name: "Acts" });
      },
      toActPage() {
        $("#aside").modal("hide");
        this.$router.push({
          name: "HomePage",
          params: { code: `${this.code}` },
        });
      },
    },
    mounted() {},
  };
</script>

<style lang="scss">
  @import "@/scss/mixin";
  @import "@/scss/variable";
  @import "@/scss/common";

  #homeSearchFilter {
    .searchBtn {
      background-color: $maincolor !important;
      color: white !important;

      &:hover {
        background-color: $mainhovercolor !important;
      }
    }

    .dateRangeFilter {
      .inputBox {
        @include flex;

        .input-group {
          width: 100%;
          margin-right: 15px;
          @include flex;
          &:last-of-type {
            margin-right: 0;
          }

          .mx-datepicker {
            width: unset !important;
            flex: 1;
            .mx-input {
              height: 38px !important;
              border-radius: 0 0.25rem 0.25rem 0 !important;
            }
          }

          .form-control {
            border-radius: 0 0.25rem 0.25rem 0;
          }
        }
      }
    }
  }

  .card {
    border-radius: 8px !important;
    border: none !important;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }

  #asideFilterSection {
    width: 100%;
    .modal-body {
      width: 100%;
    }
    .dropdown-menu {
      width: 100%;
      .dropdown-item {
        box-sizing: border-box !important;
        width: 99%;
        .text {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    .dateFilterBox {
      margin: 10px 0;
      @include flex(flex-start, flex-start);

      @include pad {
        flex-direction: column;
      }

      .dateRangeFilter {
        flex: 1;
        @include bkpt(535px) {
          width: 100%;
        }
        .inputBox {
          @include flex;

          @include bkpt(535px) {
            flex-direction: column;
          }

          .input-group {
            width: 100%;
            margin-right: 15px;

            @include flex;
            &:last-of-type {
              margin-right: 0;
            }

            @include bkpt(535px) {
              margin-right: 0;

              &:nth-child(2n) {
                margin-top: 10px;
              }
            }

            .mx-datepicker {
              width: unset !important;
              flex: 1;
              .mx-input {
                height: 38px !important;
                border-radius: 0 0.25rem 0.25rem 0 !important;
              }
            }

            .form-control {
              border-radius: 0 0.25rem 0.25rem 0;
            }
          }
        }
      }
    }

    .searchBtn{
      width: 100%;
      background-color: $maincolor;
      color: white;
      border-radius: 0 ;
      position: absolute;
      bottom: 0;
      font-size: 18px;
    }
  }

  #actsFilterSection {
    .filterTitle {
      width: 100%;
      @include flex;
      margin-bottom: 20px;
      color: $lightfontcolor;
      font-size: 18px;
      font-weight: 500;
    }
    padding: 20px;
    .dateFilterBox {
      margin: 10px 0;
      @include flex(flex-start, flex-start);

      @include pad {
        flex-direction: column;
      }

      .dateRangeFilter {
        flex: 1;
        @include bkpt(535px) {
          width: 100%;
        }
        .inputBox {
          @include flex;

          @include bkpt(535px) {
            flex-direction: column;
          }

          .input-group {
            width: 100%;
            margin-right: 15px;

            @include flex;
            &:last-of-type {
              margin-right: 0;
            }

            @include bkpt(535px) {
              margin-right: 0;

              &:nth-child(2n) {
                margin-top: 10px;
              }
            }

            .mx-datepicker {
              width: unset !important;
              flex: 1;
              .mx-input {
                height: 38px !important;
                border-radius: 0 0.25rem 0.25rem 0 !important;
              }
            }

            .form-control {
              border-radius: 0 0.25rem 0.25rem 0;
            }
          }
        }
      }
    }
  }
</style>
