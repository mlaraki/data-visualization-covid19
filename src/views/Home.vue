<template>
  <div class="home">
    <MapView :layerType="layerType" />
    <div id="dashboard" v-show="!getLoadingStatus">
      <el-menu class="dashboard-menu el-menu-vertical" :collapse="true" background-color="#313742">
        <el-menu-item index="1" @click="displayStats = true">
          <img src="../assets/stats.svg" alt="open stats" width="30px" />
          <span slot="title">Stats</span>
        </el-menu-item>
      </el-menu>

      <el-menu
        class="dashboard-layers el-menu"
        mode="horizontal"
        background-color="#313742"
        default-active="1"
      >
        <el-menu-item index="1" @click="layerType = 'HexagonLayer'">
          <img src="../assets/hexagone.svg" alt="layer Hexagon" width="30px" />
          <span slot="title"></span>
        </el-menu-item>
        <el-menu-item index="2" @click="layerType = 'HeatmapLayer'">
          <img src="../assets/heatmap.svg" alt="layer heatmap" width="30px" />
          <span slot="title"></span>
        </el-menu-item>
        <el-menu-item index="3" @click="layerType = 'ScatterplotLayer'">
          <img src="../assets/scatter.svg" alt="layer scattterplot" width="30px" />
          <span slot="title"></span>
        </el-menu-item>
      </el-menu>

      <div id="dashboard-stats">
        <el-drawer title="Stats" :visible.sync="displayStats" direction="rtl">
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="Worldwide" name="1">
              <Stats />
            </el-collapse-item>
            <el-collapse-item title="Country" name="2">
              <CountryStats />
            </el-collapse-item>
          </el-collapse>
        </el-drawer>
      </div>
    </div>
  </div>
</template>

<script>
import MapView from "@/components/MapView.vue";
import Stats from "@/components/Stats.vue";
import CountryStats from "@/components/CountryStats.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    MapView,
    Stats,
    CountryStats
  },
  data() {
    return {
      displayStats: false,
      activeName: "1",
      layerType: "HexagonLayer",
      url : process.env.VUE_APP_BACKUP_API_URL
    };
  },
  async created() {
    this.fetchData();
  },
  computed: {
    ...mapGetters(["getLoadingStatus"])
  },
  methods: {
    async fetchData() {
      try {
        let res = await fetch(
          this.url,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
        let data = await res.json();
        this.$store.dispatch("setLatest", JSON.parse(data.latest));
        this.$store.dispatch("setStatsByLocation", JSON.parse(data.locations));
      } catch (error) {
        console.log("error while fetching data", error.message);
      }
    }
  }
};
</script>
<style lang="css" scoped>
.dashboard-menu {
  position: absolute;
  bottom: 61px;
  left: 0px;
}
.dashboard-layers {
  position: absolute;
  bottom: 0px;
  left: 0px;
}

#dashboard-stats {
  font-family: Inter, sans-serif;
  margin: 0;
  padding: 0;
}
</style>
<style lang="css">
:focus {
  outline: none !important;
}

.el-menu {
	border: solid 1px #e6e6e652 !important;
}

.el-menu--collapse {
	width: 68px !important;
}

#dashboard-stats > div > div > div {
  font-family: Inter, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #313742;
}

.el-drawer__header {
  text-align: center;
  color: white !important;
}
.el-collapse-item__header {
  background-color: #313742 !important;
  font-family: Inter, sans-serif;
  color: white !important;
}
.el-collapse-item {
  background-color: #313742;
  font-family: Inter, sans-serif;
  color: white !important;
}

.el-collapse-item__wrap {
  background-color: #313742 !important;
  color: white;
}
#dashboard > ul > li:nth-child(1) > div {
  padding: 0px 18px;
}

#dashboard > ul > li:nth-child(2) > div {
  padding: 0px 16px;
}

.mapboxgl-ctrl-bottom-right {
  display: none;
}
.mapboxgl-ctrl-bottom-left {
  display: none;
}
</style>