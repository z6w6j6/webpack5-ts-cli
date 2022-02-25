import { ElButton } from 'element-plus'
import { ElColorPicker } from 'element-plus'
const registerEleCom = (app) => {
  app.use(ElButton)
  app.use(ElColorPicker)
}
export { registerEleCom }
