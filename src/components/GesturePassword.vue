<script setup>
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
  }
})

// 手势组件配置
const config = reactive({
  // 组件内边框
  padding: param.size * 0.18,
  background: '#fff',
  // 手势点配置
  point: {
    // 圆心颜色
    color: '#333',
    // 圆心大小
    size: param.size * 0.023,
    // 外圈配置
    madding: {
      // 外圈颜色
      color: '#333',
      // 外圈大小
      size: param.size * 0.1,
      // 外圈线粗细
      lineWidth: 0.5
    },
    // 选中配置
    selected: {
      // 选中范围
      range: param.size * 0.07,
      // 选中后圆心颜色
      color: '#333',
      // 选中后圆心大小
      size: param.size * 0.023,
      // 选中后外圈配置
      madding: {
        // 选中后外圈颜色
        color: '#00bbff',
        // 选中后外圈大小
        size: param.size * 0.1,
        // 选中后外圈线粗细
        lineWidth: 1
      }
    }
  },
  // 手势线配置
  line: {
    // 颜色
    color: '#49b1d7',
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

// 画笔
let ctx = null

// 初始化
const init = () => {
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
  // 画圆心
  ctx.beginPath();
  ctx.fillStyle = config.point.color
  ctx.arc(point.x, point.y, config.point.size, 0, Math.PI * 2);
  ctx.fill();

  // 判断该点是否选中
  let selected = isSelected(point)

  // 绘制外圈
  ctx.beginPath();
  if (selected) {
    // 选中情况
    ctx.strokeStyle = config.point.selected.madding.color;
    ctx.lineWidth = config.point.selected.madding.lineWidth
    ctx.arc(point.x, point.y, config.point.selected.madding.size, 0, Math.PI * 2);
  } else {
    // 未选中情况
    ctx.strokeStyle = config.point.madding.color;
    ctx.lineWidth = config.point.madding.lineWidth
    ctx.arc(point.x, point.y, config.point.madding.size, 0, Math.PI * 2);
  }
  ctx.stroke();
}

// 鼠标按下
const canvasDown = () => {
  entering.value = true
}

// 滑动抬起
const canvasUp = () => {
  entering.value = false

  let selectedPoint = getSelectedPoint()
  console.log(selectedPoint)
  // 清空选中的点
  selectData.value = []

  // 重新绘制
  draw()
  drawSelectLine()
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

  // 获取鼠标当先所在点
  let point = getPoint(moveX, moveY);
  if (point) {
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
  ctx.strokeStyle = config.line.color;
  ctx.lineWidth = config.line.width;
  ctx.lineCap = 'round';

  // 画线
  ctx.moveTo(selectData.value[0].x, selectData.value[0].y);
  for (let i = 1; i < selectData.value.length; i++) {
    ctx.lineTo(selectData.value[i].x, selectData.value[i].y);
  }
  if (moveX && moveY) {
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

onMounted(() => {
  init()
})
</script>

<template>
  <canvas
      style="margin-left: 300px"
      v-if="param.size"
      :width="param.size"
      :height="param.size"
      ref="canvasRef"
      @mousedown="canvasDown"
      @mouseup="canvasUp"
      @mousemove="canvasMove($event)"
  ></canvas>
</template>

<style scoped>

</style>