import Vue from 'vue'
import App from './App.vue'
import { Button, Radio } from 'element-ui'
import { Container, Main, Header, Aside } from 'element-ui'
import { Menu, Submenu, MenuItem, MenuItemGroup } from 'element-ui'
import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui'
import { Row, Card, Col } from 'element-ui'
import { Table, TableColumn } from 'element-ui'
import { Breadcrumb, BreadcrumbItem } from 'element-ui'
import { Tag } from 'element-ui'
import { Dialog } from 'element-ui'
import { Form, FormItem } from 'element-ui'
import { Input, Select, Option, DatePicker } from 'element-ui'
import { Pagination } from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import router from '../router'
import store from '../store'
import http from 'axios'
import '../api/mock.js'
import Cookie from 'js-cookie'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Radio)

Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)

Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)

Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)

Vue.use(Row)
Vue.use(Card)
Vue.use(Col)

Vue.use(Table)
Vue.use(TableColumn)

Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)

Vue.use(Tag)

Vue.use(Dialog)

Vue.use(Form)
Vue.use(FormItem)

Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)

Vue.use(Pagination)

Vue.prototype.$http = http

router.beforeEach((to, from, next) => {
  const token = Cookie.get("token");
  if (!token && to.name !== "login") {
    next({ name: "login" })
  } else if (token && to.name === "login") {
    next({ name: "home" })
  } else {
    next()
  }
})

new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    store.commit("addMenu", router)
  }
}).$mount('#app')
