<!--标签树-->
<script setup>
// 分组组件对象
import {getFile, putFile} from "@/database/index.js";
import {useI18n} from "vue-i18n";
import {useDark} from '@vueuse/core'

// 暗黑模式
const darkMode = useDark()

const {t} = useI18n()

// 声明此组件可能调用的事件
const emit = defineEmits(['labelCheckChange', 'labelTreeChange'])

const labelTreeRef = ref()
// 分组搜索
const labelFilterText = ref([])
// 分组
const labelTree = ref([])
// 分组是否可同步
const labelTreeSyncStatus = ref(false)


// 分组选择改变
const labelTreeChange = () => {
  let checkedNodes = labelTreeRef.value.getCheckedNodes()
  emit('labelCheckChange', checkedNodes)
}

// 分组过滤
const labelFilterNode = (value, data) => {
  if (!value) return true
  return data.label.includes(value)
}

// 添加分组
const labelTreeAppend = (data) => {
  const newChild = {id: Date.now(), label: t('labelTree.addLabel'), children: []}
  if (!data.children) {
    data.children = []
  }
  data.children.push(newChild)
}

// 删除分组
const labelTreeRemove = (node, data) => {
  const parent = node.parent
  const children = parent.data.children || parent.data
  const index = children.findIndex((d) => d.id === data.id)
  children.splice(index, 1)
}

// 分组节点是否可拖拽
const labelDrag = (node) => {
  return !node.edit
}

// 新建分组
const createLabel = () => {
  labelTree.value.push({
    id: Date.now(),
    label: t('labelTree.firstAddLabel'),
    children: [],
  })
}

// 同步分组
const syncLabelTree = () => {
  if (!labelTreeSyncStatus.value) {
    return
  }
  putFile('labelTree.json', {'labelTree': labelTree.value})
}

// 设置标签树
const setLabelTree = (tree) => {
  labelTree.value = tree
}

watch(labelFilterText, (val) => {
  labelTreeRef.value.filter(val)
})

watch(labelTree, () => {
  syncLabelTree()
  emit('labelTreeChange', labelTree.value)
}, {deep: true})


// 从database加载密码文件
const loadLabelTreeByDatabase = () => {
  getFile('labelTree.json').then(res => {
    if (res && res.labelTree) {
      labelTree.value = res.labelTree;
    } else {
      labelTree.value = []
    }
    labelTreeSyncStatus.value = true
  }).catch(e => {
    ElNotification.error(e.code)
  })
}

// 是否暗黑模式
const isDark = () => {
  return darkMode.value
}

loadLabelTreeByDatabase()

// 导出的方法
defineExpose({
  setLabelTree
});
</script>

<template>
  <el-card class="body-card" :style="{'background-color': isDark()?'rgba(0,0,0,0.4)':'rgba(255,255,255,0.4)'}">
    <template #header>
      {{ t('labelTree.title') }}
    </template>
    <el-input v-model="labelFilterText" clearable :placeholder="t('labelTree.search.placeholder')"/>
    <el-scrollbar height="35vh">
      <el-tree
          :data="labelTree"
          show-checkbox
          ref="labelTreeRef"
          draggable
          node-key="id"
          style="margin-top: 10px;background-color: rgba(0,0,0,0);"
          @check="labelTreeChange"
          :filter-node-method="labelFilterNode"
          :expand-on-click-node="false"
          :allow-drag="labelDrag"
          default-expand-all
      >
        <template #empty>
          <el-button size="small" type="primary" plain @click="createLabel">{{ t('labelTree.firstAddLabel') }}
          </el-button>
        </template>
        <template #default="{ node, data }">
            <span class="label-tree-node">
              <span v-if="!node.edit" @click="node.edit = true" @blur="node.edit = false">
                {{ data.label }}
              </span>
              <el-input v-if="node.edit" style="width: 60%" :ref="node.id+'_input'" size="small"
                        @blur="node.edit = false" v-model="data.label"></el-input>
              <span class="label-tree-node-menu">
                <el-link @click="labelTreeAppend(data)" type="primary"
                         :underline="false">{{ t('labelTree.tree.add') }}</el-link>
                <el-link @click="labelTreeRemove(node, data)" type="danger" :underline="false" style="margin-left: 8px">{{
                    t('labelTree.tree.remove')
                  }}</el-link>
              </span>
            </span>
        </template>
      </el-tree>
    </el-scrollbar>
  </el-card>
</template>

<style scoped>
.body-card {
  backdrop-filter: blur(50px);
}
.label-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.label-tree-node-menu a {
  margin: 5px 0;
}
</style>