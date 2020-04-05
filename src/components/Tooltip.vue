<template>
  <transition name="fade">
  <div id="tooltip" class="tooltip">
    <el-card
      shadow="always"
      style="background-color: #313742; color: white; border: 1px solid #313642;"
    >
      <div slot="header" class="clearfix">
        <div class="popup-header">
          <div class="text-area">
            <h4>{{countryStats.country}}</h4>
          </div>
        </div>
      </div>
      <div class="content-area">
        <div class="content-item">
          <h4>Confirmed</h4>
          <span>{{countryStats.latest.confirmed}}</span>
        </div>
        <div class="content-item">
          <h4>Deaths</h4>
          <span>{{countryStats.latest.deaths}}</span>
        </div>
      </div>
    </el-card>
  </div>
  </transition>
</template>

<script>
export default {
  name: "Tooltip",
  props: ["countryStats"],
  data() {
    return {
      data: null,
      position: null
    };
  },
  created() {
    this.data = this.$props.countryStats;
  },
  watch: {
    countryStats: function(val) {
      this.data = val;
    }
  }
};
</script>

<style lang="css">
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}
.fade-leave-to {
  opacity: 0;
}

.el-card__body {
  padding: 0px !important;
}
.el-card__header {
  padding: 0px !important;
}
.popup-header {
  padding: 0px !important;
  text-align: center;
}
.text-area {
  display: block;
  margin: auto !important;
}
</style>
<style lang="scss" scoped>
#tooltip > div > div.el-card__body > div > div {
  padding: 5px;
}
h4 {
  margin: 10px;
}
.tooltip {
  position: absolute;
  width: 200px;
  background-color: #313742;
  box-shadow: 0 15px 15px #1c203b3b;
  border-radius: 5px;
  .popup-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #313742;
    padding: 10px;
    border-radius: 5px 5px 0 0;
    .header-icon {
      padding: 10px;
      background-color: #313742;
      border-radius: 50%;
    }
    .text-area {
      margin: 0 10px;
      overflow: hidden;
      h4 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      span {
        opacity: 0.5;
      }
    }
  }
  .content-area {
    display: flex;
    flex-direction: column;
    .content-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
      &:nth-child(odd) {
        background: #0f1b3133;
      }
      &:last-child {
        border-radius: 0 0 5px 5px;
      }
    }
  }
}
</style>