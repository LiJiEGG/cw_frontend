<script setup lang="ts">
import { ref, computed } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

interface ControlRecord {
  id: number
  timestamp: string
  type: string
  device: string
  operation: string
  operator: string
  status: 'success' | 'failed' | 'warning'
  details: string
}

// 模拟数据
const records = ref<ControlRecord[]>([
  {
    id: 1,
    timestamp: '2024-03-20 14:30:25',
    type: 'environment',
    device: '通风系统',
    operation: '开启通风',
    operator: '系统自动',
    status: 'success',
    details: '温度过高，自动开启通风系统，开度设置为60%'
  },
  {
    id: 2,
    timestamp: '2024-03-20 13:15:10',
    type: 'equipment',
    device: '农业机器人',
    operation: '任务分配',
    operator: '张工',
    status: 'success',
    details: '分配巡检任务，路线：A区-B区-C区'
  },
  {
    id: 3,
    timestamp: '2024-03-20 12:45:33',
    type: 'environment',
    device: '灌溉系统',
    operation: '启动灌溉',
    operator: '系统自动',
    status: 'warning',
    details: '土壤湿度低，启动灌溉系统，但水压不足'
  }
])

// 筛选条件
const filters = ref({
  dateRange: {
    start: '',
    end: ''
  },
  type: '',
  status: '',
  search: ''
})

// 类型选项
const typeOptions = [
  { value: '', label: '全部类型' },
  { value: 'environment', label: '环境控制' },
  { value: 'equipment', label: '设备操作' }
]

// 状态选项
const statusOptions = [
  { value: '', label: '全部状态' },
  { value: 'success', label: '成功' },
  { value: 'warning', label: '警告' },
  { value: 'failed', label: '失败' }
]

// 筛选后的记录
const filteredRecords = computed(() => {
  return records.value.filter(record => {
    // 日期范围筛选
    if (filters.value.dateRange.start && filters.value.dateRange.end) {
      const recordDate = new Date(record.timestamp)
      const startDate = new Date(filters.value.dateRange.start)
      const endDate = new Date(filters.value.dateRange.end)
      if (recordDate < startDate || recordDate > endDate) return false
    }
    
    // 类型筛选
    if (filters.value.type && record.type !== filters.value.type) return false
    
    // 状态筛选
    if (filters.value.status && record.status !== filters.value.status) return false
    
    // 搜索筛选
    if (filters.value.search) {
      const searchText = filters.value.search.toLowerCase()
      return record.device.toLowerCase().includes(searchText) ||
             record.operation.toLowerCase().includes(searchText) ||
             record.operator.toLowerCase().includes(searchText) ||
             record.details.toLowerCase().includes(searchText)
    }
    
    return true
  })
})

// 查看详情
const selectedRecord = ref<ControlRecord | null>(null)
const showDetails = (record: ControlRecord) => {
  selectedRecord.value = record
}
</script>

<template>
  <div class="records-view">
    <BackButton />
    <h2>控制记录</h2>
    
    <div class="content">
      <!-- 筛选区域 -->
      <div class="filters">
        <div class="filter-group">
          <label>时间范围</label>
          <div class="date-range">
            <input type="date" v-model="filters.dateRange.start">
            <span>至</span>
            <input type="date" v-model="filters.dateRange.end">
          </div>
        </div>
        
        <div class="filter-group">
          <label>操作类型</label>
          <select v-model="filters.type">
            <option v-for="option in typeOptions"
                    :key="option.value"
                    :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>执行状态</label>
          <select v-model="filters.status">
            <option v-for="option in statusOptions"
                    :key="option.value"
                    :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>搜索</label>
          <input type="text" 
                 v-model="filters.search"
                 placeholder="搜索设备、操作、操作员...">
        </div>
      </div>

      <!-- 记录列表 -->
      <div class="records-list">
        <div v-for="record in filteredRecords"
             :key="record.id"
             class="record-item"
             :class="record.status"
             @click="showDetails(record)">
          <div class="record-time">{{ record.timestamp }}</div>
          <div class="record-info">
            <div class="record-device">{{ record.device }}</div>
            <div class="record-operation">{{ record.operation }}</div>
          </div>
          <div class="record-operator">{{ record.operator }}</div>
          <div class="record-status">{{ 
            record.status === 'success' ? '成功' :
            record.status === 'warning' ? '警告' : '失败'
          }}</div>
        </div>
      </div>

      <!-- 详情弹窗 -->
      <div v-if="selectedRecord" class="details-modal">
        <div class="modal-content">
          <h3>操作详情</h3>
          <div class="detail-item">
            <span class="detail-label">时间：</span>
            <span>{{ selectedRecord.timestamp }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">设备：</span>
            <span>{{ selectedRecord.device }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">操作：</span>
            <span>{{ selectedRecord.operation }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">操作员：</span>
            <span>{{ selectedRecord.operator }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">状态：</span>
            <span :class="selectedRecord.status">{{ 
              selectedRecord.status === 'success' ? '成功' :
              selectedRecord.status === 'warning' ? '警告' : '失败'
            }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">详细信息：</span>
            <span>{{ selectedRecord.details }}</span>
          </div>
          <button class="close-btn" @click="selectedRecord = null">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.records-view {
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

/* 筛选区域样式 */
.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-group label {
  font-size: 0.9rem;
  color: #666;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-range input {
  flex: 1;
}

input, select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
}

/* 记录列表样式 */
.records-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.record-item {
  display: grid;
  grid-template-columns: 180px 1fr 120px 80px;
  align-items: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.record-item:hover {
  transform: translateX(5px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.record-item.success { border-left: 4px solid #4CAF50; }
.record-item.warning { border-left: 4px solid #FFC107; }
.record-item.failed { border-left: 4px solid #F44336; }

.record-time {
  color: #666;
  font-size: 0.9rem;
}

.record-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.record-device {
  font-weight: 500;
  color: #2c3e50;
}

.record-operation {
  font-size: 0.9rem;
  color: #666;
}

.record-operator {
  color: #2c3e50;
}

.record-status {
  text-align: center;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.success .record-status { color: #4CAF50; }
.warning .record-status { color: #FFC107; }
.failed .record-status { color: #F44336; }

/* 详情弹窗样式 */
.details-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.detail-item {
  margin: 12px 0;
  display: flex;
  gap: 12px;
}

.detail-label {
  color: #666;
  min-width: 80px;
}

.close-btn {
  margin-top: 20px;
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.close-btn:hover {
  background: #45a049;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .content {
    background: #2d2d2d;
  }

  .filters {
    background: #1a1a1a;
  }

  .filter-group label {
    color: #bbb;
  }

  input, select {
    background: #2d2d2d;
    border-color: #444;
    color: #fff;
  }

  .record-item {
    background: #1a1a1a;
  }

  .record-time,
  .record-operation {
    color: #bbb;
  }

  .record-device,
  .record-operator {
    color: #fff;
  }

  .modal-content {
    background: #2d2d2d;
    color: #fff;
  }

  .detail-label {
    color: #bbb;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .record-item {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .record-time,
  .record-operator,
  .record-status {
    text-align: left;
  }

  .filters {
    grid-template-columns: 1fr;
  }

  .date-range {
    flex-direction: column;
  }
}
</style> 