<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

// 设备数据
const deviceData = ref({
  // 运行状态
  status: {
    title: '运行状态',
    items: [
      { 
        id: 1,
        name: '温度传感器',
        status: 'running',
        uptime: '72小时',
        lastMaintenance: '2024-03-18',
        battery: '85%',
        signal: '良好'
      },
      { 
        id: 2,
        name: '湿度传感器',
        status: 'running',
        uptime: '48小时',
        lastMaintenance: '2024-03-19',
        battery: '92%',
        signal: '优秀'
      },
      { 
        id: 3,
        name: '光照传感器',
        status: 'warning',
        uptime: '168小时',
        lastMaintenance: '2024-03-15',
        battery: '15%',
        signal: '一般'
      }
    ]
  },
  // 能耗数据
  energy: {
    title: '能耗数据',
    current: {
      daily: '5.2 kWh',
      monthly: '156 kWh',
      trend: '+3.5%'
    },
    history: [
      { time: '00:00', value: 4.2 },
      { time: '04:00', value: 3.8 },
      { time: '08:00', value: 5.5 },
      { time: '12:00', value: 6.2 },
      { time: '16:00', value: 5.8 },
      { time: '20:00', value: 4.9 }
    ],
    devices: [
      { name: '温度传感器', value: '1.2 kWh', percentage: 25 },
      { name: '湿度传感器', value: '0.8 kWh', percentage: 15 },
      { name: '光照传感器', value: '3.2 kWh', percentage: 60 }
    ]
  },
  // 控制参数
  controls: {
    title: '控制参数',
    parameters: [
      { 
        name: '采样频率', 
        value: '30', 
        unit: '秒',
        min: 10,
        max: 60,
        step: 5,
        adjustable: true 
      },
      { 
        name: '数据上报间隔', 
        value: '5', 
        unit: '分钟',
        min: 1,
        max: 30,
        step: 1,
        adjustable: true 
      },
      { 
        name: '警报阈值', 
        value: '80', 
        unit: '%',
        min: 60,
        max: 90,
        step: 5,
        adjustable: true 
      }
    ]
  },
  // 告警信息
  alerts: {
    title: '告警信息',
    current: [
      {
        id: 1,
        type: '设备告警',
        level: 'warning',
        message: '光照传感器电量低',
        time: '2024-03-21 16:30',
        device: '光照传感器',
        status: 'unhandled'
      },
      {
        id: 2,
        type: '系统告警',
        level: 'critical',
        message: '数据异常波动',
        time: '2024-03-21 15:45',
        device: '温度传感器',
        status: 'processing'
      }
    ],
    statistics: {
      total: 12,
      unhandled: 3,
      processing: 2,
      resolved: 7,
      byLevel: {
        critical: 2,
        warning: 5,
        info: 5
      }
    }
  }
});

// 处理告警
const handleAlert = (alertId: number, action: 'process' | 'resolve') => {
  const alert = deviceData.value.alerts.current.find(a => a.id === alertId);
  if (alert) {
    alert.status = action === 'process' ? 'processing' : 'resolved';
  }
};

// 更新控制参数
const updateParameter = (paramName: string, value: string) => {
  const param = deviceData.value.controls.parameters.find(p => p.name === paramName);
  if (param) {
    param.value = value;
  }
};

// 重启设备
const restartDevice = (deviceId: number) => {
  const device = deviceData.value.status.items.find(item => item.id === deviceId);
  if (device) {
    device.status = 'restarting';
    setTimeout(() => {
      device.status = 'running';
      device.uptime = '0小时';
    }, 3000);
  }
};

onMounted(() => {
  // 初始化图表等
});
</script>

