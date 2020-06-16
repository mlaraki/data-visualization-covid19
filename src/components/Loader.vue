<template>
  <div id="loader">
    <div class="loading-container">
      <div id="gearAssembly">
        <div class="sgear">
          <div v-for="i in 12" :key="i" class="tooth"></div>
        </div>
        <div id="gearHub">
          <div class="chainGear">
            <div v-for="i in 16" :key="i" class="t"></div>
            <div class="arm" id="a1"></div>
            <div class="arm" id="a2"></div>
            <div class="arm" id="a3"></div>
          </div>
          <div class="idler" id="idler1">
            <div class="mgear">
              <div v-for="i in 24" :key="i" class="tooth"></div>
              <div class="arm" id="arm1"></div>
              <div class="arm" id="arm2"></div>
              <div class="arm" id="arm3"></div>
            </div>
          </div>
          <div class="idler" id="idler2">
            <div class="mgear">
              <div v-for="i in 24" :key="i" class="tooth"></div>
              <div class="arm" id="arm1"></div>
              <div class="arm" id="arm2"></div>
              <div class="arm" id="arm3"></div>
            </div>
          </div>
          <div class="idler" id="idler3">
            <div class="mgear">
              <div v-for="i in 24" :key="i" class="tooth"></div>
              <div class="arm" id="arm1"></div>
              <div class="arm" id="arm2"></div>
              <div class="arm" id="arm3"></div>
            </div>
          </div>
        </div>
        <div class="lgear">
          <div v-for="i in 60" :key="i" class="tooth"></div>
          <div class="bolt" id="bolt1"></div>
          <div class="bolt" id="bolt2"></div>
          <div class="bolt" id="bolt3"></div>
          <div class="bolt" id="bolt4"></div>
          <div class="bolt" id="bolt5"></div>
        </div>
        <div class="chainGearOutput">
          <div v-for="i in 16" :key="i" class="t"></div>
          <div class="arm" id="a1"></div>
          <div class="arm" id="a2"></div>
          <div class="arm" id="a3"></div>
        </div>
        <div id="chainAssembly" class="link c"></div>
      </div>
      <div id="stayhome">
        <h3>😷#stayhome😷</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader"
};
</script>

<style scoped>
@import "../assets/loader.css";
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: rgba(50, 50, 50, 1);
  background: -moz-radial-gradient(
    center,
    ellipse cover,
    rgba(50, 50, 50, 1) 0%,
    rgba(25, 25, 25, 1) 100%
  );
  background: -webkit-gradient(
    radial,
    center center,
    0px,
    center center,
    100%,
    color-stop(0%, rgba(50, 50, 50, 1)),
    color-stop(100%, rgba(25, 25, 25, 1))
  );
  background: -webkit-radial-gradient(
    center,
    ellipse cover,
    rgba(50, 50, 50, 1) 0%,
    rgba(25, 25, 25, 1) 100%
  );
  background: -o-radial-gradient(
    center,
    ellipse cover,
    rgba(50, 50, 50, 1) 0%,
    rgba(25, 25, 25, 1) 100%
  );
  background: -ms-radial-gradient(
    center,
    ellipse cover,
    rgba(50, 50, 50, 1) 0%,
    rgba(25, 25, 25, 1) 100%
  );
  background: radial-gradient(
    ellipse at center,
    rgba(50, 50, 50, 1) 0%,
    rgba(25, 25, 25, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#323232', endColorstr='#191919', GradientType=1 );
}
* {
  transform-style: preserve-3d;
}
</style>