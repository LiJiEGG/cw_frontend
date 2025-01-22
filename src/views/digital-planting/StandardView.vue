<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

const standardData = ref({
  standards: [
    {
      id: 1,
      category: '环境控制',
      items: [
        { name: '温度范围', value: '22-28°C', status: 'normal' },
        { name: '湿度控制', value: '60-75%', status: 'warning' },
        { name: '光照强度', value: '30000-40000lux', status: 'normal' },
        { name: 'CO2浓度', value: '400-600ppm', status: 'normal' }
      ]
    },
    {
      id: 2,
      category: '营养管理',
      items: [
        { name: 'EC值', value: '2.0-2.5ms/cm', status: 'normal' },
        { name: 'pH值', value: '5.5-6.5', status: 'alert' },
        { name: '氮含量', value: '150-200ppm', status: 'normal' },
        { name: '钾含量', value: '200-250ppm', status: 'normal' }
      ]
    },
    {
      id: 3,
      category: '生产操作',
      items: [
        { name: '植株密度', value: '3-4株/m²', status: 'normal' },
        { name: '修剪标准', value: '定期去除黄叶', status: 'normal' },
        { name: '授粉要求', value: '每周2-3次', status: 'warning' },
        { name: '采收标准', value: '成熟度>80%', status: 'normal' }
      ]
    }
  ],
  qualityChecks: [
    {
      date: '2024-03-20',
      time: '09:30',
      type: '日常检查',
      items: [
        { name: '叶片颜色', result: '正常', status: 'pass' },
        { name: '茎秆强度', result: '良好', status: 'pass' },
        { name: '病虫害', result: '无', status: 'pass' }
      ]
    },
    {
      date: '2024-03-19',
      time: '15:45',
      type: '营养检测',
      items: [
        { name: '叶片营养', result: '偏低', status: 'fail' },
        { name: '根系活力', result: '正常', status: 'pass' },
        { name: '生长势', result: '良好', status: 'pass' }
      ]
    }
  ]
})
</script>

<template>
  <div class="standard-view">
    <BackButton />
    <h2>标准化生产</h2>
    
    <div class="content">
      <!-- 生产标准 -->
      <section v-for="standard in standardData.standards" 
               :key="standard.id" 
               class="standard-section">
        <h3>{{ standard.category }}</h3>
        <div class="standard-grid">
          <div v-for="item in standard.items"
               :key="item.name"
               class="standard-card"
               :class="item.status">
            <div class="standard-header">
              <span class="name">{{ item.name }}</span>
              <span class="status-indicator"></span>
            </div>
            <div class="value">{{ item.value }}</div>
          </div>
        </div>
      </section>

      <!-- 质量检查记录 -->
      <section class="quality-section">
        <h3>质量检查记录</h3>
        <div class="quality-list">
          <div v-for="check in standardData.qualityChecks"
               :key="check.date + check.time"
               class="quality-card">
            <div class="check-header">
              <div class="check-info">
                <span class="date">{{ check.date }}</span>
                <span class="time">{{ check.time }}</span>
                <span class="type">{{ check.type }}</span>
              </div>
            </div>
            <div class="check-items">
              <div v-for="item in check.items"
                   :key="item.name"
                   class="check-item"
                   :class="item.status">
                <span class="item-name">{{ item.name }}</span>
                <span class="item-result">{{ item.result }}</span>
                <span class="item-status">{{ item.status === 'pass' ? '通过' : '不通过' }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.standard-view {
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

/* 标准卡片样式 */
.standard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.standard-card {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid;
  transition: all 0.3s ease;
}

.standard-card.normal {
  border-left-color: #4caf50;
}

.standard-card.warning {
  border-left-color: #ff9800;
}

.standard-card.alert {
  border-left-color: #f44336;
}

.standard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.name {
  font-weight: 500;
  color: #2c3e50;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.normal .status-indicator {
  background: #4caf50;
}

.warning .status-indicator {
  background: #ff9800;
}

.alert .status-indicator {
  background: #f44336;
}

.value {
  font-size: 1.1rem;
  color: #666;
}

/* 质量检查样式 */
.quality-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.quality-card {
  background: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
}

.check-header {
  padding: 16px;
  background: #eef2f7;
  border-bottom: 1px solid #e1e8ef;
}

.check-info {
  display: flex;
  gap: 16px;
  align-items: center;
}

.date, .time {
  color: #666;
  font-size: 0.9rem;
}

.type {
  font-weight: 500;
  color: #2c3e50;
}

.check-items {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.check-item {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 8px 16px;
  border-radius: 6px;
  background: white;
}

.item-name {
  color: #2c3e50;
}

.item-result {
  color: #666;
}

.item-status {
  font-size: 0.9rem;
  padding: 4px 8px;
  border-radius: 4px;
}

.pass .item-status {
  background: #e8f5e9;
  color: #4caf50;
}

.fail .item-status {
  background: #ffebee;
  color: #f44336;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  section {
    background: #2d2d2d;
  }

  h3 {
    color: #fff;
  }

  .standard-card {
    background: #1a1a1a;
  }

  .name {
    color: #fff;
  }

  .value {
    color: #bbb;
  }

  .quality-card {
    background: #1a1a1a;
  }

  .check-header {
    background: #2d2d2d;
    border-color: #333;
  }

  .check-item {
    background: #2d2d2d;
  }

  .item-name {
    color: #fff;
  }

  .item-result {
    color: #bbb;
  }

  .pass .item-status {
    background: #1b2e1e;
    color: #81c784;
  }

  .fail .item-status {
    background: #2e1c1e;
    color: #e57373;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .standard-grid {
    grid-template-columns: 1fr;
  }

  .check-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .check-item {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .item-status {
    text-align: left;
  }
}
</style> 