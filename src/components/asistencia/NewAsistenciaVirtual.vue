<template>
  <home-layout>
    <section class="section">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <router-link :to="{name: 'home'}">Lucyana</router-link>
            </li>
            <li>
              <router-link :to="{name: 'sesionesaprendoencasa'}">Aprendo en Casa</router-link>
            </li>
            <li class="is-active">
              <a href="#">Registrar asistencia</a>
            </li>
          </ul>
        </nav>
        <h3 class="title">{{$store.getters['classrooms/classroom'].name}}</h3>
        <div class="field">
          <div class="field-body">
            <div class="field is-narrow">
              <label class="label is-small">Nro. Sesión</label>
              <div class="control">
                <input class="input" type="text" placeholder="Nro. Sesión" v-model="form.number" maxlength="9" />
              </div>
            </div>
            <div class="field is-narrow">
              <label class="label is-small">Nro. Semana</label>
              <div class="control">
                <input class="input" type="text" placeholder="Nro. Semana" v-model="form.week_number" maxlength="9" />
              </div>
            </div>
            <div class="field">
              <label class="label is-small">Nombre sesión</label>
              <div class="control">
                <input class="input" type="text" placeholder="Nombre sesión" v-model="form.name" maxlength="255" />
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="field-body">
            <div class="field is-narrow">
              <label class="label is-small">Area</label>
              <div class="control">
                <div class="select">
                  <select v-model="form.area_id">
                    <option v-for="area in $store.getters['areas/areas']" :value="area.id" :key="area.id">{{area.name}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label is-small">Competencias</label>
              <div class="control">
                <input class="input" type="text" placeholder="Competencias" v-model="form.competences" maxlength="255" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container has-text-right" style="margin-top: 20px">
        <router-link class="button" :to="{ name: 'sesionesaprendoencasa' }">Cancelar</router-link>
        <button class="button is-primary" style="margin-left: 20px;" @click.prevent="onClickSave">Guardar</button>
      </div>
    </section>
    <Loading :show="showLoading" />
  </home-layout>
</template>
<script>
import HomeLayout from "../layout/HomeLayout.vue";
import Loading from "../layout/common/Loading.vue";

export default {
  data() {
    return {
      form: {
        week_number: '',
        number: '',
        name: '',
        competences: '',
        area_id: ''
      },
      showLoading: false
    }
  },
  mounted() {
    this.$store.dispatch('areas/loadAreas')
  },
  methods: {
    async onClickSave() {
      this.showLoading = true
      const { classroomId } = this.$store.getters['classrooms/classroom']
      try {
        const { sessionId } = await this.$store.dispatch('sessions/create', Object.assign({}, this.form, { classroom_id: classroomId }))
        this.$router.push({
          name: 'sesionesaprendoencasaform',
          params: {
            sessionId
          }
        })
      } catch (e) {
        this.showLoading = false
        alert('No se pudo registrar, intente de nuevo')
      }
    }
  },
  components: {
    HomeLayout,
    Loading
  }
};
</script>