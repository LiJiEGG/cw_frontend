<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

const equipmentControls = ref({
  robot: {
    status: false,
    mode: 'standby', // standby, auto, manual
    battery: 85,
    position: { x: 0, y: 0 },
    task: ''
  },
  conveyor: {
    status: false,
    speed: 0,
    direction: 'forward' // forward, reverse
  },
  sprayer: {
    status: false,
    pressure: 0,
    tank: 80 // 水箱剩余量
  },
  harvester: {
    status: false,
    mode: 'standby',
    progress: 0
  }
})

const robotModes = [
  { value: 'standby', label: '待机' },
  { value: 'auto', label: '自动' },
  { value: 'manual', label: '手动' }
]

const robotTasks = [
  { value: 'patrol', label: '巡检' },
  { value: 'spray', label: '喷药' },
  { value: 'harvest', label: '采收' },
  { value: 'transport', label: '运输' }
]

const toggleEquipment = (equipment: keyof typeof equipmentControls.value) => {
  equipmentControls.value[equipment].status = !equipmentControls.value[equipment].status
}

const updateMode = (equipment: string, mode: string) => {
  if (equipment === 'robot') {
    equipmentControls.value.robot.mode = mode
  } else if (equipment === 'harvester') {
    equipmentControls.value.harvester.mode = mode
  }
}
</script>

<template>
  <div class="equipment-view">
    <BackButton />
    <h2>自动化设备控制</h2>
    <div class="content">
      <div class="equipment-grid">
        <!-- 农业机器人控制 -->
        <div class="equipment-card">
          <div class="equipment-header">
            <div class="equipment-icon">🤖</div>
            <h3>农业机器人</h3>
            <div class="status-switch"
                 :class="{ active: equipmentControls.robot.status }"
                 @click="toggleEquipment('robot')">
              {{ equipmentControls.robot.status ? '运行中' : '待机' }}
            </div>
          </div>
          <div class="equipment-body">
            <div class="info-row">
              <span class="label">电量</span>
              <div class="battery-indicator">
                <div class="battery-level" :style="{ width: equipmentControls.robot.battery + '%' }"></div>
                <span class="battery-text">{{ equipmentControls.robot.battery }}%</span>
              </div>
            </div>
            <div class="info-row">
              <span class="label">工作模式</span>
              <select v-model="equipmentControls.robot.mode"
                      :disabled="!equipmentControls.robot.status">
                <option v-for="mode in robotModes" 
                        :key="mode.value" 
                        :value="mode.value">
                  {{ mode.label }}
                </option>
              </select>
            </div>
            <div class="info-row">
              <span class="label">当前任务</span>
              <select v-model="equipmentControls.robot.task"
                      :disabled="!equipmentControls.robot.status || equipmentControls.robot.mode !== 'auto'">
                <option value="">选择任务</option>
                <option v-for="task in robotTasks"
                        :key="task.value"
                        :value="task.value">
                  {{ task.label }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- 输送带控制 -->
        <div class="equipment-card">
          <div class="equipment-header">
            <div class="equipment-icon">➡️</div>
            <h3>输送系统</h3>
            <div class="status-switch"
                 :class="{ active: equipmentControls.conveyor.status }"
                 @click="toggleEquipment('conveyor')">
              {{ equipmentControls.conveyor.status ? '运行中' : '停止' }}
            </div>
          </div>
          <div class="equipment-body">
            <div class="info-row">
              <span class="label">速度控制</span>
              <input type="range"
                     v-model="equipmentControls.conveyor.speed"
                     min="0" max="100" step="1"
                     :disabled="!equipmentControls.conveyor.status">
              <span class="value">{{ equipmentControls.conveyor.speed }}%</span>
            </div>
            <div class="info-row">
              <span class="label">运行方向</span>
              <div class="direction-control">
                <button :class="{ active: equipmentControls.conveyor.direction === 'forward' }"
                        @click="equipmentControls.conveyor.direction = 'forward'"
                        :disabled="!equipmentControls.conveyor.status">
                  正向
                </button>
                <button :class="{ active: equipmentControls.conveyor.direction === 'reverse' }"
                        @click="equipmentControls.conveyor.direction = 'reverse'"
                        :disabled="!equipmentControls.conveyor.status">
                  反向
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 其他设备控制... -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.equipment-view {
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

.equipment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.equipment-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.equipment-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.equipment-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.equipment-icon {
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

.equipment-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.label {
  min-width: 80px;
  color: #666;
  font-size: 0.9rem;
}

.battery-indicator {
  flex: 1;
  height: 20px;
  background: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.battery-level {
  height: 100%;
  background: #4CAF50;
  transition: width 0.3s ease;
}

.battery-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 0.8rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

select {
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background: white;
  color: #2c3e50;
}

select:disabled {
  background: #e9ecef;
  color: #666;
}

.direction-control {
  display: flex;
  gap: 8px;
}

.direction-control button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: #e9ecef;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.direction-control button.active {
  background: #4CAF50;
  color: white;
}

.direction-control button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .content {
    background: #2d2d2d;
  }

  .equipment-card {
    background: #1a1a1a;
  }

  h3 {
    color: #fff;
  }

  .label {
    color: #bbb;
  }

  select {
    background: #2d2d2d;
    border-color: #444;
    color: #fff;
  }

  select:disabled {
    background: #1a1a1a;
    color: #666;
  }

  .status-switch {
    background: #333;
    color: #bbb;
  }

  .status-switch.active {
    background: #81c784;
    color: #fff;
  }

  .direction-control button {
    background: #333;
    color: #bbb;
  }

  .direction-control button.active {
    background: #81c784;
    color: #fff;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .equipment-grid {
    grid-template-columns: 1fr;
  }

  .info-row {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }

  .label {
    min-width: auto;
  }
}
</style> 