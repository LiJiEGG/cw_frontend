<script setup lang="ts">
import { ref } from 'vue'

const robotStatus = ref({
  status: 'working',
  battery: 85,
  currentTask: '温室巡检',
  location: 'A区域'
})
</script>

<template>
  <div class="robot-card">
    <h3>机器人状态</h3>
    <div class="status-info">
      <div class="status-item">
        <span class="label">运行状态</span>
        <span class="value" :class="robotStatus.status">
          {{ robotStatus.status === 'working' ? '工作中' : '待机' }}
        </span>
      </div>
      <div class="status-item">
        <span class="label">电池电量</span>
        <div class="battery-bar">
          <div 
            class="battery-level"
            :style="{ width: `${robotStatus.battery}%` }"
          ></div>
        </div>
        <span class="battery-text">{{ robotStatus.battery }}%</span>
      </div>
      <div class="status-item">
        <span class="label">当前任务</span>
        <span class="value">{{ robotStatus.currentTask }}</span>
      </div>
      <div class="status-item">
        <span class="label">当前位置</span>
        <span class="value">{{ robotStatus.location }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.robot-card {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.status-info {
  margin-top: 15px;
}

.status-item {
  margin-bottom: 15px;
}

.label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.value {
  font-size: 16px;
  color: #333;
}

.value.working {
  color: #4CAF50;
}

.battery-bar {
  height: 20px;
  background: #f5f5f5;
  border-radius: 10px;
  overflow: hidden;
  margin: 5px 0;
}

.battery-level {
  height: 100%;
  background: #4CAF50;
  transition: width 0.3s;
}

.battery-text {
  font-size: 14px;
  color: #666;
}
</style> 