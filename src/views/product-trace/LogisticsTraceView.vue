<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

// 物流订单信息
const orderInfo = ref({
  id: 'L202403220001',
  product: '有机西红柿酱',
  batch: 'PC202403200001',
  quantity: '500箱',
  from: '智慧农场加工中心',
  to: '城市配送中心',
  carrier: '绿色物流公司',
  vehicle: '冷链车 - 苏A12345',
  driver: '李师傅',
  phone: '138****1234',
  startTime: '2024-03-22 08:00',
  estimatedArrival: '2024-03-22 14:00'
})

// 运输状态
const transportStatus = ref({
  status: 'in-transit', // loading, in-transit, delivered
  currentLocation: '江苏省南京市江宁区',
  temperature: 15.6,
  humidity: 55,
  lastUpdate: '2024-03-22 10:30'
})

// 物流轨迹
const logisticsTrack = ref([
  {
    id: 1,
    time: '2024-03-22 08:00',
    location: '智慧农场加工中心',
    action: '开始装车',
    operator: '张三',
    remark: '货物完好，温度正常'
  },
  {
    id: 2,
    time: '2024-03-22 08:30',
    location: '智慧农场加工中心',
    action: '装车完成',
    operator: '张三',
    remark: '车厢温度预冷完成'
  },
  {
    id: 3,
    time: '2024-03-22 10:30',
    location: '江苏省南京市江宁区',
    action: '运输中',
    operator: '李师傅',
    remark: '正常运输'
  }
])

// 温湿度记录
const environmentRecords = ref([
  {
    time: '08:00',
    temperature: 15.2,
    humidity: 56
  },
  {
    time: '09:00',
    temperature: 15.4,
    humidity: 55
  },
  {
    time: '10:00',
    temperature: 15.5,
    humidity: 54
  },
  {
    time: '11:00',
    temperature: 15.6,
    humidity: 55
  }
])

// 车辆信息
const vehicleInfo = ref({
  plateNumber: '苏A12345',
  type: '冷链运输车',
  capacity: '5吨',
  temperature: '-10°C ~ 25°C',
  lastMaintenance: '2024-03-15',
  nextMaintenance: '2024-04-15',
  insuranceValid: '2024-12-31',
  licenseValid: '2024-12-31'
})

// 生成二维码
const generateQRCode = () => {
  console.log('生成物流溯源二维码')
}

// 导出报告
const exportReport = () => {
  console.log('导出物流溯源报告')
}
</script>

