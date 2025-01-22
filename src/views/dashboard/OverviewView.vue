<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import BackButton from '@/components/common/BackButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isFullscreen = ref(false)
const currentTime = ref(new Date().toLocaleString())
let timer: number | null = null

// 更新时间
const updateTime = () => {
  currentTime.value = new Date().toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
}

// 组件挂载时启动定时器
onMounted(() => {
  updateTime() // 立即更新一次
  timer = window.setInterval(updateTime, 1000)
})

// 组件卸载时清除定时器
onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})

// 切换全屏
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
      isFullscreen.value = false
    }
  }
}

// 基础数据
const baseInfo = ref({
  totalGreenhouses: 36,
  activeGreenhouses: 35,
  inactiveGreenhouses: 1,
  deviceTotal: 52,
  deviceOnline: 52,
  deviceOffline: 0
})

// 处理数据
const processData = ref({
  today: {
    harvest: 2.5,
    water: 156.8,
    energy: 1280
  },
  month: {
    harvest: 68.5,
    water: 4350.6,
    energy: 38400
  },
  year: {
    harvest: 850.2,
    water: 52640.8,
    energy: 460800
  }
})

// 告警信息
const alarmInfo = ref({
  total: 4,
  handled: 3,
  pending: 1,
  alarmList: [
    { type: 'warning', message: '3号温室温度偏高', time: '10:30' },
    { type: 'info', message: '自动通风系统已启动', time: '10:31' },
    { type: 'error', message: '12号温室湿度过低', time: '10:35' },
    { type: 'success', message: '灌溉系统运行完成', time: '10:40' }
  ]
})

// 区域数据
const areaData = ref([
  { 
    name: 'A区',
    temperature: 25.6,
    humidity: 65,
    co2: 450,
    light: 35000,
    production: 365.9
  },
  { name: '锦岐区', value: 4150.1 },
  { name: '新泰市', value: 7827.4 },
  { name: '肥城市', value: 1883.6 },
  { name: '宁阳县', value: 1183.7 },
  { name: '东平县', value: 3900.5 }
])

// 环境监测数据
const environmentData = ref({
  indicators: ['温度(°C)', '湿度(%)', 'CO2(ppm)', '光照(lux)'],
  currentValues: [25.6, 65, 450, 35000],
  standardValues: [28, 75, 500, 40000],
  complianceRates: [100, 97.5, 100, 100, 100, 100]
})

// 添加作物生长数据
const cropData = ref({
  currentStage: '果实生长期',
  daysToHarvest: 15,
  growthStatus: '良好',
  predictions: {
    yield: '预计产量：28.5吨/亩',
    quality: '预计优品率：95%',
    harvestDate: '预计收获日期：2024-02-01'
  }
})

// 温室数据
const greenhouses = ref([
  {
    id: 1,
    name: 'A1温室',
    status: 'normal',
    area: '500㎡',
    crop: '黄瓜',
    temperature: 25.6,
    humidity: 65,
    position: { x: 20, y: 20, width: 150, height: 100 }
  },
  {
    id: 2,
    name: 'A2温室',
    status: 'warning',
    area: '500㎡',
    crop: '番茄',
    temperature: 28.3,
    humidity: 70,
    position: { x: 190, y: 20, width: 150, height: 100 }
  },
  // ... 添加更多温室数据
])

// 处理温室点击
const handleGreenhouseClick = (greenhouse: any) => {
  router.push(`/dashboard/greenhouse/${greenhouse.id}`)
}

// 温室分组数据
const greenhouseGroups = ref({
  byArea: [
    { name: 'A区', total: 12, active: 11, warning: 1 },
    { name: 'B区', total: 15, active: 14, warning: 1 },
    { name: 'C区', total: 9, active: 9, warning: 0 }
  ],
  byCrop: [
    { name: '黄瓜', total: 10, active: 9, warning: 1 },
    { name: '番茄', total: 15, active: 14, warning: 1 },
    { name: '草莓', total: 11, active: 11, warning: 0 }
  ]
})

// 异常温室列表
const abnormalGreenhouses = ref([
  {
    id: 'A-3',
    name: 'A3温室',
    type: '温度异常',
    value: '32.5°C',
    status: 'warning',
    time: '10:30'
  },
  {
    id: 'B-5',
    name: 'B5温室',
    type: '湿度过低',
    value: '45%',
    status: 'error',
    time: '10:25'
  }
])

// 生产与经济数据
const productionData = ref({
  harvest: {
    current: 856.5,
    expected: 1200,
    unit: '吨',
    progress: 71.4
  },
  economics: {
    income: 428.5,
    cost: 156.3,
    roi: 174.2,
    unit: '万元'
  },
  resources: {
    water: { used: 12560, total: 15000, unit: 'm³' },
    electricity: { used: 45600, total: 60000, unit: 'kWh' },
    fertilizer: { used: 25.6, total: 30, unit: '吨' }
  }
})

// 多温室对比数据
const greenhouseComparison = ref({
  environments: [
    {
      name: 'A1温室',
      temperature: { value: 25.6, status: 'normal' },
      humidity: { value: 65, status: 'normal' },
      light: { value: 35000, status: 'normal' },
      co2: { value: 450, status: 'normal' }
    },
    {
      name: 'A2温室',
      temperature: { value: 28.3, status: 'warning' },
      humidity: { value: 45, status: 'error' },
      light: { value: 32000, status: 'normal' },
      co2: { value: 480, status: 'normal' }
    },
    {
      name: 'B1温室',
      temperature: { value: 24.8, status: 'normal' },
      humidity: { value: 68, status: 'normal' },
      light: { value: 38000, status: 'normal' },
      co2: { value: 520, status: 'warning' }
    }
  ],
  crops: [
    {
      name: 'A1温室',
      crop: '黄瓜',
      growth: 85,
      yield: 12.5,
      harvestDate: '2024-02-01'
    },
    {
      name: 'A2温室',
      crop: '番茄',
      growth: 75,
      yield: 15.8,
      harvestDate: '2024-02-15'
    },
    {
      name: 'B1温室',
      crop: '草莓',
      growth: 90,
      yield: 8.2,
      harvestDate: '2024-01-25'
    }
  ],
  pests: [
    {
      name: 'A1温室',
      level: 'low',
      type: '粉虱',
      affected: 5
    },
    {
      name: 'A2温室',
      level: 'medium',
      type: '蚜虫',
      affected: 15
    },
    {
      name: 'B1温室',
      level: 'none',
      type: '-',
      affected: 0
    }
  ]
})

