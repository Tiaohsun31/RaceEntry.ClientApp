<template>
    <layout>
        <div class="main-content minh-100 justify-content-center container">
            <div class="row">
                <div class="col-md-4 col">
                    <div class="card bcard h-100">
                        <div class="border-t-3 w-100 brc-success-m1 radius-t-1"></div>
                        <div class="card-header">
                            <h5 class="card-title"> 活動管理 </h5>
                        </div>
                        <div class="card-body">
                            <RouterLink :to="{name:'History'}" class="p-2 d-flex align-items-center bgc-h-blue-l3 radius-1 no-underline">訂單查詢</RouterLink>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col">
                    <div class="card bcard h-100">
                        <div class="border-t-3 w-100 brc-success-m1 radius-t-1"></div>
                        <div class="card-header">
                            <h5 class="card-title"> 會員資料管理 </h5>
                        </div>
                        <div class="card-body">
                            <RouterLink :to="{name:'EditMember'}" class="p-2 d-flex align-items-center bgc-h-blue-l3 radius-1 no-underline">修改個人資料</RouterLink>
                            <RouterLink :to="{name:'BindOtherLogin'}" class="p-2 d-flex align-items-center bgc-h-blue-l3 radius-1 no-underline">綁定其他登入</RouterLink>
                            <RouterLink :to="{name:'ChangePassword'}" class="p-2 d-flex align-items-center bgc-h-blue-l3 radius-1 no-underline">變更密碼</RouterLink>
                            <a asp-area="" asp-controller="Member" asp-action="RefundSetting"
                                class="p-2 d-flex align-items-center bgc-h-blue-l3 radius-1 no-underline">
                                退款帳戶設定
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col">
                    <div class="card bcard h-100">
                        <div class="border-t-3 w-100 brc-success-m1 radius-t-1"></div>
                        <div class="card-header">
                            <h5 class="card-title"> 隊伍管理 </h5>
                        </div>
                        <div class="card-body">
                            <a asp-area="TeamModules" asp-controller="Player" asp-action="Create"
                                class="p-2 d-flex align-items-center bgc-h-blue-l3 radius-1 no-underline">
                                我想加入其他隊伍
                            </a>
                            <a asp-area="TeamModules" asp-controller="Home" asp-action="Index"
                                class="p-2 d-flex align-items-center bgc-h-blue-l3 radius-1 no-underline">
                                我是隊長
                            </a>
                            <a asp-area="TeamModules" asp-controller="Player" asp-action="Index"
                                class="p-2 d-flex align-items-center bgc-h-blue-l3 radius-1 no-underline">
                                我是隊員
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </layout>
</template>
<script>
export default {
    name: 'MemberIndex'
}
</script>