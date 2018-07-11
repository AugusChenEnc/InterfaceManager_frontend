import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//create router Object
const routes = [
    
    //loader router
    { path: '', component: () => import('@/views/Layout'), redirect: 'home' , meta: { bthidden: true } ,
        children:[
            { path: 'home', name: 'Home', component: () => import('@/views/Home'), meta: { title: 'menu.home', icon: 'el-icon-location' } },
            
            //project
            { path: 'project/projectManager', name: 'projectManager', component:() => import('@/views/ProjectManager'), meta: { title: 'menu.projectManager', icon: 'el-icon-menu' }}
        ]
    },
    //no loader router
    { path: '/login', name: 'Login', hidden: true, component: () => import('@/views/Login') , meta: { title: 'menu.login'}}, 
    { path: '*', name: 'NotFound', hidden: true, component: () => import('@/views/Common/NotFound') , meta: { title: 'menu.error'}}
]

// Instance router objects 
const router = new VueRouter({
  mode:'hash',
  base:__dirname,
  routes
})

export default router