<template>
  <div class="device-view">
    <BackButton />
    <h2>设备数据</h2>

    <div class="data-grid">
      <!-- 运行状态 -->
      <section class="data-section">
        <h3>{{ deviceData.status.title }}</h3>
        <div class="status-list">
          <div v-for="item in deviceData.status.items" 
               :key="item.id"
               class="status-card"
               :class="item.status">
            <div class="status-header">
              <h4>{{ item.name }}</h4>
              <div class="status-badge">{{ item.status === 'running' ? '运行中' : '异常' }}</div>
            </div>
            <div class="status-info">
              <div class="info-item">
                <span class="label">运行时长</span>
                <span class="value">{{ item.uptime }}</span>
              </div>
              <div class="info-item">
                <span class="label">最近维护</span>
                <span class="value">{{ item.lastMaintenance }}</span>
              </div>
              <div class="info-item">
                <span class="label">电池电量</span>
                <span class="value" :class="{ 'low': parseInt(item.battery) < 20 }">
                  {{ item.battery }}
                </span>
              </div>
              <div class="info-item">
                <span class="label">信号强度</span>
                <span class="value">{{ item.signal }}</span>
              </div>
            </div>
            <div class="status-actions">
              <button class="action-btn" @click="restartDevice(item.id)">
                重启设备
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 能耗数据 -->
      <section class="data-section">
        <h3>{{ deviceData.energy.title }}</h3>
        <div class="energy-overview">
          <div class="energy-card">
            <div class="energy-header">
              <h4>今日用电</h4>
              <div class="trend" :class="deviceData.energy.current.trend.startsWith('+') ? 'up' : 'down'">
                {{ deviceData.energy.current.trend }}
              </div>
            </div>
            <div class="energy-value">{{ deviceData.energy.current.daily }}</div>
          </div>
          <div class="energy-card">
            <h4>本月用电</h4>
            <div class="energy-value">{{ deviceData.energy.current.monthly }}</div>
          </div>
        </div>
        <div class="energy-chart">
          <!-- 这里可以添加能耗图表 -->
        </div>
        <div class="device-energy">
          <h4>设备能耗占比</h4>
          <div class="energy-bars">
            <div v-for="device in deviceData.energy.devices" 
                 :key="device.name" 
                 class="energy-bar">
              <div class="bar-label">{{ device.name }}</div>
              <div class="bar-wrapper">
                <div class="bar" :style="{ width: device.percentage + '%' }"></div>
              </div>
              <div class="bar-value">{{ device.value }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 控制参数 -->
      <section class="data-section">
        <h3>{{ deviceData.controls.title }}</h3>
        <div class="parameters-list">
          <div v-for="param in deviceData.controls.parameters" 
               :key="param.name"
               class="parameter-card">
            <div class="parameter-header">
              <h4>{{ param.name }}</h4>
              <div class="parameter-value">{{ param.value }}{{ param.unit }}</div>
            </div>
            <div class="parameter-control">
              <input v-if="param.adjustable"
                     type="range"
                     :min="param.min"
                     :max="param.max"
                     :step="param.step"
                     :value="param.value"
                     @input="updateParameter(param.name, $event.target.value)">
              <div class="range-labels">
                <span>{{ param.min }}{{ param.unit }}</span>
                <span>{{ param.max }}{{ param.unit }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 告警信息 -->
      <section class="data-section">
        <h3>{{ deviceData.alerts.title }}</h3>
        <div class="alerts-overview">
          <div class="alert-stats">
            <div class="stat-card">
              <div class="stat-value">{{ deviceData.alerts.statistics.total }}</div>
              <div class="stat-label">总计</div>
            </div>
            <div class="stat-card warning">
              <div class="stat-value">{{ deviceData.alerts.statistics.unhandled }}</div>
              <div class="stat-label">未处理</div>
            </div>
            <div class="stat-card processing">
              <div class="stat-value">{{ deviceData.alerts.statistics.processing }}</div>
              <div class="stat-label">处理中</div>
            </div>
            <div class="stat-card success">
              <div class="stat-value">{{ deviceData.alerts.statistics.resolved }}</div>
              <div class="stat-label">已解决</div>
            </div>
          </div>
          <div class="alerts-list">
            <div v-for="alert in deviceData.alerts.current" 
                 :key="alert.id"
                 class="alert-card"
                 :class="alert.level">
              <div class="alert-header">
                <div class="alert-type">{{ alert.type }}</div>
                <div class="alert-time">{{ alert.time }}</div>
              </div>
              <div class="alert-content">
                <div class="alert-device">{{ alert.device }}</div>
                <div class="alert-message">{{ alert.message }}</div>
              </div>
              <div class="alert-actions">
                <button v-if="alert.status === 'unhandled'"
                        @click="handleAlert(alert.id, 'process')"
                        class="action-btn process">
                  处理
                </button>
                <button v-if="alert.status === 'processing'"
                        @click="handleAlert(alert.id, 'resolve')"
                        class="action-btn resolve">
                  完成
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* 基础样式 */
.device-view {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.data-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
}

.data-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* 运行状态样式 */
.status-list {
  display: grid;
  gap: 20px;
}

.status-card {
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.status-card.warning {
  border-left: 4px solid #f57c00;
}

.status-card.error {
  border-left: 4px solid #d32f2f;
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  background: #e8f5e9;
  color: #2e7d32;
}

.status-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-item .label {
  color: #666;
  font-size: 0.9rem;
}

.info-item .value {
  font-weight: 500;
  color: #2c3e50;
}

.info-item .value.low {
  color: #d32f2f;
}

.status-actions {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

/* 能耗数据样式 */
.energy-overview {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.energy-card {
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.energy-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.energy-value {
  font-size: 2rem;
  font-weight: 600;
  color: #2c3e50;
}

.trend {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.trend.up {
  background: #fbe9e7;
  color: #d32f2f;
}

.trend.down {
  background: #e8f5e9;
  color: #2e7d32;
}

.device-energy {
  margin-top: 24px;
}

.energy-bars {
  display: grid;
  gap: 16px;
}

.energy-bar {
  display: grid;
  grid-template-columns: 120px 1fr 80px;
  gap: 16px;
  align-items: center;
}

.bar-wrapper {
  height: 8px;
  background: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
}

.bar {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #81C784);
  border-radius: 4px;
  transition: width 0.3s ease;
}

/* 控制参数样式 */
.parameters-list {
  display: grid;
  gap: 20px;
}

.parameter-card {
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.parameter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.parameter-value {
  font-weight: 500;
  color: #2c3e50;
}

.parameter-control {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.parameter-control input[type="range"] {
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  background: #e0e0e0;
  border-radius: 2px;
  outline: none;
}

.parameter-control input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background: #4CAF50;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.range-labels {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
}

/* 告警信息样式 */
.alerts-overview {
  display: grid;
  gap: 24px;
}

.alert-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat-card {
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

.alerts-list {
  display: grid;
  gap: 16px;
}

.alert-card {
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.alert-card.warning {
  border-left: 4px solid #f57c00;
}

.alert-card.critical {
  border-left: 4px solid #d32f2f;
}

.alert-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.alert-type {
  font-weight: 500;
  color: #2c3e50;
}

.alert-time {
  color: #666;
  font-size: 0.9rem;
}

.alert-content {
  margin-bottom: 16px;
}

.alert-device {
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 4px;
}

.alert-message {
  color: #666;
}

.alert-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.action-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn.process {
  background: #2196f3;
  color: white;
}

.action-btn.resolve {
  background: #4caf50;
  color: white;
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .data-section {
    background: #1a1a1a;
  }

  .status-card,
  .energy-card,
  .parameter-card,
  .alert-card,
  .stat-card {
    background: linear-gradient(145deg, #2d2d2d, #1a1a1a);
  }

  .info-item .label {
    color: #bbb;
  }

  .info-item .value {
    color: #fff;
  }

  .energy-value {
    color: #fff;
  }

  .bar-wrapper {
    background: #333;
  }

  .parameter-value {
    color: #fff;
  }

  .range-labels {
    color: #bbb;
  }

  .stat-value {
    color: #fff;
  }

  .stat-label {
    color: #bbb;
  }

  .alert-type,
  .alert-device {
    color: #fff;
  }

  .alert-message,
  .alert-time {
    color: #bbb;
  }
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .data-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .device-view {
    padding: 16px;
  }

  .status-info {
    grid-template-columns: 1fr;
  }

  .energy-overview {
    grid-template-columns: 1fr;
  }

  .alert-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .energy-bar {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .bar-value {
    text-align: right;
  }
}
</style> 