// 预警与风险数据
const warningData = ref({
  summary: {
    total: 15,
    critical: 3,
    warning: 8,
    notice: 4
  },
  types: [
    { type: '环境异常', count: 6, percent: 40 },
    { type: '设备故障', count: 4, percent: 27 },
    { type: '病虫害', count: 3, percent: 20 },
    { type: '其他', count: 2, percent: 13 }
  ],
  trends: [
    { date: '12-01', critical: 2, warning: 5, notice: 3 },
    { date: '12-02', critical: 3, warning: 6, notice: 2 },
    { date: '12-03', critical: 1, warning: 8, notice: 4 },
    { date: '12-04', critical: 3, warning: 8, notice: 4 },
    { date: '12-05', critical: 2, warning: 7, notice: 3 }
  ],
  priorities: [
    {
      greenhouse: 'A2温室',
      risk: 'high',
      issues: ['温度持续偏高', '湿度过低'],
      impact: '影响作物生长，需立即处理'
    },
    {
      greenhouse: 'B1温室',
      risk: 'medium',
      issues: ['CO2浓度异常'],
      impact: '可能影响光合作用'
    },
    {
      greenhouse: 'C3温室',
      risk: 'medium',
      issues: ['水泵故障'],
      impact: '影响灌溉系统运行'
    }
  ]
})

// 资源与设备管理数据
const resourceManagement = ref({
  devices: {
    irrigation: [
      { name: 'A1温室', status: 'running', runtime: 156, efficiency: 95 },
      { name: 'A2温室', status: 'idle', runtime: 142, efficiency: 92 },
      { name: 'B1温室', status: 'maintenance', runtime: 98, efficiency: 85 }
    ],
    ventilation: [
      { name: 'A1温室', status: 'running', runtime: 245, efficiency: 98 },
      { name: 'A2温室', status: 'running', runtime: 232, efficiency: 96 },
      { name: 'B1温室', status: 'idle', runtime: 189, efficiency: 94 }
    ]
  },
  resources: {
    water: [
      { name: 'A1温室', allocated: 5000, used: 4250, efficiency: 92 },
      { name: 'A2温室', allocated: 4800, used: 4100, efficiency: 89 },
      { name: 'B1温室', allocated: 4200, used: 3800, efficiency: 94 }
    ],
    electricity: [
      { name: 'A1温室', allocated: 18000, used: 16500, efficiency: 91 },
      { name: 'A2温室', allocated: 17500, used: 15800, efficiency: 88 },
      { name: 'B1温室', allocated: 16000, used: 14900, efficiency: 93 }
    ],
    fertilizer: [
      { name: 'A1温室', allocated: 850, used: 720, efficiency: 95 },
      { name: 'A2温室', allocated: 820, used: 690, efficiency: 92 },
      { name: 'B1温室', allocated: 780, used: 680, efficiency: 96 }
    ]
  },
  energyTrends: [
    { date: '12-01', consumption: 2450, peak: 180, valley: 80 },
    { date: '12-02', consumption: 2580, peak: 195, valley: 75 },
    { date: '12-03', consumption: 2320, peak: 175, valley: 85 },
    { date: '12-04', consumption: 2680, peak: 210, valley: 90 },
    { date: '12-05', consumption: 2420, peak: 185, valley: 82 }
  ]
})
</script>

