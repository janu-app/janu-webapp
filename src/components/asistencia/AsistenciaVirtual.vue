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
              <a href="#">Seguimiento de sesiones</a>
            </li>
          </ul>
        </nav>
      </div>

      <div class="container is-fluid" style="margin-top: 20px;">
        <div class="container">
          <router-link :to="{name: 'sesionesaprendoencasa'}">
            <span class="icon"><feather type="arrow-left"></feather></span>
            Regresar
          </router-link>
        </div>
        <h3 class="title is-4 has-text-centered">FICHA PARA DOCENTES - SEGUIMIENTO DE SESIONES PROGRAMADAS "APRENDO EN CASA"</h3>
        <h4 class="subtitle is-5 has-text-centered">Grado y sección: {{session.grade_name}}</h4>
        
        <div class="container" style="margin-top: 20px">
        <div class="field">
          <div class="field-body">
            <div class="field is-narrow">
              <label class="label is-small">Nro. Sesión</label>
              <div class="control">
                <div class="select" :class="{ 'is-danger': $v.session.number.$anyError }">
                  <select v-model="session.number">
                    <option v-for="sessionNumber in $store.getters['sessions/numbers']" :value="sessionNumber" :key="sessionNumber">{{sessionNumber}}</option>
                  </select>
                </div>
                <!-- <input class="input" type="text" placeholder="Nro. Sesión" v-model="form.number" maxlength="9" :class="{ 'is-danger': $v.form.number.$anyError }" /> -->
              </div>
              <p v-if="$v.session.number.$anyError" class="help is-danger">Por favor seleccione el Nro. de Sesión</p>
            </div>
            <div class="field is-narrow">
              <label class="label is-small">Nro. Semana</label>
              <div class="control">
                <div class="select" :class="{ 'is-danger': $v.session.week_number.$anyError }">
                  <select v-model="session.week_number">
                    <option v-for="sessionNumber in $store.getters['sessions/numbers']" :value="sessionNumber" :key="sessionNumber">{{sessionNumber}}</option>
                  </select>
                </div>
                <!-- <input class="input" type="text" placeholder="Nro. Semana" v-model="form.week_number" maxlength="9" :class="{ 'is-danger': $v.form.week_number.$anyError }" /> -->
              </div>
              <p v-if="$v.session.week_number.$anyError" class="help is-danger">Por favor seleccione el Nro. de Semana</p>
            </div>
            <div class="field">
              <label class="label is-small">Nombre sesión</label>
              <div class="control">
                <input class="input" type="text" placeholder="Nombre sesión" v-model="session.name" maxlength="255" :class="{ 'is-danger': $v.session.name.$anyError }" />
              </div>
              <p v-if="$v.session.name.$anyError" class="help is-danger">Por favor ingrese el nombre de Sesión</p>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="field-body">
            <div class="field is-narrow">
              <label class="label is-small">Area</label>
              <div class="control">
                <div class="select" :class="{ 'is-danger': $v.session.area_id.$anyError }">
                  <select v-model="session.area_id">
                    <option v-for="area in $store.getters['areas/areas']" :value="area.id" :key="area.id">{{area.name}}</option>
                  </select>
                </div>
              </div>
              <p v-if="$v.session.area_id.$anyError" class="help is-danger">Por favor seleccione el Área</p>
            </div>
            <div class="field">
              <label class="label is-small">Competencias</label>
              <div class="control">
                <input class="input" type="text" placeholder="Competencias" v-model="session.competences" maxlength="255" :class="{ 'is-danger': $v.session.competences.$anyError }" />
              </div>
              <p v-if="$v.session.competences.$anyError" class="help is-danger">Por favor ingrese las competencias trabajadas</p>
            </div>
          </div>
        </div>

      
        <button class="button is-primary" @click.prevent="onClickSave">Guardar</button>
      </div>

        <div class="table-container" style="margin-top: 20px">
          <table class="table is-fullwidth is-bordered is-hoverable">
            <thead>
              <tr>
                <th class="has-background-warning" colspan="7">DESARROLLO DE LA SESIÓN</th>
                <th class="has-background-primary" colspan="6">OTRAS ACCIONES REALIZADAS POR EL DOCENTE (OPCIONAL)</th>
                <th></th>
              </tr>
              <tr>
                <th rowspan="2">Nro.</th>
                <th rowspan="2" style="width: 350px;">NOMBRE DEL ESTUDIANTE</th>
                <th rowspan="2">PARTICIPÓ DE LA SESIÓN (SI/NO)</th>
                <th colspan="3">MEDIO POR EL CUAL SE CONECTÓ</th>
                <th rowspan="2">¿SE DEJÓ ACTIVIDADES A TRAVÉS DE LA PÁGINA WEB/TV/RADIO? (SI/NO)</th>
                <th rowspan="2">SE LE DEJÓ ACTIVIDADES AL ESTUDIANTE (SI/NO)</th>
                <th rowspan="2" style="width: 120px;">RECURSO EDUCATIVO UTILIZADO</th>
                <th rowspan="2">EL DOCENTE GENERÓ REUNIONES CON LOS ESTUDIANTES A TRAVÉS DE LOS PADRES DE FAMILIA/APODERADO (SI/NO)</th>
                <th rowspan="2" style="width: 120px;">SI SE REUNIÓ, ESPECIFICAR EL MEDIO (teléfono, redes sociales,etc.)</th>
                <th rowspan="2" style="width: 120px;">FECHA</th>
                <th rowspan="2" style="width: 120px;">TEMA TRATADO</th>
                <th rowspan="2" style="width: 220px;">OBSERVACIONES GENERALES</th>
              </tr>
              <tr>
                <th>Página web</th>
                <th>TV</th>
                <th>Radio</th>
              </tr>
            </thead>
            <tbody>
              <session-detail v-for="(student, index) in session.detail" :index=index :studentDetails="student" :key="student.id" />
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </home-layout>
</template>
<script>
import * as Sentry from '@sentry/browser';

import HomeLayout from "../layout/HomeLayout.vue";
import SessionDetail from './SessionDetail.vue'

import { required } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      session: {
        detail: []
      }
    }
  },
  validations: {
    session: {
      week_number: { required },
      number: { required },
      name: { required },
      competences: { required },
      area_id: { required }
    }
  },
  async mounted() {
    await this.$store.dispatch('areas/loadAreas')
    const data = await this.$store.dispatch('sessions/loadSession', this.$route.params)
    this.session = data
  },
  methods: {
    async onClickSave() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      try {
        await this.$store.dispatch('sessions/update', {
          sessionId: this.$route.params.sessionId,
          week_number: this.session.week_number,
          number: this.session.number,
          name: this.session.name,
          competences: this.session.competences,
          area_id: this.session.area_id
        })
        alert('Sesión actualizada')
      } catch (e) {
        Sentry.captureException(e)
        alert(`No se pudo actualizar el registro por favor, vuelva a intentar - ${e}`)
      }
    }
  },
  components: {
    HomeLayout,
    SessionDetail
  }
};
</script>

<style lang="sass" scoped>
table
  position: relative

thead tr th
  text-align: center !important
  font-size: 12px

</style>