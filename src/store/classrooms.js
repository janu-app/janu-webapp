const axios = require('axios')

export default {
  namespaced: true,
  state: {
    grades: null,
    students: null,
    classroom: null
  },
  getters: {
    data(state) {
      return state.grades ? state.grades : {};
    },
    students(state) {
      return state.students ? state.students : [];
    },
    classroom(state) {
      return state.classroom
    }
  },
  mutations: {
    setGradesData(state, data) {
      state.grades = data
    },
    setStudentData(state, data) {
      state.students = data
    },
    setClassroom(state, classroom) {
      state.classroom = classroom
    }
  },
  actions: {
    async loadClassroomInfo({ commit }) {
      const response = await axios.get('/classrooms')
      commit('setGradesData', response.data.results)
      return { results: response.data.results }
    },
    async loadStudents({ commit }, { classroomId }) {
      const response = await axios.get(`/classrooms/${classroomId}/students`)
      commit('setStudentData', response.data.results)
    },
    async setClassroom({ commit }, classroom) {
      commit('setClassroom', classroom)
    }
  }
}