import { ActionTree } from "vuex";
import jwtCode from "jwt-decode";
import { asyncRouterMap } from "../router";
import base from "@/common/public";

const actions: ActionTree<any, any> = {
  async setUser({ state, commit }, user: any) {
    const decoded: any = jwtCode(user);
    // console.log(decoded);
    commit("SET_USER", decoded);

    const { key } = decoded;
    commit("SET_ROUTERS", base.filterAsyncRouter(asyncRouterMap, key));
  }
};

export default actions;
