<!--手势解锁-->
<script setup>
import md5 from "js-md5";
import {useDark} from "@vueuse/core";

// 暗黑模式
const darkMode = useDark()

// 声明此组件可能调用的事件
const emit = defineEmits(['complete'])

// 画板
const canvasRef = ref()

// 配置参数
let param = defineProps({
  // 手势组件大小
  size: {
    type: Number,
    default: 300
  },
  // 手势点每排个数
  count: {
    type: Number,
    default: 3
  },
  // 显示手势
  showGesture: {
    type: Boolean,
    default: true
  }
})

// 手势组件配置
const config = reactive({
  // 组件内边框
  padding: param.size * 0.18,
  // 背景色
  background: darkMode.value ? 'rgb(20,20,20)' : '#fff',
  // 验证失败后的颜色
  failColor: '#F56C6C',
  // 验证通过后的颜色
  passColor: '#67C23A',
  // 手势点配置
  point: {
    // 圆心颜色
    color: '#409EFF',
    // 圆心大小
    size: param.size * 0.023,
    // 选中后的配置
    selected: {
      // 可选中范围
      range: param.size * 0.07,
      // 选中后圆心颜色
      color: '#409EFF',
      // 选中后圆心大小
      size: param.size * 0.023,
      // 选中后外圈配置
      madding: {
        // 选中后外圈颜色
        color: '#409EFF',
        // 选中后外圈大小
        size: param.size * 0.07,
        // 选中后外圈线粗细
        lineWidth: 1
      }
    }
  },
  // 手势线配置
  line: {
    // 颜色
    color: '#409EFF',
    // 粗细
    width: 2
  }
})

// 手势点列表
const baseData = ref({})
// 选中的手势点列表
const selectData = ref([])
// 鼠标是否按下
const entering = ref(false)
// 验证状态
const verifyStatus = ref('')

// 画笔
let ctx = null

// 初始化
const init = () => {
  config.background = darkMode.value ? 'rgb(20,20,20)' : '#fff'
  ctx = canvasRef.value.getContext('2d')
  draw()
}

// 绘制手势点组件
const draw = () => {
  // 先初始化组件背景色
  ctx.fillStyle = config.background;
  ctx.fillRect(0, 0, param.size, param.size);

  // 清空手势点
  baseData.value = []
  // 计算手势点间距
  let step = (param.size - config.padding * 2) / (param.count - 1)

  let number = 1;
  for (let i = 0; i < param.count; i++) {
    for (let j = 0; j < param.count; j++) {
      let x = config.padding + j * step;
      let y = config.padding + i * step;
      let halfStep = step / 2

      // 手势点对象
      let point = {
        id: number,
        x: x,
        y: y,
        startX: x - halfStep,
        endX: x + halfStep,
        startY: y - halfStep,
        endY: y + halfStep,
        h: step,
        w: step
      }

      // 绘制点
      drawPoint(point)

      baseData.value[number] = point
      number++
    }
  }
}

