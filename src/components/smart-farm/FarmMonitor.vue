<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  data: {
    temperature: number
    humidity: number
    co2: number
    light: number
  }
}>()
</script>

<template>
  <div class="monitor-card">
    <h3>环境监测</h3>
    <div class="data-grid">
      <div class="data-item">
        <span class="label">温度</span>
        <span class="value">{{ data.temperature }}°C</span>
      </div>
      <div class="data-item">
        <span class="label">湿度</span>
        <span class="value">{{ data.humidity }}%</span>
      </div>
      <div class="data-item">
        <span class="label">CO2</span>
        <span class="value">{{ data.co2 }}ppm</span>
      </div>
      <div class="data-item">
        <span class="label">光照</span>
        <span class="value">{{ data.light }}lux</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.monitor-card {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 15px;
}

.data-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
}

.label {
  font-size: 14px;
  color: #666;
}

.value {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-top: 5px;
}
</style> 