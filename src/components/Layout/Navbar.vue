<template>
    <div class="navbar-inner shadow-sm border-b-1 brc-grey-l2">
        <div class="container">
            <button type="button"
                class="navbar-toggler btn btn-burger burger-times static d-flex d-lg-none ml-2 collapsed"
                data-toggle="collapse" data-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false"
                aria-label="Toggle navbar menu">
                <span class="bars text-dark-tp3"></span>
            </button>

            <div class="navbar-intro ">
                <a class="navbar-brand text-primary text-180" asp-controller="Home" asp-action="Index">
                    <i class=" font-bold">FOCUSLINE</i>
                </a>
            </div>

            <div class="navbar-menu navbar-collapse navbar-backdrop ml-auto mr-lg-4 collapse" id="navbarMenu">
                <div class="navbar-nav navbar-links">
                    <ul class="nav has-active-border">

                        <li class="nav-item mx-2">
                            <a class=" btn d-block  btn-outline-secondary btn-h-lighter-secondary btn-a-lighter-primary btn-brc-tp px-4 px-lg-2  "
                                asp-controller="Acts" asp-action="Index">
                                <div class=" text-125 mt-1">活動列表</div>
                                <div>Acts</div>
                            </a>
                        </li>
                        <li class="nav-item mx-2">
                            <a class=" btn d-block btn-outline-secondary btn-h-lighter-secondary btn-a-lighter-primary btn-brc-tp px-4 px-lg-2 "
                                asp-controller="Tracking" asp-action="Index">
                                <div class="text-125 mt-1">報名查詢</div>
                                <div>Search</div>
                            </a>
                        </li>
                        <li class="nav-item dropdown mx-2">
                            <a class=" dropdown-toggle btn d-block  btn-outline-secondary btn-h-lighter-secondary btn-a-lighter-primary btn-brc-tp px-4 px-lg-2"
                                href="#" data-toggle="dropdown" role="button" aria-haspopup="true"
                                aria-expanded="false">
                                <div class=" text-125 mt-1">服務項目</div>
                                <div>Service</div>
                            </a>
                            <div class="dropdown-menu dropdown-caret px-1px py-2px border-1 brc-default-l1 shadow radius-1 dropdown-animated animated-2"
                                x-placement="bottom-start"
                                style="min-width: 240px; position: absolute; transform: translate3d(0px, 38px, 0px); top: 0px; left: 0px; will-change: transform;">
                                <div class="dropdown-divider my-0"></div>
                                <a class="btn btn-outline-dark border-l-4 btn-brc-tp btn-h-outline-info btn-a-outline-info my-2px radius-l-0 py-2 pl-3 pr-2 w-100 text-left border-bottom-0 border-top-0 border-right-0"
                                    asp-controller="Service" asp-action="Index">
                                    活動承辦/運動計時
                                </a>
                                <div class="dropdown-divider my-0"></div>
                                <a class="btn btn-outline-dark border-l-4 btn-brc-tp btn-h-outline-info btn-a-outline-info my-2px radius-l-0 py-2 pl-3 pr-2 w-100 text-left border-bottom-0 border-top-0 border-right-0"
                                    asp-controller="Service" asp-action="Design">
                                    視覺設計
                                </a>
                            </div>
                        </li>
                        <li class="nav-item mx-2">
                            <a class=" btn d-block  btn-outline-secondary btn-h-lighter-secondary btn-a-lighter-primary btn-brc-tp px-4 px-lg-2"
                                asp-controller="Instrucation" asp-action="Index">
                                <div class=" text-125 mt-1"> 晶片說明 </div>
                                <div>Instructions</div>
                            </a>
                        </li>
                        <li class="nav-item mx-2">
                            <a class="btn d-block btn-a-bold btn-outline-secondary btn-h-lighter-secondary btn-a-lighter-secondary btn-brc-tp px-4 px-lg-2  "
                                href="https://www.focusline.com.tw/score" target="_blank">
                                <div class=" text-125 mt-1"> 成績查詢 </div>
                                <div>Score</div>
                            </a>
                        </li>
                        <li class="nav-item dd-backdrop dropdown dropdown-mega">
                            <a class="btn d-block btn-a-bold btn-outline-secondary btn-h-lighter-secondary btn-a-lighter-secondary btn-brc-tp px-4 px-lg-2 dropdown-toggle"
                                href="#" data-toggle="dropdown" role="button" aria-haspopup="true"
                                aria-expanded="false">
                                <div class=" text-125 mt-1">聯絡我們</div>
                                <div>Contact</div>
                                <i class="caret fa fa-angle-left d-block d-lg-none"></i>
                                <div class="dropdown-caret brc-warning-l2"></div>
                            </a>
                            <div
                                class="shadow dropdown-menu dropdown-animated animated-1 dropdown-xs p-0 bg-white brc-warning-l1">
                                <div class="bgc-orange-l2 pt-3 pb-25 px-4 border-b-1 brc-orange-l2">
                                    <span class="text-dark-tp4 text-600 text-uppercase">
                                        <i class="fas fa-location-arrow mr-2px text-warning-d2"></i>
                                        聯絡我們 CONTACT
                                    </span>
                                </div>
                                <address>
                                    <div class="px-4 py-2">
                                        <div class="text-secondary-d1 text-110">服務專線</div>
                                        <div class="mt-2 text-grey-d1"> 05-6226456 </div>
                                    </div>
                                    <hr class="my-1 mx-4" />
                                    <div class="px-4 py-2">
                                        <div class="text-secondary-d1 text-110">服務時間</div>
                                        <div class="mt-2 text-grey-d1"> 周一至周四 09:00-18:00、周五 09:00-17:00 </div>
                                    </div>
                                    <hr class="my-1 mx-4" />
                                    <div class="px-4 py-2">
                                        <div class="text-secondary-d1 text-110">寫信給我們</div>
                                        <div class="mt-2"> <a
                                                href="mailto:service@focusline.com.tw">service@focusline.com.tw</a>
                                        </div>
                                    </div>
                                    <hr class="my-1 mx-4" />
                                    <div class="px-4 py-2">
                                        <div class="text-secondary-d1 text-110">機關地址</div>
                                        <div class="mt-2 text-grey-d1"> 632 雲林縣虎尾鎮文科路 302 號 </div>
                                    </div>
                                    <hr class="my-1 mx-4" />
                                    <div class="px-4 py-2">
                                        <div class="text-secondary-d1 text-110">機關傳真</div>
                                        <div class="mt-2 text-grey-d1"> 05-6220710 </div>
                                    </div>
                                </address>

                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>