<template>
    <Layout>
        <div class="row">
            <div class="col-md-2">
                <ActSidebar></ActSidebar>
            </div>
            <div class="col-md-10">
                <ActContent></ActContent>
            </div>
        </div>
    </Layout>
</template>

<script>
    import ActSidebar from './ActSidebar.vue';
    import ActContent from './ActContent.vue';

    export default {
        name:'ActLoyout',
        components:{
            ActSidebar,ActContent
        }
    }
</script>