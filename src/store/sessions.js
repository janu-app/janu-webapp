const axios = require('axios')

export default {
  namespaced: true,
  state: {
    sessions: null
  },
  getters: {
    sessions(state) {
      return state.sessions ? state.sessions : [];
    },
    numbers() {
      return ['PRIMERA', 'SEGUNDA', 'TERCERA', 'CUARTA', 'QUINTA', 'SEXTA', 'SEPTIMA', 'OCTAVA', 'NOVENA', 'DÉCIMA']
      //return ['SEGUNDA', 'TERCERA', 'CUARTA', 'QUINTA', 'SEXTA', 'SEPTIMA', 'OCTAVA', 'NOVENA', 'DÉCIMA']
    }
  },
  mutations: {
    setSessionInformation(state, sessions) {
      state.sessions = sessions
    }
  },
  actions: {
    async loadSessions(ignore, { classroomId }) {
      const response = await axios.get('/sessions', {
        params: {
          classroomId
        }
      })
      return response.data.results
    },
    async loadSessionsReportData(store, params) {
      const response = await axios.get('/sessions/report', { params })
      return response.data.results
    },
    async loadSession(obj, { sessionId }) {
      const response = await axios.get(`/sessions/${sessionId}`)
      return response.data
    },
    async create(data, session) {
      const response = await axios.post('/sessions', session)
      return response.data
      //commit('setSessionInformation', Object.assign(data, { turno, grado, area }))
    },
    async update(data, { sessionId, ...session}) {
      const response = await axios.put(`/sessions/${sessionId}`, session)
      return response.data
      //commit('setSessionInformation', Object.assign(data, { turno, grado, area }))
    },
    async updateSessionDetail(obj, { sessionId, ...details}) {
      const response = await axios.put(`/sessions/${sessionId}/detail/${details.id}`, details)
      return response.data
    }
  }
}