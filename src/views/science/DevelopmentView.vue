<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

// 发展趋势数据
const trends = ref([
  {
    id: 1,
    title: '智慧农业',
    icon: '🌐',
    content: '利用物联网、大数据、人工智能等技术，实现农业生产的智能化和精准化管理。',
    details: [
      '智能监测与控制系统',
      '农业机器人与自动化设备',
      '精准农业决策支持系统'
    ]
  },
  {
    id: 2,
    title: '绿色农业',
    icon: '🌱',
    content: '发展环保、可持续的农业生产模式，减少农药化肥使用，保护生态环境。',
    details: [
      '有机农业技术',
      '生物防治技术',
      '农业废弃物循环利用'
    ]
  },
  {
    id: 3,
    title: '设施农业',
    icon: '🏗️',
    content: '发展现代化农业设施，提高农业生产效率和抗风险能力。',
    details: [
      '智能温室技术',
      '水培气培技术',
      '立体种植技术'
    ]
  }
])

// 发展数据
const statistics = ref({
  totalArea: '17.6亿亩',
  outputValue: '7.8万亿',
  techContribution: '60.8%',
  greenRate: '45.3%'
})
</script>

<template>
  <div class="development-view">
    <BackButton />
    
    <div class="content-section">
      <h2>农业发展趋势</h2>
      
      <div class="trends-grid">
        <div v-for="trend in trends" 
             :key="trend.id"
             class="trend-card">
          <div class="trend-header">
            <span class="trend-icon">{{ trend.icon }}</span>
            <h3>{{ trend.title }}</h3>
          </div>
          <p class="trend-content">{{ trend.content }}</p>
          <ul class="trend-details">
            <li v-for="(detail, index) in trend.details" 
                :key="index">
              {{ detail }}
            </li>
          </ul>
        </div>
      </div>

      <div class="statistics-section">
        <h2>发展概况</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">{{ statistics.totalArea }}</div>
            <div class="stat-label">耕地总面积</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ statistics.outputValue }}</div>
            <div class="stat-label">农业总产值</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ statistics.techContribution }}</div>
            <div class="stat-label">科技贡献率</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ statistics.greenRate }}</div>
            <div class="stat-label">绿色发展率</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.development-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.content-section {
  margin-top: 20px;
}

h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 24px;
  font-weight: 600;
}

.trends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.trend-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  transition: all 0.3s ease;
}

.trend-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.trend-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.trend-icon {
  font-size: 24px;
}

.trend-card h3 {
  color: #2c3e50;
  font-size: 1.3rem;
  margin: 0;
  font-weight: 600;
}

.trend-content {
  color: #666;
  line-height: 1.6;
  margin-bottom: 16px;
}

.trend-details {
  list-style: none;
  padding: 0;
  margin: 0;
}

.trend-details li {
  color: #666;
  padding: 8px 0;
  padding-left: 20px;
  position: relative;
}

.trend-details li::before {
  content: "•";
  color: #4CAF50;
  position: absolute;
  left: 0;
}

.statistics-section {
  margin-top: 40px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.stat-value {
  color: #4CAF50;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.stat-label {
  color: #666;
  font-size: 1rem;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  h2 {
    color: #e5eaf3;
  }

  .trend-card,
  .stat-card {
    background: #2d2d2d;
    border-color: #333;
  }

  .trend-card h3 {
    color: #e5eaf3;
  }

  .trend-content,
  .trend-details li {
    color: #bbb;
  }

  .stat-value {
    color: #81c784;
  }

  .stat-label {
    color: #bbb;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .development-view {
    padding: 16px;
  }

  h2 {
    font-size: 1.5rem;
  }

  .trend-card h3 {
    font-size: 1.2rem;
  }

  .stat-value {
    font-size: 1.5rem;
  }
}
</style> 