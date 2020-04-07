import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    countryCode: null,
    covidStats: null,
    latest: null,
    statsByLocation : null
  },
  mutations: {
    setLoading(state, status){
      state.loading = status;
    },
    setCountryCode(state, countryCode) {
      state.countryCode = countryCode;
    },
    setLatest(state, latest) {
      state.latest = latest;
    },
    setStatsByLocation(state, stats) {
      state.statsByLocation = stats;
    }
  },
  actions: {
    setLoadingFalse(ctx) {
      ctx.commit("setLoading", false);
    },
    setCountryCode(ctx, countryCode) {
      ctx.commit("setCountryCode", countryCode);
    },
    setLatest(ctx, latest) {
      ctx.commit("setLatest", latest);
    },
    setStatsByLocation(ctx, stats) {
      ctx.commit("setStatsByLocation", stats);
    },
    
  },
  getters: {
    getLoadingStatus: state => state.loading,
    getLatest: state => state.latest,
    getStatsByLocation: state => state.statsByLocation
  },
  modules: {}
});
