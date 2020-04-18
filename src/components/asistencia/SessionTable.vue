<template>
<div>
  <div class="notification" v-if="sessions.length == 0">
    No se encontraron sesiones registradas.
  </div>
  <div class="table-container" v-if="sessions.length > 0">
    <table class="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th>Grado y Area</th>
          <th>Nro. Sesión</th>
          <th>Nro. Semana</th>
          <th>Sesión</th>
          <th>Estudiantes</th>
          <th>Participaron</th>
          <th>Web</th>
          <th>TV</th>
          <th>Radio</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="session in sessions" :key="session.id">
          <td>
            <p><strong>{{session.grade}} {{session.section}}</strong></p>
            <p><small>{{session.area_name}}</small></p>
          </td>
          <td class="has-text-centered">{{session.number}}</td>
          <td class="has-text-centered">{{session.week_number}}</td>
          <td>
            <p><strong>{{session.name}}</strong></p>
            <p>{{session.competences}}</p>
          </td>
          <td class="has-text-centered">{{session.student_count}}</td>
          <td class="has-text-centered" :class="{ 'is-danger': session.participated < 1 }">{{session.participated}}</td>
          <td class="has-text-centered">{{session.web}}</td>
          <td class="has-text-centered">{{session.tv}}</td>
          <td class="has-text-centered">{{session.radio}}</td>
          <td>
            <router-link :to="{ name: 'sesionesaprendoencasaform', params: {sessionId: session.session_id} }"><feather type="edit-2"></feather></router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>
<script>
export default {
  props: ['sessions'],
  data() {
    return {}
  },
  methods: {
  }
}
</script>
<style lang="sass" scoped>
thead tr th
  text-align: center !important
  font-size: 12px
</style>