<template>
  <tr>
    <th>{{index+1}}</th>
    <td style="text-align: left !important;">{{student.student_lastname}} {{student.student_lastname2}} {{student.student_name}}</td>
    <td>
      <div class="select is-small">
        <select v-model="student.participated" @change="onChange">
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      </div>
    </td>
    <td>
      <div class="select is-small">
        <select v-model="student.web" @change="onChange">
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      </div>
    </td>
    <td>
      <div class="select is-small">
        <select v-model="student.tv" @change="onChange">
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      </div>
    </td>
    <td>
      <div class="select is-small">
        <select v-model="student.radio" @change="onChange">
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      </div>
    </td>
    <td>
      <div class="select is-small">
        <select v-model="student.homework" @change="onChange">
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      </div>
    </td>
    <td>
      <div class="select is-small">
        <select v-model="student.optional_homework" @change="onChange">
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      </div>
    </td>
    <td>
      <div class="control">
        <input class="input is-small" v-model="student.optional_resources" @change="onChange" maxlength="255" />
      </div>
    </td>
    <td>
      <div class="select is-small">
        <select v-model="student.optional_meeting" @change="onChange">
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      </div>
    </td>
    <td>
      <div class="control">
        <input class="input is-small" v-model="student.optional_meeting_via" @change="onChange" maxlength="255" />
      </div>
    </td>
    <td>
      <div class="control">
        <input class="input is-small" v-model="student.optional_date" @change="onChange" v-mask="'##/##/####'" />
      </div>
    </td>
    <td>
      <div class="control">
        <input class="input is-small" v-model="student.optional_theme" @change="onChange"  maxlength="255" />
      </div>
    </td>
    <td>
      <div class="control">
        <input class="input is-small" v-model="student.comments" @change="onChange" maxlength="255" />
      </div>
    </td>
  </tr>
</template>
<script>
import moment from 'moment'
import {mask} from 'vue-the-mask'

export default {
  props: ['studentDetails', 'index'],
  data() {
    return {
      student: {}
    }
  },
  mounted() {
    this.student = this.studentDetails
    this.student.optional_date = moment(this.student.optional_date).format("DD/MM/YYYY")
  },
  methods: {
    async onChange() {
      const data = {
        id: this.student.detail_id,
        sessionId: this.student.session_id,
        participated: this.student.participated,
        web: this.student.web,
        tv: this.student.tv,
        radio: this.student.radio,
        homework: this.student.homework,
        optional_homework: this.student.optional_homework,
        optional_resources: this.student.optional_resources,
        optional_meeting: this.student.optional_meeting,
        optional_meeting_via: this.student.optional_meeting_via,
        optional_theme: this.student.optional_theme,
        comments: this.student.comments
      }
      if (this.student.optional_date) {
        if (!moment(this.student.optional_date, "DD/MM/YYYY").isValid()) {
          alert('Fecha no válida')
        } else {
          data.optional_date = moment(this.student.optional_date, "DD/MM/YYYY").format()
        }
      }
      await this.$store.dispatch("sessions/updateSessionDetail", data)
    }
  },
  directives: {mask}
};
</script>

<style lang="sass" scoped>
tr td
  text-align: center !important
</style>