import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

/**
 * Las rutas de la aplicación. Cada ruta define un componente que se carga cuando se visita una URL específica.
 * @type {Array}
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: () => import(/* webpackChunkName: "changePassword" */ '../views/ChangePassword.vue')
  },
  {
    path: '/registerplayers',
    name: 'RegisterPlayers',
    component: () => import(/* webpackChunkName: "registerPlayers" */ '../views/RegisterPlayers.vue')
  },
  {
    path: '/verifyEmail',
    name: 'VerifyEmail',
    component: () => import(/* webpackChunkName: "verifyEmail" */ '../views/VerifyEmail.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: { name: 'Statistics' },
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    children: [
      {
        path: '/plantilla',
        name: 'ListPantilla',
        component: () => import(/* webpackChunkName: "team" */ '../views/Team.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/players/:id',
        name: 'Players',
        component: () => import(/* webpackChunkName: "players" */ '../views/Players.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/statistics',
        name: 'Statistics',
        component: () => import(/* webpackChunkName: "statistics" */ '../views/Statistics.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/calendar',
        name: 'Calendar',
        component: () => import(/* webpackChunkName: "calendar" */ '../views/Calendar.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/board',
        name: 'Board',
        component: () => import(/* webpackChunkName: "board" */ '../views/Board.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/chat',
        name: 'Chat',
        component: () => import(/* webpackChunkName: "chat" */ '../views/Chat.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/game',
        name: 'Game',
        component: () => import(/* webpackChunkName: "game" */ '../views/Games.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/game/:id',
        name: 'GamesStatistics',
        component: () => import(/* webpackChunkName: "gamesStatistics" */ '../views/GamesStatistics.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/training',
        name: 'Training',
        component: () => import(/* webpackChunkName: "training" */ '../views/Training.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/generatelink',
        name: 'GenerateLink',
        component: () => import(/* webpackChunkName: "generateLink" */ '../views/GenerateLink.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/perfil',
        name: 'Perfil',
        component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
];

/**
 * Instancia de VueRouter que contiene todas las rutas de la aplicación.
 * @type {VueRouter}
 */
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

/**
 * Middleware de navegación global. Se ejecuta antes de cada cambio de ruta.
 * Verifica si la ruta requiere autenticación y si el usuario está autenticado.
 * @param {Object} to - La ruta a la que se intenta navegar.
 * @param {Object} from - La ruta desde la que se navega.
 * @param {Function} next - Función que determina la continuación o cancelación de la navegación.
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('userToken');
    console.log(token);

    if (!token) {
      next({
        path: '/login'
      });
    } else {
      next();
    }
  } else {
    console.log("Me voy, no requiere autenticacion");
    next();
  }
});

export default router;
