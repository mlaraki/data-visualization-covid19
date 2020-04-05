<template>
  <div>
    <div id="map" />
    <transition name="fade">
      <Tooltip
        v-if="countryStats"
        :countryStats="countryStats"
        :style="{left:tooltipPosition.x + 'px', top:tooltipPosition.y + 'px'}"
      />
    </transition>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import { HexagonLayer, HeatmapLayer } from "@deck.gl/aggregation-layers";
import { ScatterplotLayer } from "@deck.gl/layers";
import { MapboxLayer } from "@deck.gl/mapbox";
import Tooltip from "@/components/Tooltip";

export default {
  name: "MapView",
  props: ["layerType"],
  components: {
    Tooltip
  },
  data() {
    return {
      data: null,
      countryStats: null,
      tooltipPosition: null
    };
  },
  async created() {
    Mapbox.accessToken = process.env.VUE_APP_MAPBOX_TOKEN;
    this.map = null;
  },
  async mounted() {
    await this.fetchData();
    this.map = new Mapbox.Map({
      style: "mapbox://styles/mapbox/dark-v10?optimize=true",
      center: [2.3488, 48.8534],
      zoom: 3,
      pitch: 45,
      bearing: -17.6,
      container: "map",
      antialias: true
    });

    this.map.on("style.load", () => {
      let layer = this.getLayer(this.$props.layerType);
      this.map.addLayer(layer);
      this.$store.dispatch("setLoadingFalse");
    });
  },
  methods: {
    async fetchData() {
      try {
        let res = await fetch(
          "https://coronavirus-tracker-api.herokuapp.com/v2/locations",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
        let processed = await res.json();
        this.data = processed.locations;
        console.log("this.data", this.data);
      } catch (error) {
        console.log("error while fetching data", error.message);
      }
    },
    getLayer(type) {
      if (type == "HeatmapLayer") {
        return new MapboxLayer({
          id: "HeatmapLayer",
          type: HeatmapLayer,
          data: this.data,
          getPosition: el => [
            Number(el.coordinates.longitude),
            Number(el.coordinates.latitude)
          ],
          getWeight: el => el.latest.confirmed,
          radiusPixels: 100,
          threshold: 0.1,
          intensity: 30
        });
      } else if (type == "ScatterplotLayer") {
        return new MapboxLayer({
          id: "ScatterplotLayer",
          type: ScatterplotLayer,
          data: this.data,
          opacity: 0.8,
          filled: true,
          radiusMinPixels: 5,
          radiusMaxPixels: 200,
          radiusScale: 2,
          onHover: ({ object, x, y }) => {
            if (object) {
              if (object != this.countryStats) {
                this.countryStats = object;
                this.tooltipPosition = { x, y };
              }
            } else {
              setTimeout(() => {
                this.countryStats = null;
              }, 500);
            }
          },
          getRadius: el => el.latest.confirmed * 2,
          getPosition: el => [
            Number(el.coordinates.longitude),
            Number(el.coordinates.latitude)
          ],
          getFillColor: el => {
            switch (true) {
              case el.latest.confirmed <= 100:
                return [255, 255, 255, 50];
                break;
              case el.latest.confirmed <= 1000:
                return [255, 235, 59, 100];
                break;
              case el.latest.confirmed <= 10000:
                return [255, 140, 0, 100];
                break;
              case el.latest.confirmed > 10000:
                return [200, 0, 40, 150];
                break;
            }
          },
          pickable: true
        });
      } else if (type == "HexagonLayer") {
        return new MapboxLayer({
          id: "HexagonLayer",
          type: HexagonLayer,
          data: this.data,
          pickable: true,
          extruded: true,
          stoked: true,
          elevationScale: 1000,
          coverage: 0.88,
          radius: 150000,
          getElevationWeight: el => el.latest.confirmed * 100000,
          getPosition: el => [
            Number(el.coordinates.longitude),
            Number(el.coordinates.latitude)
          ],
          onHover: ({ object, x, y }) => {
            if (object) {
              if (object != this.countryStats) {
                this.countryStats = object.points[0];
                this.tooltipPosition = { x, y };
              }
            } else {
              setTimeout(() => {
                this.countryStats = null;
              }, 500);
            }
          },
          // onHover: ({ object, x, y }) => {
          //   if (object) {
          //     this.countryStats = object.points[0];
          //     this.tooltipPosition = { x, y };
          //   } else {
          //     this.countryStats = null;
          //   }
          // },
          getColorWeight: el => el.latest.confirmed,
          lowerPercentile: 10
        });
      }
    }
  },
  watch: {
    layerType: function(newVal, oldVal) {
      if (this.map.getLayer(oldVal)) {
        this.map.removeLayer(oldVal);
        this.map.addLayer(this.getLayer(newVal));
      }
    }
  }
};
</script>

<style scoped>
@import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";
#tooltip {
  position: absolute;
  top: 0px;
  left: 100px;
}
#map {
  width: 100vw;
  height: 100vh;
}

.mgl-map-wrapper {
  position: initial;
}
</style>
