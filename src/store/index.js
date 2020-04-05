import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    countryCode: null,
    covidStats: null
  },
  mutations: {
    setLoading(state, status){
      state.loading = status;
    },
    setCountryCode(state, countryCode) {
      state.countryCode = countryCode;
    }
  },
  actions: {
    setLoadingFalse(ctx) {
      ctx.commit("setLoading", false);
    },
    setCountryCode(ctx, countryCode) {
      ctx.commit("setCountryCode", countryCode);
    }
  },
  getters: {
    getLoadingStatus: state => {
        return state.loading;
    },
    globalStats: state => {
      if(state.covidStats)
        return state.covidStats.latest;
    }
  },
  modules: {}
});
