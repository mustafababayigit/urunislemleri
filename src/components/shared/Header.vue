<template>
    <nav :class="logoutClass" class="navbar navbar-expand-lg navbar-dark" style="background-color: #563F7A">
    <router-link
        to="/"
        tag="a"
        class="navbar-brand">
        Ürün Listesi
    </router-link>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <router-link
                active-class="active"
                to="/urun-islemleri"
                tag="li"
                class="nav-item">
                <a class="nav-link">Ürün İşlemleri</a>
            </router-link>
            <router-link
                active-class="active"
                to="/urun-cikisi"
                tag="li"
                class="nav-item">
                <a class="nav-link">Ürün Çıkışı</a>
            </router-link>
        </ul>
        <ul class="navbar-nav my-2 my-lg-0" :class="logoutClass">
            <li class="nav-item">
            <a @click.prevent="logout" class="nav-link" href="#">Çıkış Yap</a>
            </li>
        </ul>
    </div>
</nav>
</template>

<script>
  export default {
    methods: {
      logout() {
        this.$store.dispatch("logout")
      }
    },
    computed: {
      logoutClass() {
        return {
          'd-none': !this.$store.getters.isAuthenticated
        }
      }
    }
  }
</script>
