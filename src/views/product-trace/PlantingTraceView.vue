<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

// 产品基本信息
const productInfo = ref({
  id: 'P202403200001',
  name: '有机西红柿',
  variety: '粉果品种',
  batchNo: 'B20240320',
  plantingBase: '智慧农场1号基地',
  plantingArea: '3号温室',
  plantingDate: '2024-01-15',
  harvestDate: '2024-03-20'
})

// 种植过程记录
const plantingRecords = ref([
  {
    id: 1,
    date: '2024-01-15',
    stage: '播种',
    operator: '张三',
    details: '使用优质种子，采用无菌播种技术',
    images: ['seed1.jpg', 'seed2.jpg']
  },
  {
    id: 2,
    date: '2024-02-01',
    stage: '定植',
    operator: '李四',
    details: '株距30cm，行距60cm，定植深度适中',
    images: ['plant1.jpg']
  },
  {
    id: 3,
    date: '2024-02-15',
    stage: '植株管理',
    operator: '王五',
    details: '去除侧芽，加强通风',
    images: ['manage1.jpg']
  }
])

// 农资使用记录
const materialRecords = ref([
  {
    id: 1,
    date: '2024-01-15',
    type: '肥料',
    name: '有机营养液',
    amount: '2.5L/亩',
    supplier: '绿康农资',
    batchNo: 'F20240115'
  },
  {
    id: 2,
    date: '2024-02-10',
    type: '农药',
    name: '生物菌剂',
    amount: '1.2L/亩',
    supplier: '生态农药',
    batchNo: 'N20240210'
  }
])

// 环境监测数据
const environmentData = ref({
  temperature: [
    { time: '08:00', value: 22 },
    { time: '12:00', value: 26 },
    { time: '16:00', value: 24 },
    { time: '20:00', value: 20 }
  ],
  humidity: [
    { time: '08:00', value: 65 },
    { time: '12:00', value: 60 },
    { time: '16:00', value: 62 },
    { time: '20:00', value: 68 }
  ],
  light: [
    { time: '08:00', value: 30000 },
    { time: '12:00', value: 45000 },
    { time: '16:00', value: 35000 },
    { time: '20:00', value: 10000 }
  ]
})

// 生成二维码
const generateQRCode = () => {
  // 实现二维码生成逻辑
  console.log('生成产品溯源二维码')
}

// 导出溯源报告
const exportReport = () => {
  // 实现报告导出逻辑
  console.log('导出溯源报告')
}
</script>

