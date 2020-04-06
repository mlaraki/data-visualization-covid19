<template>
  <div id="mobile" style="margin-top : 30%">
      <h3 >
          This webapp is not optimized for mobile.
          <br>
          <a href="https://www.apple.com/fr/mac/">Buy a mac 😆</a> 
      </h3>
  </div>
</template>
<script>

export default {
  name: 'Mobile',
  created(){
      this.$store.dispatch("setLoadingFalse");
  }
}
</script>

<style scoped>
#mobile {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: white;
  margin-top: 60px;
}
</style>