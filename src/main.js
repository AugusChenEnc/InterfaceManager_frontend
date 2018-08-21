import Vue from 'vue'
import App from './App'
import i18n from './lang'
import router from './router'
import store from './store'
import moment from 'moment'
import ElementUI from 'element-ui'

import {global} from './config/global'

//导入这个解决兼容问题 IE  polyfill [代码填充，兼容性补丁]
import 'babel-polyfill'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'

import '../static/plugins/jstree/themes/default/style.min.css'
import '../static/plugins/jstree/jstree.js'

Vue.prototype.$moment = moment;
Vue.config.productionTip = false
Vue.use(ElementUI)

//加载国际化
Vue.use(ElementUI,{
  i18n:(key,value) =>i18n.t(key,value)
});

//加载用户主题
global.changeTheme(localStorage.themeValue? localStorage.themeValue : '2A598B');


//路由前置钩子
router.beforeEach((to, from, next) => {

  const token = localStorage.token;
  if (to.path === '/login') {
    delete localStorage.token;
    store.dispatch('removeVisitedViewsAll');
  }

  if ((!token || typeof(token) == 'undefined') && to.path != '/login') {
      next({ path: '/login'})
      window.document.title = i18n.t('menu.login');
  } else {
      window.document.title = i18n.t(to.meta.title);
      next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
