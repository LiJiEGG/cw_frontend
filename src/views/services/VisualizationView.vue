<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

// 数据概览
const statistics = ref({
  totalArea: '5000㎡',
  activeGreenhouses: 12,
  totalProduction: '150吨',
  averageYield: '30kg/㎡'
})

// 环境数据
const environmentData = ref({
  temperature: [
    { time: '08:00', value: 22 },
    { time: '10:00', value: 25 },
    { time: '12:00', value: 28 },
    { time: '14:00', value: 27 },
    { time: '16:00', value: 26 },
    { time: '18:00', value: 24 }
  ],
  humidity: [
    { time: '08:00', value: 65 },
    { time: '10:00', value: 60 },
    { time: '12:00', value: 55 },
    { time: '14:00', value: 58 },
    { time: '16:00', value: 62 },
    { time: '18:00', value: 65 }
  ]
})

// 生产数据
const productionData = ref({
  monthly: [
    { month: '1月', value: 12.5 },
    { month: '2月', value: 11.8 },
    { month: '3月', value: 13.2 },
    { month: '4月', value: 14.5 },
    { month: '5月', value: 13.8 },
    { month: '6月', value: 12.9 }
  ],
  quality: {
    excellent: 60,
    good: 30,
    normal: 10
  }
})

// 能耗分析
const energyData = ref({
  electricity: [
    { date: '3-15', value: 280 },
    { date: '3-16', value: 265 },
    { date: '3-17', value: 275 },
    { date: '3-18', value: 290 },
    { date: '3-19', value: 285 },
    { date: '3-20', value: 270 }
  ],
  water: [
    { date: '3-15', value: 12.5 },
    { date: '3-16', value: 11.8 },
    { date: '3-17', value: 12.2 },
    { date: '3-18', value: 13.0 },
    { date: '3-19', value: 12.6 },
    { date: '3-20', value: 11.9 }
  ]
})
</script>

