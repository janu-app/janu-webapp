import Sesiones from './Sesiones.vue'
import AsistenciaVirtual from './AsistenciaVirtual.vue'
import NewAsistenciaVirtual from './NewAsistenciaVirtual.vue'

const routes= [
    {
        name: 'sesionesaprendoencasa',
        path: '/sesiones/aprendo-en-casa',
        component: Sesiones
    },
    {
        name: 'sesionesaprendoencasaform',
        path: '/sesiones/aprendo-en-casa/edit/:sessionId',
        component: AsistenciaVirtual
    },
    {
        name: 'newsesionesaprendoencasaform',
        path: '/sesiones/aprendo-en-casa/new',
        component: NewAsistenciaVirtual
    }
]

export default routes