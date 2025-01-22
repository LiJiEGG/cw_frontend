<script setup lang="ts">
import { ref } from 'vue'

const controls = ref({
  ventilation: false,
  irrigation: false,
  lighting: false,
  heating: false
})

const toggleControl = (key: keyof typeof controls.value) => {
  controls.value[key] = !controls.value[key]
}
</script>

<template>
  <div class="control-card">
    <h3>环境控制</h3>
    <div class="control-grid">
      <button 
        :class="['control-btn', { active: controls.ventilation }]"
        @click="toggleControl('ventilation')"
      >
        通风系统
      </button>
      <button 
        :class="['control-btn', { active: controls.irrigation }]"
        @click="toggleControl('irrigation')"
      >
        灌溉系统
      </button>
      <button 
        :class="['control-btn', { active: controls.lighting }]"
        @click="toggleControl('lighting')"
      >
        补光系统
      </button>
      <button 
        :class="['control-btn', { active: controls.heating }]"
        @click="toggleControl('heating')"
      >
        加热系统
      </button>
    </div>
  </div>
</template>

<style scoped>
.control-card {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.control-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 15px;
}

.control-btn {
  padding: 12px;
  border: none;
  border-radius: 4px;
  background: #f5f5f5;
  cursor: pointer;
  transition: all 0.3s;
}

.control-btn:hover {
  background: #e0e0e0;
}

.control-btn.active {
  background: #4CAF50;
  color: white;
}
</style> 