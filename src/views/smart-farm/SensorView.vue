<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

const environmentData = ref({
  temperature: 25,
  humidity: 60,
  co2: 400,
  light: 50000
})

const controlStatus = ref({
  ventilation: false,
  irrigation: false,
  lighting: false,
  heating: false
})

const toggleControl = (key: keyof typeof controlStatus.value) => {
  controlStatus.value[key] = !controlStatus.value[key]
}
</script>

<template>
  <div class="sensor-view">
    <BackButton />
    <div class="grid-container">
      <!-- 环境监测卡片 -->
      <div class="monitor-card animate-in">
        <h3>环境监测</h3>
        <div class="data-grid">
          <div class="data-item">
            <span class="label">温度</span>
            <span class="value">{{ environmentData.temperature }}°C</span>
          </div>
          <div class="data-item">
            <span class="label">湿度</span>
            <span class="value">{{ environmentData.humidity }}%</span>
          </div>
          <div class="data-item">
            <span class="label">CO2</span>
            <span class="value">{{ environmentData.co2 }}ppm</span>
          </div>
          <div class="data-item">
            <span class="label">光照</span>
            <span class="value">{{ environmentData.light }}lux</span>
          </div>
        </div>
      </div>

      <!-- 环境控制卡片 -->
      <div class="control-card animate-in">
        <h3>环境控制</h3>
        <div class="control-grid">
          <button 
            :class="['control-btn', { active: controlStatus.ventilation }]"
            @click="toggleControl('ventilation')"
          >
            <span class="btn-icon">💨</span>
            <span>通风系统</span>
          </button>
          <button 
            :class="['control-btn', { active: controlStatus.irrigation }]"
            @click="toggleControl('irrigation')"
          >
            <span class="btn-icon">💧</span>
            <span>灌溉系统</span>
          </button>
          <button 
            :class="['control-btn', { active: controlStatus.lighting }]"
            @click="toggleControl('lighting')"
          >
            <span class="btn-icon">💡</span>
            <span>补光系统</span>
          </button>
          <button 
            :class="['control-btn', { active: controlStatus.heating }]"
            @click="toggleControl('heating')"
          >
            <span class="btn-icon">🔥</span>
            <span>加热系统</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sensor-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.grid-container {
  margin-top: 10px;
}

.monitor-card,
.control-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

h3 {
  color: #2c3e50;
  margin: 0 0 20px 0;
  font-size: 1.5rem;
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.data-item {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 12px;
  text-align: center;
}

.label {
  display: block;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.control-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.control-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border: none;
  border-radius: 12px;
  background: #f8f9fa;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-icon {
  font-size: 24px;
}

.control-btn.active {
  background: #4CAF50;
  color: white;
}

.control-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .monitor-card,
  .control-card {
    background: #2d2d2d;
  }

  h3 {
    color: #fff;
  }

  .data-item {
    background: #1a1a1a;
  }

  .value {
    color: #fff;
  }

  .control-btn {
    background: #1a1a1a;
    color: #fff;
  }

  .control-btn.active {
    background: #81c784;
  }
}

/* 添加进入动画 */
.animate-in {
  animation: slideUp 0.6s ease backwards;
}

.monitor-card {
  animation-delay: 0.1s;
}

.control-card {
  animation-delay: 0.3s;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 