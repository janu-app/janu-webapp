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
              <a href="#">Participación de estudiantes</a>
            </li>
          </ul>
        </nav>
        <h4 class="title is-4">Participación de estudiantes</h4>
        <h5 class="subtitle is-5">Aquí podrás ver la participación de estudiantes por aula.</h5>

        <div class="field">
          <div class="field-body">
            <janu-select label="Turnos" :options="turnos" @selected="(t) => form.turno = t" />
            <janu-select label="Grado y Sección" :options="grados" @selected="(t) => form.classroomId = t" />
            <janu-select label="Semana" :options="$store.getters['sessions/numbers'].map(d => ({ value: d, name: d }))" @selected="onChangeForm" />
            <div class="field" v-if="students.length">
                <label class="label is-small">*</label>
                <div class="control">
                  <a target="_blank" :href="reportUrl" class="button is-primary">Reporte</a>
                </div>
            </div>
          </div>
        </div>
        <p class="content has-text-centered" v-if="!students.length">Seleccione un grado y sección.</p>
        <table class="table" v-if="students.length">
          <thead>
            <tr>
              <th>Nro.</th>
              <th>Apellidos y Nombres</th>
              <th style="width: 190px;">Nro. de sesiones en las que participó</th>
              <th>Asistencia</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in students"
              :key="student.i">
              <td>{{index+1}}</td>
              <td>{{student.lastname}} {{student.lastname2}}, {{student.name}}</td>
              <td class="has-text-right">{{student.participation}}</td>
              <td class="has-text-centered" :class="{ 'has-text-success': student.result == 'ASISTIÓ', 'has-text-danger': student.result != 'ASISTIÓ' }">{{student.result}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </home-layout>
</template>

<script>
import axios from 'axios'

import HomeLayout from "../layout/HomeLayout.vue";
import JanuSelect from '@/components/common/JanuSelect.vue'

export default {
  data() {
    return {
      response: {},
      form: {
        turno: '',
        classroomId: '',
        weekNumber: ''
      },
      students: []
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      this.response = await this.$store.dispatch("classrooms/loadClassrooms");
    },
    async onChangeForm(weekNumber) {
      this.form.weekNumber = weekNumber
      this.students = await this.$store.dispatch("sessions/loadEngagementReport", this.form)
    }
  },
  computed: {
    turnos() {
      if (this.response && this.response.results) {
        const data = this.response && this.response.results ? this.response.results.map(g => g.turno) : []
        return data.map(d => ({ value: d, name: d }))
      }
      return [];
    },
    grados() {
      const grados = this.response && this.response.results ? this.response.results.filter(
        r => r.turno == this.form.turno
      ) : []
      if (grados.length) {
        return (grados[0].grades || []).map(d => ({ value: d.classroomId, name: d.name }));
      }
      return [];
    },
    reportUrl() {
      const name = (this.grados.filter(v => v.value == this.form.classroomId).map(v => v.name.replace(' ', '_'))[0] || 'NO_ENCONTRADO') + `_${this.form.weekNumber}`
      return `${axios.defaults.baseURL}/reports/sessions/participation/${name}/xlsx?access_token=${this.$store.getters['auth/user'].idToken}&weekNumber=${this.form.weekNumber}&classroomId=${this.form.classroomId}`
    }
  },
  components: {
    HomeLayout,
    JanuSelect
  }
};
</script>