<template>
  <div id="stats">
    <el-row v-for="(stats, name, i) in getLatest" :key="name">
      <el-col :span="12">
        <div class="grid-content">
          <h3>
            <img
              :src="require(`../assets/${img[i]}.svg`)"
              :alt="name"
              width="20px"
              style="vertical-align: sub"
            />  {{name}} :
          </h3>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content">
          <h4>{{stats}}</h4>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Stats",
  data() {
    return {
      img : ['virus', 'skull', 'healthy']
    }
  },
  computed: {
    ...mapGetters(['getLatest'])
  },
};
</script>

<style scoped>
#stats {
  color: white;
}
</style>