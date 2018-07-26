<template>
  <!-- <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
  </el-breadcrumb> -->
  <div id="Breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <template v-for="item in path" :key="item">
        <el-breadcrumb-item v-if="item.link" :to="{ path: item.link }">{{item.title}}</el-breadcrumb-item>
        <el-breadcrumb-item v-else>{{item.title}}</el-breadcrumb-item>
      </template> -->
      <el-breadcrumb-item v-for="(item, i) in path" :key="i" :to="item.link ? { path: item.link } : undefined">
        {{item.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: ['path']
}

</script>

<style lang="stylus">
@import '../style/component/Breadcrumb'
</style>
