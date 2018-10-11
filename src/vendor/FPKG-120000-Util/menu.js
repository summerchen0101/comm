import 'lodash'
import store from '@/store'
import keys from '@/vendor/FPKG-10000-Config/funcKeyMap'

function getPath(id) {
  const permissions = store.state.Account.userInfo.permission
  if (!permissions) return '/home'
  const permission = _.find(permissions, {func_key: id });
  if (!permission) return '/home'
  const item = permission.menu[0]
  const key = item.func_key
  const data = _.find(keys, {funcKey: key})
  if (!data) return '/home'
  const data2 = _.find(keys, {funcKey: id})
  return `/${data2.id}/${data.id}`
}

export {getPath}