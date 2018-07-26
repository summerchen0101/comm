<template>
  <div class="el-form-item__error my">
    <label v-if="validate.required === false && validate.$dirty === true" class="validation-error-label">{{name}}為必填</label>
    <label v-else-if="validate.pattern === false && validate.$dirty === true" class="validation-error-label">
      {{msg ? msg : name + '格式錯誤'}}
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
      validate: {
        type: Object,
        default: () => {}
      },
      msg: {
        type: String,
        default: ""
      }
    },

  }
</script>

<style lang="stylus">
@import '../style/component/Validation'
</style>
