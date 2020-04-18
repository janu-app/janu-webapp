<template>
  <home-layout>
    <section class="section">
      <div class="container is-fluid">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <router-link :to="{name: 'home'}">Lucyana</router-link>
            </li>
            <li class="is-active">
              <a href="#">Aprendo en Casa: Ficha Directivos</a>
            </li>
          </ul>
        </nav>

        <h3 class="title is-4 has-text-centered">FICHA PARA DIRECTIVOS - SEGUIMIENTO DE SESIONES PROGRAMADAS "APRENDO EN CASA"</h3>
        <div class="field">
          <div class="field-body">
            <div class="field is-narrow">
              <label class="label is-small">Nro. Semana</label>
              <div class="control">
                <div class="select">
                  <select v-model="form.week_number" @change="loadSessions">
                    <option v-for="sessionNumber in $store.getters['sessions/numbers']" :value="sessionNumber" :key="sessionNumber">{{sessionNumber}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label is-small">*</label>
              <div class="control">
                <a target="_blank" :href="reportUrl" class="button is-primary">Reporte</a>
              </div>
            </div>
          </div>
        </div>
        <session-table :sessions="sessions" />
      </div>
    </section>
  </home-layout>
</template>
<script>
import axios from 'axios'
import HomeLayout from "../layout/HomeLayout.vue";
import SessionTable from "./SessionTable.vue";

export default {
  data() {
    return {
      form: {
        week_number: '',
        state: 'ACTIVE'
      },
      sessions: []
    }
  },
  mounted() {
    this.loadSessions()
  },
  methods: {
    async loadSessions() {
      this.sessions = await this.$store.dispatch('sessions/loadSessionsReportData', this.form)
    }
  },
  computed: {
    reportUrl() {
      return `${axios.defaults.baseURL}/sessions/report/xlsx?access_token=${this.$store.getters['auth/user'].idToken}&week_number=${this.form.week_number}&state=ACTIVE`
    }
  },
  components: {
    HomeLayout, SessionTable
  }
};
</script>

<style lang="sass" scoped>
thead tr th
  text-align: center !important
  font-size: 12px
</style>