<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

// 加工批次信息
const batchInfo = ref({
  id: 'PC202403200001',
  product: '有机西红柿酱',
  rawMaterial: '有机西红柿',
  rawBatch: 'B20240320',
  processingDate: '2024-03-21',
  expiryDate: '2024-09-21',
  quantity: '500kg',
  workshop: '1号加工车间',
  line: '2号生产线'
})

// 原料检验记录
const inspectionRecords = ref([
  {
    id: 1,
    time: '2024-03-21 08:00',
    type: '感官检验',
    items: [
      { name: '外观', result: '正常', standard: '新鲜完整' },
      { name: '色泽', result: '正常', standard: '红润均匀' },
      { name: '气味', result: '正常', standard: '无异味' }
    ],
    inspector: '李明',
    status: 'pass'
  },
  {
    id: 2,
    time: '2024-03-21 08:30',
    type: '理化指标',
    items: [
      { name: '农残', result: '未检出', standard: '≤0.1mg/kg' },
      { name: '重金属', result: '合格', standard: '≤0.01mg/kg' },
      { name: '含水量', result: '94.2%', standard: '93-95%' }
    ],
    inspector: '张华',
    status: 'pass'
  }
])

// 加工工艺流程
const processingSteps = ref([
  {
    id: 1,
    name: '原料预处理',
    startTime: '2024-03-21 09:00',
    endTime: '2024-03-21 10:00',
    operator: '王强',
    parameters: [
      { name: '清洗温度', value: '25°C' },
      { name: '清洗时间', value: '15分钟' }
    ],
    status: 'completed'
  },
  {
    id: 2,
    name: '打浆处理',
    startTime: '2024-03-21 10:15',
    endTime: '2024-03-21 11:15',
    operator: '刘伟',
    parameters: [
      { name: '打浆温度', value: '85°C' },
      { name: '打浆时间', value: '45分钟' }
    ],
    status: 'completed'
  },
  {
    id: 3,
    name: '杀菌处理',
    startTime: '2024-03-21 11:30',
    endTime: '2024-03-21 12:00',
    operator: '赵芳',
    parameters: [
      { name: '杀菌温度', value: '95°C' },
      { name: '杀菌时间', value: '20分钟' }
    ],
    status: 'completed'
  }
])

// 质量检测记录
const qualityTests = ref([
  {
    id: 1,
    time: '2024-03-21 13:00',
    type: '产品检验',
    items: [
      { name: 'pH值', value: '4.2', standard: '4.0-4.4' },
      { name: '可溶性固形物', value: '28%', standard: '≥28%' },
      { name: '菌落总数', value: '＜100CFU/g', standard: '≤100CFU/g' }
    ],
    inspector: '周红',
    result: 'pass'
  }
])

// 包装信息
const packagingInfo = ref({
  material: '玻璃瓶',
  supplier: '绿源包材',
  specification: '500g/瓶',
  batchNo: 'P20240321',
  packagingDate: '2024-03-21',
  inspector: '陈明'
})

// 生成二维码
const generateQRCode = () => {
  console.log('生成加工溯源二维码')
}

// 导出报告
const exportReport = () => {
  console.log('导出加工溯源报告')
}
</script>

