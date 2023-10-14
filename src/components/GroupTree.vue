<script setup>
// 分组组件对象
import {getFile, putFile} from "@/utils/oss.js";
import {ElNotification} from "element-plus";
import {useI18n} from "vue-i18n";

const {t} = useI18n()

// 声明此组件可能调用的事件
const emit = defineEmits(['groupCheckChange', 'groupTreeChange'])

const groupTreeRef = ref()
// 分组搜索
const groupFilterText = ref([])
// 分组
const groupTree = ref([])
// 分组是否可同步
const groupTreeSyncStatus = ref(false)


// 分组选择改变
const groupTreeChange = () => {
  let checkedNodes = groupTreeRef.value.getCheckedNodes()
  emit('groupCheckChange', checkedNodes)
}

// 分组过滤
const groupFilterNode = (value, data) => {
  if (!value) return true
  return data.label.includes(value)
}

// 添加分组
const groupTreeAppend = (data) => {
  const newChild = {id: Date.now(), label: t('groupTree.addGroup'), children: []}
  if (!data.children) {
    data.children = []
  }
  data.children.push(newChild)
}

// 删除分组
const groupTreeRemove = (node, data) => {
  const parent = node.parent
  const children = parent.data.children || parent.data
  const index = children.findIndex((d) => d.id === data.id)
  children.splice(index, 1)
}

// 分组节点是否可拖拽
const groupDrag = (node) => {
  return !node.edit
}

// 新建分组
const createGroup = () => {
  groupTree.value.push({
    id: Date.now(),
    label: t('groupTree.firstAddGroup'),
    children: [],
  })
}

// 同步分组
const syncGroupTree = () => {
  if (!groupTreeSyncStatus.value) {
    return
  }
  putFile('groupTree.json', {'groupTree': groupTree.value})
}

watch(groupFilterText, (val) => {
  groupTreeRef.value.filter(val)
})

watch(groupTree, () => {
  syncGroupTree()
  emit('groupTreeChange', groupTree.value)
}, {deep: true})


// 从oss加载密码文件
const loadGroupTreeByOSS = () => {
  getFile('groupTree.json').then(res => {
    if (res && res.groupTree) {
      groupTree.value = res.groupTree;
    } else {
      groupTree.value = []
    }
    groupTreeSyncStatus.value = true
  }).catch(e => {
    ElNotification.error(e.code)
  })
}

loadGroupTreeByOSS()
</script>

<template>
  <el-card>
    <template #header>
      {{ t('groupTree.title') }}
    </template>
    <el-input v-model="groupFilterText" clearable :placeholder="t('groupTree.search.placeholder')"/>
    <el-scrollbar height="35vh">
      <el-tree
          :data="groupTree"
          show-checkbox
          ref="groupTreeRef"
          draggable
          node-key="id"
          style="margin-top: 10px"
          @check="groupTreeChange"
          :filter-node-method="groupFilterNode"
          :expand-on-click-node="false"
          :allow-drag="groupDrag"
      >
        <template #empty>
          <el-button size="small" type="primary" plain @click="createGroup">{{ t('groupTree.firstAddGroup') }}
          </el-button>
        </template>
        <template #default="{ node, data }">
            <span class="group-tree-node">
              <span v-if="!node.edit" @click="node.edit = true" @blur="node.edit = false">
                {{ data.label }}
              </span>
              <el-input v-if="node.edit" style="width: 60%" :ref="node.id+'_input'" size="small"
                        @blur="node.edit = false" v-model="data.label"></el-input>
              <span class="group-tree-node-menu">
                <el-link @click="groupTreeAppend(data)" type="primary"
                         :underline="false">{{ t('groupTree.tree.add') }}</el-link>
                <el-link @click="groupTreeRemove(node, data)" type="danger" :underline="false" style="margin-left: 8px">{{ t('groupTree.tree.remove') }}</el-link>
              </span>
            </span>
        </template>
      </el-tree>
    </el-scrollbar>
  </el-card>
</template>

<style scoped>
.group-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.group-tree-node-menu a {
  margin: 5px 0;
}
</style>