<template>
  <div class="planting-trace">
    <BackButton />
    <h2>种植溯源</h2>
    
    <div class="content">
      <!-- 产品基本信息 -->
      <section class="info-section">
        <h3>产品信息</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">产品编号</span>
            <span class="value">{{ productInfo.id }}</span>
          </div>
          <div class="info-item">
            <span class="label">产品名称</span>
            <span class="value">{{ productInfo.name }}</span>
          </div>
          <div class="info-item">
            <span class="label">品种</span>
            <span class="value">{{ productInfo.variety }}</span>
          </div>
          <div class="info-item">
            <span class="label">批次号</span>
            <span class="value">{{ productInfo.batchNo }}</span>
          </div>
          <div class="info-item">
            <span class="label">种植基地</span>
            <span class="value">{{ productInfo.plantingBase }}</span>
          </div>
          <div class="info-item">
            <span class="label">种植区域</span>
            <span class="value">{{ productInfo.plantingArea }}</span>
          </div>
          <div class="info-item">
            <span class="label">种植日期</span>
            <span class="value">{{ productInfo.plantingDate }}</span>
          </div>
          <div class="info-item">
            <span class="label">采收日期</span>
            <span class="value">{{ productInfo.harvestDate }}</span>
          </div>
        </div>
      </section>

      <!-- 种植过程记录 -->
      <section class="records-section">
        <h3>种植过程</h3>
        <div class="timeline">
          <div v-for="record in plantingRecords"
               :key="record.id"
               class="timeline-item">
            <div class="time-point"></div>
            <div class="record-card">
              <div class="record-header">
                <span class="date">{{ record.date }}</span>
                <span class="stage">{{ record.stage }}</span>
              </div>
              <div class="record-content">
                <p class="operator">操作人：{{ record.operator }}</p>
                <p class="details">{{ record.details }}</p>
                <div class="image-list">
                  <div v-for="(image, index) in record.images"
                       :key="index"
                       class="image-item">
                    {{ image }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 农资使用记录 -->
      <section class="materials-section">
        <h3>农资使用记录</h3>
        <div class="materials-list">
          <div v-for="material in materialRecords"
               :key="material.id"
               class="material-card">
            <div class="material-header">
              <span class="type">{{ material.type }}</span>
              <span class="date">{{ material.date }}</span>
            </div>
            <div class="material-content">
              <div class="material-info">
                <span class="name">{{ material.name }}</span>
                <span class="amount">用量：{{ material.amount }}</span>
              </div>
              <div class="material-detail">
                <span class="supplier">供应商：{{ material.supplier }}</span>
                <span class="batch">批次号：{{ material.batchNo }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 环境监测数据 -->
      <section class="environment-section">
        <h3>生长环境数据</h3>
        <div class="charts-grid">
          <!-- 这里可以使用图表组件展示环境数据 -->
          <div class="chart-card">
            <h4>温度变化</h4>
            <div class="chart-container">
              <!-- 温度图表 -->
            </div>
          </div>
          <div class="chart-card">
            <h4>湿度变化</h4>
            <div class="chart-container">
              <!-- 湿度图表 -->
            </div>
          </div>
          <div class="chart-card">
            <h4>光照变化</h4>
            <div class="chart-container">
              <!-- 光照图表 -->
            </div>
          </div>
        </div>
      </section>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <button class="btn primary" @click="generateQRCode">
          生成溯源二维码
        </button>
        <button class="btn secondary" @click="exportReport">
          导出溯源报告
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.planting-trace {
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

/* 信息网格样式 */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label {
  color: #666;
  font-size: 0.9rem;
}

.value {
  color: #2c3e50;
  font-weight: 500;
}

/* 时间线样式 */
.timeline {
  position: relative;
  padding-left: 32px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e0e0e0;
}

.timeline-item {
  position: relative;
  margin-bottom: 24px;
}

.time-point {
  position: absolute;
  left: -37px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #4CAF50;
  border: 2px solid white;
}

.record-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
}

.record-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.date {
  color: #666;
  font-size: 0.9rem;
}

.stage {
  color: #4CAF50;
  font-weight: 500;
}

.operator {
  color: #2c3e50;
  margin: 0 0 8px 0;
}

.details {
  color: #666;
  margin: 0;
}

.image-list {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.image-item {
  width: 80px;
  height: 80px;
  background: #e0e0e0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 0.8rem;
}

/* 农资记录样式 */
.materials-list {
  display: grid;
  gap: 16px;
}

.material-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
}

.material-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.type {
  color: #4CAF50;
  font-weight: 500;
}

.material-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.material-detail {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
}

/* 环境数据样式 */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.chart-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
}

.chart-container {
  height: 200px;
  background: #fff;
  border-radius: 4px;
  margin-top: 12px;
}

/* 按钮样式 */
.action-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 24px;
}

.btn {
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn.primary {
  background: #4CAF50;
  color: white;
}

.btn.secondary {
  background: #f8f9fa;
  color: #2c3e50;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  section {
    background: #2d2d2d;
  }

  h3 {
    color: #fff;
  }

  .value {
    color: #fff;
  }

  .record-card,
  .material-card,
  .chart-card {
    background: #1a1a1a;
  }

  .timeline::before {
    background: #444;
  }

  .time-point {
    border-color: #2d2d2d;
  }

  .operator {
    color: #fff;
  }

  .details,
  .material-detail {
    color: #bbb;
  }

  .btn.secondary {
    background: #1a1a1a;
    color: #fff;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }

  .material-info,
  .material-detail {
    flex-direction: column;
    gap: 4px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style> 