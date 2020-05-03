<template>
  <div v-if="show" class="container is-fluid loading">
    <div class="columns" style="position: relative; top: 50%; margin-top: -200px;">
      <div class="column is-2 is-offset-5">
        <div class="content has-text-centered">
          <figure class="image is-64x64 is-inline-block">
            <img src="../../../assets/logo.png" style="width: 64px;" />
          </figure>
          <p>Cargando...</p>
          <progress class="progress is-small is-primary" max="100">15%</progress>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["show"]
};
</script>
<style lang="sass" scoped>
.loading
  position: absolute
  top: 0
  bottom: 0
  background: #fff
</style>