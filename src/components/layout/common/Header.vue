<template>
  <nav class="navbar is-white" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
    <router-link class="navbar-item" to="/">
      <!-- <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"> -->
      I.E. Lucyana
    </router-link>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navBaeeMenu" @click="onClickMenu">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

    <div class="navbar-menu" :class="{ 'is-active': showMenu }">
      <div class="navbar-end">
        <div class="navbar-item">
          <router-link :to="{ name: 'home' }">Inicio</router-link>
        </div>
        <div class="navbar-item">
          {{$store.getters['me/me'].name}} (<a href="#" @click.prevent="onClickLogout">Salir</a>)
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    onClickMenu() {
      this.showMenu = !this.showMenu
    },
    onClickLogout() {
      this.$store.dispatch("auth/logout");
      this.$router.push({ name: "login" });
    },
    onClickBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="sass" scoped>
.icon
  font-size: 1.7rem
  top: calc(50% - 18px)
  position: absolute
  left: calc(50% - 12px)
.navbar-brand
  .navbar-start
    color: #78849E
    cursor: pointer
    display: block
    height: 3.25rem
    position: relative
    width: 3.25rem
    margin-right: auto

.navbar.is-white
  .navbar-start
    color: #0a0a0a
</style>