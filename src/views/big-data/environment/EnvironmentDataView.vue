<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
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
  airTemperature: 25.6,
  airHumidity: 65,
  soilTemperature: 22.3,
  soilMoisture: 45,
  lightIntensity: 35000,
  co2Level: 450,
  soilPH: 6.5,
  soilEC: 2.1
})

// 图表数据
const chartData = ref({
  labels: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00'],
  datasets: [
    {
      label: '空气温度(°C)',
      data: [23, 24, 25, 26, 25.5, 25.6],
      borderColor: '#4CAF50',
      tension: 0.1,
      fill: false
    },
    {
      label: '空气湿度(%)',
      data: [60, 62, 65, 63, 64, 65],
      borderColor: '#2196F3',
      tension: 0.1,
      fill: false
    }
  ]
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: 'index'
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  },
  plugins: {
    legend: {
      position: 'top' as const
    }
  }
}

// 温室列表
const greenhouses = ref([
  { id: 1, name: '1号温室', area: 'A区' },
  { id: 2, name: '2号温室', area: 'A区' },
  { id: 3, name: '3号温室', area: 'B区' },
  { id: 4, name: '4号温室', area: 'B区' },
  { id: 5, name: '5号温室', area: 'C区' }
])

// 当前选中的温室
const currentGreenhouse = ref(greenhouses.value[0])

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

// 监听温室切换
watch(currentGreenhouse, (newGreenhouse) => {
  // 这里可以根据选中的温室重新获取数据
  loadGreenhouseData(newGreenhouse.id)
})

// 加载温室数据
const loadGreenhouseData = async (greenhouseId: number) => {
  // 模拟加载数据
  // 实际项目中这里应该调用API
  environmentData.value = {
    airTemperature: 25.6 + Math.random() * 2,
    airHumidity: 65 + Math.random() * 5,
    soilTemperature: 22.3 + Math.random() * 2,
    soilMoisture: 45 + Math.random() * 5,
    lightIntensity: 35000 + Math.random() * 1000,
    co2Level: 450 + Math.random() * 20,
    soilPH: 6.5 + Math.random() * 0.5,
    soilEC: 2.1 + Math.random() * 0.3
  }

  // 更新图表数据
  const newTemp = environmentData.value.airTemperature
  const newHumidity = environmentData.value.airHumidity
  
  chartData.value = {
    labels: chartData.value.labels,
    datasets: [
      {
        ...chartData.value.datasets[0],
        data: [...chartData.value.datasets[0].data.slice(1), newTemp]
      },
      {
        ...chartData.value.datasets[1],
        data: [...chartData.value.datasets[1].data.slice(1), newHumidity]
      }
    ]
  }
}

// 初始加载
onMounted(() => {
  loadGreenhouseData(currentGreenhouse.value.id)
})
</script>

<template>
  <div class="environment-view">
    <BackButton />
    <div class="header">
      <h2>环境数据监测</h2>
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
        <h3>数据趋势</h3>
        <div class="chart-container">
          <Line
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

  .greenhouse-selector select {
    width: 100%;
  }
}
</style> 