<template>
  <div id="app">
    <Loader v-if="getLoadingStatus"/>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loader from "@/components/Loader.vue"
export default {
  name: 'app',
  components: {
    Loader
  },
  computed: {
    ...mapGetters(['getLoadingStatus'])
  },
}
</script>

<style>
</style>
