<template>
    <nav :class="logoutClass" class="navbar fixed-bottom  navbar-light" style="background-color: #e3f2fd;">
        <span class="navbar-text mr-auto">
            <strong>Vue.js</strong> | challenge
        </span>
        <span class="navbar-text navbar-nav my-2 my-lg-0 mr-3">
            <strong>Alış Tutarı : </strong>
            <span class="badge badge-danger"> {{getTradeResult.purchase | currency}} </span>
        </span>
        <span class="navbar-text navbar-nav my-2 my-lg-0 mr-3">
            <strong>Satış Tutarı : </strong>
            <span class="badge badge-success"> {{getTradeResult.sale | currency}}</span>
        </span>
        <span class="navbar-text navbar-nav my-2 my-lg-0">
            <strong>Bakiye : </strong>
            <span class="badge badge-primary"> {{getTradeResult.balance | currency}}</span>
        </span>
    </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
      logoutClass() {
        return {
          'd-none': !this.$store.getters.isAuthenticated
        }
      },
      ...mapGetters(["getTradeResult"])
    }
}
</script>