import Classrooms from './Classrooms.vue'
import ClassroomStudents from './ClassroomStudents.vue'
import JoinStudent from './JoinStudent.vue'

const routes= [
    {
        name: 'classroomsearch',
        path: '/classrooms',
        component: Classrooms
    },
    {
        name: 'classroomstudents',
        path: '/classrooms/:classroomId/students',
        component: ClassroomStudents
    },
    {
        name: 'classroomstudentsjoin',
        path: '/classrooms/:classroomId/students/join',
        component: JoinStudent
    },
]

export default routes