<template>
  <div class="logistics-trace">
    <BackButton />
    <h2>物流溯源</h2>
    
    <div class="content">
      <!-- 物流订单信息 -->
      <section class="order-section">
        <h3>物流订单信息</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">订单编号</span>
            <span class="value">{{ orderInfo.id }}</span>
          </div>
          <div class="info-item">
            <span class="label">产品名称</span>
            <span class="value">{{ orderInfo.product }}</span>
          </div>
          <div class="info-item">
            <span class="label">产品批次</span>
            <span class="value">{{ orderInfo.batch }}</span>
          </div>
          <div class="info-item">
            <span class="label">运输数量</span>
            <span class="value">{{ orderInfo.quantity }}</span>
          </div>
          <div class="info-item">
            <span class="label">发货地</span>
            <span class="value">{{ orderInfo.from }}</span>
          </div>
          <div class="info-item">
            <span class="label">目的地</span>
            <span class="value">{{ orderInfo.to }}</span>
          </div>
          <div class="info-item">
            <span class="label">承运公司</span>
            <span class="value">{{ orderInfo.carrier }}</span>
          </div>
          <div class="info-item">
            <span class="label">运输车辆</span>
            <span class="value">{{ orderInfo.vehicle }}</span>
          </div>
        </div>
      </section>

      <!-- 实时运输状态 -->
      <section class="status-section">
        <h3>实时运输状态</h3>
        <div class="status-card">
          <div class="status-header">
            <span class="status-tag" :class="transportStatus.status">
              {{ 
                transportStatus.status === 'loading' ? '装车中' :
                transportStatus.status === 'in-transit' ? '运输中' : '已送达'
              }}
            </span>
            <span class="update-time">
              最后更新：{{ transportStatus.lastUpdate }}
            </span>
          </div>
          <div class="status-content">
            <div class="location-info">
              <span class="label">当前位置</span>
              <span class="value">{{ transportStatus.currentLocation }}</span>
            </div>
            <div class="environment-info">
              <div class="temp-info">
                <span class="label">车厢温度</span>
                <span class="value">{{ transportStatus.temperature }}°C</span>
              </div>
              <div class="humidity-info">
                <span class="label">车厢湿度</span>
                <span class="value">{{ transportStatus.humidity }}%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 物流轨迹 -->
      <section class="track-section">
        <h3>物流轨迹</h3>
        <div class="track-timeline">
          <div v-for="track in logisticsTrack"
               :key="track.id"
               class="track-item">
            <div class="track-point"></div>
            <div class="track-card">
              <div class="track-header">
                <span class="time">{{ track.time }}</span>
                <span class="action">{{ track.action }}</span>
              </div>
              <div class="track-content">
                <div class="location">{{ track.location }}</div>
                <div class="operator">操作人：{{ track.operator }}</div>
                <div class="remark">备注：{{ track.remark }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 温湿度监控 -->
      <section class="monitor-section">
        <h3>温湿度监控</h3>
        <div class="monitor-chart">
          <!-- 这里可以使用图表组件展示温湿度变化趋势 -->
          <div class="chart-container">
            <!-- 温湿度图表 -->
          </div>
        </div>
        <div class="monitor-list">
          <div v-for="(record, index) in environmentRecords"
               :key="index"
               class="record-item">
            <span class="time">{{ record.time }}</span>
            <span class="temperature">{{ record.temperature }}°C</span>
            <span class="humidity">{{ record.humidity }}%</span>
          </div>
        </div>
      </section>

      <!-- 车辆信息 -->
      <section class="vehicle-section">
        <h3>运输车辆信息</h3>
        <div class="vehicle-info">
          <div class="info-row">
            <span class="label">车牌号</span>
            <span class="value">{{ vehicleInfo.plateNumber }}</span>
          </div>
          <div class="info-row">
            <span class="label">车辆类型</span>
            <span class="value">{{ vehicleInfo.type }}</span>
          </div>
          <div class="info-row">
            <span class="label">载重能力</span>
            <span class="value">{{ vehicleInfo.capacity }}</span>
          </div>
          <div class="info-row">
            <span class="label">温度范围</span>
            <span class="value">{{ vehicleInfo.temperature }}</span>
          </div>
          <div class="info-row">
            <span class="label">上次保养</span>
            <span class="value">{{ vehicleInfo.lastMaintenance }}</span>
          </div>
          <div class="info-row">
            <span class="label">下次保养</span>
            <span class="value">{{ vehicleInfo.nextMaintenance }}</span>
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
/* 使用与其他溯源视图相同的基础样式 */
.logistics-trace {
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

h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 24px;
}

h3 {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 8px;
  border-bottom: 2px solid #4CAF50;
}

h4 {
  font-size: 1.1rem;
  color: #2c3e50;
  margin: 0;
}

.label {
  color: #666;
  font-size: 0.9rem;
}

.value {
  color: #2c3e50;
  font-weight: 500;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

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

/* 运输状态特有样式 */
.status-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.status-tag {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.status-tag.loading {
  background: #fff3e0;
  color: #ff9800;
}

.status-tag.in-transit {
  background: #e3f2fd;
  color: #2196f3;
}

.status-tag.delivered {
  background: #e8f5e9;
  color: #4caf50;
}

.update-time {
  color: #666;
  font-size: 0.9rem;
}

.status-content {
  display: grid;
  gap: 16px;
}

.location-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.environment-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

/* 物流轨迹特有样式 */
.track-timeline {
  position: relative;
  padding-left: 32px;
}

.track-timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e0e0e0;
}

.track-point {
  position: absolute;
  left: -37px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #4CAF50;
  border: 2px solid white;
}

.track-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
}

.track-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.track-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.location {
  font-weight: 500;
  color: #2c3e50;
}

.operator,
.remark {
  color: #666;
  font-size: 0.9rem;
}

/* 温湿度监控特有样式 */
.monitor-list {
  margin-top: 16px;
  display: grid;
  gap: 12px;
}

.record-item {
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  align-items: center;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  gap: 16px;
}

.temperature,
.humidity {
  font-weight: 500;
  color: #2c3e50;
}

/* 深色模式特有样式 */
@media (prefers-color-scheme: dark) {
  .status-card,
  .track-card,
  .record-item {
    background: #1a1a1a;
  }

  .location {
    color: #fff;
  }

  .operator,
  .remark,
  .update-time {
    color: #bbb;
  }

  .temperature,
  .humidity {
    color: #fff;
  }

  .track-timeline::before {
    background: #444;
  }

  .track-point {
    border-color: #2d2d2d;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .environment-info {
    grid-template-columns: 1fr;
  }

  .record-item {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
</style> 