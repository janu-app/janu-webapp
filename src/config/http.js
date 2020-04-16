import axios from 'axios'

axios.defaults.baseURL = {
    'development': 'http://localhost:3000',
    'staging': 'https://janu.yian.org.pe',
    'production': 'https://janu.yian.org.pe',
    //'production': 'https://api.janu.org.pe'
}[process.env.NODE_ENV || 'development']

export default axios