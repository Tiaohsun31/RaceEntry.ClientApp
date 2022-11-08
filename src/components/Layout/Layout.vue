<template>
    <div class="body-container">

        <nav id="navbar" class="navbar navbar-fixed navbar-expand-lg bgc-white">
            <Navbar></Navbar>
        </nav>

        <div class="main-container bgc-white">

            <div class="main-content">
                <main role="main" class="page-content container-plus m-0 p-0">
                    <slot></slot>
                </main>
                <Footer></Footer>
            </div>
            
        </div>

    </div>
    <Aside></Aside>
</template>

<script>

    import Navbar from './Navbar.vue'
    import Aside from './Aside.vue'
    // import Offsidebar from './Offsidebar'
    import Footer from './Footer.vue'
    // import ContentWrapper from './ContentWrapper'

   // Vue.component('ContentWrapper', ContentWrapper)

    export default {
        name: 'Layout',
        components: {
            Navbar,
           // Header,
            Aside,
           // Offsidebar,
            Footer
        }
    }
</script>