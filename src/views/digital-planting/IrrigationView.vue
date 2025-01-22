<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

const irrigationData = ref({
  // 实时监测数据
  monitoring: {
    soil: {
      moisture: 65,
      temperature: 22,
      ec: 2.1,
      ph: 6.2
    },
    water: {
      temperature: 20,
      pressure: 0.3,
      flow: 2.5,
      level: 85
    }
  },
  
  // 水肥配比方案
  solutions: [
    {
      id: 1,
      name: '营养生长期配方',
      active: true,
      nutrients: [
        { name: 'N', value: 180, unit: 'ppm' },
        { name: 'P', value: 45, unit: 'ppm' },
        { name: 'K', value: 210, unit: 'ppm' },
        { name: 'Ca', value: 160, unit: 'ppm' },
        { name: 'Mg', value: 50, unit: 'ppm' }
      ]
    },
    {
      id: 2,
      name: '开花期配方',
      active: false,
      nutrients: [
        { name: 'N', value: 150, unit: 'ppm' },
        { name: 'P', value: 60, unit: 'ppm' },
        { name: 'K', value: 240, unit: 'ppm' },
        { name: 'Ca', value: 180, unit: 'ppm' },
        { name: 'Mg', value: 55, unit: 'ppm' }
      ]
    }
  ],
  
  // 灌溉计划
  schedules: [
    {
      id: 1,
      time: '06:00',
      duration: 15,
      solution: '营养生长期配方',
      status: 'upcoming'
    },
    {
      id: 2,
      time: '12:00',
      duration: 20,
      solution: '营养生长期配方',
      status: 'upcoming'
    },
    {
      id: 3,
      time: '18:00',
      duration: 15,
      solution: '营养生长期配方',
      status: 'upcoming'
    }
  ],
  
  // 调控记录
  records: [
    {
      id: 1,
      time: '2024-03-20 09:15',
      type: '自动调节',
      action: 'EC值自动调整',
      detail: 'EC值从1.8上调至2.1',
      result: 'success'
    },
    {
      id: 2,
      time: '2024-03-20 08:30',
      type: '定时灌溉',
      action: '执行早间灌溉计划',
      detail: '灌溉时长15分钟，水量2.5L/m²',
      result: 'success'
    },
    {
      id: 3,
      time: '2024-03-19 16:45',
      type: '手动调节',
      action: 'pH值调整',
      detail: 'pH值从6.8下调至6.2',
      result: 'warning'
    }
  ]
})
</script>

