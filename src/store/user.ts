import { StoreOptions } from "vuex";
import AccessEnum from "@/access/accessEnum";
import { getCurrentUser } from "@/api/services/user";
export default {
  namespaced: true,
  state: {
    loginUser: { name: "未登录" },
  },
  getters: {},
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
  actions: {
    async getLoginUser({ commit, state }, payload) {
      const res = await getCurrentUser();
      if (res.data.code === 200) {
        commit("updateUser", res.data.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          role: AccessEnum.NOT_LOGIN,
        });
      }
    },
  },
} as StoreOptions<any>;
