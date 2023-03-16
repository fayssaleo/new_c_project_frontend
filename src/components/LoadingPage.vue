<template>
  <div class="loadingPage">
    <img class="imgForLoading" src="./../assets/loading_gif.gif" />
  </div>
</template>
<style scoped>
.loadingPage {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100%;
  background-color: #00000052;
  z-index: 10000000000000;
  text-align: center;
}
.imgForLoading {
  margin-right: 4%;
  margin-top: 22%;
  height: 257px;
}
</style>
