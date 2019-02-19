<template>
  <div class="Paginator">
    <el-pagination
      v-if="count > 0"
      layout="prev, pager, next"
      @current-change="onPageChanged"
      :current-page="currentPage"
      :page-size="perpage"
      :total="count">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    perpage: {
      default: 50,
      type: Number
    },
    count: {
      default: 0,
      type: Number
    },
    currentPage: {
      default: 1,
      type: Number
    },
    onPageChanged: {
      default: (page) => {
        console.log("current page: " + page)
      },
      type: Function
    }
  }
}

</script>

<style lang="stylus">
.Paginator
  text-align: right
  padding: 10px 0
</style>
