<template>
  <div class="c-form">
    <el-form :ref="myref" :model="cform" :rules="rules" :label-width="formSetting.labelWidth" v-bind="$attrs">
      <el-row>
        <el-col v-for="(item, $index) in schema" :key="$index" :span="item.span || 12" :class="{'none': item.noShow}">
          <el-divider v-if="item.type === 'comTitle' && !item.noShow" />
          <com-title v-if="item.type === 'comTitle' && !item.noShow" :title="item.title" />
          <slot v-else-if="item.slot && !item.noShow" :name="`${item.field}`" :row="item" />
          <el-form-item v-else-if="!item.noShow" :prop="item.field" :label="item.label" :class="`${item.field}item`">
            <div v-if="item.tip" class="tip" :class="item.tipClass">
              {{ item.tip }}
            </div>
            <com-tip v-if="item.type === 'input' && item.hasTip" :cus-show="item.hasTip" :style-class="item.tipStyleClass" :msg="typeof cform[item.field] === 'string' ? form[item.field] : ''">
              <el-input
                v-model="cform[item.field]"
                slot-scope="{toggleTip}"
                :placeholder="item.placeholder || `请输入${item.label}`"
                :disabled="item.disabled"
                v-bind="getBindValue(item)"
                @focus="toggleTip"
                @blur="toggleTip"
                @change="((val) => {formItemChange(val, item)})"
              />
            </com-tip>
            <el-input
              v-else-if="item.type === 'input'"
              v-model="cform[item.field]"
              :placeholder="item.placeholder || `请输入${item.label}`"
              :disabled="item.disabled"
              v-bind="getBindValue(item)"
              @change="((val) => {formItemChange(val, item)})"
            />
            <el-input
              v-else-if="item.type === 'textarea'"
              v-model="cform[item.field]"
              type="textarea"
              :maxlength="item.maxlength"
              :placeholder="item.placeholder || `请输入${item.label}`"
              :disabled="item.disabled"
              v-bind="getBindValue(item)"
              @change="((val) => {formItemChange(val, item)})"
            />
            <el-date-picker
              v-else-if="item.type === 'date'"
              v-model="cform[item.field]"
              value-format="yyyy-MM-dd"
              type="date"
              :placeholder="item.placeholder || `请选择${item.label}`"
              :disabled="item.disabled"
              style="width: 100%;"
              v-bind="getBindValue(item)"
              @change="((val) => {formItemChange(val, item)})"
            />
            <el-select
              v-else-if="item.type === 'select'"
              v-model="cform[item.field]"
              :placeholder="item.placeholder || `请选择${item.label}`"
              :disabled="item.disabled"
              v-bind="getBindValue(item)"
              style="width: 100%;"
              @change="((val) => {formItemChange(val, item)})"
            >
              <el-option
                v-for="(citem,$cindex) in item.options"
                :key="$cindex"
                :label="citem[item.labelFiled] || citem.value"
                :value="citem[item.valueFiled] || citem.code"
              />
            </el-select>
            <select-tree
              v-else-if="item.type === 'selecttree'"
              v-model="cform[item.field]"
              style="width: 100%;"
              v-bind="getBindValue(item)"
              :default-props="item.defaultProps || {
                value: 'value', // ID字段名
                label: 'label', // 显示名称
                children: 'children' // 子级字段名
              }"
              :options="item.options"
              :placeholder="item.placeholder || `请选择${item.label}`"
              :clearable="item.clearable"
              @change="((val) => {formItemChange(val, item)})"
            />
            <el-checkbox-group v-else-if="item.type === 'checkbox'" v-model="cform[item.field]" @change="((val) => {formItemChange(val, item)})">
              <el-checkbox
                v-for="(citem,$cindex) in item.options"
                :key="$cindex"
                :disabled="citem.disabled"
                :label="citem.value"
              >
                {{ citem.label }}</el-checkbox>
            </el-checkbox-group>
            <file-upload
              v-else-if="item.type === 'upload'"
              :title="item.label"
              :accept="item.accept"
              :default-src="cform[item.field]"
              v-bind="getBindValue(item)"
              @changeUpload="(file) => {formItemChange(file, item)}"
              @delImg="() => {delImg(val, item)}"
            />
            <files-upload
              v-else-if="item.type === 'uploads'"
              :file-list="item.fileList"
              v-bind="getBindValue(item)"
              @setFile="((file) => {formItemChange(file, item)})"
              @delFile="((file) => {handleRemove(file, item)})"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import ComTip from '_c/ComTip'
export default {
  name: 'CForm',
  components: { ComTip },
  props: {
    myref: {
      type: String,
      default: 'formRef'
    },
    formSetting: {
      type: Object,
      default() {
        return {
          labelWidth: '170px'
        }
      }
    },
    rules: {
      type: Object,
      default() {
        return {}
      }
    },
    schema: {
      type: Object,
      default() {
        return {}
      }
    },
    form: {
      type: Object,
      default() {
        return {}
      }
    },
    subLoading: {
      type: Boolean,
      default: false
    },
    saveAction: {
      type: Function,
      default: null
    }
  },
  data: function() {
    return {
      checkList: ''
    }
  },
  computed: {
    cform() {
      return this.form
    }
  },
  methods: {
    getBindValue(item) {
      const obj = { ...item }
      delete obj.field// 删除没用的字段
      delete obj.type
      delete obj.label
      delete obj.span
      delete obj.fileList
      delete obj.tip
      return obj
    },
    delImg(val, item) {
      this.$emit(`${item.field}DelImg`, item)
    },
    formItemChange(val, item) {
      item.value = val
      this.$emit(`${item.field}Change`, item)
    },
    handleRemove(file, item) {
      this.$emit(`${item.field}Remove`, file)
    },
    async save(param) {
      return new Promise(resolve => {
        if (this.newSave && typeof (this.newSave) === 'function') {
          this.newSave(this.cform)
          return false
        }
        this.$refs[this.myref].validate(async(valid) => {
          if (valid) {
            if (this.saveAction) {
              const res = await this.saveAction(param)
              this.$emit('save', res)
            }
            resolve()
          } else {
            resolve()
            this.$message.warning('请填写正确完整信息')
            console.log('error submit')
          }
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.tip{
  color: #999;
  font-size: 13px;
}
.none {
  display: none
}
</style>
