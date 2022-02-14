<template>
  <a-card :bordered="false">
    <a-table :columns="columns" :data-source="data" rowKey="name">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="action" slot-scope="text, record">
        <a-button type="primary" icon="sync" @click="clear(text)"> 清除 </a-button>
      </span>
    </a-table>
  </a-card>
</template>

<script>
import axios from 'axios';
const columns = [
  {
    title: '缓存名称',
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];

const data = [];

export default {
  data() {
    return {
      data,
      columns,
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    getAll() {
      axios.get('/api/cache-manage').then(res => {
        res.data.forEach(cacheName => this.data.push({ name: cacheName }));
      });
    },
    clear(cacheName) {
      axios.delete('/api/cache-manage/' + cacheName).then(res => {
        this.$message.success('清除缓存成功。');
      });
    },
  },
};
</script>
