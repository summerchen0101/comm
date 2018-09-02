<template>
  <div id="Permission">
    <PageTitle :title="$route.params.id ? '編輯權限' : '新增權限'"></PageTitle>

    <el-form 
      label-width="80px" 
      label-position="left"
      status-icon 
      :model="form"
      :rules="formRules"
      ref="form"
      >
      <el-form-item label="權限名稱" prop="name">
        <el-input v-model.trim="form.name" style="max-width: 250px"></el-input>
      </el-form-item>
    </el-form>
    <el-checkbox v-model="selectedAll" @change="onSelectedAllChanged" :indeterminate="isSelectedMultiple">所有權限</el-checkbox>
    <el-tree
      :data="defaultMenu"
      show-checkbox
      default-expand-all
      node-key="func_key"
      ref="tree"
      @check-change="onCheckedChanged"
      :props="defaultProps">
    </el-tree>
    <SubmitBar>
      <el-button @click="onCancel">取消</el-button>
      <!-- <el-button type="info" @click="onClear">清除</el-button> -->
      <el-button type="primary" @click="onSubmit">確定</el-button>
    </SubmitBar>
  </div>
</template>

<script>
import { 
  SET_BREADCRUMB,
  CREATE_PERMISSION_GROUP,
  MODIFY_PERMISSION_GROUP,
  GET_DEFAULT_PERMISSION_MENU,
  GET_PERMISSION,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { permissionNameValidator } from '@/vendor/FPKG-120000-Util/customValidate'

export default {
  components: {
  },
  data() {
    return {
      breadcrumbPath: [
        {name: "Home", title: "首頁"},
        {name: null, title: "後台管理"},
        {name: "Permission", title: "權限管理"},
        {name: null, title: this.$route.params.id ? '編輯權限' : '新增權限'},
      ],
      form: {
        name: "",
        funcKeys: []
      },
      formRules: {
        name: [
          { required: true, message: "名稱為必填", trigger: 'blur' },
          { validator: permissionNameValidator.bind(this), trigger: 'blur' },
        ]
      },
      defaultProps: {
        children: 'menu',
        label: 'name'
      },
      selectedAll: false,
      isSelectedMultiple: false
    }
  },
  watch: {

  },
  computed: {
    ...mapState({
      funcKeyCount: state => state.Dashboard.funcKeyCount,
      fixedPerMenu: state => state.Manage.Permission.fixedPerMenu,
      defaultMenu: state => state.Manage.Permission.defaultMenu,
      permission: state => state.Manage.Permission.permission,
    })
  },
  methods: {
    onSelectedAllChanged(isSelected) {
      if(isSelected) {
        this.$refs.tree.setCheckedKeys(this.fixedPerMenu.map(m => m.func_key));
      }else{
        this.$refs.tree.setCheckedKeys([]);
      }
      // this.isSelectedMultiple = false
    },
    onCheckedChanged() {
      let selectedLength = this.$refs.tree.getCheckedKeys().length
      this.isSelectedMultiple = selectedLength > 0 && selectedLength < this.fixedPerMenu.length
      this.selectedAll = selectedLength === this.fixedPerMenu.length
    },
    onClear() {
      this.form.name = ""
      this.$refs.form.clearValidate()
      this.$refs.tree.setCheckedKeys([]);
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.funcKeys = this.$lodash(this.$refs.tree.getCheckedKeys())
                                        .concat(this.$refs.tree.getHalfCheckedKeys())
                                        .orderBy(t => t)
          this.$store.dispatch(this.$route.params.id ? 
                                  MODIFY_PERMISSION_GROUP : 
                                  CREATE_PERMISSION_GROUP
                                  , this.form)
        }
        else {
          this.$alert("表單填寫未完整或格式有誤", "錯誤提示")
        }
      });
    },
    onCancel() {
      this.$confirm('你確定放棄所有設定之變更嗎?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.go(-1)
      }).catch(() => {});
    },
    async getPermission(id) {
      await this.$store.dispatch(GET_PERMISSION, id)
      this.form = Object.assign({}, this.form, {
        id: this.permission.id,
        name: this.permission.name,
        funcKeys: this.permission.permissions.map(t => t.func_key)
      })
      this.$refs.tree.setCheckedKeys(this.form.funcKeys);
      
    }
  },
  mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    this.$store.dispatch(GET_DEFAULT_PERMISSION_MENU)

    // 「編輯」權限時需撈取當前ID資料
    if(this.$route.params.id) {
      this.getPermission(this.$route.params.id)
    }
  }
}
</script>

<style lang="stylus">

</style>
