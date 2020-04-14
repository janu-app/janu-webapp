<template>
  <home-layout>
    <section class="section">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <router-link :to="{name: 'home'}">Lucyana</router-link>
            </li>
            <li class="is-active">
              <a href="#">Aprendo en Casa</a>
            </li>
          </ul>
        </nav>
        <area-selector @dirty="cleanSelection" @selected="onSelectedArea" />
        <p class="content has-text-right" v-if="$store.getters['classrooms/classroom'] && $store.getters['classrooms/classroom'].classroomId">
          <router-link class="button is-primary" :to="{ name: 'newsesionesaprendoencasaform' }">Registrar sessión</router-link>
        </p>
        <session-table :sessions="sessions" />
      </div>
    </section>
  </home-layout>
</template>
<script>
import HomeLayout from "../layout/HomeLayout.vue";
import AreaSelector from "./AreaSelector.vue";
import SessionTable from "./SessionTable.vue";

export default {
  data() {
    return {
      form: {
        turno: "",
        grado: "",
        seccion: ""
      },
      sessions: []
    };
  },
  methods: {
    async cleanSelection() {
      this.sessions = []
      this.$store.dispatch("classrooms/setClassroom", {
        turno: '',
        classroomId: ''
      });
    },
    async onSelectedArea(classroom) {
      this.$store.dispatch("classrooms/setClassroom", classroom);
      this.sessions = await this.$store.dispatch("sessions/loadSessions", classroom);
    }
  },
  components: {
    HomeLayout,
    SessionTable,
    AreaSelector
  }
};
</script>