<template>
    <div>
        <Header />
        <slot />
        <div style="margin-top: 50px"></div>
        <Footer />
    </div>
</template>
<script>
import Header from './common/Header.vue'
import Footer from './common/Footer.vue'

export default {
    components: { Header, Footer }
}
</script>