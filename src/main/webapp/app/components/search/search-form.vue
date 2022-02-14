<template>
  <a-form layout="inline">
    <a-row type="flex" style="margin-bottom: 10px" :gutter="16">
      <a-col :md="8" :xs="24" v-for="(item, index) in config.fieldList" :key="index">
        <search-form-item :field="item"></search-form-item>
      </a-col>
    </a-row>
    <a-row type="flex" style="margin-bottom: 12px" justify="space-around" align="middle" :gutter="20">
      <a-col :md="12" :xs="24">
        <a-form-item label="过滤条件匹配" :labelCol="{ md: 6, xs: 24 }" :wrapperCol="{ md: 18, xs: 24 }" style="width: 100%">
          <a-select v-model="config.matchType" :getPopupContainer="node => node.parentNode" style="width: 100%">
            <a-select-option value="and">AND（全部匹配）</a-select-option>
            <a-select-option value="or">OR（任意匹配）</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-button :loading="loading" @click="handleCancel">关闭</a-button>
        <a-button :loading="loading" @click="handleCancel">重置</a-button>
        <a-button :loading="loading" type="primary" @click="handleOk">复合查询</a-button>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import moment from 'moment';
import * as utils from '@/utils/util';
import { mixinDevice } from '@/utils/mixin';
import SearchFormItem from '@/components/search/search-form-item';

