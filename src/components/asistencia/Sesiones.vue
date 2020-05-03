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
        <h4 class="title is-4">Mis sesiones</h4>
        <h5 class="subtitle is-5">Aquí encontrarás las sesiones que haz registrado</h5>
        
        <p class="content has-text-right">
          <router-link class="button is-primary" :to="{ name: 'newsesionesaprendoencasaform' }">Nueva sesión</router-link>
        </p>
        <session-table :sessions="sessions" @reload="onReload" />
      </div>
    </section>
  </home-layout>
</template>
<script>
import HomeLayout from "../layout/HomeLayout.vue";
import SessionTable from "./SessionTable.vue";

import * as Sentry from '@sentry/browser';

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
  async mounted() {
    this.onReload()
  },
  methods: {
    async onReload() {
      try {
        this.sessions = await this.$store.dispatch('sessions/loadSessionsReportData', { teacherId: this.$store.getters['me/me'].person_id, state: 'ACTIVE'})
      } catch(e) {
        console.error(e)
        Sentry.captureException(e)
      }
    },
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
    SessionTable
  }
};
</script>