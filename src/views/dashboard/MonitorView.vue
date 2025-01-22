<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

// 监控数据
const monitoringData = ref({
  environment: {
    temperature: 25.6,
    humidity: 65,
    co2: 450,
    light: 35000
  },
  equipment: {
    ventilation: true,
    irrigation: false,
    lighting: true,
    heating: false
  },
  alerts: [
    {
      id: 1,
      type: 'warning',
      message: '3号温室湿度偏高',
      time: '10:30'
    },
    {
      id: 2,
      type: 'info',
      message: '自动通风系统已启动',
      time: '10:31'
    }
  ]
})
</script>

<template>
  <div class="monitor">
    <BackButton />
    <h2>实时监控</h2>

    <div class="monitor-grid">
      <div class="monitor-card">
        <h3>环境监测</h3>
        <div class="data-grid">
          <div class="data-item">
            <span class="label">温度</span>
            <span class="value">{{ monitoringData.environment.temperature }}°C</span>
          </div>
          <div class="data-item">
            <span class="label">湿度</span>
            <span class="value">{{ monitoringData.environment.humidity }}%</span>
          </div>
          <div class="data-item">
            <span class="label">CO2</span>
            <span class="value">{{ monitoringData.environment.co2 }}ppm</span>
          </div>
          <div class="data-item">
            <span class="label">光照</span>
            <span class="value">{{ monitoringData.environment.light }}lux</span>
          </div>
        </div>
      </div>

      <div class="monitor-card">
        <h3>设备状态</h3>
        <div class="equipment-grid">
          <div 
            v-for="(status, device) in monitoringData.equipment" 
            :key="device"
            class="equipment-item"
          >
            <span class="label">{{ device }}</span>
            <span class="status" :class="{ active: status }">
              {{ status ? '运行中' : '已停止' }}
            </span>
          </div>
        </div>
      </div>

      <div class="monitor-card">
        <h3>告警信息</h3>
        <div class="alerts-list">
          <div 
            v-for="alert in monitoringData.alerts" 
            :key="alert.id"
            class="alert-item"
            :class="alert.type"
          >
            <span class="time">{{ alert.time }}</span>
            <span class="message">{{ alert.message }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.monitor {
  padding: 20px;
}

h2 {
  margin-bottom: 24px;
  color: #2c3e50;
}

.monitor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.monitor-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.monitor-card h3 {
  margin: 0 0 20px;
  color: #2c3e50;
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.data-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.equipment-grid {
  display: grid;
  gap: 15px;
}

.equipment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
  background: #f5f5f5;
  color: #666;
}

.status.active {
  background: #e8f5e9;
  color: #4caf50;
}

.alerts-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.alert-item {
  padding: 10px;
  border-radius: 4px;
  display: flex;
  gap: 10px;
}

.alert-item.warning {
  background: #fff3e0;
  color: #f57c00;
}

.alert-item.info {
  background: #e3f2fd;
  color: #1976d2;
}

.time {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  h2, h3 {
    color: #e5eaf3;
  }

  .monitor-card {
    background: #2d2d2d;
  }

  .status {
    background: #1a1a1a;
    color: #bbb;
  }

  .status.active {
    background: #1b5e20;
    color: #81c784;
  }

  .alert-item.warning {
    background: #2c1810;
    color: #ffb74d;
  }

  .alert-item.info {
    background: #0d47a1;
    color: #90caf9;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .monitor {
    padding: 16px;
  }

  .data-grid {
    grid-template-columns: 1fr;
  }
}
</style> 