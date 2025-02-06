<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import request from '@/utils/request'
import BackButton from '@/components/common/BackButton.vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// 环境数据
const environmentData = ref({
  airTemperature: 0,
  airHumidity: 0,
  soilTemperature: 0,
  soilMoisture: 0,
  lightIntensity: 0,
  co2Level: 0,
  soilPH: 0,
  soilEC: 0
})

// 图表数据类型定义
interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
    tension: number
    fill: boolean
    yAxisID?: string  // 可选的Y轴ID
  }[]
}

// 图表数据
const chartData = ref<ChartData>({
  labels: [],
  datasets: [
    {
      label: '空气温度(°C)',
      data: [],
      borderColor: '#4CAF50',
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      tension: 0.4,
      fill: true,
      yAxisID: 'y'
    },
    {
      label: '空气湿度(%)',
      data: [],
      borderColor: '#2196F3',
      backgroundColor: 'rgba(33, 150, 243, 0.1)',
      tension: 0.4,
      fill: true,
      yAxisID: 'y1'
    }
  ]
})

// 图表配置
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: 'index'
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
      title: {
        display: true,
        text: '温度(°C)'
      },
      min: 20,
      max: 30,
      ticks: {
        stepSize: 2
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      }
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      title: {
        display: true,
        text: '湿度(%)'
      },
      min: 60,
      max: 80,
      ticks: {
        stepSize: 5
      },
      grid: {
        drawOnChartArea: false
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 12
      }
    }
  },
  plugins: {
    legend: {
      position: 'top' as const
    },
    tooltip: {
      mode: 'index',
      intersect: false
    }
  }
}

// 温室类型定义
interface Greenhouse {
  id: number
  name: string
  area: string
  description?: string
  size?: number
  status: string
  created_at: string
  updated_at: string
}

// 温室列表
const greenhouses = ref<Greenhouse[]>([])

// 当前选中的温室
const currentGreenhouse = ref<Greenhouse | null>(null)

// 按区域分组的温室
const greenhousesByArea = computed(() => {
  const grouped = {} as Record<string, typeof greenhouses.value>
  greenhouses.value.forEach(greenhouse => {
    if (!grouped[greenhouse.area]) {
      grouped[greenhouse.area] = []
    }
    grouped[greenhouse.area].push(greenhouse)
  })
  return grouped
})

// 时间范围选项
const timeRanges = [
  { label: '24小时', value: 'day', interval: 60 },      // 每小时一个点
  { label: '7天', value: 'week', interval: 360 },       // 每6小时一个点
  { label: '30天', value: 'month', interval: 1440 },    // 每天一个点
  { label: '365天', value: 'year', interval: 10080 }    // 每周一个点
]

// 当前选中的时间范围
const currentTimeRange = ref(timeRanges[0])

// 计算时间范围
const calculateTimeRange = (range: string): { startTime: Date, endTime: Date } => {
  const endTime = new Date()
  let startTime = new Date()

  switch (range) {
    case 'day':
      startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000)
      break
    case 'week':
      startTime = new Date(endTime.getTime() - 7 * 24 * 60 * 60 * 1000)
      break
    case 'month':
      startTime = new Date(endTime.getTime() - 30 * 24 * 60 * 60 * 1000)
      break
    case 'year':
      startTime = new Date(endTime.getTime() - 365 * 24 * 60 * 60 * 1000)
      break
  }

  return { startTime, endTime }
}

// 加载温室列表
const loadGreenhouses = async () => {
  try {
    const response = await request.get('/api/greenhouses')
    greenhouses.value = response.data
    if (response.data.length > 0) {
      currentGreenhouse.value = response.data[0]
      // 加载温室详细信息
      // await loadGreenhouseDetail(response.data[0].id)
    }
  } catch (error) {
    console.error('Failed to load greenhouses:', error)
  }
}

// 加载温室详细信息
const loadGreenhouseDetail = async (greenhouseId: number) => {
  try {
    const response = await request.get(`/api/greenhouses/${greenhouseId}`)
    // 更新当前温室的详细信息
    const index = greenhouses.value.findIndex(g => g.id === greenhouseId)
    if (index !== -1) {
      greenhouses.value[index] = response.data
    }
  } catch (error) {
    console.error('Failed to load greenhouse detail:', error)
  }
}

