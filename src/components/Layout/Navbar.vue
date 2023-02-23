<template>
  <div class="navbar-inner shadow-sm border-b-1 brc-grey-l2">
    <div class="container">
      <button
        type="button"
        class="navbar-toggler btn btn-burger burger-times static d-flex d-lg-none collapsed"
        data-toggle="collapse"
        data-target="#navbarMenu"
        aria-controls="navbarMenu"
        aria-expanded="false"
        aria-label="Toggle navbar menu"
      >
        <span class="bars text-dark-tp3"></span>
      </button>

      <div class="navbar-intro">
        <router-link to="/" class="navbar-brand text-primary text-180">
          <i class="font-bold">FOCUSLINE</i>
        </router-link>
      </div>

      <div
        class="navbar-menu navbar-collapse navbar-backdrop ml-auto mr-lg-4 collapse"
        id="navbarMenu"
      >
        <div class="navbar-nav navbar-links">
          <ul class="nav has-active-border">
            <li class="nav-item">
              <router-link
                to="/acts"
                class="btn d-block btn-outline-secondary btn-h-lighter-secondary btn-a-lighter-primary btn-brc-tp"
              >
                <div class="navTitle">活動列表</div>
                <div class="navEngTitle">Acts</div>
              </router-link>
            </li>
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'Tracking' }"
                class="btn d-block btn-outline-secondary btn-h-lighter-secondary btn-a-lighter-primary btn-brc-tp"
              >
                <div class="navTitle">報名查詢</div>
                <div class="navEngTitle">Search</div>
              </RouterLink>
            </li>
            <li class="nav-item dropdown">
              <a
                class="dropdown-toggle btn d-block btn-outline-secondary btn-h-lighter-secondary btn-a-lighter-primary btn-brc-tp"
                href="#"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div class="navTitle">服務項目</div>
                <div class="navEngTitle">Service</div>
              </a>
              <div
                class="dropdown-menu dropdown-caret px-1px py-2px border-1 brc-default-l1 shadow radius-1 dropdown-animated animated-2"
                x-placement="bottom-start"
                style="
                  min-width: 240px;
                  position: absolute;
                  transform: translate3d(0px, 38px, 0px);
                  top: 0px;
                  left: 0px;
                  will-change: transform;
                "
              >
                <div class="dropdown-divider my-0"></div>
                <RouterLink
                  :to="{ name: 'Timing' }"
                  class="btn btn-outline-dark border-l-4 btn-brc-tp btn-h-outline-info btn-a-outline-info my-2px radius-l-0 py-2 pl-3 pr-2 w-100 text-left border-bottom-0 border-top-0 border-right-0"
                >
                  活動承辦/運動計時
                </RouterLink>
                <div class="dropdown-divider my-0"></div>
                <RouterLink
                  :to="{ name: 'Design' }"
                  class="btn btn-outline-dark border-l-4 btn-brc-tp btn-h-outline-info btn-a-outline-info my-2px radius-l-0 py-2 pl-3 pr-2 w-100 text-left border-bottom-0 border-top-0 border-right-0"
                >
                  視覺設計
                </RouterLink>
              </div>
            </li>
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'Instruction' }"
                class="btn d-block btn-outline-secondary btn-h-lighter-secondary btn-a-lighter-primary btn-brc-tp"
              >
                <div class="navTitle">晶片說明</div>
                <div class="navEngTitle">Instruction</div>
              </RouterLink>
            </li>
            <li class="nav-item">
              <a
                class="btn d-block btn-a-bold btn-outline-secondary btn-h-lighter-secondary btn-a-lighter-secondary btn-brc-tp"
                href="https://score.focusline.com.tw"
                target="_blank"
              >
                <div class="navTitle">成績查詢</div>
                <div class="navEngTitle">Score</div>
              </a>
            </li>
            <li class="nav-item dd-backdrop dropdown dropdown-mega">
              <a
                class="btn d-block btn-a-bold btn-outline-secondary btn-h-lighter-secondary btn-a-lighter-secondary btn-brc-tp dropdown-toggle"
                href="#"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div class="navTitle">聯絡我們</div>
                <div class="navEngTitle">Contact</div>
              </a>
              <div
                class="shadow dropdown-menu dropdown-animated animated-1 dropdown-xs p-0 bg-white brc-warning-l1"
              >
                <div
                  class="bgc-orange-l2 pt-3 pb-25 px-4 border-b-1 brc-orange-l2 dropdownTitleBox"
                >
                  <span class="text-dark-tp4 text-600 text-uppercase">
                    <i class="fas fa-location-arrow mr-2px text-warning-d2"></i>
                    聯絡我們 CONTACT
                  </span>
                </div>
                <address>
                  <div class="px-4 py-2 address-sub-box">
                    <div class="text-secondary-d1 text-110 title">服務專線</div>
                    <div class="text-grey-d1 content">05 - 6226456</div>
                  </div>
                  <hr class="my-1 mx-4" />
                  <div class="px-4 py-2 address-sub-box">
                    <div class="text-secondary-d1 text-110 title">服務時間</div>
                    <div class="text-grey-d1 content">
                      <p>周一至周四 : 09:00 - 18:00</p>
                      <p>周五 : 09:00 - 17:00</p>
                    </div>
                  </div>
                  <hr class="my-1 mx-4" />
                  <div class="px-4 py-2 address-sub-box">
                    <div class="text-secondary-d1 text-110 title">
                      寫信給我們
                    </div>
                    <div class="content">
                      <a href="mailto:service@focusline.com.tw" class="content-link">
                        service@focusline.com.tw
                      </a>
                    </div>
                  </div>
                  <hr class="my-1 mx-4" />
                  <div class="px-4 py-2 address-sub-box">
                    <div class="text-secondary-d1 text-110 title">機關地址</div>
                    <div class="text-grey-d1 content">
                      632 雲林縣虎尾鎮文科路 302 號
                    </div>
                  </div>
                  <hr class="my-1 mx-4" />
                  <div class="px-4 py-2 address-sub-box">
                    <div class="text-secondary-d1 text-110 title">機關傳真</div>
                    <div class="text-grey-d1 content">05 - 6220710</div>
                  </div>
                </address>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <LoginModal></LoginModal>
    </div>
  </div>
</template>

<script>
  import LoginModal from "./LoginModal.vue";

  export default {
    name: "Navbar",
    components: { LoginModal },
  };
</script>

<style lang="scss" scoped>
  @import "@/scss/mixin";
  @import "@/scss/variable";

  .navbar-toggler {
    min-width: 50px !important;
  }
  .navbar-intro {
    width: unset !important;
  }
  .nav-item {
    a {
      padding: 5px 15px;

      display: flex !important;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .navTitle {
        font-size: 16px;
      }
      .navEngTitle {
        font-size: 14px;
        @include flex;
        i {
          margin-left: 5px;
        }
      }
    }

    .address-sub-box {
      @include flex(flex-start, flex-start);
      .title {
        width: 120px !important;
        font-size: 16px !important;
      }
      .content {
        flex: 1;
        font-size: 16px !important;
        p{
            margin-bottom: 0;
        }
        .content-link {
          display: inline-block !important;
          padding: 0;
        }
      }
    }
  }

  .dropdown-xs {
    width: 400px !important;
    .dropdownTitleBox{
        @include flex;
    }
  }
</style>
