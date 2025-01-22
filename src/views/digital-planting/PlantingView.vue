<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

const plantingData = ref({
  environment: {
    temperature: 25.6,
    humidity: 65,
    light: 35000,
    co2: 450
  },
  growth: {
    height: 45.2,
    leafCount: 12,
    stage: '营养生长期',
    health: '良好'
  },
  schedule: [
    {
      id: 1,
      time: '07:00',
      task: '温室通风',
      status: 'completed'
    },
    {
      id: 2,
      time: '09:00',
      task: '营养液配比',
      status: 'in-progress'
    },
    {
      id: 3,
      time: '14:00',
      task: '病虫害检测',
      status: 'pending'
    }
  ]
})

const recommendations = ref([
  {
    id: 1,
    type: 'warning',
    message: '叶面温度偏高，建议增加通风频率',
    time: '10分钟前'
  },
  {
    id: 2,
    type: 'info',
    message: '营养生长良好，可以考虑调整光照时间',
    time: '30分钟前'
  },
  {
    id: 3,
    type: 'success',
    message: '水分管理达标，继续保持当前灌溉方案',
    time: '1小时前'
  }
])
</script>

<template>
  <div class="planting-view">
    <BackButton />
    <h2>数字化种植</h2>
    
    <div class="content">
      <!-- 环境监测 -->
      <section class="monitoring-section">
        <h3>实时环境监测</h3>
        <div class="monitoring-grid">
          <div class="monitor-card">
            <div class="monitor-icon">🌡️</div>
            <div class="monitor-data">
              <span class="value">{{ plantingData.environment.temperature }}°C</span>
              <span class="label">温度</span>
            </div>
          </div>
          
          <div class="monitor-card">
            <div class="monitor-icon">💧</div>
            <div class="monitor-data">
              <span class="value">{{ plantingData.environment.humidity }}%</span>
              <span class="label">湿度</span>
            </div>
          </div>
          
          <div class="monitor-card">
            <div class="monitor-icon">☀️</div>
            <div class="monitor-data">
              <span class="value">{{ plantingData.environment.light }} lux</span>
              <span class="label">光照</span>
            </div>
          </div>
          
          <div class="monitor-card">
            <div class="monitor-icon">🌬️</div>
            <div class="monitor-data">
              <span class="value">{{ plantingData.environment.co2 }} ppm</span>
              <span class="label">CO2浓度</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 生长状态 -->
      <section class="growth-section">
        <h3>作物生长状态</h3>
        <div class="growth-info">
          <div class="info-item">
            <span class="label">株高</span>
            <span class="value">{{ plantingData.growth.height }} cm</span>
          </div>
          <div class="info-item">
            <span class="label">叶片数</span>
            <span class="value">{{ plantingData.growth.leafCount }}</span>
          </div>
          <div class="info-item">
            <span class="label">生长阶段</span>
            <span class="value">{{ plantingData.growth.stage }}</span>
          </div>
          <div class="info-item">
            <span class="label">健康状况</span>
            <span class="value">{{ plantingData.growth.health }}</span>
          </div>
        </div>
      </section>

      <!-- 种植建议 -->
      <section class="recommendations-section">
        <h3>智能种植建议</h3>
        <div class="recommendations-list">
          <div v-for="item in recommendations" 
               :key="item.id"
               class="recommendation-item"
               :class="item.type">
            <div class="recommendation-content">
              <p class="message">{{ item.message }}</p>
              <span class="time">{{ item.time }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 今日任务 -->
      <section class="schedule-section">
        <h3>今日种植任务</h3>
        <div class="schedule-list">
          <div v-for="task in plantingData.schedule"
               :key="task.id"
               class="schedule-item"
               :class="task.status">
            <span class="time">{{ task.time }}</span>
            <span class="task">{{ task.task }}</span>
            <span class="status">{{ 
              task.status === 'completed' ? '已完成' :
              task.status === 'in-progress' ? '进行中' : '待执行'
            }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.planting-view {
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

/* 监测卡片样式 */
.monitoring-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.monitor-card {
  background: #f8f9fa;
  padding: 20px;
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

/* 生长信息样式 */
.growth-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.info-item {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-item .label {
  font-size: 0.9rem;
  color: #666;
}

.info-item .value {
  font-size: 1.2rem;
  color: #2c3e50;
  font-weight: 500;
}

/* 建议列表样式 */
.recommendations-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.recommendation-item {
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid;
}

.recommendation-item.warning {
  background: #fff3e0;
  border-left-color: #ff9800;
}

.recommendation-item.info {
  background: #e3f2fd;
  border-left-color: #2196f3;
}

.recommendation-item.success {
  background: #e8f5e9;
  border-left-color: #4caf50;
}

.recommendation-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.message {
  color: #2c3e50;
  margin: 0;
}

.time {
  font-size: 0.85rem;
  color: #666;
}

/* 任务列表样式 */
.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.schedule-item {
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  align-items: center;
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  gap: 16px;
}

.schedule-item.completed {
  border-left: 4px solid #4caf50;
}

.schedule-item.in-progress {
  border-left: 4px solid #2196f3;
}

.schedule-item.pending {
  border-left: 4px solid #9e9e9e;
}

.schedule-item .time {
  color: #666;
  font-size: 0.9rem;
}

.schedule-item .task {
  color: #2c3e50;
  font-weight: 500;
}

.schedule-item .status {
  text-align: right;
  font-size: 0.9rem;
}

.completed .status {
  color: #4caf50;
}

.in-progress .status {
  color: #2196f3;
}

.pending .status {
  color: #9e9e9e;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  section {
    background: #2d2d2d;
  }

  h3 {
    color: #fff;
  }

  .monitor-card,
  .info-item,
  .schedule-item {
    background: #1a1a1a;
  }

  .monitor-data .value,
  .info-item .value,
  .schedule-item .task {
    color: #fff;
  }

  .monitor-data .label,
  .info-item .label,
  .schedule-item .time {
    color: #bbb;
  }

  .recommendation-item.warning {
    background: #332d1a;
  }

  .recommendation-item.info {
    background: #1a2b3c;
  }

  .recommendation-item.success {
    background: #1b2e1e;
  }

  .message {
    color: #fff;
  }

  .time {
    color: #bbb;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .monitoring-grid,
  .growth-info {
    grid-template-columns: 1fr;
  }

  .schedule-item {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .schedule-item .status {
    text-align: left;
  }
}
</style> 