<template>
  <span v-if="cancel === true" class="el-tag el-tag--danger">取消</span>
</template>

<script>
  export default {
    props: {
      cancel: {
        type: Boolean,
        default: false
      }
    },
  }
</script>
