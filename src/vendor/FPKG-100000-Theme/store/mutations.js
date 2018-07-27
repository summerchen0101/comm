import { GOT_THEME_LIST, GOT_THEME, SWITCH_THEME_DIALOG } from '@/vendor/FPKG-40000-VuexStore/constants'
import EventsHub from '@/vendor/FPKG-60000-EventsHub/EventsHub'
import { branchDomain, fakeDomain } from '@/vendor/FPKG-10000-Config/branch'

const mutations = {
  [GOT_THEME_LIST](state, data) {
    state.themeList = data.list.map(t => ({
      guid: t.p8_tme_guid,
      code: t.p8_tme_code,
      name: t.p8_tme_name,
      status: t.p8_tme_status,
      files: t.p7_file,
    }))
    state.themeListPaginator = data.paginator
  },
  [GOT_THEME](state, _theme) {
    let files = _theme.p7_file
    state.theme = {
      guid: _theme.p8_tme_guid,
      code: _theme.p8_tme_code,
      name: _theme.p8_tme_name,
      status: _theme.p8_tme_status == 3,
      files: files.map(f => ({
        guid: f.p7_file_guid,
        name: f.p7_file_source_name,
        url: `http://${branchDomain}/${f.p7_file_folder}/${f.p7_file_name}`
      }))
    }
  },
  [SWITCH_THEME_DIALOG](state, status) {
    state.dialogVisible = status
    EventsHub.$emit("theme:clearThemeForm")
    
  },
}

export default mutations