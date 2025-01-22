<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

// 分析数据
const analysisData = ref({
  production: {
    current: 150,
    target: 180,
    lastMonth: 145,
    trend: 'up'
  },
  quality: {
    excellent: 85,
    good: 12,
    normal: 3
  },
  cost: {
    water: 2500,
    electricity: 3600,
    labor: 8000,
    material: 5000
  }
})
</script>

<template>
  <div class="analysis">
    <BackButton />
    <h2>数据分析</h2>

    <div class="analysis-grid">
      <div class="analysis-card">
        <h3>产量分析</h3>
        <div class="production-info">
          <div class="metric">
            <span class="label">当前产量</span>
            <span class="value">{{ analysisData.production.current }}吨</span>
          </div>
          <div class="metric">
            <span class="label">目标产量</span>
            <span class="value">{{ analysisData.production.target }}吨</span>
          </div>
          <div class="metric">
            <span class="label">环比增长</span>
            <span class="value trend" :class="analysisData.production.trend">
              {{ ((analysisData.production.current - analysisData.production.lastMonth) / analysisData.production.lastMonth * 100).toFixed(1) }}%
            </span>
          </div>
        </div>
      </div>

      <div class="analysis-card">
        <h3>质量分布</h3>
        <div class="quality-info">
          <div class="quality-item">
            <span class="label">优质品</span>
            <div class="progress-bar">
              <div class="progress" :style="{ width: analysisData.quality.excellent + '%' }"></div>
            </div>
            <span class="percentage">{{ analysisData.quality.excellent }}%</span>
          </div>
          <div class="quality-item">
            <span class="label">良品</span>
            <div class="progress-bar">
              <div class="progress" :style="{ width: analysisData.quality.good + '%' }"></div>
            </div>
            <span class="percentage">{{ analysisData.quality.good }}%</span>
          </div>
          <div class="quality-item">
            <span class="label">普通品</span>
            <div class="progress-bar">
              <div class="progress" :style="{ width: analysisData.quality.normal + '%' }"></div>
            </div>
            <span class="percentage">{{ analysisData.quality.normal }}%</span>
          </div>
        </div>
      </div>

      <div class="analysis-card">
        <h3>成本构成</h3>
        <div class="cost-info">
          <div class="cost-item">
            <span class="label">水费</span>
            <span class="value">¥{{ analysisData.cost.water }}</span>
          </div>
          <div class="cost-item">
            <span class="label">电费</span>
            <span class="value">¥{{ analysisData.cost.electricity }}</span>
          </div>
          <div class="cost-item">
            <span class="label">人工</span>
            <span class="value">¥{{ analysisData.cost.labor }}</span>
          </div>
          <div class="cost-item">
            <span class="label">物料</span>
            <span class="value">¥{{ analysisData.cost.material }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.analysis {
  padding: 20px;
}

h2 {
  margin-bottom: 24px;
  color: #2c3e50;
}

.analysis-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.analysis-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.analysis-card h3 {
  margin: 0 0 20px;
  color: #2c3e50;
}

.production-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 20px;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.trend {
  font-weight: bold;
}

.trend.up {
  color: #4caf50;
}

.trend.down {
  color: #f44336;
}

.quality-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.quality-item {
  display: grid;
  grid-template-columns: 80px 1fr 50px;
  align-items: center;
  gap: 10px;
}

.progress-bar {
  height: 8px;
  background: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #4caf50;
  transition: width 0.3s ease;
}

.cost-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.cost-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  h2, h3 {
    color: #e5eaf3;
  }

  .analysis-card {
    background: #2d2d2d;
  }

  .progress-bar {
    background: #1a1a1a;
  }

  .cost-item {
    background: #1a1a1a;
    color: #bbb;
  }

  .label {
    color: #bbb;
  }

  .value {
    color: #e5eaf3;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .analysis {
    padding: 16px;
  }

  .production-info,
  .cost-info {
    grid-template-columns: 1fr;
  }
}
</style> 