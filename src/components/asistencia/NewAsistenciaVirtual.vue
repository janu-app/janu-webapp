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
        <h4 class="title is-4">Nueva sesión</h4>
        <h5 class="subtitle is-5">Aquí podrás registrar una nueva sesión</h5>
        
        <area-selector @selected="onGradeSelected" @dirty="onGraeDirty" />
        <p v-if="$v.form.classroom_id.$anyError" class="help is-danger">Por favor seleccione el grado.</p>
        <div class="field">
          <div class="field-body">
            <div class="field is-narrow">
              <label class="label is-small">Nro. Sesión</label>
              <div class="control">
                <div class="select" :class="{ 'is-danger': $v.form.number.$anyError }">
                  <select v-model="form.number">
                    <option v-for="sessionNumber in $store.getters['sessions/numbers']" :value="sessionNumber" :key="sessionNumber">{{sessionNumber}}</option>
                  </select>
                </div>
                <!-- <input class="input" type="text" placeholder="Nro. Sesión" v-model="form.number" maxlength="9" :class="{ 'is-danger': $v.form.number.$anyError }" /> -->
              </div>
              <p v-if="$v.form.number.$anyError" class="help is-danger">Por favor seleccione el Nro. de Sesión</p>
            </div>
            <div class="field is-narrow">
              <label class="label is-small">Nro. Semana</label>
              <div class="control">
                <div class="select" :class="{ 'is-danger': $v.form.week_number.$anyError }">
                  <select v-model="form.week_number">
                    <option v-for="sessionNumber in weekNumbers" :value="sessionNumber" :key="sessionNumber">{{sessionNumber}}</option>
                  </select>
                </div>
                <!-- <input class="input" type="text" placeholder="Nro. Semana" v-model="form.week_number" maxlength="9" :class="{ 'is-danger': $v.form.week_number.$anyError }" /> -->
              </div>
              <p v-if="$v.form.week_number.$anyError" class="help is-danger">Por favor seleccione el Nro. de Semana</p>
            </div>
            <div class="field">
              <label class="label is-small">Nombre sesión</label>
              <div class="control">
                <input class="input" type="text" placeholder="Nombre sesión" v-model="form.name" maxlength="255" :class="{ 'is-danger': $v.form.name.$anyError }" />
              </div>
              <p v-if="$v.form.name.$anyError" class="help is-danger">Por favor ingrese el nombre de Sesión</p>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="field-body">
            <div class="field is-narrow">
              <label class="label is-small">Area</label>
              <div class="control">
                <div class="select" :class="{ 'is-danger': $v.form.area_id.$anyError }">
                  <select v-model="form.area_id">
                    <option v-for="area in $store.getters['areas/areas']" :value="area.id" :key="area.id">{{area.name}}</option>
                  </select>
                </div>
              </div>
              <p v-if="$v.form.area_id.$anyError" class="help is-danger">Por favor seleccione el Área</p>
            </div>
            <div class="field">
              <label class="label is-small">Competencias</label>
              <div class="control">
                <input class="input" type="text" placeholder="Competencias" v-model="form.competences" maxlength="255" :class="{ 'is-danger': $v.form.competences.$anyError }" />
              </div>
              <p v-if="$v.form.competences.$anyError" class="help is-danger">Por favor ingrese las competencias trabajadas</p>
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
import * as Sentry from '@sentry/browser';

import HomeLayout from "../layout/HomeLayout.vue";
import Loading from "../layout/common/Loading.vue";
import AreaSelector from './AreaSelector.vue'

import { required } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      form: {
        week_number: '',
        number: '',
        name: '',
        competences: '',
        area_id: '',
        classroom_id: ''
      },
      weekNumbers: ['TERCERA', 'CUARTA', 'QUINTA', 'SEXTA', 'SEPTIMA', 'OCTAVA', 'NOVENA', 'DÉCIMA'],
      showLoading: false
    }
  },
  validations: {
    form: {
      week_number: { required },
      number: { required },
      name: { required },
      competences: { required },
      area_id: { required },
      classroom_id: { required }
    }
  },
  mounted() {
    this.$store.dispatch('areas/loadAreas')
  },
  methods: {
    onGraeDirty() {
      this.form.classroom_id = ''
    },
    onGradeSelected(grade) {
      this.form.classroom_id = grade.classroomId
    },
    async onClickSave() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.showLoading = true
      try {
        const { sessionId } = await this.$store.dispatch('sessions/create', this.form)
        this.$router.push({
          name: 'sesionesaprendoencasaform',
          params: {
            sessionId
          }
        })
      } catch (e) {
        this.showLoading = false
        Sentry.captureException(e)
        alert('No se pudo registrar, intente de nuevo')
      }
    }
  },
  components: {
    HomeLayout,
    Loading,
    AreaSelector
  }
};
</script>