<template>
  <div class="irrigation-view">
    <BackButton />
    <h2>水肥智能化</h2>
    
    <div class="content">
      <!-- 实时监测 -->
      <section class="monitoring-section">
        <h3>实时监测</h3>
        <div class="monitoring-grid">
          <div class="monitor-group">
            <h4>土壤状态</h4>
            <div class="monitor-cards">
              <div class="monitor-card">
                <div class="monitor-icon">💧</div>
                <div class="monitor-data">
                  <span class="value">{{ irrigationData.monitoring.soil.moisture }}%</span>
                  <span class="label">土壤湿度</span>
                </div>
              </div>
              <div class="monitor-card">
                <div class="monitor-icon">🌡️</div>
                <div class="monitor-data">
                  <span class="value">{{ irrigationData.monitoring.soil.temperature }}°C</span>
                  <span class="label">土壤温度</span>
                </div>
              </div>
              <div class="monitor-card">
                <div class="monitor-icon">⚡</div>
                <div class="monitor-data">
                  <span class="value">{{ irrigationData.monitoring.soil.ec }}ms/cm</span>
                  <span class="label">EC值</span>
                </div>
              </div>
              <div class="monitor-card">
                <div class="monitor-icon">🧪</div>
                <div class="monitor-data">
                  <span class="value">{{ irrigationData.monitoring.soil.ph }}</span>
                  <span class="label">pH值</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="monitor-group">
            <h4>水体状态</h4>
            <div class="monitor-cards">
              <div class="monitor-card">
                <div class="monitor-icon">🌡️</div>
                <div class="monitor-data">
                  <span class="value">{{ irrigationData.monitoring.water.temperature }}°C</span>
                  <span class="label">水温</span>
                </div>
              </div>
              <div class="monitor-card">
                <div class="monitor-icon">📊</div>
                <div class="monitor-data">
                  <span class="value">{{ irrigationData.monitoring.water.pressure }}MPa</span>
                  <span class="label">水压</span>
                </div>
              </div>
              <div class="monitor-card">
                <div class="monitor-icon">🌊</div>
                <div class="monitor-data">
                  <span class="value">{{ irrigationData.monitoring.water.flow }}L/min</span>
                  <span class="label">流量</span>
                </div>
              </div>
              <div class="monitor-card">
                <div class="monitor-icon">📏</div>
                <div class="monitor-data">
                  <span class="value">{{ irrigationData.monitoring.water.level }}%</span>
                  <span class="label">水位</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 水肥配比 -->
      <section class="solution-section">
        <h3>水肥配比方案</h3>
        <div class="solution-cards">
          <div v-for="solution in irrigationData.solutions"
               :key="solution.id"
               class="solution-card"
               :class="{ active: solution.active }">
            <div class="solution-header">
              <h4>{{ solution.name }}</h4>
              <span class="status-badge">{{ solution.active ? '使用中' : '未使用' }}</span>
            </div>
            <div class="nutrients-grid">
              <div v-for="nutrient in solution.nutrients"
                   :key="nutrient.name"
                   class="nutrient-item">
                <span class="nutrient-name">{{ nutrient.name }}</span>
                <span class="nutrient-value">{{ nutrient.value }}{{ nutrient.unit }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 灌溉计划 -->
      <section class="schedule-section">
        <h3>今日灌溉计划</h3>
        <div class="schedule-list">
          <div v-for="schedule in irrigationData.schedules"
               :key="schedule.id"
               class="schedule-item"
               :class="schedule.status">
            <div class="time-info">
              <span class="time">{{ schedule.time }}</span>
              <span class="duration">{{ schedule.duration }}分钟</span>
            </div>
            <div class="schedule-detail">
              <span class="solution-name">{{ schedule.solution }}</span>
            </div>
            <div class="status-tag">{{ 
              schedule.status === 'completed' ? '已完成' :
              schedule.status === 'in-progress' ? '进行中' : '待执行'
            }}</div>
          </div>
        </div>
      </section>

      <!-- 调控记录 -->
      <section class="records-section">
        <h3>调控记录</h3>
        <div class="records-list">
          <div v-for="record in irrigationData.records"
               :key="record.id"
               class="record-item"
               :class="record.result">
            <div class="record-time">{{ record.time }}</div>
            <div class="record-content">
              <div class="record-type">{{ record.type }}</div>
              <div class="record-action">{{ record.action }}</div>
              <div class="record-detail">{{ record.detail }}</div>
            </div>
            <div class="record-result">{{ 
              record.result === 'success' ? '成功' :
              record.result === 'warning' ? '警告' : '失败'
            }}</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.irrigation-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.content {
  display: grid;
  gap: 24px;
}

section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h3 {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 8px;
  border-bottom: 2px solid #4CAF50;
}

/* 监测区域样式 */
.monitoring-grid {
  display: grid;
  gap: 24px;
}

.monitor-group h4 {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 16px;
}

.monitor-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.monitor-card {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
}

.monitor-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.monitor-icon {
  font-size: 2rem;
}

.monitor-data {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.monitor-data .value {
  font-size: 1.4rem;
  font-weight: 600;
  color: #2c3e50;
}

.monitor-data .label {
  font-size: 0.9rem;
  color: #666;
}

/* 配比方案样式 */
.solution-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.solution-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #eee;
  transition: all 0.3s ease;
}

.solution-card.active {
  border-color: #4CAF50;
  background: #f1f8e9;
}

.solution-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.solution-header h4 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.active .status-badge {
  background: #4CAF50;
  color: white;
}

.nutrients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 12px;
}

.nutrient-item {
  text-align: center;
}

.nutrient-name {
  font-weight: 500;
  color: #2c3e50;
}

.nutrient-value {
  display: block;
  color: #666;
  font-size: 0.9rem;
}

/* 灌溉计划样式 */
.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.schedule-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  gap: 20px;
}

.time-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.time {
  font-weight: 500;
  color: #2c3e50;
}

.duration {
  font-size: 0.9rem;
  color: #666;
}

.solution-name {
  color: #2c3e50;
}

.status-tag {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  background: #e0e0e0;
  color: #666;
}

/* 记录列表样式 */
.records-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.record-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  gap: 20px;
  border-left: 4px solid;
}

.record-item.success {
  border-left-color: #4caf50;
}

.record-item.warning {
  border-left-color: #ff9800;
}

.record-item.error {
  border-left-color: #f44336;
}

.record-time {
  color: #666;
  font-size: 0.9rem;
}

.record-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.record-type {
  font-weight: 500;
  color: #2c3e50;
}

.record-action {
  color: #2c3e50;
}

.record-detail {
  font-size: 0.9rem;
  color: #666;
}

.record-result {
  font-size: 0.9rem;
  padding: 4px 8px;
  border-radius: 4px;
}

.success .record-result {
  background: #e8f5e9;
  color: #4caf50;
}

.warning .record-result {
  background: #fff3e0;
  color: #ff9800;
}

.error .record-result {
  background: #ffebee;
  color: #f44336;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  section {
    background: #2d2d2d;
  }

  h3, h4 {
    color: #fff;
  }

  .monitor-card,
  .solution-card,
  .schedule-item,
  .record-item {
    background: #1a1a1a;
  }

  .solution-card.active {
    background: #1b2e1e;
    border-color: #81c784;
  }

  .monitor-data .value,
  .nutrient-name,
  .time,
  .solution-name,
  .record-type,
  .record-action {
    color: #fff;
  }

  .monitor-data .label,
  .nutrient-value,
  .duration,
  .record-time,
  .record-detail {
    color: #bbb;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .monitor-cards {
    grid-template-columns: 1fr;
  }

  .solution-cards {
    grid-template-columns: 1fr;
  }

  .schedule-item,
  .record-item {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .status-tag,
  .record-result {
    justify-self: start;
  }
}
</style> 