<template>
  <div class="processing-trace">
    <BackButton />
    <h2>加工溯源</h2>
    
    <div class="content">
      <!-- 加工批次信息 -->
      <section class="batch-section">
        <h3>加工批次信息</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">批次编号</span>
            <span class="value">{{ batchInfo.id }}</span>
          </div>
          <div class="info-item">
            <span class="label">产品名称</span>
            <span class="value">{{ batchInfo.product }}</span>
          </div>
          <div class="info-item">
            <span class="label">原料名称</span>
            <span class="value">{{ batchInfo.rawMaterial }}</span>
          </div>
          <div class="info-item">
            <span class="label">原料批次</span>
            <span class="value">{{ batchInfo.rawBatch }}</span>
          </div>
          <div class="info-item">
            <span class="label">加工日期</span>
            <span class="value">{{ batchInfo.processingDate }}</span>
          </div>
          <div class="info-item">
            <span class="label">保质期至</span>
            <span class="value">{{ batchInfo.expiryDate }}</span>
          </div>
          <div class="info-item">
            <span class="label">加工数量</span>
            <span class="value">{{ batchInfo.quantity }}</span>
          </div>
          <div class="info-item">
            <span class="label">生产车间</span>
            <span class="value">{{ batchInfo.workshop }}</span>
          </div>
        </div>
      </section>

      <!-- 原料检验记录 -->
      <section class="inspection-section">
        <h3>原料检验记录</h3>
        <div class="inspection-list">
          <div v-for="record in inspectionRecords"
               :key="record.id"
               class="inspection-card">
            <div class="inspection-header">
              <div class="header-left">
                <span class="time">{{ record.time }}</span>
                <span class="type">{{ record.type }}</span>
              </div>
              <span class="status" :class="record.status">
                {{ record.status === 'pass' ? '通过' : '不通过' }}
              </span>
            </div>
            <div class="inspection-items">
              <div v-for="item in record.items"
                   :key="item.name"
                   class="inspection-item">
                <span class="item-name">{{ item.name }}</span>
                <span class="item-result">{{ item.result }}</span>
                <span class="item-standard">标准：{{ item.standard }}</span>
              </div>
            </div>
            <div class="inspector">
              检验员：{{ record.inspector }}
            </div>
          </div>
        </div>
      </section>

      <!-- 加工工艺流程 -->
      <section class="process-section">
        <h3>加工工艺流程</h3>
        <div class="process-timeline">
          <div v-for="step in processingSteps"
               :key="step.id"
               class="process-step">
            <div class="step-point"></div>
            <div class="step-card">
              <div class="step-header">
                <span class="step-name">{{ step.name }}</span>
                <span class="step-status" :class="step.status">
                  {{ step.status === 'completed' ? '已完成' : '进行中' }}
                </span>
              </div>
              <div class="step-time">
                <span>开始：{{ step.startTime }}</span>
                <span>结束：{{ step.endTime }}</span>
              </div>
              <div class="step-params">
                <div v-for="param in step.parameters"
                     :key="param.name"
                     class="param-item">
                  <span class="param-name">{{ param.name }}</span>
                  <span class="param-value">{{ param.value }}</span>
                </div>
              </div>
              <div class="step-operator">
                操作员：{{ step.operator }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 质量检测记录 -->
      <section class="quality-section">
        <h3>质量检测记录</h3>
        <div class="quality-list">
          <div v-for="test in qualityTests"
               :key="test.id"
               class="quality-card">
            <div class="quality-header">
              <span class="time">{{ test.time }}</span>
              <span class="type">{{ test.type }}</span>
              <span class="result" :class="test.result">
                {{ test.result === 'pass' ? '合格' : '不合格' }}
              </span>
            </div>
            <div class="test-items">
              <div v-for="item in test.items"
                   :key="item.name"
                   class="test-item">
                <span class="item-name">{{ item.name }}</span>
                <span class="item-value">{{ item.value }}</span>
                <span class="item-standard">标准：{{ item.standard }}</span>
              </div>
            </div>
            <div class="inspector">
              检验员：{{ test.inspector }}
            </div>
          </div>
        </div>
      </section>

      <!-- 包装信息 -->
      <section class="packaging-section">
        <h3>包装信息</h3>
        <div class="packaging-info">
          <div class="info-row">
            <span class="label">包装材料</span>
            <span class="value">{{ packagingInfo.material }}</span>
          </div>
          <div class="info-row">
            <span class="label">材料供应商</span>
            <span class="value">{{ packagingInfo.supplier }}</span>
          </div>
          <div class="info-row">
            <span class="label">包装规格</span>
            <span class="value">{{ packagingInfo.specification }}</span>
          </div>
          <div class="info-row">
            <span class="label">包装批次</span>
            <span class="value">{{ packagingInfo.batchNo }}</span>
          </div>
          <div class="info-row">
            <span class="label">包装日期</span>
            <span class="value">{{ packagingInfo.packagingDate }}</span>
          </div>
          <div class="info-row">
            <span class="label">检验员</span>
            <span class="value">{{ packagingInfo.inspector }}</span>
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
.processing-trace {
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

/* 加工工艺流程特有样式 */
.process-timeline {
  position: relative;
  padding-left: 32px;
}

.process-timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e0e0e0;
}

.step-point {
  position: absolute;
  left: -37px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #4CAF50;
  border: 2px solid white;
}

.step-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
}

.step-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.step-name {
  font-weight: 500;
  color: #2c3e50;
}

.step-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.step-status.completed {
  background: #e8f5e9;
  color: #4caf50;
}

.step-time {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 12px;
}

.step-params {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 12px;
}

.param-item {
  display: flex;
  justify-content: space-between;
  background: white;
  padding: 8px 12px;
  border-radius: 4px;
}

.param-name {
  color: #666;
}

.param-value {
  font-weight: 500;
  color: #2c3e50;
}

/* 质量检测记录特有样式 */
.quality-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.test-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin: 12px 0;
}

.test-item {
  background: white;
  padding: 12px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-name {
  font-weight: 500;
  color: #2c3e50;
}

.item-value {
  color: #4caf50;
  font-size: 1.1rem;
}

.item-standard {
  color: #666;
  font-size: 0.9rem;
}

/* 深色模式特有样式 */
@media (prefers-color-scheme: dark) {
  .step-card,
  .quality-card {
    background: #1a1a1a;
  }

  .param-item,
  .test-item {
    background: #2d2d2d;
  }

  .step-name,
  .param-value,
  .item-name {
    color: #fff;
  }

  .step-time,
  .param-name,
  .item-standard {
    color: #bbb;
  }
}
</style> 