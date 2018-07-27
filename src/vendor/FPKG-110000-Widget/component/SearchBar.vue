<template>
  <div class="SearchBar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: "",
      type: String
    }
  }
}

</script>

<style lang="stylus">
.SearchBar
  padding: 10px
  background-color: #efefef 
  border-radius: 3px
  margin-top: 10px
  .el-form-item--small.el-form-item, label
    margin-bottom: 0
</style>
