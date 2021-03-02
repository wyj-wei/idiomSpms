export default {
  //判断类型
  OmTypeOf(val: any): any {
    let toStr = Object.prototype.toString;
    let res: any = {
      "[object Array]": "array",
      "[object Object]": "object",
      "[object Number]": "obj_number",
      "[object String]": "obj_string",
      "[object Boolean]": "obj_boolean",
      "[object Date]": "date",
      "[object RegExp]": "regexp"
    };
    let type = typeof val;
    if (val === null) {
      return "null";
    } else if (type === "object") {
      let ret = toStr.call(val);
      return res[ret];
    } else {
      return type;
    }
  },
  //获取query参数
  getQueryString(data: string): any {
    var reg = new RegExp("(^|&)" + data + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      var url = unescape(r[2]);
      var tok = url.indexOf("/");
      if (tok != -1) {
        return url.substring(0, tok);
      } else {
        return url;
      }
    }
    return null;
  },
  //
  hasPermission(roles: string, route: any): boolean {
    if (route.meta && route.meta.roles) {
      //meta.roles是否包含key值
      return route.meta.roles.some((role: string) => role.includes(roles));
    } else {
      return true;
    }
  },
  //
  filterAsyncRouter(asyncRouterMap: Array<any>, roles: string): object {
    return asyncRouterMap.filter((route: any) => {
      // console.log(route);
      if (this.hasPermission(roles, route)) {
        if (route.children && route.children.length) {
          route.children = this.filterAsyncRouter(route.children, roles);
        }
        return true;
      }
      return false;
    });
  }
};