export default {
  name: 'SearchForm',
  mixins: [mixinDevice],
  components: { SearchFormItem },
  props: {
    /*
       fieldList: [{
          value:'',
          text:'',
          type:'',
          dictCode:'' // 只要 dictCode 有值，无论 type 是什么，都显示为字典下拉框
       }]
       type:date datetime int number string
      * */
    /**
     *  每一个字段都是一个对象，包括字段标题、字段名称、类型、选择的值等。
     *  字段中还包含关联表的查询，id和Title类似的字段
     */
    config: {
      type: Object,
      required: true,
    },
    /*
     * 这个回调函数接收一个数组参数 即查询条件
     * */
    callback: {
      type: String,
      required: false,
      default: 'handleSuperQuery',
    },

    // 当前是否在加载中
    loading: {
      type: Boolean,
      default: false,
    },

    // 保存查询条件的唯一 code，通过该 code 区分
    // 默认为 null，代表以当前路由全路径为区分Code
    saveCode: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      moment,
      fieldTreeData: [],

      prompt: {
        visible: false,
        value: '',
      },

      visible: false,
      queryParamsModel: [],
      treeIcon: <a-icon type="file-text" />,
      // 保存查询条件的treeData
      saveTreeData: [],
      // 保存查询条件的前缀名
      saveCodeBefore: 'JSuperQuerySaved_',
      // 查询类型，过滤条件匹配（and、or）
      matchType: 'and',
      superQueryFlag: false,
    };
  },
  computed: {
    izMobile() {
      return this.device === 'mobile';
    },
    tooltipProps() {
      return this.izMobile ? { visible: false } : {};
    },
    fullSaveCode() {
      let saveCode = this.saveCode;
      if (saveCode == null || saveCode === '') {
        saveCode = this.$route.fullPath;
      }
      return this.saveCodeBefore + saveCode;
    },
  },
  watch: {
    // 当 saveCode 变化时，重新查询已保存的条件
    fullSaveCode: {
      immediate: true,
      handler() {
        let list = this.$ls.get(this.fullSaveCode);
        if (list instanceof Array) {
          this.saveTreeData = list.map(i => this.renderSaveTreeData(i));
        }
      },
    },
  },

  methods: {
    show() {
      if (!this.queryParamsModel || this.queryParamsModel.length === 0) {
        this.resetLine();
      }
      this.visible = true;
    },

    getDictInfo(item) {
      let str = '';
      if (!item.dictTable) {
        str = item.dictCode;
      } else {
        str = item.dictTable + ',' + item.dictText + ',' + item.dictCode;
      }
      console.log('高级查询字典信息', str);
      return str;
    },
    handleOk() {
      this.$emit('formSearch');
      /*if (!this.isNullArray(this.queryParamsModel)) {
        let event = {
          matchType: this.matchType,
          params: this.removeEmptyObject(this.queryParamsModel),
        };
        // 移动端模式下关闭弹窗
        if (this.izMobile) {
          this.visible = false;
        }
        this.emitCallback(event);
      } else {
        this.$message.warn('不能查询空条件');
      }*/
    },
    emitCallback(event = {}) {
      let { params = [], matchType = this.matchType } = event;
      this.superQueryFlag = params && params.length > 0;
      for (let param of params) {
        if (Array.isArray(param.val)) {
          param.val = param.val.join(',');
        }
      }
      console.debug('---高级查询参数--->', { params, matchType });
      this.$emit(this.callback, params, matchType);
    },
    handleCancel() {
      this.$emit('close');
    },
    handleAdd() {
      this.addNewLine();
    },
    addNewLine() {
      this.queryParamsModel.push({ rule: 'eq' });
    },
    resetLine() {
      this.superQueryFlag = false;
      this.queryParamsModel = [];
      this.addNewLine();
    },
    handleDel(index) {
      this.queryParamsModel.splice(index, 1);
    },
    handleSelected(node, item) {
      let { type, options, dictCode, dictTable, dictText, customReturnField, popup } = node.dataRef;
      item['type'] = type;
      item['options'] = options;
      item['dictCode'] = dictCode;
      item['dictTable'] = dictTable;
      item['dictText'] = dictText;
      item['customReturnField'] = customReturnField;
      if (popup) {
        item['popup'] = popup;
      }
      this.$set(item, 'val', undefined);
    },
    handleOpen() {
      this.show();
    },
    handleReset() {
      this.resetLine();
      this.emitCallback();
    },
    handleSave() {
      let queryParams = this.removeEmptyObject(this.queryParamsModel);
      if (this.isNullArray(queryParams)) {
        this.$message.warning('空条件不能保存');
      } else {
        this.prompt.value = '';
        this.prompt.visible = true;
      }
    },
    handlePromptOk() {
      let { value } = this.prompt;
      if (!value) {
        this.$message.warning('保存名称不能为空');
        return;
      }
      // 取出查询条件
      let records = this.removeEmptyObject(this.queryParamsModel);
      // 判断有没有重名的
      let filterList = this.saveTreeData.filter(i => i.originTitle === value);
      if (filterList.length > 0) {
        this.$confirm({
          content: `${value} 已存在，是否覆盖？`,
          onOk: () => {
            this.prompt.visible = false;
            filterList[0].records = records;
            this.saveToLocalStore();
            this.$message.success('保存成功');
          },
        });
      } else {
        // 没有重名的，直接添加
        this.prompt.visible = false;
        // 添加到树列表中
        this.saveTreeData.push(
          this.renderSaveTreeData({
            title: value,
            matchType: this.matchType,
            records: records,
          })
        );
        // 保存到 LocalStore
        this.saveToLocalStore();
        this.$message.success('保存成功');
      }
    },
    handleTreeSelect(idx, event) {
      if (event.selectedNodes[0]) {
        let { matchType, records } = event.selectedNodes[0].data.props;
        // 将保存的matchType取出，兼容旧数据，如果没有保存就还是使用原来的
        this.matchType = matchType || this.matchType;
        this.queryParamsModel = utils.cloneObject(records);
      }
    },
    handleRemoveSaveTreeItem(event, vNode) {
      // 阻止事件冒泡
      event.stopPropagation();

      this.$confirm({
        content: '是否删除当前查询？',
        onOk: () => {
          let { eventKey } = vNode;
          this.saveTreeData.splice(Number.parseInt(eventKey.substring(2)), 1);
          this.saveToLocalStore();
        },
      });
    },

    // 将查询保存到 LocalStore 里
    saveToLocalStore() {
      let saveValue = this.saveTreeData.map(({ originTitle, matchType, records }) => ({ title: originTitle, matchType, records }));
      this.$ls.set(this.fullSaveCode, saveValue);
    },

    isNullArray(array) {
      //判断是不是空数组对象
      if (!array || array.length === 0) {
        return true;
      }
      if (array.length === 1) {
        let obj = array[0];
        if (!obj.field || obj.val == null || obj.val === '' || !obj.rule) {
          return true;
        }
      }
      return false;
    },
    // 去掉数组中的空对象
    removeEmptyObject(arr) {
      let array = utils.cloneObject(arr);
      for (let i = 0; i < array.length; i++) {
        let item = array[i];
        if (item == null || Object.keys(item).length <= 0) {
          array.splice(i--, 1);
        } else {
          if (Array.isArray(item.options)) {
            // 如果有字典属性，就不需要保存 options 了
            //update-begin-author:taoyan date:20200819 for:【开源问题】 高级查询 下拉框作为并且选项很多多多 LOWCOD-779
            delete item.options;
            //update-end-author:taoyan date:20200819 for:【开源问题】 高级查询 下拉框作为并且选项很多多多 LOWCOD-779
          }
        }
      }
      return array;
    },

    /** 渲染保存查询条件的 title（加个删除按钮） */
    renderSaveTreeData(item) {
      item.icon = this.treeIcon;
      item.originTitle = item['title'];
      item.title = (arg1, arg2) => {
        let vNode;
        // 兼容旧版的Antdv
        if (arg1.dataRef) {
          vNode = arg1;
        } else if (arg2.dataRef) {
          vNode = arg2;
        } else {
          return <span style="color:red;">Antdv版本不支持</span>;
        }
        let { originTitle } = vNode.dataRef;
        return (
          <div class="j-history-tree-title">
            <span>{originTitle}</span>

            <div class="j-history-tree-title-closer" onClick={e => this.handleRemoveSaveTreeItem(e, vNode)}>
              <a-icon type="close-circle" />
            </div>
          </div>
        );
      };
      return item;
    },

    /** 判断是否允许多选 */
    allowMultiple(item) {
      return item.rule === 'in';
    },

    handleRuleChange(item, newValue) {
      let oldValue = item.rule;
      this.$set(item, 'rule', newValue);
      // 上一个规则是否是 in，且type是字典或下拉
      if (oldValue === 'in') {
        if (item.dictCode || item.options instanceof Array) {
          let value = item.val;
          if (typeof item.val === 'string') {
            value = item.val.split(',')[0];
          } else if (Array.isArray(item.val)) {
            value = item.val[0];
          }
          this.$set(item, 'val', value);
        }
      }
    },

    handleChangeJPopup(item, e, values) {
      item.val = values[item.popup['destFields']];
    },
  },
};
</script>

