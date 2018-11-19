<template>
  <div id="NoService">
    <div class="NoService-bg">
      <img src="@/assets/NoService-bg.jpg">
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  }
}
</script>

<style>
.NoService-bg {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -999;
}

.NoService-bg img {
  margin: 0 auto;
  min-height: 100%;
  width: 100%;
}
</style>
