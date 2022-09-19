import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import XYView from '../views/XYView.vue'
import NoHelloView from '../views/NoHelloView.vue'
import NoPvView from '../views/NoPvView.vue'
import NoCodeView from '../views/NoCodeView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: { 
            title: 'نپرس که بپرسم، فقط بپرس',
            accent: '#EC407A',
            gradient: 'linear-gradient(215deg, #F48FB1 0%, #C2185B 100%)',
        }
    },
    {
        path: '/xy',
        name: 'xy',
        component: XYView,
        meta: { 
            title: 'مسئله فلان و بهمان',
            accent: '#9C27B0',
            gradient: 'linear-gradient(215deg, #CE93D8 0%, #4A148C 100%)',
        }
    },
    {
        path: '/nohello',
        name: 'nohello',
        component: NoHelloView,
        meta: { 
            title: 'سلام، بی‌سلام',
            accent: '#03A9F4',
            gradient: 'linear-gradient(215deg, #81D4FA 0%, #01579B 100%)',
        }
    },
    {
        path: '/nopv',
        name: 'nopv',
        component: NoPvView,
        meta: { 
            title: 'خصوصی سوال نکنید',
            accent: '#FF9800',
            gradient: 'linear-gradient(215deg, #FFCC80 0%, #E65100 100%)',
        }
    },
    {
        path: '/nocode',
        name: 'nocode',
        component: NoCodeView,
        meta: { 
            title: 'کُدِت رو بذار!',
            accent: '#009f7b', 
            gradient: 'linear-gradient(45deg, hsla(190,100%,28.4%,1) 0%, hsla(162,100%,73.5%,1) 100%);',
        }
    },
    {
        path: '/xyproblem',
        redirect: '/xy',
    },
    {
        path: '/:any(.*)',
        redirect: '/',
    }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.afterEach((to) => {

    let title = to.meta.title || '';

    document.title = title.length > 0 ? title : 'نپرس که بپرسم، فقط بپرس';

});

export default router