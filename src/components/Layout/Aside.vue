<template>
    <div class="d-sm-none footer footer-sm footer-fixed mt-0 bgc-primary">
        <div class="footer-inner">
            <div class="btn-group d-flex h-100 mx-2 border-x-1 border-t-2 brc-primary-m3 bgc-white-tp1 radius-t-1 shadow">
                <button class="btn btn-outline-primary btn-h-lighter-primary btn-a-lighter-primary border-0 text-125"
                        data-toggle="modal" data-target="#aside">
                    賽事搜尋
                </button>
            </div>
        </div>
    </div>
    <Teleport to="body">
        <div class="modal fade aside-right ace-aside aside-below-nav my-2" id="aside" tabindex="-1"
             aria-labelledby="asideLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content shadow border-0 radius-0">

                    <div class="modal-header p-0 radius-0 border-none border-t-3 brc-primary-m1 shadow-sm">
                        <h5 class="flex-grow-1 text-blue-d1 text-120 py-3 ml-3 mb-0">
                            進階搜尋
                        </h5>

                        <a href="#" class="close m-0 border-l-1 brc-grey-m4" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </a>
                    </div>
                    <SearchFilter position="Aside"></SearchFilter>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script>
    import SearchFilter from './SearchFilter.vue';

    export default {
        name: 'Aside',
        components: {
            SearchFilter
        }
    }
</script>