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
              <a href="#">Salones</a>
            </li>
          </ul>
        </nav>

        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <div class="field">
          <div class="field-body">
            <div class="field is-narrow">
              <label class="label is-small">Turno</label>
              <div class="control">
                <div class="select">
                  <select v-model="form.turno">
                    <option v-for="turno in turnos" :key="turno" :value="turno">{{turno}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field is-narrow">
              <label class="label is-small">Grado y Sección</label>
              <div class="control">
                <div class="select">
                  <select v-model="form.grado" @change="onChangeGrado">
                    <option
                      v-for="grado in grados"
                      :key="grado.classroomId"
                      :value="grado.classroomId"
                    >{{grado.name}}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <router-link v-if="$store.getters['me/me'].permissions.salones.asignar" class="button is-primary" :to="{name: 'classroomstudentsjoin', params: $route.params }">Nuevo</router-link>
            </div>
          </div>
        </div>

        <p class="content has-text-centered" v-if="!students.length">Seleccione un grado y sección.</p>
        <table class="table is-fullwidth" v-if="students.length">
          <thead>
            <tr>
              <th style="width: 20px">Nro.</th>
              <th>Apellidos y Nombres</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in students" 
              :key="student.lastname+student.lastname2+student.name" >
              <td>{{index+1}}</td>
              <td>{{student.lastname}} {{student.lastname2}}, {{student.name}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </home-layout>
</template>

<script>
import HomeLayout from "../layout/HomeLayout.vue";

export default {
  data() {
    return {
      response: {},
      students: [],
      form: {
        turno: "",
        grado: ""
      },
    }
  },
  async mounted() {
    this.response = await this.$store.dispatch("classrooms/loadClassrooms");
    const grades = this.response.results.map(r => r.grades).reduce((p, g) => p.concat(g), []).filter(g => g.classroomId == this.$route.params.classroomId)
    if (grades.length) {
      this.form.turno = grades[0].turno
      this.form.grado = grades[0].classroomId
    }
    this.loadStudents()
  },
  methods: {
    async onChangeGrado() {
      this.$router.push({
        name: "classroomstudents",
        params: {
          classroomId: this.form.grado
        }
      })
      this.loadStudents()
    },
    async loadStudents() {
      const response = await this.$store.dispatch('classrooms/loadStudentsAssigned', this.$route.params)
      this.students = response.results
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
  },
}
</script>