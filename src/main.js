import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import mixins from '@/utils/mixins.js'
import i18n from "@/lang/index.js"

import './assets/styles/global.scss'
import './assets/styles/icon.scss'
import 'tailwindcss/tailwind.css'
import 'github-markdown-css/github-markdown.css'
import 'element-ui/lib/theme-chalk/index.css';

import { Dialog,Table,TableColumn,Button,Form,FormItem,Input } from 'element-ui';
Vue.use(Dialog)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)



Vue.config.productionTip = false

Vue.mixin(mixins)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
