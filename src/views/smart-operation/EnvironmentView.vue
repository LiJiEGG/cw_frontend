<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

const environmentControls = ref({
  ventilation: {
    status: false,
    openDegree: 0
  },
  irrigation: {
    status: false,
    waterFlow: 0
  },
  shading: {
    status: false,
    coverage: 0
  },
  heating: {
    status: false,
    temperature: 20
  },
  lighting: {
    status: false,
    intensity: 0
  },
  co2: {
    status: false,
    concentration: 400
  }
})

const toggleControl = (system: keyof typeof environmentControls.value) => {
  environmentControls.value[system].status = !environmentControls.value[system].status
}

const updateValue = (system: keyof typeof environmentControls.value, key: string, value: number) => {
  if (system in environmentControls.value) {
    (environmentControls.value[system] as any)[key] = value
  }
}
</script>

<template>
  <div class="environment-view">
    <BackButton />
    <h2>温室环境控制</h2>
    <div class="content">
      <div class="control-grid">
        <!-- 通风控制 -->
        <div class="control-card">
          <div class="control-header">
            <div class="control-icon">💨</div>
            <h3>通风系统</h3>
            <div class="status-switch" 
                 :class="{ active: environmentControls.ventilation.status }"
                 @click="toggleControl('ventilation')">
              {{ environmentControls.ventilation.status ? '开启' : '关闭' }}
            </div>
          </div>
          <div class="control-body">
            <label>开度调节</label>
            <input type="range" 
                   v-model="environmentControls.ventilation.openDegree"
                   min="0" max="100" step="1"
                   :disabled="!environmentControls.ventilation.status">
            <span class="value">{{ environmentControls.ventilation.openDegree }}%</span>
          </div>
        </div>

        <!-- 灌溉控制 -->
        <div class="control-card">
          <div class="control-header">
            <div class="control-icon">💧</div>
            <h3>灌溉系统</h3>
            <div class="status-switch"
                 :class="{ active: environmentControls.irrigation.status }"
                 @click="toggleControl('irrigation')">
              {{ environmentControls.irrigation.status ? '开启' : '关闭' }}
            </div>
          </div>
          <div class="control-body">
            <label>水流量</label>
            <input type="range"
                   v-model="environmentControls.irrigation.waterFlow"
                   min="0" max="100" step="1"
                   :disabled="!environmentControls.irrigation.status">
            <span class="value">{{ environmentControls.irrigation.waterFlow }}%</span>
          </div>
        </div>

        <!-- 遮阳控制 -->
        <div class="control-card">
          <div class="control-header">
            <div class="control-icon">☀️</div>
            <h3>遮阳系统</h3>
            <div class="status-switch"
                 :class="{ active: environmentControls.shading.status }"
                 @click="toggleControl('shading')">
              {{ environmentControls.shading.status ? '开启' : '关闭' }}
            </div>
          </div>
          <div class="control-body">
            <label>遮阳率</label>
            <input type="range"
                   v-model="environmentControls.shading.coverage"
                   min="0" max="100" step="1"
                   :disabled="!environmentControls.shading.status">
            <span class="value">{{ environmentControls.shading.coverage }}%</span>
          </div>
        </div>

        <!-- 其他控制系统... -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.environment-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.content {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.control-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.control-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.control-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.control-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.control-icon {
  font-size: 24px;
}

h3 {
  margin: 0;
  flex: 1;
  font-size: 1.2rem;
  color: #2c3e50;
}

.status-switch {
  padding: 6px 12px;
  border-radius: 20px;
  background: #e9ecef;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.status-switch.active {
  background: #4CAF50;
  color: white;
}

.control-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  color: #666;
  font-size: 0.9rem;
}

input[type="range"] {
  width: 100%;
  margin: 10px 0;
}

.value {
  color: #2c3e50;
  font-weight: 500;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .content {
    background: #2d2d2d;
  }

  .control-card {
    background: #1a1a1a;
  }

  h3 {
    color: #fff;
  }

  label {
    color: #bbb;
  }

  .value {
    color: #fff;
  }

  .status-switch {
    background: #333;
    color: #bbb;
  }

  .status-switch.active {
    background: #81c784;
    color: #fff;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .control-grid {
    grid-template-columns: 1fr;
  }
}
</style> 