// 画点
const drawPoint = (point) => {

  // 判断该点是否选中
  let selected = isSelected(point)

  // 绘制外圈
  if (selected && param.showGesture) {
    ctx.beginPath();
    // 不同状态的颜色
    if (verifyStatus.value === 'fail') {
      ctx.strokeStyle = config.failColor
    } else if (verifyStatus.value === 'pass') {
      ctx.strokeStyle = config.passColor
    } else {
      ctx.strokeStyle = config.point.selected.madding.color;
    }

    ctx.lineWidth = config.point.selected.madding.lineWidth
    ctx.arc(point.x, point.y, config.point.selected.madding.size, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 画圆心
  ctx.beginPath();
  if (selected && param.showGesture) {
    if (verifyStatus.value === 'fail') {
      ctx.fillStyle = config.failColor
    } else if (verifyStatus.value === 'pass') {
      ctx.fillStyle = config.passColor
    } else {
      ctx.fillStyle = config.point.selected.madding.color;
    }
    ctx.arc(point.x, point.y, config.point.selected.size, 0, Math.PI * 2);
  }else{
    ctx.fillStyle = config.point.color
    ctx.arc(point.x, point.y, config.point.size, 0, Math.PI * 2);
  }
  ctx.fill();
}

// 鼠标按下
const canvasDown = () => {
  entering.value = true
}

// 鼠标抬起
const canvasUp = () => {
  if (!entering.value) {
    return
  }
  entering.value = false;

  let selectedPoint = getSelectedPoint()

  if (selectedPoint) {
    let password = md5(selectedPoint);
    emit('complete', password)
  }

  // 重新绘制
  draw()
  drawSelectLine()
}

// 设置验证状态
const setVerifyStatus = (status) => {
  verifyStatus.value = status
  // 重新绘制
  draw()
  drawSelectLine()
  // 状态不为空0.5秒后清空
  if (status) {
    setTimeout(() => {
      verifyStatus.value = ''
      selectData.value = []
      draw()
    }, 500);
  } else {
    selectData.value = []
    draw()
  }
}

// 获取选中的点字符串
const getSelectedPoint = () => {
  let result = ''
  for (let i = 0; i < selectData.value.length; i++) {
    result += selectData.value[i].id + ','
  }
  if (result) {
    result = result.substring(0, result.length - 1)
  }
  return result
}

// 鼠标滑动
const canvasMove = (e) => {
  let moveX = e.offsetX
  let moveY = e.offsetY

  // 绘制手势组件
  draw()
  // 绘制选择线
  drawSelectLine(moveX, moveY)

  if (!entering.value) {
    // 鼠标未未按下
    return
  }

  // 获取鼠标当前所在点
  let point = getPoint(moveX, moveY);
  if (!point) {
    return;
  }

  // 判断 改点是否已经选中过
  let selected = isSelected(point);
  if (selected) {
    // 已经选中过不可重复选择
    return;
  }

  // 添加到选中点中
  selectData.value.push(point)

  // 重绘组件
  draw()
  drawSelectLine(moveX, moveY)
}

// 绘制选择线
const drawSelectLine = (moveX, moveY) => {

  if (!param.showGesture) {
    return;
  }

  // 获取鼠标当先所在点
  let point = getPoint(moveX, moveY);
  // 有悬浮的点且非通过及失败状态
  if (point && verifyStatus.value === '') {
    // 鼠标悬浮到手势点上绘制有颜色的点
    ctx.beginPath();
    ctx.strokeStyle = config.point.selected.madding.color;
    ctx.lineWidth = config.point.selected.madding.lineWidth
    ctx.arc(point.x, point.y, config.point.selected.madding.size, 0, Math.PI * 2);
    ctx.stroke();
  }

  if (selectData.value.length === 0) {
    // 没有选中的点
    return
  }

  // 准备绘制连接线
  ctx.beginPath();
  if (verifyStatus.value === 'fail') {
    ctx.strokeStyle = config.failColor
  } else if (verifyStatus.value === 'pass') {
    ctx.strokeStyle = config.passColor
  } else {
    ctx.strokeStyle = config.line.color
  }

  ctx.lineWidth = config.line.width;
  ctx.lineCap = 'round';

  // 画线
  ctx.moveTo(selectData.value[0].x, selectData.value[0].y);
  for (let i = 1; i < selectData.value.length; i++) {
    ctx.lineTo(selectData.value[i].x, selectData.value[i].y);
  }
  // 鼠标按下且有坐标且无通过或失败状态
  if (entering.value && moveX && moveY && verifyStatus.value === '') {
    ctx.lineTo(moveX, moveY);
  }
  ctx.stroke();
}

// 判断节点是否选中
const isSelected = (point) => {
  for (let i = 0; i < selectData.value.length; i++) {
    if (point.id === selectData.value[i].id) {
      return true
    }
  }
  return false
}

// 根据坐标获取节点
const getPoint = (x, y) => {
  for (let index in baseData.value) {
    let point = baseData.value[index]
    if (
        x > point.startX + config.point.selected.range
        && x < point.endX - config.point.selected.range
        && y > point.startY + config.point.selected.range
        && y < point.endY - config.point.selected.range
    ) {
      return point
    }
  }
}

// 手指移动
const touchmove = (e) => {
  let x = e.touches[0].clientX - canvasRef.value.offsetLeft
  let y = e.touches[0].clientY - canvasRef.value.offsetTop
  canvasMove({offsetX: x, offsetY: y})
}

// 初始化
onMounted(() => {
  init()
})

// 导出方法
defineExpose({
  setVerifyStatus
});
</script>

<template>
  <canvas
      v-if="param.size"
      :width="param.size"
      :height="param.size"
      ref="canvasRef"
      @mousedown="canvasDown"
      @mouseup="canvasUp"
      @mousemove="canvasMove($event)"
      @mouseleave="canvasUp"

      @touchstart="canvasDown"
      @touchend="canvasUp"
      @touchmove="touchmove"
  ></canvas>
</template>

<style scoped>

</style>