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
              <router-link :to="{name: 'classroomstudents', params: $route.params}">Salones</router-link>
            </li>
            <li class="is-active">
              <a href="#">Nuevo Estudiante</a>
            </li>
          </ul>
        </nav>

        <h3 class="title is-3">{{classroom.name}}</h3>
        <div class="field">
          <div class="field-body">
            <div class="field is-narrow">
              <label class="label is-small">DNI</label>
              <div class="control">
                <input class="input" type="text" placeholder="ej. 52469354" v-model="form.national_id" />
              </div>
              <p v-if="$v.form.national_id.$anyError" class="help is-danger">Por favor ingrese el DNI</p>
            </div>
            <div class="field">
              <label class="label is-small">Apellido Paterno</label>
              <div class="control">
                <input class="input" type="text" placeholder="Apellido Paterno" v-model="form.lastname" />
              </div>
              <p v-if="$v.form.lastname.$anyError" class="help is-danger">Por favor ingrese el apellido paterno</p>
            </div>
            <div class="field">
              <label class="label is-small">Apellido Materno</label>
              <div class="control">
                <input class="input" type="text" placeholder="Apellido Materno" v-model="form.lastname2" />
              </div>
              <p v-if="$v.form.lastname2.$anyError" class="help is-danger">Por favor ingrese el apellido materno</p>
            </div>
            <div class="field">
              <label class="label is-small">Nombres</label>
              <div class="control">
                <input class="input" type="text" placeholder="Nombres" v-model="form.name" />
              </div>
              <p v-if="$v.form.name.$anyError" class="help is-danger">Por favor ingrese los nombres</p>
            </div>
          </div>
        </div>

        <button class="button is-primary" @click="register">Registrar</button>
      </div>
    </section>
  </home-layout>
</template>


<script>
import * as Sentry from '@sentry/browser';
import { required } from 'vuelidate/lib/validators'

import HomeLayout from "../layout/HomeLayout.vue"

export default {
  data() {
    return {
      classroom: {},
      form: {
        national_id: '',
        name: '',
        lastname: '',
        lastname2: ''
      }
    }
  },
  validations: {
    form: {
      national_id: { required },
      name: { required },
      lastname: { required },
      lastname2: { required },
    }
  },
  async mounted() {
    const response = await this.$store.dispatch("classrooms/loadClassrooms")
    const grades = response.results.map(r => r.grades).reduce((p, g) => p.concat(g), []).filter(g => g.classroomId == this.$route.params.classroomId)
    if (grades.length) {
      this.classroom = grades[0]
    }
  },
  methods: {
    async register() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      try {
        await this.$store.dispatch('classrooms/joinStudent', {
          classroomId: this.$route.params.classroomId,
          person: this.form
        })
        this.$router.push({
          name: "classroomstudents",
          params: this.$route.params
        })
      } catch (e) {
        console.error(e)
        Sentry.captureException(e)
        alert('No se pudo asignar al alumno')
      }
    }
  },
  computed: {
    turnos() {
      if (this.response && this.response.results) {
        return this.response.results.map(g => g.turno);
      }
      return [];
    },
    grados() {
      const grados = this.response.results.filter(
        r => r.turno == this.form.turno
      );
      if (grados.length) {
        return grados[0].grades;
      }
      return [];
    }
  },
  components: {
    HomeLayout
  }
};
</script>