// 格式化日期时间
const formatDateTime = (date: Date): string => {
  return date.toISOString().slice(0, 19).replace('T', ' ')
}

// 格式化图表时间标签
const formatChartLabel = (date: string, range: string): string => {
  const dateObj = new Date(date.replace(' ', 'T'))
  switch (range) {
    case 'day':
      // 24小时显示: 14:30
      return dateObj.toLocaleTimeString('zh-CN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    case 'week':
      // 7天显示: 1月15日
      return dateObj.toLocaleDateString('zh-CN', { 
        month: 'numeric', 
        day: 'numeric'
      }) + ' ' + dateObj.toLocaleTimeString('zh-CN', { hour: '2-digit' })
    case 'month':
      // 30天显示: 1月15日
      return dateObj.toLocaleDateString('zh-CN', { 
        month: 'numeric', 
        day: 'numeric'
      })
    case 'year':
      // 365天显示: 2024年1月
      return dateObj.toLocaleDateString('zh-CN', { 
        year: 'numeric',
        month: 'numeric'
      })
    default:
      return date
  }
}

// 加载温室数据函数
const loadGreenhouseData = async (greenhouseId: number) => {
  try {
    const response = await request.get(`/api/environment/${greenhouseId}`, {
      params: {
        range: currentTimeRange.value.value
      }
    })

    // 更新环境数据
    environmentData.value = response.data.environmentData
    
    // 更新图表数据
    chartData.value = {
      labels: response.data.chartData.labels,
      datasets: [
        {
          ...chartData.value.datasets[0],
          data: response.data.chartData.datasets[0].data
        },
        {
          ...chartData.value.datasets[1],
          data: response.data.chartData.datasets[1].data
        }
      ]
    }
  } catch (error) {
    console.error('Failed to load greenhouse data:', error)
  }
}

// 监听温室切换
watch(currentGreenhouse, async (newGreenhouse) => {
  if (newGreenhouse) {
    await Promise.all([
      // loadGreenhouseDetail(newGreenhouse.id),
      loadGreenhouseData(newGreenhouse.id)
    ])
  }
})

// 监听时间范围变化
watch(currentTimeRange, () => {
  if (currentGreenhouse.value) {
    loadGreenhouseData(currentGreenhouse.value.id)
  }
})

// 初始加载
onMounted(async () => {
  await loadGreenhouses()
})
</script>

<template>
  <div class="environment-view">
    <BackButton />
    <div class="header">
      <h2>环境数据监测</h2>
      <div class="controls">
        <!-- 温室选择器 -->
        <div class="greenhouse-selector">
          <select v-model="currentGreenhouse">
            <optgroup v-for="(houses, area) in greenhousesByArea" 
                     :key="area" 
                     :label="area">
              <option v-for="house in houses" 
                      :key="house.id" 
                      :value="house">
                {{ house.name }}
              </option>
            </optgroup>
          </select>
        </div>
        <!-- 时间范围选择器 -->
        <!-- <div class="time-range-selector">
          <select v-model="currentTimeRange">
            <option v-for="range in timeRanges" 
                    :key="range.value" 
                    :value="range">
              {{ range.label }}
            </option>
          </select>
        </div> -->
      </div>
    </div>
    
    <div class="data-grid">
      <!-- 空气环境 -->
      <section class="data-section">
        <h3>空气环境</h3>
        <div class="data-cards">
          <div class="data-card">
            <div class="data-icon">🌡️</div>
            <div class="data-content">
              <h4>温度</h4>
              <div class="value">{{ environmentData.airTemperature.toFixed(1) }}°C</div>
            </div>
          </div>
          <div class="data-card">
            <div class="data-icon">💧</div>
            <div class="data-content">
              <h4>湿度</h4>
              <div class="value">{{ environmentData.airHumidity.toFixed(1) }}%</div>
            </div>
          </div>
          <div class="data-card">
            <div class="data-icon">☀️</div>
            <div class="data-content">
              <h4>光照强度</h4>
              <div class="value">{{ environmentData.lightIntensity.toFixed(0) }} lux</div>
            </div>
          </div>
          <div class="data-card">
            <div class="data-icon">🌫️</div>
            <div class="data-content">
              <h4>CO2浓度</h4>
              <div class="value">{{ environmentData.co2Level.toFixed(0) }} ppm</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 土壤环境 -->
      <section class="data-section">
        <h3>土壤环境</h3>
        <div class="data-cards">
          <div class="data-card">
            <div class="data-icon">🌡️</div>
            <div class="data-content">
              <h4>温度</h4>
              <div class="value">{{ environmentData.soilTemperature.toFixed(1) }}°C</div>
            </div>
          </div>
          <div class="data-card">
            <div class="data-icon">💧</div>
            <div class="data-content">
              <h4>湿度</h4>
              <div class="value">{{ environmentData.soilMoisture.toFixed(1) }}%</div>
            </div>
          </div>
          <div class="data-card">
            <div class="data-icon">⚡</div>
            <div class="data-content">
              <h4>EC值</h4>
              <div class="value">{{ environmentData.soilEC.toFixed(2) }} ms/cm</div>
            </div>
          </div>
          <div class="data-card">
            <div class="data-icon">🧪</div>
            <div class="data-content">
              <h4>pH值</h4>
              <div class="value">{{ environmentData.soilPH.toFixed(1) }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 图表部分 -->
      <section class="chart-section">
        <div class="chart-header">
          <h3>数据趋势</h3>
          <div class="time-range-selector">
            <select v-model="currentTimeRange">
              <option v-for="range in timeRanges" 
                      :key="range.value" 
                      :value="range">
                {{ range.label }}
              </option>
            </select>
          </div>
        </div>
        <div class="chart-container">
          <Line
            v-if="chartData.labels.length > 0"
            :data="chartData"
            :options="chartOptions"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.environment-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.data-grid {
  display: grid;
  gap: 20px;
}

.data-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.data-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.data-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.data-card:hover {
  transform: translateY(-5px);
}

.data-icon {
  font-size: 2rem;
}

.data-content h4 {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.chart-section {
  margin-top: 20px;
}

.chart-container {
  position: relative;
  height: 400px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  gap: 16px;
  align-items: center;
}

.greenhouse-selector {
  position: relative;
}

.greenhouse-selector select {
  padding: 8px 32px 8px 16px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  appearance: none;
  cursor: pointer;
  min-width: 160px;
}

.greenhouse-selector::after {
  content: '▼';
  font-size: 0.8rem;
  color: #666;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.time-range-selector {
  position: relative;
}

.time-range-selector select {
  padding: 8px 32px 8px 16px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  appearance: none;
  cursor: pointer;
  min-width: 120px;
}

.time-range-selector::after {
  content: '▼';
  font-size: 0.8rem;
  color: #666;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .data-section,
  .chart-section {
    background: #2d2d2d;
  }

  .data-card {
    background: #1a1a1a;
  }

  .data-content h4 {
    color: #bbb;
  }

  .value {
    color: #e5eaf3;
  }

  .chart-container {
    background: #1a1a1a;
  }

  .greenhouse-selector select {
    background: #1a1a1a;
    border-color: #333;
    color: #fff;
  }

  .greenhouse-selector::after {
    color: #888;
  }

  .time-range-selector select {
    background: #1a1a1a;
    border-color: #333;
    color: #fff;
  }

  .time-range-selector::after {
    color: #888;
  }

  select optgroup {
    background: #1a1a1a;
    color: #bbb;
  }

  select option {
    background: #1a1a1a;
    color: #fff;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .environment-view {
    padding: 16px;
  }

  .chart-container {
    height: 300px;
  }

  .header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .controls {
    flex-direction: column;
    gap: 12px;
  }

  .greenhouse-selector select {
    width: 100%;
  }

  .time-range-selector select {
    width: 100%;
  }

  .chart-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .time-range-selector select {
    width: 100%;
  }
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.chart-header h3 {
  margin: 0;
}

.time-range-selector {
  position: relative;
}

.time-range-selector select {
  padding: 6px 28px 6px 12px;
  font-size: 0.9rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  appearance: none;
  cursor: pointer;
  min-width: 100px;
}

.time-range-selector::after {
  content: '▼';
  font-size: 0.7rem;
  color: #666;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
</style> 