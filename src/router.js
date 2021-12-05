import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path) {
    return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: 'history',
    routes: [

        {//login admin
            path: '/admin',
            name: 'Admin',
            meta: { title: 'Admin' },
            component: importComponent('Admin Page/AdminLogin'),
        },

        {//logout
            path: '/logout',
            name: 'Logout',
            meta: { title: 'Logout'},
            component: importComponent('Logout'),
        },

        {//admin
            path: '/dashboardadmin',
            name: 'DashboardAdmin',
            meta: { title: 'DashboardAdmin'},
            component: importComponent('Admin Page/DashboardAdmin'),
            children: [

                {
                    path: '/user',
                    name: 'User',
                    meta: { title: 'Users'},
                    component: importComponent('DataMaster/Users'),
                },

                {
                    path: '/kamar',
                    name: 'Kamar',
                    meta: { title: 'Kamars'},
                    component: importComponent('DataMaster/Kamars'),
                },

                {
                    path: '/note',
                    name: 'Note',
                    meta: { title: 'Notes' },
                    component: importComponent('DataMaster/Notes'),
                }
            ],
        },

        {//landing page
            path: '/',
            name: 'DashboardLanding',
            meta: { title: 'DashboardLanding' },
            component: importComponent('Landing Page/DashboardLanding'),
            children: [

                {
                    path: '/register',
                    name: 'Register',
                    meta: { title: 'Register' },
                    component: importComponent('Landing Page/Register'),
                },
        
                {
                    path: '/userlogin',
                    name: 'UserLogin',
                    meta: { title: 'UserLogin' },
                    component: importComponent('Landing Page/UserLogin'),
                },
            ]
        },

        {//home
            path: '/dashboardhome',
            name: 'DashboardHome',
            meta: { title: 'DashboardHome' },
            component: importComponent('Home/DashboardHome'),
            children: [
                {
                    path: '/home',
                    name: 'Home',
                    meta: { title: 'Home' },
                    component: importComponent('Home/Home'),
                },

                {
                    path: '/aboutus',
                    name: 'AboutUs',
                    meta: { title: 'AboutUs' },
                    component: importComponent('Home/AboutUs'),
                },

                {
                    path: '/listkamar',
                    name: 'ListKamar',
                    meta: { title: 'ListKamar' },
                    component: importComponent('Home/ListKamar'),
                },

                {
                    path: '/profile',
                    name: 'Profile',
                    meta: { title: 'Profile' },
                    component: importComponent('Home/Profile'),
                },
            ]
        },

        {
            path: '*',
            redirect: '/'
        },
    ],
});

//Set Judul
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});

export default router;