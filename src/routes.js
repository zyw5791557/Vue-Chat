const Login = resolve => require(['./views/Login.vue'],resolve);
const Register = resolve => require(['./views/Register.vue'],resolve);
const Home = resolve => require(['./views/Home.vue'],resolve);
const NotFound = resolve => require(['./views/404.vue'],resolve);

let routes = [
    {
        path: '/home',
        component: Home,
        name: 'Home'
    },
    {
        path: '/',
        redirect: { path: '/home' }
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