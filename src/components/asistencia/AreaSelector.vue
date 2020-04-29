<template>
  <form style="margin-bottom: 20px;">
    <div class="field">
      <div class="field-body">
        <div class="field is-narrow">
          <label class="label is-small">Turno</label>
          <div class="control">
            <div class="select">
              <select v-model="form.turno" @change="onChangeTurno">
                <option value="">Seleccione Turno</option>
                <option v-for="turno in $store.getters['classrooms/data']" :value="turno.turno" :key="turno.turno">{{turno.turno}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field is-narrow">
          <label class="label is-small">Grado y Sección</label>
          <div class="control">
            <div class="select">
              <select v-model="form.grado" @change="onChangeGrado">
                <option value="">Seleccione Grado</option>
                <option v-for="seccion in grades" :value="seccion.classroomId" :key="seccion.classroomId">{{seccion.name}}</option>
              </select>
            </div>
          </div>
        </div>
        <!-- <div class="field is-narrow">
          <label class="label is-small">Area</label>
          <div class="control">
            <div class="select">
              <select v-model="form.area" @change="onChangeArea">
                <option value="">Seleccione Area</option>
                <option v-for="area in areas" :value="area.id" :key="area.id">{{area.name}}</option>
              </select>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        turno: "",
        grado: "",
        area: ""
      },
      classrooms: []
    }
  },
  async mounted() {
    this.classrooms = (await this.$store.dispatch('classrooms/loadClassroomInfo')).results
    if (this.$store.getters["classrooms/classroom"]) {
      this.form.turno = this.$store.getters["classrooms/classroom"].turno;
      this.form.grado = this.$store.getters["classrooms/classroom"].classroomId;
      if (this.form.grado) this.onChangeGrado()
    }
  },
  methods: {
    onChangeTurno() {
      this.form.grado = ''
      this.form.area = ''
      this.$emit('dirty', this.form)
    },
    onChangeGrado() {
      this.form.area = ''
      const turno = this.classrooms.filter(t => t.turno == this.form.turno)[0]
      if (turno && this.form.grado) {
        this.$emit('selected', Object.assign({}, this.form, turno.grades.filter(g => g.classroomId == this.form.grado)[0]))
      } else {
        this.$emit('dirty', this.form)
      }
    },
    // onChangeArea() {
    //   this.$emit('selected', this.form)
    // }
  },
  computed: {
    grades() {
      // console.log(this.$store.getters['classrooms/data'])
      let classroomData = this.classrooms
      let turno = {}
      if (classroomData) {
        turno = classroomData.filter(t => t.turno == this.form.turno)[0]
      }
      //const turno = this.$store.getters['me/me'].assignments.filter(t => t.id == this.form.turno)[0]
      return turno && turno.grades ? turno.grades : []
      //return []
    },
    // areas() {
    //   const turno = this.$store.getters['me/me'].assignments.filter(t => t.id === this.form.turno)[0]
    //   const grade = turno ? turno.grades.filter(g => g.id === this.form.grado)[0] : []
    //   return grade ? grade.areas : []
    // }
  }
};
</script>