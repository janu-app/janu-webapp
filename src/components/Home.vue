<template>
  <home-layout>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-2">
            <aside class="menu">
              <p class="menu-label">Seguimiento Sesiones</p>
              <ul class="menu-list">
                <li>
                  <router-link :to="{ name: 'sesionesaprendoencasa'}">Aprendo en Casa</router-link>
                </li>
              </ul>
            </aside>
          </div>
          <div class="column">
            <h3 class="title is-4 has-text-centered">Bienvenido</h3>
            <div class="content has-text-centered">
              <figure class="image is-64x64">
                <img style="width: 64px;" src="../assets/logo.png" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  </home-layout>
</template>
<script>
import HomeLayout from "./layout/HomeLayout.vue";

export default {
  components: {
    HomeLayout
  }
};
</script>