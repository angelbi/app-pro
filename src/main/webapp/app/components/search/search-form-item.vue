<template>
  <a-form-item :labelCol="{ md: 6, xs: 24 }" :wrapperCol="{ md: 18, xs: 24 }" style="width: 100%">
    <span slot="label" @click="changeFieldValue">
      <a-badge>
        <a-icon slot="count" type="check-circle" theme="filled" v-if="showBadge" />
        <span>{{ field.title }}</span>
      </a-badge>
    </span>
    <a-row :gutter="8">
      <a-col :md="6">
        <a-select placeholder="匹配规则" :value="field.operator" @change="val => handleSelected(val, field)">
          <a-select-option :value="operator.value" v-for="(operator, operatorIndex) in operatorByType(field.type)" :key="operatorIndex"
            >{{ operator.title }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :md="18">
        <j-date v-if="field.componentType === 'Date'" v-model="field.value" placeholder="请选择日期" style="width: 100%"></j-date>
        <j-date
          v-else-if="field.componentType === 'DateTime'"
          v-model="field.value"
          placeholder="请选择时间"
          :show-time="true"
          date-format="YYYY-MM-DD HH:mm:ss"
          style="width: 100%"
        ></j-date>
        <a-time-picker
          v-else-if="field.componentType === 'Time'"
          :value="field.value ? moment(field.value, 'HH:mm:ss') : null"
          format="HH:mm:ss"
          style="width: 100%"
          @change="(time, value) => (field.value = value)"
        />
        <a-input-number v-else-if="field.componentType === 'Number'" style="width: 100%" placeholder="请输入数值" v-model="field.value" />
        <a-switch v-model="field.value" v-else-if="field.componentType === 'Switch'">
          <a-icon slot="checkedChildren" type="check" />
          <a-icon slot="unCheckedChildren" type="close" />
        </a-switch>

        <a-select v-else-if="field.componentType === 'Enum'" placeholder="请选择" v-model="field.value">
          <a-select-option v-for="(item, index) in field.options" :value="item.value" :key="index">
            {{ item.label }}
          </a-select-option>
        </a-select>
        <select-list-modal
          v-else-if="field.componentType === 'SelectListModal'"
          :selectListName="field.selectListName"
          :props="field.props"
          :option-props="field.optionProps"
          v-model="field.value"
        >
        </select-list-modal>
        <a-select
          v-else-if="field.componentType === 'TagsInput'"
          mode="tags"
          v-model="field.value"
          style="width: 100%"
          placeholder="请输入值并回车"
        >
        </a-select>
        <a-input v-else v-model="field.value" placeholder="请输入值" allowClear />
      </a-col>
    </a-row>
  </a-form-item>
</template>
<script>
import TypeOperator from '@/utils/filter-operator';

export default {
  name: 'SearchFormItem',
  props: {
    field: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.componentByField(this.field);
  },
  methods: {
    operatorByType(type) {
      switch (type) {
        case 'Boolean':
        case 'Enum':
        case 'UUID':
          return TypeOperator.common;
        case 'Integer':
        case 'Long':
        case 'Float':
        case 'Double':
        case 'LocalDate':
        case 'BigDecimal':
          return TypeOperator.range;
        case 'ZonedDateTime':
          return TypeOperator.dateTime;
        case 'String':
          return TypeOperator.text;
        case 'RelationId':
          return TypeOperator.range;
        default:
          return TypeOperator.null;
      }
    },
    handleSelected(operator, field) {
      switch (field.type) {
        case 'Boolean':
          field.componentType = 'Switch';
          if (operator === 'in' || field.operator === 'notIn') {
            field.componentType = 'CheckBox';
            field.value = [];
            field.options = [
              { label: '是', value: true },
              { label: '否', value: false },
            ];
          }
          if (operator === 'specified') {
            field.componentType = 'Switch';
            field.options = [
              { label: '是', value: true },
              { label: '否', value: false },
            ];
            field.value = null;
          }
          break;
        case 'Enum':
          field.componentType = 'Select';
          field.props = { multiple: false };
          if (operator === 'in' || field.operator === 'notIn') {
            field.componentType = 'Select';
            field.props = { multiple: true };
            field.value = [];
          }
          if (operator === 'specified') {
            field.componentType = 'Switch';
            field.options = [
              { label: '是', value: true },
              { label: '否', value: false },
            ];
            field.value = null;
          }
          break;
        case 'UUID':
        case 'String':
          field.componentType = 'Text';
          if (operator === 'in' || field.operator === 'notIn') {
            field.componentType = 'TagsInput';
            field.value = [];
          }
          if (operator === 'specified') {
            field.componentType = 'Switch';
            field.options = [
              { label: '是', value: true },
              { label: '否', value: false },
            ];
            field.value = null;
          }
          break;
        case 'Integer':
        case 'Long':
        case 'Float':
        case 'Double':
        case 'BigDecimal':
          field.componentType = 'Number';
          if (operator === 'in' || field.operator === 'notIn') {
            field.componentType = 'TagsInput';
            field.value = [];
          }
          if (operator === 'specified') {
            field.componentType = 'Switch';
            field.options = [
              { label: '是', value: true },
              { label: '否', value: false },
            ];
            field.value = null;
          }
          break;
        case 'LocalDate':
        case 'Date':
          field.componentType = 'Date';
          if (operator === 'in' || field.operator === 'notIn') {
            field.componentType = 'TagsInput';
            field.value = [];
            field.props = { type: 'Date' };
          }
          if (operator === 'specified') {
            field.componentType = 'Switch';
            field.options = [
              { label: '是', value: true },
              { label: '否', value: false },
            ];
            field.value = null;
          }
          break;
        case 'ZonedDateTime':
        case 'Instant':
        case 'Duration':
          field.componentType = 'DateTime';
          this.$set(field, 'value', null);
          if (operator === 'specified') {
            field.componentType = 'Switch';
            field.options = [
              { label: '是', value: true },
              { label: '否', value: false },
            ];
            field.value = null;
          }
          break;
        case 'Blob':
        case 'AnyBlob':
        case 'ImageBlob':
        case 'TextBlob':
        case 'ByteBuffer':
          field.componentType = null;
          this.$set(field, 'value', null);
          if (operator === 'specified') {
            field.componentType = 'Switch';
            field.options = [
              { label: '是', value: true },
              { label: '否', value: false },
            ];
            field.value = null;
          }
          break;
        case 'RelationId':
          field.componentType = 'SelectListModal';
          if (operator === 'in') {
            field.componentType = 'SelectListModal';
            field.props = { multiple: true };
            this.$set(field, 'value', []);
          }
          if (operator === 'specified') {
            field.componentType = 'Switch';
            field.options = [
              { label: '是', value: true },
              { label: '否', value: false },
            ];
            field.value = null;
          }
          break;
        default:
          field.componentType = null;
      }
      field.operator = operator;
    },
    componentByField(field) {
      switch (field.type) {
        case 'Boolean':
          field.componentType = 'Switch';
          if (field.operator === 'in' || field.operator === 'notIn') {
            field.componentType = 'CheckBox';
            field.options = [
              { label: '是', value: true },
              { label: '否', value: false },
            ];
            field.value = [];
          }
          break;
        case 'Enum':
          field.componentType = 'Select';
          field.props = { multiple: false };
          if (field.operator === 'in' || field.operator === 'notIn') {
            field.componentType = 'Select';
            field.props = { multiple: true };
          }
          break;
        case 'UUID':
        case 'String':
          field.componentType = 'Text';
          if (field.operator === 'in' || field.operator === 'notIn') {
            field.componentType = 'TagsInput';
            field.value = [];
          }
          break;
        case 'Integer':
        case 'Long':
        case 'Float':
        case 'Double':
        case 'BigDecimal':
          field.componentType = 'Number';
          if (field.operator === 'in' || field.operator === 'notIn') {
            field.componentType = 'TagsInput';
            field.value = [];
          }
          break;
        case 'LocalDate':
        case 'Date':
          field.componentType = 'Date';
          if (field.operator === 'in' || field.operator === 'notIn') {
            field.componentType = 'TagsInput';
            field.value = [];
            field.props = { type: 'Date' };
          }
          break;
        case 'ZonedDateTime':
        case 'Instant':
        case 'Duration':
          field.componentType = 'DateTime';
          break;
        case 'Blob':
        case 'AnyBlob':
        case 'ImageBlob':
        case 'TextBlob':
        case 'ByteBuffer':
          field.componentType = null;
          break;
        case 'RelationId':
          if (field.operator === 'in' || field.operator === 'notIn') {
            field.componentType = 'SelectListModal';
            field.props = { multiple: true };
          }
          field.componentType = 'SelectListModal';
          break;
        default:
          field.componentType = null;
      }
    },
    showBadge() {
      return (
        field.value !== null &&
        field.value !== undefined &&
        field.value !== '' &&
        Array.prototype.isPrototypeOf(field.value) &&
        field.value.length !== 0
      );
    },
    changeFieldValue() {
      if (this.field.value !== null && this.field.value !== undefined && this.field.value !== '' && this.field.value !== []) {
        switch (this.field.componentType) {
          case 'TagsInput':
            this.field.value = [];
            break;
          default:
            this.field.value = null;
        }
        this.componentByField(this.field);
        this.$message.info('过滤条件已经清除！');
      }
    },
  },
};
</script>
