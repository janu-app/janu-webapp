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
              <a href="#">Asistencia</a>
            </li>
          </ul>
        </nav>
      </div>

      <div class="container is-fluid" style="margin-top: 20px;">
        <div class="content">
          <router-link :to="{name: 'sesionesaprendoencasa'}"><feather type="arrow-left"></feather> Regresar</router-link>
        </div>
        <h3 class="title is-4 has-text-centered">FICHA PARA DOCENTES - SEGUIMIENTO DE SESIONES PROGRAMADAS "APRENDO EN CASA"</h3>
        <h4 class="subtitle is-5 has-text-centered">Grado y sección: {{session.grade_name}}</h4>
        <div class="field">
          <div class="field-body">
            <div class="field is-narrow">
              <label class="label is-small">Nro. Sesión</label>
              <div class="control">
                <input class="input" type="text" placeholder="Nro. Sesión" v-model="session.number" readonly />
              </div>
            </div>
            <div class="field is-narrow">
              <label class="label is-small">Nro. Semana</label>
              <div class="control">
                <input class="input" type="text" placeholder="Nro. Semana" v-model="session.week_number" readonly />
              </div>
            </div>
            <div class="field">
              <label class="label is-small">Nombre sesión</label>
              <div class="control">
                <input class="input" type="text" placeholder="Nombre sesión" v-model="session.name" readonly />
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
                  <select v-model="session.area_id" disabled>
                    <option v-for="area in $store.getters['areas/areas']" :value="area.id" :key="area.id">{{area.name}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label is-small">Competencias</label>
              <div class="control">
                <input class="input" type="text" placeholder="Competencias" v-model="session.competences" readonly />
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="container is-fluid has-text-right">
          <router-link class="button" :to="{name: 'sesionesaprendoencasa'}">Cancelar</router-link>
          <button style="margin-left: 20px" class="button is-primary">Guardar</button>
        </div> -->
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
import HomeLayout from "../layout/HomeLayout.vue";
import SessionDetail from './SessionDetail.vue'

export default {
  data() {
    return {
      session: {
        detail: []
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('areas/loadAreas')
    const data = await this.$store.dispatch('sessions/loadSession', this.$route.params)
    this.session = data
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