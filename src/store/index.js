import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    covidStats: null,
    latest: null,
    statsByLocation : null
  },
  mutations: {
    setLoading(state, status){
      state.loading = status;
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
