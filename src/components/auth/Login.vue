<template>
  <section class="section">
    <div class="container" style="margin-bottom: 50px;">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <div class="content has-text-centered">
            <figure class="image is-64x64 is-inline-block">
              <img src="../../assets/logo.png" style="width: 64px;" />
            </figure>
          </div>
          <h4 class="title is-4 has-text-centered">Ingresar ahora</h4>
          <div class="notification is-warning is-light" v-if="loginFailed">
            Usuario y/o contraseña incorrecto
          </div>
          <form @submit.prevent="onClickIngresar">
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  v-model="form.email"
                  type="text"
                  placeholder="Correo electrónico"
                />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  v-model="form.password"
                  type="password"
                  placeholder="Contraseña"
                  @keyup.enter="onClickIngresar"
                />
              </div>
            </div>
            <!-- <div class="content">
            <p><a href="#">¿Olvidate tu contraseña?</a></p>
            </div>-->
          </form>
          <button
            type="submit"
            style="margin-top: 20px"
            class="button is-primary is-fullwidth is-rounded"
            @click="onClickIngresar"
          >Ingresar</button>
        </div>
      </div>
    </div>
    <!--div class="content">
        <p class="has-text-centered">ó</p>
      </div>
      <div class="container">
        <button class="button is-fullwidth is-rounded" @click="onClickUsingGoogle">Continuar con Google</button>
      </div>
      <div class="content">
        <p class="has-text-centered">¿No tienes cuenta? Ingresa <router-link to="join">aquí</router-link></p>
    </div-->
    <Footer />
    <Loading :show="showLoading" />
  </section>
</template>

<script>
// @ is an alias to /src
import auth from "@/service/auth";
import Footer from "../layout/common/Footer.vue";
import Loading from "../layout/common/Loading.vue";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      showLoading: false,
      loginFailed: false
    };
  },
  methods: {
    async onClickIngresar() {
      try {
        this.showLoading = true
        this.loginFailed = false
        await auth.login(this.form.email, this.form.password)
      } catch (e) {
        this.showLoading = false
        this.loginFailed = true
      }
    },
    onClickUsingGoogle() {
      auth.googleLogin();
    }
  },
  components: { Footer, Loading }
};
</script>

<style scoped>
.container form {
  margin-top: 20px;
}

.content {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>