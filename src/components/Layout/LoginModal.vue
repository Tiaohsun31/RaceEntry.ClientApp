<template>
    <button type="button" class="d-style mr-4 px-4 navbar-toggler btn btn-burger static d-flex d-lg-none collapsed"
        data-toggle="collapse" data-target="#navbarMenu2" aria-controls="navbarMenu2" aria-expanded="false"
        aria-label="Toggle navbar menu">
        <i class="fa fa-caret-down d-collapsed text-grey-m1 text-80"></i>
        <i class="fa fa-caret-up d-n-collapsed text-grey-m1 text-80"></i>
        <i class="fa fa-user text-secondary-d1 ml-2"></i>
    </button>

    <div class="navbar-menu navbar-collapse navbar-backdrop collapse" id="navbarMenu2">
        <div class="navbar-nav">
            <ul class="nav">
                <template v-if="isAuthenticated">
                    <li class="d-none d-lg-block nav-item">
                        <a class="btn btn-a-bold btn-outline-secondary btn-h-lighter-secondary btn-a-lighter-secondary btn-brc-tp px-4 px-lg-2 font-bold text-110"
                            asp-area="" asp-controller="Member" asp-action="Index" data-toggle="tooltip"
                            data-placement="bottom" title="會員專區 Member">
                            <i class="fas fa-user mr-1"></i>會員專區
                        </a>
                    </li>

                    <li class="d-none d-lg-block nav-item">
                        <a class="btn bgc-h-primary-l4 btn-brc-tp btn-outline-secondary btn-h-lighter-secondary btn-a-outline-primary btn-a-bgc-tp font-bold text-110"
                            asp-area="" asp-controller="Login" asp-action="Logout" data-toggle="tooltip"
                            data-placement="bottom" title="登出 Logout">
                            <i class="fas fa-sign-out-alt"></i> 登出
                        </a>
                    </li>

                    <li class="d-lg-none nav-item mx-1">
                        <a class="btn d-block btn-a-bold btn-outline-secondary btn-h-lighter-secondary btn-a-lighter-secondary btn-brc-tp px-4 px-lg-2  "
                            asp-area="" asp-controller="Member" asp-action="Index">
                            <i class="fas fa-user mr-1"></i> 會員專區 Member
                        </a>
                    </li>
                    <li class="d-lg-none nav-item mx-1">
                        <a class="btn d-block btn-a-bold btn-outline-secondary btn-h-lighter-secondary btn-a-lighter-secondary btn-brc-tp px-4 px-lg-2  "
                            asp-area="" asp-controller="Login" asp-action="Logout">
                            <i class="fas fa-sign-out-alt mr-1"></i> 登出 Logout
                        </a>
                    </li>
                </template>
                <template v-else>
                    <li class="nav-item dropdown px-lg-2 d-lg-flex flex-column justify-content-center">
                        <a class="d-none d-lg-block h-auto btn btn-outline-blue btn-bold radius-round border-2 dropdown-toggle px-2 px-xl-4 login-btn"
                            data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                            登入 Login
                        </a>

                        <a class="d-lg-none nav-link dropdown-toggle login-btn" data-toggle="dropdown" href="#"
                            role="button" aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-caret-right bgc-blue radius-round text-white py-2 px-4 mr-2"></i>
                            登入 Login
                        </a>

                        <div style="width: 20rem;" data-display="static"
                            class="shadow radius-1 p-0 dropdown-menu dropdown-menu-right dropdown-animated animated-2 brc-primary-m3 mt-lg-n1 mr-lg-n2 dropdown-caret">

                            <div id="id-col-main" class="col-12 bgc-white px-0 dropdown-clickable">

                                <div class="tab-content tab-sliding border-0 p-0" data-swipe="right">

                                    <div class="tab-pane active show mh-100 px-lg-0 dropdown-clickable"
                                        id="id-tab-login">
                                        <!-- show this in desktop -->
                                        <div class="d-none d-lg-block col-12 mt-lg-4  px-3">
                                            <h4
                                                class="text-dark-tp4 border-b-1 brc-secondary-l2 pb-1 text-140 font-bold">
                                                <i class="fa fa-coffee text-orange-m1 mr-1"></i>
                                                歡迎回來
                                            </h4>
                                        </div>

                                        <!-- show this in mobile device -->
                                        <h4 class="d-lg-none text-secondary-m1 my-4 text-center text-150 font-bold">
                                            歡迎回來
                                        </h4>

                                        <form asp-area="" asp-controller="Login" asp-action="Index" method="post"
                                            autocomplete="off" class="form-row mt-4 px-3 ">
                                            <div class="form-group col-12">
                                                <div
                                                    class="d-flex align-items-center input-floating-label text-blue brc-blue-m2">
                                                    <input name="email" placeholder="Email" type="email"
                                                        class="form-control form-control-lg pr-4 shadow-none"
                                                        id="id-login-email" required>
                                                    <i class="fa fa-user text-grey-m2 ml-n4"></i>
                                                    <label class="floating-label text-grey-l1 ml-n3"
                                                        for="id-login-email">
                                                        Email
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="form-group col-12">
                                                <div
                                                    class="d-flex align-items-center input-floating-label text-blue brc-blue-m2">
                                                    <input name="password" placeholder="Password" type="password"
                                                        class="form-control form-control-lg pr-4 shadow-none"
                                                        id="id-login-password" required>
                                                    <i class="fa fa-key text-grey-m2 ml-n4"></i>
                                                    <label class="floating-label text-grey-l1 ml-n3"
                                                        for="id-login-password">
                                                        密碼 Password
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="col-12 text-right text-md-right mt-2 mb-2">
                                                <a href="#" class="text-primary-m1 text-95" data-toggle="tab"
                                                    data-target="#id-tab-forgot">
                                                    忘記密碼?
                                                </a>
                                            </div>
                                            <div class="form-group col-12">
                                                <button type="submit"
                                                    class="btn btn-primary btn-block px-4 btn-bold mt-2 mb-2">
                                                    登入 Login
                                                </button>
                                            </div>
                                        </form>

                                        <div class="bgc-white-tp2 text-secondary-d3 text-center text-90 mb-3"> -- OR --
                                        </div>

                                        <div class="row">
                                            <div class="col-12 text-center">
                                                <a asp-area="" asp-controller="Login" asp-action="ExternalLogin"
                                                    asp-route-provider="Facebook" data-toggle="tooltip"
                                                    data-placement="top" title="Facebook 登入"
                                                    class="btn btn-bgc-white btn-lighter-blue btn-h-blue btn-a-blue border-2 radius-round btn-lg mx-1">
                                                    <i class="fab fa-facebook-f text-110"></i>
                                                </a>

                                                <a asp-area="" asp-controller="Login" asp-action="ExternalLogin"
                                                    asp-route-provider="LINE" data-toggle="tooltip" data-placement="top"
                                                    title="LINE 登入"
                                                    class="btn btn-bgc-white btn-lighter-green btn-h-green btn-a-green border-2 radius-round btn-lg px-25 mx-1">
                                                    <i class="fab fa-line text-110"></i>
                                                </a>
                                            </div>
                                        </div>

                                        <div
                                            class="dropdown-footer text-center py-25 mt-4 bgc-default-l4 border-t-1 brc-default-l2 w-100 ">
                                            <div class="my-2">
                                                非會員?
                                                <a class="text-success-m1 text-600 mx-1" data-toggle="tab"
                                                    data-target="#id-tab-signup" href="#">
                                                    立即註冊
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="tab-pane mh-100 px-3 px-lg-0 dropdown-clickable" id="id-tab-signup"
                                        data-swipe-prev="#id-tab-login">

                                        <!-- show this in desktop -->
                                        <div class="d-none d-lg-block col-12 mt-lg-4 px-0 px-3">
                                            <h4 class="text-dark-tp4 border-b-1 brc-grey-l1 pb-1 text-140 font-bold">
                                                <i class="fa fa-user text-purple mr-1"></i>
                                                新增帳號
                                            </h4>
                                        </div>

                                        <!-- show this in mobile device -->
                                        <div class="d-lg-none text-secondary-m1 my-4 text-center text-150 font-bold">
                                            新增帳號
                                        </div>

                                        <form asp-area="" asp-controller="Login" asp-action="FastRegister" method="post"
                                            autocomplete="off" class="form-row mt-4 px-3">
                                            <div class="validation-summary-valid" data-valmsg-summary="true">
                                                <ul>
                                                    <li style="display:none"></li>
                                                </ul>
                                            </div>
                                            <div class="form-group col-12">
                                                <div
                                                    class="d-flex align-items-center input-floating-label text-success brc-success-m2">
                                                    <input name="fast.name" placeholder="姓名 Name" type="text"
                                                        class="form-control form-control-lg pr-4 shadow-none"
                                                        id="id-signup-name" maxlength="50" required />
                                                    <i class="fa fa-envelope text-grey-m2 ml-n4"></i>
                                                    <label class="floating-label text-grey-l1 text-100 ml-n3"
                                                        for="id-signup-name">
                                                        姓名 Name
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="form-group col-12">
                                                <div
                                                    class="d-flex align-items-center input-floating-label text-success brc-success-m2">
                                                    <input name="fast.email" placeholder="Email" type="email"
                                                        class="form-control form-control-lg pr-4 shadow-none"
                                                        id="id-signup-email" maxlength="200" required />
                                                    <i class="fa fa-envelope text-grey-m2 ml-n4"></i>
                                                    <label class="floating-label text-grey-l1 text-100 ml-n3"
                                                        for="id-signup-email">
                                                        Email
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="form-group col-12">
                                                <div
                                                    class="d-flex align-items-center input-floating-label text-success brc-success-m2">
                                                    <input name="fast.rocid" placeholder="身分證ID Number/護照Passport"
                                                        type="text"
                                                        class="form-control form-control-lg pr-4 shadow-none"
                                                        id="id-signup-rocid" maxlength="10" required />
                                                    <i class="fa fa-envelope text-grey-m2 ml-n4"></i>
                                                    <label class="floating-label text-grey-l1 text-100 ml-n3"
                                                        for="id-signup-rocid">
                                                        身分證ID Number/護照Passport
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="form-group col-12">
                                                <div
                                                    class="d-flex align-items-center input-floating-label text-success brc-success-m2">
                                                    <input name="password" placeholder="Password" type="password"
                                                        class="form-control form-control-lg pr-4 shadow-none"
                                                        id="id-signup-password" minlength="6" maxlength="100"
                                                        required />
                                                    <i class="fa fa-key text-grey-m2 ml-n4"></i>
                                                    <label class="floating-label text-grey-l1 text-100 ml-n3"
                                                        for="id-signup-password">
                                                        密碼 Password
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="form-group col-12 mt-1">
                                                <label class="d-inline-block mb-0 text-secondary-d2">
                                                    <input type="checkbox" class="mr-1" id="id-agree" required />
                                                    <span class="text-dark-m3"> 我已詳細閱讀並同意 <a href="#"
                                                            data-toggle="modal" data-target="#termModal"
                                                            class="text-blue-d2">服務條款</a></span>
                                                </label>
                                                <button type="submit"
                                                    class="btn btn-success btn-block px-4 btn-bold mt-2"> 註冊 Sign Up
                                                </button>
                                            </div>
                                        </form>
                                        <div
                                            class="dropdown-footer text-center py-25 mt-1 bgc-default-l4 border-t-1 brc-default-l2 w-100 ">
                                            <div class="my-2">
                                                已經是會員?
                                                <a class="text-blue-d1 text-600 mx-1" data-toggle="tab"
                                                    data-target="#id-tab-login" href="#">
                                                    點此登入
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="tab-pane mh-100 px-3 px-lg-0 pos-rel dropdown-clickable"
                                        id="id-tab-forgot" data-swipe-prev="#id-tab-login">

                                        <div class="d-none d-lg-block col-12 mt-lg-4 px-0 px-3">
                                            <h4 class="text-dark-tp4 border-b-1 brc-grey-l2 pb-1 text-130">
                                                <i class="fa fa-key text-brown-m1 mr-1"></i>
                                                忘記密碼
                                            </h4>
                                        </div>

                                        <form asp-area="" asp-controller="Login" asp-action="ForgetPassword"
                                            autocomplete="off" class="form-row mt-4 px-3">
                                            <div class="form-group col-12">
                                                <label class="text-secondary-d3 mb-3">
                                                    輸入您的Email和身分證號碼，我們將寄送一組新密碼至您註冊信箱:
                                                </label>
                                                <div class="d-flex align-items-center">
                                                    <input name="email" type="email"
                                                        class="form-control form-control-lg pr-4 shadow-none"
                                                        id="id-recover-email" placeholder="Email" required />
                                                    <i class="fa fa-envelope text-grey-m2 ml-n4"></i>
                                                </div>
                                            </div>
                                            <div class="form-group col-12">
                                                <div class="d-flex align-items-center">
                                                    <input name="rocid" placeholder="身分證號碼或護照號碼" type="text"
                                                        class="form-control form-control-lg pr-4 shadow-none"
                                                        id="id-recover-rocid" required />
                                                    <i class="fa fa-key text-grey-m2 ml-n4"></i>
                                                </div>
                                            </div>

                                            <div class="form-group col-12 mt-1">
                                                <button type="submit"
                                                    class="btn btn-orange btn-block px-4 btn-bold mt-2 mb-4">
                                                    寄送 Send
                                                </button>
                                            </div>
                                        </form>
                                        <div class="dropdown-footer text-center py-25 mt-4 bgc-default-l4 border-t-1 brc-default-l2 position-bc w-100"
                                            style="bottom: 0;">
                                            <div class="my-2">
                                                <a class="text-success-m1 text-600 mx-1" data-toggle="tab"
                                                    data-target="#id-tab-login" href="#">
                                                    回到登入頁
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </template>
                <li class="nav-item p-3 d-block d-sm-none">
                    <span class="p-2">
                        <i class="fa fa-phone fa-flip-horizontal text-125 text-orange mr-1"></i>
                        <span class="ml-1 text-600 letter-spacing-1 d-lg-none d-xl-inline-block" data-toggle="tooltip"
                            data-placement="top" title="服務時間: 周一至周四 09:00-18:00、周五 09:00-17:00">
                            05-6226456
                        </span>
                    </span>
                </li>

                <li class="nav-item p-3 d-block d-sm-none">
                    <span class="p-2">
                        <i class="fa fa-envelope fa-flip-horizontal text-125 text-primary mr-1"></i>
                        <span class="ml-1 text-600 letter-spacing-1 d-lg-none d-xl-inline-block">
                            <a href="mailto:service@focusline.com.tw">service@focusline.com.tw</a>
                        </span>
                    </span>
                </li>
            </ul>
        </div>
    </div>

    <!-- 服務條款 Modal -->
    <div class="modal fade" data-backdrop="false" id="termModal" tabindex="-1" aria-labelledby="termModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="termModalLabel">Modal title</h5>
                    <button type="button" class="close" onclick="$('#termModal').modal('hide');" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary"
                        onclick="$('#termModal').modal('hide');">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'LoginModal',
    data() {
        return {
            isAuthenticated: false
        }
    },
    mounted() {
        $('a[data-toggle="tab"]').on('click', function (event) {
            event.preventDefault();
            $('a[data-toggle="tab"]').removeClass('active')
        });
        $(document).on('click.dropdown-clickable', '.dropdown-clickable', function (e) {
            e.stopImmediatePropagation();
        });
    }
}
</script>