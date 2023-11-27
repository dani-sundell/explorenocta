import { createRouter, createWebHashHistory } from 'vue-router'
import NoctaVista from '../views/NoctaVista.vue'
import NoctaWayfind from '../views/NoctaWayfind.vue'
import NoctaAbout from '../views/NoctaAbout.vue'
import NoctaMeta from '../views/NoctaMeta.vue'
import NoctaSplash from '../views/NoctaSplash.vue'
import NoctaIntro from '../views/NoctaIntro.vue'
import NoctaDisclaimer from '../views/NoctaDisclaimer.vue'
import NoctaCredits from '../views/NoctaCredits.vue'
import NoctaLighthouse from '../views/NoctaLighthouse.vue'
import NoctaTest from '../views/NoctaTest.vue'
import NoctaDemo from '../views/NoctaDemo.vue'
import NoctaDemoEnd from '../views/NoctaDemoThank.vue'
import NoctaTown from '../views/NoctaTown.vue'
import NoctaLake from '../views/NoctaLake.vue'
import NoctaWoods from '../views/NoctaWoods.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/", // default path
      name: "noctavista",
      component: NoctaTest,
      meta: {
        slogan: 'yes'
      }
    },
    {
      path: "/wayfind",
      name: "wayfind",
      component: NoctaWayfind,
      meta: {
        slogan: 'yes'
      }
    },
    {
      path: "/about",
      name: "about",
      component: NoctaAbout,
      meta: {
        slogan: 'no'
      }
    },
    {
      path: "/lighthouse",
      name: "lighthouse",
      component: NoctaLighthouse,
      meta: {
        slogan: 'no'
      }
    },
    {
      path: "/meta",
      name: "meta",
      component: NoctaMeta,
      meta: {
        slogan: 'no'
      }
    },
    {
      path: "/splash",
      name: "splash",
      component: NoctaSplash,
      meta: {
        slogan: 'no'
      }
    },
    {
      path: "/disclaimer",
      name: "disclaimer",
      component: NoctaDisclaimer,
      meta: {
        slogan: 'no'
      }
    },
    {
      path: "/intro",
      name: "intro",
      component: NoctaIntro,
      meta: {
        slogan: 'no'
      }
    },
    {
      path: "/credits",
      name: "credits",
      component: NoctaCredits,
      meta: {
        slogan: 'no'
      }
    },
    {
      path: "/test",
      name: "test",
      component: NoctaVista,
      meta: {
        slogan: 'yes'
      }
    },
    {
      path: "/demo",
      name: "demo",
      component: NoctaDemo,
      meta: {
        slogan: 'no'
      }
    },
    {
      path: "/thankyou",
      name: "thankyou",
      component: NoctaDemoEnd,
      meta: {
        slogan: 'no'
      }
    },
    {
      path: "/town",
      name: "town",
      component: NoctaTown,
      meta: {
        slogan: 'no'
      }
    },
    {
      path: "/woods",
      name: "woods",
      component: NoctaWoods,
      meta: {
        slogan: 'no'
      }
    },
    {
      path: "/lake",
      name: "lake",
      component: NoctaLake,
      meta: {
        slogan: 'no'
      }
    }
  ]
})

export default router