<style lang="less" scoped>
.j-super-query-box {
  display: inline-block;
}

.j-super-query-modal {
  .j-super-query-history-card {
    /deep/ .ant-card-body,
    /deep/ .ant-card-head-title {
      padding: 0;
    }

    /deep/ .ant-card-head {
      padding: 4px 8px;
      min-height: initial;
    }
  }

  .j-super-query-history-empty {
    /deep/ .ant-empty-image {
      height: 80px;
      line-height: 80px;
      margin-bottom: 0;
    }

    /deep/ img {
      width: 80px;
      height: 65px;
    }

    /deep/ .ant-empty-description {
      color: #afafaf;
      margin: 8px 0;
    }
  }

  .j-super-query-history-tree {
    .j-history-tree-title {
      width: calc(100% - 24px);
      position: relative;
      display: inline-block;

      &-closer {
        color: #999999;
        position: absolute;
        top: 0;
        right: 0;
        width: 24px;
        height: 24px;
        text-align: center;
        opacity: 0;
        transition: opacity 0.3s, color 0.3s;

        &:hover {
          color: #666666;
        }

        &:active {
          color: #333333;
        }
      }

      &:hover {
        .j-history-tree-title-closer {
          opacity: 1;
        }
      }
    }

    /deep/ .ant-tree-switcher {
      display: none;
    }

    /deep/ .ant-tree-node-content-wrapper {
      width: 100%;
    }
  }
}
</style>
