<template>
  <div class="el-form-item__error my">
    <label v-if="target.required === false && target.$dirty === true" class="validation-error-label">
      <i class="el-icon-error"></i> {{name}}為必填
    </label>
    <label v-else-if="target.pattern === false && target.$dirty === true" class="validation-error-label">
      <i class="el-icon-error"></i> {{patternMsg ? patternMsg : name + '格式錯誤'}}
    </label>
    <label v-else-if="target.sameAs === false && target.$dirty === true" class="validation-error-label">
      <i class="el-icon-error"></i> {{name}}有誤
    </label>
  </div>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        default: "此"
      },
      target: {
        type: Object,
        default: () => {}
      },
      patternMsg: {
        type: String,
        default: ""
      }
    },

  }
</script>

<style lang="stylus">
@import '../style/component/Validation'
</style>
