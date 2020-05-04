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
        <h4 class="title is-4">Clases</h4>
        <h5 class="subtitle is-5">Aquí podrás ver los alumnos en las clases asignadas.</h5>

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
        <p class="content has-text-centered" v-if="!students.length">Seleccione un grado y sección.</p>
        <table class="table" v-if="students.length">
          <thead>
            <tr>
              <th>Nro.</th>
              <th>Apellidos y Nombres</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(student, index) in students"
              :key="student.lastname+student.lastname2+student.name"
            >
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
      }
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      this.response = await this.$store.dispatch("classrooms/loadClassrooms");
    },
    async onChangeGrado() {
      this.$router.push({
        name: "classroomstudents",
        params: {
          classroomId: this.form.grado
        }
      });
      /*const response = await this.$store.dispatch('classrooms/loadStudentsAssigned', { classroomId: this.form.grado })
      this.students = response.results*/
    }
  },
  computed: {
    turnos() {
      if (this.response && this.response.results) {
        return this.response && this.response.results ? this.response.results.map(g => g.turno) : []
      }
      return [];
    },
    grados() {
      const grados = this.response && this.response.results ? this.response.results.filter(
        r => r.turno == this.form.turno
      ) : []
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