const Login = resolve => require(['./views/Login.vue'],resolve);
const Register = resolve => require(['./views/Register.vue'],resolve);
const Chatroom = resolve => require(['./views/Chatroom.vue'],resolve);
const NotFound = resolve => require(['./views/404.vue'],resolve);

let routes = [
    {
        path: '/chatroom',
        component: Chatroom,
        name: 'Chatroom'
    },
    {
        path: '/',
        redirect: { path: '/chatroom' }
    },
    {
        path: '/login',
        component: Login,
        name: 'Login'
    },
    {
        path: '/register',
        component: Register,
        name: 'Register'
    },
    {
        path: '/404',
        component: NotFound,
    },
    {
        path: '*',
        component: NotFound,
    }
];

export default routes;