<template>
  <div class="dashboard-overview">
    <div class="header">
      <div class="title">
        <span class="temp">25.6°C</span>
        <h1>智慧农业温室大棚监控管理平台</h1>
        <div class="header-right">
          <span class="time">{{ currentTime }}</span>
          <button class="fullscreen-btn" @click="toggleFullscreen">
            <span class="icon" :class="{ 'is-fullscreen': isFullscreen }">
              {{ isFullscreen ? '⤓' : '⤢' }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <div class="main-content">
      <!-- 左侧面板 -->
      <div class="left-panel">
        <div class="panel-item greenhouse-info">
          <div class="panel-header">
            <h3>温室大棚信息</h3>
            <div class="refresh-btn">
              <span class="icon">🔄</span>
            </div>
          </div>
          <div class="greenhouse-groups">
            <div class="group-tabs">
              <button class="tab-btn active">区域分组</button>
              <button class="tab-btn">作物分组</button>
            </div>
            <div class="group-content">
              <div class="group-row" v-for="group in greenhouseGroups.byArea" :key="group.name">
                <div class="group-info">
                  <span class="group-name">{{ group.name }}</span>
                  <span class="group-total">{{ group.total }}个</span>
                </div>
                <div class="group-status">
                  <div class="status-bar">
                    <div class="status-segment normal" 
                      :style="{width: `${(group.active/group.total)*100}%`}">
                      {{ group.active }}
                    </div>
                    <div class="status-segment warning" 
                      :style="{width: `${(group.warning/group.total)*100}%`}">
                      {{ group.warning }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="abnormal-list">
            <h4>异常温室 ({{ abnormalGreenhouses.length }})</h4>
            <div class="abnormal-items">
              <div v-for="item in abnormalGreenhouses" 
                :key="item.id" 
                class="abnormal-item"
                :class="item.status">
                <div class="item-header">
                  <span class="item-name">{{ item.name }}</span>
                  <span class="item-time">{{ item.time }}</span>
                </div>
                <div class="item-content">
                  <span class="item-type">{{ item.type }}</span>
                  <span class="item-value">{{ item.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="panel-item production-info">
          <div class="panel-header">
            <h3>生产与经济数据</h3>
            <div class="refresh-btn">
              <span class="icon">🔄</span>
            </div>
          </div>
          <div class="production-overview">
            <!-- 产量统计 -->
            <div class="data-section harvest-stats">
              <h4>产量统计</h4>
              <div class="circular-progress">
                <svg viewBox="0 0 36 36" class="circular-chart">
                  <path d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    stroke-width="2"
                  />
                  <path d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#4caf50"
                    stroke-width="2"
                    :stroke-dasharray="`${productionData.harvest.progress}, 100`"
                  />
                </svg>
                <div class="progress-info">
                  <span class="current">{{ productionData.harvest.current }}</span>
                  <span class="unit">{{ productionData.harvest.unit }}</span>
                  <span class="label">已收获</span>
                </div>
              </div>
              <div class="harvest-target">
                <span>目标产量：{{ productionData.harvest.expected }}{{ productionData.harvest.unit }}</span>
                <span>完成率：{{ productionData.harvest.progress }}%</span>
              </div>
            </div>

            <!-- 投入产出分析 -->
            <div class="data-section economics-analysis">
              <h4>投入产出分析</h4>
              <div class="economics-grid">
                <div class="economics-item">
                  <span class="label">总收入</span>
                  <span class="value income">{{ productionData.economics.income }}
                    <small>{{ productionData.economics.unit }}</small>
                  </span>
                </div>
                <div class="economics-item">
                  <span class="label">总成本</span>
                  <span class="value cost">{{ productionData.economics.cost }}
                    <small>{{ productionData.economics.unit }}</small>
                  </span>
                </div>
                <div class="economics-item">
                  <span class="label">投资回报率</span>
                  <span class="value roi">{{ productionData.economics.roi }}%</span>
                </div>
              </div>
            </div>

            <!-- 资源使用汇总 -->
            <div class="data-section resource-usage">
              <h4>资源使用汇总</h4>
              <div class="resource-list">
                <div class="resource-item" v-for="(resource, key) in productionData.resources" :key="key">
                  <div class="resource-info">
                    <span class="name">{{ key === 'water' ? '水资源' : 
                      key === 'electricity' ? '电力' : '肥料' }}</span>
                    <span class="usage">{{ resource.used }}/{{ resource.total }}{{ resource.unit }}</span>
                  </div>
                  <div class="resource-progress">
                    <div class="progress-bar" 
                      :style="{width: `${(resource.used/resource.total)*100}%`}"
                      :class="key">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="panel-item comparison-info">
          <div class="panel-header">
            <h3>多温室对比</h3>
            <div class="refresh-btn">
              <span class="icon">🔄</span>
            </div>
          </div>
          
          <!-- 环境参数对比 -->
          <div class="comparison-section">
            <h4>环境参数对比</h4>
            <div class="env-comparison">
              <table class="comparison-table">
                <thead>
                  <tr>
                    <th>温室</th>
                    <th>温度(°C)</th>
                    <th>湿度(%)</th>
                    <th>光照(lux)</th>
                    <th>CO2(ppm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="gh in greenhouseComparison.environments" :key="gh.name">
                    <td>{{ gh.name }}</td>
                    <td :class="gh.temperature.status">{{ gh.temperature.value }}</td>
                    <td :class="gh.humidity.status">{{ gh.humidity.value }}</td>
                    <td :class="gh.light.status">{{ gh.light.value }}</td>
                    <td :class="gh.co2.status">{{ gh.co2.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <!-- 产量与长势对比 -->
          <div class="comparison-section">
            <h4>产量与长势对比</h4>
            <div class="crop-comparison">
              <div v-for="gh in greenhouseComparison.crops" :key="gh.name" class="crop-card">
                <div class="crop-header">
                  <span class="crop-name">{{ gh.name }}</span>
                  <span class="crop-type">{{ gh.crop }}</span>
                </div>
                <div class="growth-bar">
                  <div class="growth-progress" :style="{ width: gh.growth + '%' }">
                    {{ gh.growth }}%
                  </div>
                </div>
                <div class="crop-info">
                  <div>预计产量: {{ gh.yield }}吨</div>
                  <div>收获日期: {{ gh.harvestDate }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 病虫害分布 -->
          <div class="comparison-section">
            <h4>病虫害分布</h4>
            <div class="pest-comparison">
              <div v-for="gh in greenhouseComparison.pests" :key="gh.name" 
                class="pest-card" :class="gh.level">
                <div class="pest-header">
                  <span class="pest-location">{{ gh.name }}</span>
                  <span class="pest-level">{{ 
                    gh.level === 'none' ? '无' : 
                    gh.level === 'low' ? '轻度' : 
                    gh.level === 'medium' ? '中度' : '重度'
                  }}</span>
                </div>
                <div class="pest-details">
                  <div>类型: {{ gh.type }}</div>
                  <div>影响面积: {{ gh.affected }}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 中间区域 -->
      <div class="center-panel">
        <div class="process-cards">
          <div class="process-card">
            <div class="card-header">今日数据</div>
            <div class="card-content">
              <div class="data-row">
                <span>采收量：{{ processData.today.harvest }}吨</span>
                <span>用水量：{{ processData.today.water }}m³</span>
                <span>用电量：{{ processData.today.energy }}kWh</span>
              </div>
            </div>
          </div>
          <div class="process-card">
            <div class="card-header">本月数据</div>
            <div class="card-content">
              <div class="data-row">
                <span>采收量：{{ processData.month.harvest }}吨</span>
                <span>用水量：{{ processData.month.water }}m³</span>
                <span>用电量：{{ processData.month.energy }}kWh</span>
              </div>
            </div>
          </div>
          <div class="process-card">
            <div class="card-header">本年数据</div>
            <div class="card-content">
              <div class="data-row">
                <span>采收量：{{ processData.year.harvest }}吨</span>
                <span>用水量：{{ processData.year.water }}m³</span>
                <span>用电量：{{ processData.year.energy }}kWh</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="map-container">
          <div class="greenhouse-map">
            <svg width="100%" height="100%" viewBox="0 0 800 600">
              <!-- 网格背景 -->
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              <!-- 温室区域 -->
              <g v-for="greenhouse in greenhouses" 
                 :key="greenhouse.id" 
                 @click="handleGreenhouseClick(greenhouse)"
                 class="greenhouse-item">
                <rect 
                  :x="greenhouse.position.x" 
                  :y="greenhouse.position.y"
                  :width="greenhouse.position.width"
                  :height="greenhouse.position.height"
                  :class="['greenhouse-rect', greenhouse.status]"
                />
                <text
                  :x="greenhouse.position.x + greenhouse.position.width/2"
                  :y="greenhouse.position.y + greenhouse.position.height/2"
                  class="greenhouse-text">
                  {{ greenhouse.name }}
                </text>
                <!-- 温度湿度指标 -->
                <text
                  :x="greenhouse.position.x + 5"
                  :y="greenhouse.position.y + greenhouse.position.height - 5"
                  class="greenhouse-data">
                  {{ greenhouse.temperature }}°C | {{ greenhouse.humidity }}%
                </text>
              </g>
            </svg>
            
            <div class="map-overlay">
              <div class="legend">
                <div class="legend-item normal">■ 正常运行</div>
                <div class="legend-item warning">■ 需要注意</div>
                <div class="legend-item error">■ 异常警告</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧面板 -->
      <div class="right-panel">
        <div class="panel-item warning-info">
          <div class="panel-header">
            <h3>预警与风险概览</h3>
            <div class="refresh-btn">
              <span class="icon">🔄</span>
            </div>
          </div>
          
          <!-- 预警汇总 -->
          <div class="warning-summary">
            <div class="summary-numbers">
              <div class="number-item total">
                <span class="number">{{ warningData.summary.total }}</span>
                <span class="label">总预警</span>
              </div>
              <div class="number-item critical">
                <span class="number">{{ warningData.summary.critical }}</span>
                <span class="label">严重</span>
              </div>
              <div class="number-item warning">
                <span class="number">{{ warningData.summary.warning }}</span>
                <span class="label">警告</span>
              </div>
              <div class="number-item notice">
                <span class="number">{{ warningData.summary.notice }}</span>
                <span class="label">提示</span>
              </div>
            </div>
            
            <div class="warning-types">
              <div v-for="item in warningData.types" :key="item.type" class="type-item">
                <div class="type-info">
                  <span class="type-name">{{ item.type }}</span>
                  <span class="type-count">{{ item.count }}</span>
                </div>
                <div class="type-progress">
                  <div class="progress-bar" :style="{ width: item.percent + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 风险趋势 -->
          <div class="risk-trends">
            <h4>风险趋势</h4>
            <div class="trend-chart">
              <div v-for="(day, index) in warningData.trends" 
                :key="index" 
                class="day-column">
                <div class="bars">
                  <div class="bar critical" 
                    :style="{ height: day.critical * 10 + 'px' }"></div>
                  <div class="bar warning" 
                    :style="{ height: day.warning * 10 + 'px' }"></div>
                  <div class="bar notice" 
                    :style="{ height: day.notice * 10 + 'px' }"></div>
                </div>
                <span class="date">{{ day.date }}</span>
              </div>
            </div>
          </div>
          
          <!-- 优先处理建议 -->
          <div class="priority-list">
            <h4>优先处理建议</h4>
            <div class="priority-items">
              <div v-for="item in warningData.priorities" 
                :key="item.greenhouse"
                class="priority-item"
                :class="item.risk">
                <div class="item-header">
                  <span class="greenhouse">{{ item.greenhouse }}</span>
                  <span class="risk-level">{{ 
                    item.risk === 'high' ? '高风险' : 
                    item.risk === 'medium' ? '中风险' : '低风险'
                  }}</span>
                </div>
                <div class="issues">
                  <div v-for="(issue, index) in item.issues" 
                    :key="index" 
                    class="issue">{{ issue }}</div>
                </div>
                <div class="impact">{{ item.impact }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 资源与设备管理模块 -->
        <div class="panel-item resource-management">
          <div class="panel-header">
            <h3>资源与设备管理</h3>
            <div class="refresh-btn">
              <span class="icon">🔄</span>
            </div>
          </div>
          
          <!-- 设备运行状态 -->
          <div class="device-status">
            <h4>设备运行状态</h4>
            <div class="device-grid">
              <div class="device-type">
                <h5>灌溉系统</h5>
                <div class="device-list">
                  <div v-for="device in resourceManagement.devices.irrigation" 
                    :key="device.name"
                    class="device-item"
                    :class="device.status">
                    <div class="device-info">
                      <span class="name">{{ device.name }}</span>
                      <span class="status-badge">{{ 
                        device.status === 'running' ? '运行中' :
                        device.status === 'idle' ? '待机' : '维护中'
                      }}</span>
                    </div>
                    <div class="device-metrics">
                      <span>运行时长: {{ device.runtime }}h</span>
                      <span>效率: {{ device.efficiency }}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="device-type">
                <h5>通风设备</h5>
                <div class="device-list">
                  <div v-for="device in resourceManagement.devices.ventilation" 
                    :key="device.name"
                    class="device-item"
                    :class="device.status">
                    <div class="device-info">
                      <span class="name">{{ device.name }}</span>
                      <span class="status-badge">{{ 
                        device.status === 'running' ? '运行中' :
                        device.status === 'idle' ? '待机' : '维护中'
                      }}</span>
                    </div>
                    <div class="device-metrics">
                      <span>运行时长: {{ device.runtime }}h</span>
                      <span>效率: {{ device.efficiency }}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 资源分配状况 -->
          <div class="resource-allocation">
            <h4>资源分配状况</h4>
            <div class="resource-tabs">
              <div v-for="(resources, type) in resourceManagement.resources" 
                :key="type"
                class="resource-section">
                <h5>{{ 
                  type === 'water' ? '水资源' :
                  type === 'electricity' ? '电力' : '肥料'
                }}</h5>
                <div class="resource-list">
                  <div v-for="item in resources" 
                    :key="item.name"
                    class="resource-item">
                    <div class="resource-header">
                      <span class="name">{{ item.name }}</span>
                      <span class="efficiency" 
                        :class="item.efficiency >= 90 ? 'high' : 'medium'">
                        效率: {{ item.efficiency }}%
                      </span>
                    </div>
                    <div class="usage-bar">
                      <div class="usage-progress" 
                        :style="{ width: (item.used/item.allocated*100) + '%' }">
                        {{ item.used }}/{{ item.allocated }}
                        {{ 
                          type === 'water' ? 'm³' :
                          type === 'electricity' ? 'kWh' : 'kg'
                        }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 能源消耗趋势 -->
          <div class="energy-trends">
            <h4>能源消耗趋势</h4>
            <div class="trend-chart">
              <div v-for="(day, index) in resourceManagement.energyTrends" 
                :key="index"
                class="day-column">
                <div class="consumption-bar">
                  <div class="peak-zone" 
                    :style="{ height: day.peak + 'px' }"></div>
                  <div class="normal-zone" 
                    :style="{ height: (day.consumption - day.peak - day.valley) + 'px' }"></div>
                  <div class="valley-zone" 
                    :style="{ height: day.valley + 'px' }"></div>
                </div>
                <span class="date">{{ day.date }}</span>
                <span class="total">{{ day.consumption }}kWh</span>
              </div>
            </div>
            <div class="chart-legend">
              <div class="legend-item peak">■ 峰时用电</div>
              <div class="legend-item normal">■ 平时用电</div>
              <div class="legend-item valley">■ 谷时用电</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-overview {
  min-height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #f0f8f0, #e8f5e8);
  color: #333;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  margin-top: 80px;
}

/* 添加动态背景效果 */
.dashboard-overview::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(76, 175, 80, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(76, 175, 80, 0.1) 0%, transparent 50%);
  animation: pulse 10s ease-in-out infinite;
  z-index: 0;
}

@keyframes pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

.header {
  padding: 20px 20px 0;
  position: relative;
  z-index: 10;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: linear-gradient(90deg, 
    rgba(255,255,255,0.8),
    rgba(76, 175, 80, 0.1),
    rgba(255,255,255,0.8)
  );
  border-radius: 4px;
  border: 1px solid rgba(76, 175, 80, 0.2);
  box-shadow: 0 2px 15px rgba(0,255,0,0.1);
}

.temp, .time {
  font-size: 1.2rem;
  color: #2e7d32;
}

h1 {
  font-size: 1.8rem;
  color: #2e7d32;
  margin: 0;
}

.main-content {
  display: grid;
  grid-template-columns: 400px minmax(600px, 1fr) 400px;
  gap: 20px;
  height: calc(100vh - 160px);
  padding: 20px;
  position: relative;
  z-index: 1;
  overflow-y: auto;
}

/* 响应式布局调整 */
@media (max-width: 1600px) {
  .main-content {
    grid-template-columns: 380px minmax(500px, 1fr) 380px;
  }
}

@media (max-width: 1400px) {
  .main-content {
    grid-template-columns: 350px minmax(450px, 1fr) 350px;
  }
  
  .panel-item {
    padding: 15px;
    min-height: 180px;
  }
}

@media (max-width: 1200px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 15px;
    height: auto;
    min-height: calc(100vh - 160px);
  }
  
  /* 在小屏幕下让左右面板保持合适的宽度 */
  .left-panel,
  .right-panel {
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
  }
}

.panel-item {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(76, 175, 80, 0.2);
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 0;
  height: fit-content;
  min-height: 200px;
  box-shadow: 0 4px 20px rgba(0,255,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.panel-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(0,255,0,0.15);
}

.circle {
  width: 110px;
  height: 110px;
  position: relative;
  background: linear-gradient(145deg, rgba(255,255,255,0.9), rgba(76,175,80,0.1));
  box-shadow: 
    -8px -8px 15px rgba(255,255,255,0.7),
    8px 8px 15px rgba(76,175,80,0.1);
}

/* 添加圆环动画效果 */
.circle::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(
    transparent,
    rgba(76,175,80,0.1),
    transparent 60%
  );
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.number {
  font-size: 1.8rem;
  color: #4caf50;
  position: relative;
  z-index: 1;
}

.label {
  font-size: 0.9rem;
  color: #81c784;
  position: relative;
  z-index: 1;
}

.process-card {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(76, 175, 80, 0.2);
  border-radius: 4px;
  padding: 15px;
  box-shadow: 0 2px 15px rgba(0,255,0,0.1);
  transition: all 0.3s ease;
}

.process-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 20px rgba(0,255,0,0.2);
}

.card-header {
  color: #2e7d32;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.data-row span {
  color: #2e7d32;
  font-size: 1.1rem;
  display: block;
  padding: 8px;
  background: rgba(76, 175, 80, 0.05);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.data-row span:hover {
  background: rgba(76, 175, 80, 0.1);
  transform: scale(1.02);
}

.map-container {
  width: 100%;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(76, 175, 80, 0.2);
  border-radius: 4px;
  height: calc(100% - 120px);
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 25px rgba(0,255,0,0.15);
}

.greenhouse-map {
  width: 100%;
  height: 100%;
  position: relative;
}

.map-overlay {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0,0,0,0.6);
  padding: 10px;
  border-radius: 4px;
}

.legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 0.9rem;
}

.legend-item.normal {
  color: #4caf50;
}

.legend-item.warning {
  color: #faad14;
}

.legend-item.error {
  color: #f44336;
}

.monitor-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  padding: 10px;
}

.monitor-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: rgba(76, 175, 80, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.monitor-item:hover {
  background: rgba(76, 175, 80, 0.1);
  transform: translateX(5px);
}

.crop-info {
  padding: 20px;
  background: rgba(76, 175, 80, 0.05);
  border-radius: 8px;
  display: grid;
  gap: 20px;
}

.growth-stage {
  text-align: center;
  margin-bottom: 20px;
  padding: 10px;
  background: rgba(0,30,60,0.8);
  border-radius: 4px;
}

.growth-stage .value {
  display: block;
  margin-top: 8px;
  font-size: 1.2rem;
  color: #40a9ff;
}

.predictions {
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.prediction-item {
  padding: 15px;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 8px;
  color: #2e7d32;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 80px;
}

.prediction-item:hover {
  background: rgba(76,175,80,0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,255,0,0.15);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 15px;
    height: auto;
    min-height: calc(100vh - 160px);
  }
  
  .process-cards {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .map-container {
    height: 500px;
  }

  .left-panel, .right-panel, .center-panel {
    height: auto;
    overflow: visible;
  }
}

@media (max-width: 768px) {
  .dashboard-overview {
    padding: 0;
  }
  
  .header {
    padding: 10px 10px 0;
  }
  
  .main-content {
    padding: 10px;
  }

  .title h1 {
    font-size: 1.2rem;
  }
  
  .map-container {
    height: 400px;
  }

  .header-right {
    gap: 10px;
  }
  
  .fullscreen-btn {
    width: 28px;
    height: 28px;
  }
  
  .fullscreen-btn .icon {
    font-size: 1rem;
  }
}

/* 温室图样式 */
.greenhouse-item {
  cursor: pointer;
  transition: all 0.3s ease;
}

.greenhouse-item:hover {
  transform: scale(1.02);
}

.greenhouse-rect {
  fill: rgba(255, 255, 255, 0.9);
  stroke: #4caf50;
  stroke-width: 2;
  transition: all 0.3s ease;
}

.greenhouse-rect.normal {
  fill: rgba(76, 175, 80, 0.1);
}

.greenhouse-rect.warning {
  fill: rgba(251, 192, 45, 0.1);
  stroke: #fbc02d;
}

.greenhouse-rect.error {
  fill: rgba(244, 67, 54, 0.1);
  stroke: #f44336;
}

.greenhouse-text {
  fill: #333;
  font-size: 14px;
  text-anchor: middle;
  dominant-baseline: middle;
  pointer-events: none;
}

.greenhouse-data {
  fill: #666;
  font-size: 12px;
  pointer-events: none;
}

/* 添加滚动条样式 */
.left-panel::-webkit-scrollbar,
.right-panel::-webkit-scrollbar,
.center-panel::-webkit-scrollbar,
.main-content::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.left-panel::-webkit-scrollbar-thumb,
.right-panel::-webkit-scrollbar-thumb,
.center-panel::-webkit-scrollbar-thumb,
.main-content::-webkit-scrollbar-thumb {
  background: rgba(76, 175, 80, 0.2);
  border-radius: 3px;
}

.left-panel::-webkit-scrollbar-track,
.right-panel::-webkit-scrollbar-track,
.center-panel::-webkit-scrollbar-track,
.main-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.fullscreen-btn {
  background: none;
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.3s ease;
  color: #2e7d32;
}

.fullscreen-btn:hover {
  background: rgba(76, 175, 80, 0.1);
}

.fullscreen-btn .icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.fullscreen-btn .icon.is-fullscreen {
  transform: rotate(180deg);
}

/* 全屏时的样式调整 */
:fullscreen .dashboard-overview {
  background: linear-gradient(135deg, #f0f8f0, #e8f5e8);
  margin-top: 0;
}

:fullscreen .header {
  padding: 20px 40px 0;
}

:fullscreen .main-content {
  height: calc(100vh - 80px);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.refresh-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(76, 175, 80, 0.1);
}

.refresh-btn:hover {
  background: rgba(76, 175, 80, 0.2);
  transform: rotate(180deg);
}

.info-circles {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.circle {
  width: 110px;
  height: 110px;
  position: relative;
  background: linear-gradient(145deg, rgba(255,255,255,0.9), rgba(76,175,80,0.1));
  box-shadow: 
    -8px -8px 15px rgba(255,255,255,0.7),
    8px 8px 15px rgba(76,175,80,0.1);
}

.trend {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  padding: 2px 8px;
  border-radius: 10px;
  background: rgba(255,255,255,0.9);
}

.trend.up {
  color: #4caf50;
}

.trend.down {
  color: #f44336;
}

.greenhouse-stats {
  margin-top: 30px;
  padding: 15px;
  background: rgba(76,175,80,0.05);
  border-radius: 8px;
}

.stat-item {
  margin-bottom: 15px;
}

.stat-item:last-child {
  margin-bottom: 0;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 5px;
}

.stat-value {
  font-size: 1.1rem;
  color: #2e7d32;
  font-weight: 500;
  margin-bottom: 5px;
}

.stat-progress {
  height: 6px;
  background: rgba(76,175,80,0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #81c784);
  border-radius: 3px;
  transition: width 0.3s ease;
}

/* 添加动画效果 */
@keyframes pulse-shadow {
  0%, 100% {
    box-shadow: 
      -8px -8px 15px rgba(255,255,255,0.7),
      8px 8px 15px rgba(76,175,80,0.1);
  }
  50% {
    box-shadow: 
      -12px -12px 20px rgba(255,255,255,0.8),
      12px 12px 20px rgba(76,175,80,0.15);
  }
}

.circle {
  animation: pulse-shadow 3s ease-in-out infinite;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .info-circles {
    gap: 20px;
  }
  
  .circle {
    width: 100px;
    height: 100px;
  }
}

@media (max-width: 768px) {
  .greenhouse-stats {
    margin-top: 20px;
    padding: 10px;
  }
  
  .stat-value {
    font-size: 1rem;
  }
}

.device-overview {
  display: flex;
  gap: 30px;
  padding: 10px 0;
  justify-content: space-between;
}

.device-total {
  flex: 0 0 180px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.total-circle {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circular-chart {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.circular-chart path:nth-child(2) {
  stroke-linecap: round;
  transition: stroke-dasharray 0.5s ease;
}

.total-number {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}

.big-number {
  font-size: 2rem;
  font-weight: bold;
  color: #2e7d32;
}

.device-stats {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
}

.stat-row {
  display: flex;
  align-items: center;
  gap: 15px;
}

.stat-label {
  flex: 0 0 100px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot.online {
  background: #4caf50;
  box-shadow: 0 0 10px rgba(76,175,80,0.3);
}

.dot.offline {
  background: #ff5252;
  box-shadow: 0 0 10px rgba(255,82,82,0.3);
}

.stat-value {
  flex: 0 0 60px;
  font-size: 1.1rem;
  color: #2e7d32;
  font-weight: 500;
}

.unit {
  font-size: 0.8rem;
  color: #666;
  margin-left: 2px;
}

.stat-progress {
  flex: 1;
  height: 6px;
  background: rgba(76,175,80,0.1);
  border-radius: 3px;
  overflow: hidden;
}

.stat-progress .progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #81c784);
  border-radius: 3px;
  transition: width 0.5s ease;
}

.stat-progress .progress-bar.offline {
  background: linear-gradient(90deg, #ff5252, #ff8a80);
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .device-overview {
    flex-direction: column;
    align-items: center;
  }

  .device-stats {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .stat-row {
    flex-wrap: wrap;
  }

  .stat-label {
    flex: 0 0 auto;
    min-width: 100px;
  }

  .stat-value {
    flex: 1;
  }

  .stat-progress {
    flex: 0 0 100%;
    margin-top: 5px;
  }
}

/* 优化处理卡片布局 */
.process-cards {
  width: 100%;
  margin: 0 auto 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.greenhouse-groups {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.group-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.tab-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background: rgba(76, 175, 80, 0.1);
  color: #2e7d32;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-btn.active {
  background: #4caf50;
  color: white;
}

.group-row {
  margin-bottom: 12px;
  padding: 8px;
  border-radius: 6px;
  background: rgba(76, 175, 80, 0.05);
}

.group-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.group-name {
  font-weight: 500;
  color: #2e7d32;
}

.group-total {
  color: #666;
  font-size: 0.9rem;
}

.status-bar {
  height: 24px;
  background: #f5f5f5;
  border-radius: 12px;
  display: flex;
  overflow: hidden;
}

.status-segment {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.85rem;
  transition: width 0.3s ease;
}

.status-segment.normal {
  background: linear-gradient(90deg, #4caf50, #81c784);
}

.status-segment.warning {
  background: linear-gradient(90deg, #ff9800, #ffb74d);
}

.abnormal-list {
  margin-top: 20px;
}

.abnormal-list h4 {
  color: #2e7d32;
  margin-bottom: 12px;
}

.abnormal-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.abnormal-item {
  padding: 12px;
  border-radius: 6px;
  background: white;
  border-left: 4px solid;
  transition: transform 0.3s ease;
}

.abnormal-item:hover {
  transform: translateX(5px);
}

.abnormal-item.warning {
  border-left-color: #ff9800;
}

.abnormal-item.error {
  border-left-color: #f44336;
}

.item-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.item-name {
  font-weight: 500;
  color: #2e7d32;
}

.item-time {
  color: #666;
  font-size: 0.85rem;
}

.item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-type {
  color: #666;
}

.item-value {
  font-weight: 500;
  color: #f44336;
}

.abnormal-item.warning .item-value {
  color: #ff9800;
}

.production-overview {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.data-section {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 15px;
}

.data-section h4 {
  color: #2e7d32;
  margin-bottom: 15px;
  font-size: 1rem;
}

/* 产量统计样式 */
.harvest-stats {
  text-align: center;
}

.circular-progress {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circular-chart {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transform: rotate(-90deg);
}

.circular-chart path {
  fill: none;
  stroke-width: 2.5;
  stroke-linecap: round;
}

.circular-chart path:first-child {
  stroke: rgba(76, 175, 80, 0.1);
}

.circular-chart path:last-child {
  stroke: #4caf50;
  transition: stroke-dasharray 0.5s ease;
}

.progress-info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.current {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2e7d32;
  line-height: 1;
}

.unit {
  font-size: 0.8rem;
  color: #666;
  margin-top: 2px;
}

.label {
  font-size: 0.9rem;
  color: #666;
  margin-top: 4px;
}

.harvest-target {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
  padding: 0 10px;
}

/* 添加动画效果 */
@keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
}

.circular-chart path:last-child {
  animation: progress 1s ease-out forwards;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .circular-progress {
    width: 100px;
    height: 100px;
  }

  .current {
    font-size: 1.2rem;
  }

  .unit {
    font-size: 0.7rem;
  }

  .label {
    font-size: 0.8rem;
  }
}

/* 投入产出分析样式 */
.economics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.economics-item {
  text-align: center;
  padding: 10px;
  background: rgba(76, 175, 80, 0.05);
  border-radius: 6px;
}

.economics-item .label {
  display: block;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.economics-item .value {
  font-size: 1.2rem;
  font-weight: 500;
}

.economics-item .value small {
  font-size: 0.8rem;
  color: #666;
}

.value.income { color: #4caf50; }
.value.cost { color: #f44336; }
.value.roi { color: #2196f3; }

/* 资源使用汇总样式 */
.resource-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.resource-item {
  background: rgba(76, 175, 80, 0.05);
  border-radius: 6px;
  padding: 10px;
}

.resource-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.resource-info .name {
  color: #2e7d32;
  font-weight: 500;
}

.resource-info .usage {
  color: #666;
  font-size: 0.9rem;
}

.resource-progress {
  height: 6px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.resource-progress .progress-bar {
  height: 100%;
  transition: width 0.3s ease;
}

.progress-bar.water {
  background: linear-gradient(90deg, #2196f3, #64b5f6);
}

.progress-bar.electricity {
  background: linear-gradient(90deg, #ffc107, #ffd54f);
}

.progress-bar.fertilizer {
  background: linear-gradient(90deg, #4caf50, #81c784);
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .economics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .economics-grid {
    grid-template-columns: 1fr;
  }
  
  .resource-info {
    flex-direction: column;
    gap: 5px;
  }
}

/* 多温室对比样式 */
.comparison-section {
  margin-bottom: 20px;
}

.comparison-section h4 {
  color: #2e7d32;
  margin-bottom: 15px;
  font-size: 1rem;
}

/* 环境参数对比表格样式 */
.comparison-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.comparison-table th,
.comparison-table td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid rgba(76, 175, 80, 0.1);
}

.comparison-table th {
  background: rgba(76, 175, 80, 0.1);
  color: #2e7d32;
  font-weight: 500;
}

.comparison-table td.normal {
  color: #2e7d32;
}

.comparison-table td.warning {
  color: #ff9800;
  background: rgba(255, 152, 0, 0.1);
}

.comparison-table td.error {
  color: #f44336;
  background: rgba(244, 67, 54, 0.1);
}

/* 产量与长势对比样式 */
.crop-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.crop-card {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.crop-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.crop-type {
  color: #666;
  font-size: 0.9rem;
}

.growth-bar {
  height: 20px;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
}

.growth-progress {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #81c784);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  transition: width 0.3s ease;
}

.crop-info {
  font-size: 0.9rem;
  color: #666;
}

/* 病虫害分布样式 */
.pest-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
}

.pest-card {
  border-radius: 8px;
  padding: 15px;
  background: white;
}

.pest-card.none {
  border-left: 4px solid #4caf50;
}

.pest-card.low {
  border-left: 4px solid #ff9800;
}

.pest-card.medium {
  border-left: 4px solid #f44336;
}

.pest-card.high {
  border-left: 4px solid #d32f2f;
}

.pest-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.pest-level {
  font-size: 0.9rem;
}

.pest-details {
  font-size: 0.9rem;
  color: #666;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .comparison-table {
    font-size: 0.9rem;
  }
  
  .comparison-table th,
  .comparison-table td {
    padding: 8px;
  }
  
  .crop-comparison,
  .pest-comparison {
    grid-template-columns: 1fr;
  }
}

.time {
  font-size: 1rem;
  color: #2e7d32;
  margin-right: 15px;
  font-family: monospace; /* 使用等宽字体，防止时间跳动 */
  min-width: 200px; /* 固定宽度，防止布局抖动 */
  display: inline-block;
  text-align: center;
}

/* 预警与风险概览样式 */
.warning-summary {
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.summary-numbers {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 15px;
}

.number-item {
  text-align: center;
  padding: 10px;
  border-radius: 6px;
  color: white;
}

.number-item.total { background: #2196f3; }
.number-item.critical { background: #f44336; }
.number-item.warning { background: #ff9800; }
.number-item.notice { background: #4caf50; }

.number-item .number {
  font-size: 1.5rem;
  font-weight: bold;
  display: block;
}

.number-item .label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.warning-types {
  margin-top: 15px;
}

.type-item {
  margin-bottom: 10px;
}

.type-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.type-progress {
  height: 6px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.type-progress .progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #81c784);
  transition: width 0.3s ease;
}

/* 风险趋势图表样式 */
.risk-trends {
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.trend-chart {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 150px;
  padding: 10px 0;
}

.day-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.bars {
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
}

.bar {
  width: 20px;
  border-radius: 2px;
  transition: height 0.3s ease;
}

.bar.critical { background: #f44336; }
.bar.warning { background: #ff9800; }
.bar.notice { background: #4caf50; }

.date {
  margin-top: 5px;
  font-size: 0.8rem;
  color: #666;
}

/* 优先处理建议样式 */
.priority-list {
  background: white;
  border-radius: 8px;
  padding: 15px;
}

.priority-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.priority-item {
  padding: 12px;
  border-radius: 6px;
  background: rgba(76, 175, 80, 0.05);
  border-left: 4px solid;
}

.priority-item.high { border-left-color: #f44336; }
.priority-item.medium { border-left-color: #ff9800; }
.priority-item.low { border-left-color: #4caf50; }

.item-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.greenhouse {
  font-weight: 500;
  color: #2e7d32;
}

.risk-level {
  font-size: 0.9rem;
  color: #666;
}

.issues {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 8px;
}

.issue {
  font-size: 0.9rem;
  color: #666;
  background: rgba(0, 0, 0, 0.05);
  padding: 2px 8px;
  border-radius: 4px;
}

.impact {
  font-size: 0.9rem;
  color: #f44336;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .summary-numbers {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .trend-chart {
    height: 120px;
  }
  
  .bar {
    width: 15px;
  }
}

/* 资源与设备管理样式 */
.resource-management {
  margin-top: 20px;
  background: white;
  border-radius: 8px;
  padding: 20px;
}

.device-status,
.resource-allocation,
.energy-trends {
  margin-bottom: 25px;
}

h4 {
  color: #2e7d32;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

/* 设备状态样式 */
.device-grid {
  display: grid;
  gap: 20px;
}

.device-item {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 15px;
  border-left: 4px solid;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.device-item.running { border-left-color: #4caf50; }
.device-item.idle { border-left-color: #ff9800; }
.device-item.maintenance { border-left-color: #f44336; }

/* 资源分配样式 */
.resource-tabs {
  display: grid;
  gap: 20px;
}

.usage-bar {
  height: 20px;
  background: rgba(0,0,0,0.1);
  border-radius: 10px;
  overflow: hidden;
}

.usage-progress {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #81c784);
  color: white;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 0.3s ease;
}

/* 能源趋势样式 */
.energy-trends {
  background: white;
  border-radius: 8px;
  padding: 15px;
}

.trend-chart {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 200px;
  margin: 20px 0;
  gap: 15px;
}

.day-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.consumption-bar {
  width: 30px;
  display: flex;
  flex-direction: column;
  height: 150px; /* 固定高度 */
  justify-content: flex-end; /* 从底部开始堆叠 */
}

.peak-zone,
.normal-zone,
.valley-zone {
  width: 100%;
  border-radius: 2px;
  transition: height 0.3s ease;
  min-height: 0; /* 确保可以显示很小的值 */
}

.peak-zone { 
  background: #f44336;
  z-index: 3;
}

.normal-zone { 
  background: #4caf50;
  z-index: 2;
}

.valley-zone { 
  background: #2196f3;
  z-index: 1;
}

.date {
  font-size: 0.8rem;
  color: #666;
  text-align: center;
}

.total {
  font-size: 0.8rem;
  color: #2e7d32;
  text-align: center;
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
  font-size: 0.9rem;
  padding: 10px;
  background: rgba(76, 175, 80, 0.05);
  border-radius: 4px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .consumption-bar {
    width: 20px;
    height: 120px;
  }
  
  .trend-chart {
    gap: 10px;
    height: 160px;
  }
  
  .date,
  .total {
    font-size: 0.75rem;
  }
  
  .chart-legend {
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 8px;
  }
}
</style> 