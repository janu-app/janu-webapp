<template>
<div>
  <div class="notification" v-if="sessions.length == 0">
    No se encontraron resultados
  </div>
  <div class="table-container" v-if="sessions.length > 0">
    <table class="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th>Nro. Sesión</th>
          <th>Nombre de la sesión</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="session in sessions" :key="session.id" @click="onClickSession(session)">
          <td>{{session.number}}</td>
          <td>{{session.name}}</td>
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
    onClickSession(session) {
      console.log(session, session.id)
      this.$router.push({
        name: 'sesionesaprendoencasaform',
        params: { sessionId: session.id }
      })
    }
  }
}
</script>