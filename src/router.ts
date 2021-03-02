import Vue from "vue";
import Router from "vue-router";
import Layout from "./views/Layout/index.vue";
import jwt from "jwt-decode";
import base from "@/common/public";

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location: any) {
  return (originalPush as any).call(this, location).catch((err: any) => {
    return err;
  });
};

Vue.use(Router);

/**
 * hidden:true  是否显示
 * name:"" 路由名称 *
 * meta：{
 * title 对应路由左侧菜单栏的标题名称
 * icon 对应路由在左侧菜单栏的图标样式
 * }
 */

export const asyncRouterMap: any = [
  {
    path: "/",
    name: "dashbord",
    component: Layout,
    hidden: true,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        meta: { title: "首页", icon: "fa fa-home" },
        component: () => import("@/views/Home.vue")
      }
    ]
  },
  {
    path: "/dataManage",
    name: "dataManage",
    hidden: true,
    meta: { title: "数据管理", icon: "fa fa-database" },
    component: Layout,
    redirect: "/tableData",
    children: [
      {
        path: "/tableData",
        name: "tableData",
        meta: { title: "表格管理", icon: "fa fa-table" },
        component: () => import("@/views/dataManage/tableData.vue")
      },
      {
        path: "/chartsData",
        name: "chartsData",
        meta: {
          title: "图表管理",
          icon: "fa fa-bar-chart",
          roles: ["admin", "editor"]
        },
        component: () => import("@/views/dataManage/chartsData.vue")
      },
      {
        path: "/formData",
        name: "formData",
        meta: { title: "表单管理", icon: "fa fa-file-text-o" },
        component: () => import("@/views/dataManage/formData.vue")
      }
    ]
  },
  {
    path: "/userManage",
    name: "userManage",
    component: Layout,
    hidden: true,
    redirect: "/accountData",
    children: [
      {
        path: "/accountData",
        name: "accountData",
        meta: { title: "账户管理", icon: "fa fa-user-plus", roles: ["admin"] },
        component: () => import("@/views/userManage/accountData.vue")
      }
    ]
  },
  {
    path: "/userInfo",
    component: Layout,
    hidden: false,
    redirect: "/userInfo",
    children: [
      {
        path: "/userInfo",
        name: "userInfo",
        meta: { title: "个人中心", icon: "fa fa-user-plus" },
        component: () => import("@/views/userManage/userInfo.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    hidden: false,
    meta: { title: "系统登录" },
    component: () => import("@/views/Login/Login.vue") //按需加载
  },
  {
    path: "/password",
    name: "password",
    hidden: false,
    meta: { title: "找回密码" },
    component: () => import("@/views/Login/Password.vue")
  },
  {
    path: "/404",
    name: "404",
    hidden: false,
    meta: { title: "404" },
    component: () => import("@/views/404.vue")
  },
  {
    path: "*",
    redirect: "./404"
  }
];

const router: any = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: asyncRouterMap
});

router.beforeEach((to: any, from: any, next: any) => {
  const isLogin = localStorage.spmsToken ? true : false; //是否登录
  if (to.path == "/login" || to.path == "/password") {
    next();
  } else {
    if (isLogin) {
      const decode: any = jwt(localStorage.spmsToken);
      const { key } = decode;
      if (base.hasPermission(key, to)) {
        next();
      } else {
        next("/404"); //无权访问进入
      }
    } else {
      next("/login");
    }
  }
});

router.afterEach((to: any, from: any) => {});
export default router;
