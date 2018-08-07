<template>
  <div id="SubmitBar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
  }
}

</script>

<style lang="stylus">
#SubmitBar
  background-color: #eee 
  border-radius: 5px 
  padding: 8px 10px
  margin-top: 20px
  text-align: right
</style>
