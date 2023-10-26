<script setup>
import ExcelJS from "exceljs";
import FileSaver from "file-saver";
import moment from "moment";
import {useI18n} from "vue-i18n";

const {t} = useI18n()

// 声明此组件可能调用的事件
const emit = defineEmits(['importComplete'])

// 文件上传
const fileUploadInput = ref()
// 标签树
const labelTree = ref()
// 起始id 导入数据时使用时间毫秒作为主键会有重复问题
const startId = ref(0)

// 导入excel触发选择文件
const importExcel = (tree) => {
  fileUploadInput.value.click()
  labelTree.value = tree
}

// 文件选择完成 开始导入
const startImport = async () => {

  // 无文件跳过
  if (fileUploadInput.value.files === 0) {
    return
  }

  // 设置起始id
  startId.value = Date.now()

  // 创建工作簿
  const workbook = new ExcelJS.Workbook();
  workbook.xlsx.load(fileUploadInput.value.files[0]).then(() => {
    workbook.eachSheet(function (worksheet) {
      if (worksheet.rowCount < 2) {
        ElMessage.error(t('importExport.data.empty'))
        fileUploadInput.value.value = ''
        return
      }
      let dataArray = [];
      for (let i = 2; i <= worksheet.rowCount; i++) {
        let row = worksheet.getRow(i)

        // 密码信息
        let name = getText(row.getCell(1).value)
        let address = getText(row.getCell(2).value)
        let userName = getText(row.getCell(3).value)
        let password = getText(row.getCell(4).value)
        let label = getText(row.getCell(5).value)
        let remark = getText(row.getCell(6).value)
        let insertTime = getText(row.getCell(7).value)
        let updateTime = getText(row.getCell(8).value)

        // name 必填
        if (!name) {
          continue;
        }

        dataArray.push({
          id: startId.value++,
          name: name,
          address: address,
          userName: userName,
          password: password,
          remark: remark,
          label: getLabelIdsByNames(label),// 解析标签字段
          insertTime: insertTime,
          updateTime: updateTime
        })
      }
      // 触发成功导入事件
      emit('importComplete', dataArray, labelTree.value)
      // 清空选择文件
      fileUploadInput.value.value = ''
    });
  }).catch(e =>{
    ElMessage.error(e)
    fileUploadInput.value.value = ''
  })
}

// 获取单元格中的文本内容（导入）
const getText = (cellValue) => {
  if (!cellValue) {
    return ''
  }
  if (typeof cellValue === 'object') {
    if (cellValue instanceof Date) {
      return moment(cellValue).format("YYYY-MM-DD HH:mm:ss")
    }
    return cellValue.text;
  }
  return cellValue.toString()
}

// 根据标签名获取标签id，必要时创建新标签（导入）
const getLabelIdsByNames = (str) => {
  if (!str) {
    return ''
  }

  // 标签ids
  let resultIds = []
  let labels = str.split('、')
  for (let i = 0; i < labels.length; i++) {
    // 根据标签名获取标签id
    let labelId = getLabelIdByName(labelTree.value, labels[i], '')
    if (labelId) {
      resultIds.push(labelId);
    } else {
      // 未找到标签开始创建标签
      let labelIds = []
      createLabel(labelTree.value, labels[i].split('>'), 0, labelIds)
      // 将创建好的标签添加到标签组
      for (let j = 0; j < labelIds.length; j++) {
        resultIds.push(labelIds[j]);
      }
    }
  }
  // 去重后返回
  return Array.from(new Set(resultIds));
}

// 根据标签名获取标签id（导入）
const getLabelIdByName = (array, name, parents) => {
  for (let i = 0; i < array.length; i++) {
    let nextParents = parents ? (parents + '>' + array[i].label) : (array[i].label)
    if (name === nextParents) {
      return array[i].id
    }
    if (array[i].children && array[i].children.length > 0) {
      return getLabelIdByName(array[i].children, name, nextParents)
    }
  }
}