<template>
  <div class="visualization-view">
    <BackButton />
    <h2>可视化平台</h2>
    
    <div class="content">
      <!-- 数据概览 -->
      <section class="statistics-section">
        <div class="stat-grid">
          <div class="stat-card">
            <div class="stat-icon">🏗️</div>
            <div class="stat-info">
              <div class="stat-value">{{ statistics.totalArea }}</div>
              <div class="stat-label">总种植面积</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🏢</div>
            <div class="stat-info">
              <div class="stat-value">{{ statistics.activeGreenhouses }}</div>
              <div class="stat-label">运行温室</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📦</div>
            <div class="stat-info">
              <div class="stat-value">{{ statistics.totalProduction }}</div>
              <div class="stat-label">总产量</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📈</div>
            <div class="stat-info">
              <div class="stat-value">{{ statistics.averageYield }}</div>
              <div class="stat-label">平均产量</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 环境监测 -->
      <section class="monitor-section">
        <h3>环境监测</h3>
        <div class="chart-grid">
          <div class="chart-card">
            <h4>温度变化</h4>
            <div class="chart-container">
              <div class="chart-line">
                <div v-for="(point, index) in environmentData.temperature"
                     :key="index"
                     class="data-point"
                     :style="{ '--value': point.value + '%' }">
                  <span class="point-value">{{ point.value }}°C</span>
                  <span class="point-time">{{ point.time }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="chart-card">
            <h4>湿度变化</h4>
            <div class="chart-container">
              <div class="chart-line">
                <div v-for="(point, index) in environmentData.humidity"
                     :key="index"
                     class="data-point"
                     :style="{ '--value': point.value + '%' }">
                  <span class="point-value">{{ point.value }}%</span>
                  <span class="point-time">{{ point.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 生产数据 -->
      <section class="production-section">
        <h3>生产数据</h3>
        <div class="chart-grid">
          <div class="chart-card">
            <h4>月度产量</h4>
            <div class="chart-container">
              <div class="bar-chart">
                <div v-for="(item, index) in productionData.monthly"
                     :key="index"
                     class="bar-item"
                     :style="{ height: item.value * 4 + 'px' }">
                  <span class="bar-value">{{ item.value }}吨</span>
                  <span class="bar-label">{{ item.month }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="chart-card">
            <h4>品质分布</h4>
            <div class="chart-container">
              <div class="pie-chart">
                <div class="pie-segment excellent"
                     :style="{ '--percentage': productionData.quality.excellent }">
                  优质 {{ productionData.quality.excellent }}%
                </div>
                <div class="pie-segment good"
                     :style="{ '--percentage': productionData.quality.good }">
                  良好 {{ productionData.quality.good }}%
                </div>
                <div class="pie-segment normal"
                     :style="{ '--percentage': productionData.quality.normal }">
                  一般 {{ productionData.quality.normal }}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 能耗分析 -->
      <section class="energy-section">
        <h3>能耗分析</h3>
        <div class="chart-grid">
          <div class="chart-card">
            <h4>用电量</h4>
            <div class="chart-container">
              <div class="line-chart">
                <div v-for="(point, index) in energyData.electricity"
                     :key="index"
                     class="line-point"
                     :style="{ '--value': point.value / 3 + '%' }">
                  <span class="point-value">{{ point.value }}kWh</span>
                  <span class="point-date">{{ point.date }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="chart-card">
            <h4>用水量</h4>
            <div class="chart-container">
              <div class="line-chart">
                <div v-for="(point, index) in energyData.water"
                     :key="index"
                     class="line-point"
                     :style="{ '--value': point.value * 5 + '%' }">
                  <span class="point-value">{{ point.value }}吨</span>
                  <span class="point-date">{{ point.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.visualization-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* 数据概览样式 */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  font-size: 2rem;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  border-radius: 12px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 500;
  color: #2c3e50;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

/* 图表卡片通用样式 */
.chart-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
}

.chart-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.chart-container {
  height: 300px;
  margin-top: 20px;
  position: relative;
}

/* 折线图样式 */
.chart-line {
  height: 100%;
  display: flex;
  align-items: flex-end;
  gap: 20px;
  padding: 20px 0;
  position: relative;
}

.chart-line::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 40px;
  height: 1px;
  background: #eee;
}

.data-point {
  flex: 1;
  height: calc(var(--value) * 1%);
  background: #e3f2fd;
  border-radius: 4px;
  position: relative;
  transition: height 0.3s ease;
}

.point-value {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.85rem;
  color: #666;
}

.point-time {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.85rem;
  color: #666;
}

/* 柱状图样式 */
.bar-chart {
  height: 100%;
  display: flex;
  align-items: flex-end;
  gap: 20px;
  padding: 20px 0;
}

.bar-item {
  flex: 1;
  background: #e8f5e9;
  border-radius: 4px 4px 0 0;
  position: relative;
  transition: height 0.3s ease;
}

.bar-value {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.85rem;
  color: #666;
}

.bar-label {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.85rem;
  color: #666;
}

/* 饼图样式 */
.pie-chart {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: relative;
  margin: 50px auto;
  background: conic-gradient(
    #4caf50 0% var(--excellent),
    #2196f3 var(--excellent) var(--good),
    #ff9800 var(--good) 100%
  );
}

.pie-segment {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  color: white;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .stat-card,
  .chart-card {
    background: #2d2d2d;
  }

  .stat-icon {
    background: #1a1a1a;
  }

  .stat-value {
    color: #fff;
  }

  .stat-label {
    color: #bbb;
  }

  .chart-line::before {
    background: #444;
  }

  .data-point {
    background: #1a2b3c;
  }

  .bar-item {
    background: #1b2e1e;
  }

  .point-value,
  .point-time,
  .bar-value,
  .bar-label {
    color: #bbb;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .chart-grid {
    grid-template-columns: 1fr;
  }

  .chart-container {
    height: 250px;
  }

  .pie-chart {
    width: 150px;
    height: 150px;
  }
}
</style> 