
import '../assets/icons/index' // icon
import SvgIcon from './SvgIcon'// svg组件
import CForm from './CForm'// 表单组件
import CMenuCom from './CMenuCom'// 表单组件
import CTitle from './CTitle'// 表单组件
// import ShowPdf from './ShowPdf'// 表单组件
// register globally
import { camelToUnderline } from '@/utils'
const registerCom = (app) => {
  const comList = [SvgIcon, CForm, CMenuCom, CTitle]
  comList.forEach(async item => {
    const name = camelToUnderline(item.name)
    await app.component(name, item)
  })
}
export { registerCom }