// 根据标签名创建标签（导入）
const createLabel = (array, names, level, resultIds) => {
  if (!names[level]) {
    return
  }
  // 先查询标签树中是否存在此标签（有可能只是最后一级标签没有，所以在这先查询）
  for (let i = 0; i < array.length; i++) {
    if (array[i].label === names[level]) {
      if (!names[level + 1]) {
        // 最后一级标签才添加设置为选中标签，
        resultIds.push(array[i].id)
      }
      return createLabel(array[i].children, names, level + 1, resultIds)
    }
  }
  // 新标签
  let label = {
    id: startId.value++,
    label: names[level],
    children: [],
  }
  // 添加到标签树
  array.push(label)

  // 最后一级标签才添加设置为选中标签，
  if (!names[level + 1]) {
    resultIds.push(label.id)
  }

  // 继续创建下一级标签
  createLabel(label.children, names, level + 1, resultIds)
}


// 导出excel
const exportExcel = async (passwordArray, tree) => {

  labelTree.value = tree;
  const workbook = new ExcelJS.Workbook();
  const sheet1 = workbook.addWorksheet('sheet1')

  sheet1.getCell("A1").value = t('password.name')
  sheet1.getCell("B1").value = t('password.address')
  sheet1.getCell("C1").value = t('password.userName')
  sheet1.getCell("D1").value = t('password.password')
  sheet1.getCell("E1").value = t('password.label')
  sheet1.getCell("F1").value = t('password.remark')
  sheet1.getCell("G1").value = t('password.insertTime')
  sheet1.getCell("H1").value = t('password.updateTime')

  for (let i = 0; i < passwordArray.length; i++) {
    let insertTime = passwordArray[i].insertTime
    if (!insertTime) {
      insertTime = moment().format('YYYY-MM-DD HH:mm:ss')
    }
    sheet1.getCell("A" + (i + 2)).value = passwordArray[i].name;
    sheet1.getCell("B" + (i + 2)).value = passwordArray[i].address
    sheet1.getCell("C" + (i + 2)).value = passwordArray[i].userName
    sheet1.getCell("D" + (i + 2)).value = passwordArray[i].password
    sheet1.getCell("E" + (i + 2)).value = getLabelNamesByIds(passwordArray[i].label)
    sheet1.getCell("F" + (i + 2)).value = passwordArray[i].remark
    sheet1.getCell("G" + (i + 2)).value = insertTime
    sheet1.getCell("H" + (i + 2)).value = passwordArray[i].updateTime
  }

  // 下载文件
  workbook.xlsx.writeBuffer().then((buffer) => {
    let _file = new Blob([buffer], {
      type: "application/octet-stream",
    });
    FileSaver.saveAs(_file, t('importExport.exportName') + '_' + moment().format('YYYY-MM-DD HH:mm:ss') + '.xlsx');
  });
}

// 根据标签ids获取标签名（导出）
const getLabelNamesByIds = (labelIds) => {
  if (!labelIds) {
    return ''
  }
  let labelResult = []
  getLabelNameById(labelTree.value, labelIds, labelResult, '')
  return labelResult.join('、');
}

// 根据标签id获取标签名（导出）
const getLabelNameById = (array, ids, result, parents) => {
  for (let i = 0; i < array.length; i++) {
    let nextParents = parents ? (parents + '>' + array[i].label) : (array[i].label)
    if (ids.includes(array[i].id)) {
      result.push(nextParents)
    }
    if (array[i].children && array[i].children.length > 0) {
      getLabelNameById(array[i].children, ids, result, nextParents)
    }
  }
}

// 下载excel模板
const downloadExcelTemplate = () => {
  // 创建工作簿
  const workbook = new ExcelJS.Workbook();
  // 添加工作表
  const sheet1 = workbook.addWorksheet("sheet1");

  // 设置表格内容
  sheet1.getCell("A1").value = t('password.name')
  sheet1.getCell("B1").value = t('password.address')
  sheet1.getCell("C1").value = t('password.userName')
  sheet1.getCell("D1").value = t('password.password')
  sheet1.getCell("E1").value = t('password.label')
  sheet1.getCell("F1").value = t('password.remark')
  sheet1.getCell("G1").value = t('password.insertTime')
  sheet1.getCell("H1").value = t('password.updateTime')

  // 导出表格
  workbook.xlsx.writeBuffer().then((buffer) => {
    let _file = new Blob([buffer], {
      type: "application/octet-stream",
    });
    FileSaver.saveAs(_file, t('importExport.importTemplateName') + '.xlsx');
  });
}

// 导出的方法
defineExpose({
  importExcel,
  exportExcel,
  downloadExcelTemplate,
});
</script>

<template>
  <input
      type="file"
      @change="startImport"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ref="fileUploadInput"
      style="display: none"
  >
</template>

<style scoped>

</style>