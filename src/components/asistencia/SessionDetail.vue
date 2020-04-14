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
        <input class="input is-small" v-model="student.optional_resources" @change="onChange" />
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
        <input class="input is-small" v-model="student.optional_meeting_via" @change="onChange" />
      </div>
    </td>
    <td>
      <div class="control">
        <input class="input is-small" v-model="student.optional_date" @change="onChange" />
      </div>
    </td>
    <td>
      <div class="control">
        <input class="input is-small" v-model="student.optional_theme" @change="onChange" />
      </div>
    </td>
    <td>
      <div class="control">
        <input class="input is-small" v-model="student.comments" @change="onChange" />
      </div>
    </td>
  </tr>
</template>
<script>
export default {
  props: ['studentDetails', 'index'],
  data() {
    return {
      student: {}
    }
  },
  mounted() {
    this.student = this.studentDetails
  },
  methods: {
    async onChange() {
      await this.$store.dispatch("sessions/updateSessionDetail", {
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
        optional_date: this.student.optional_date,
        optional_theme: this.student.optional_theme,
        comments: this.student.comments
      })
    }
  }
};
</script>

<style lang="sass" scoped>
tr td
  text-align: center !important
</style>