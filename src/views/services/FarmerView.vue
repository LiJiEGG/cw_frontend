<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

// 服务类型
const services = ref([
  {
    id: 1,
    icon: '🌱',
    title: '种植指导',
    description: '提供专业的种植技术指导和培训服务',
    items: [
      '种植方案制定',
      '技术培训课程',
      '现场指导服务',
      '疑难问题解答'
    ]
  },
  {
    id: 2,
    icon: '🔧',
    title: '设备维护',
    description: '智能设备安装、调试和维护服务',
    items: [
      '设备安装调试',
      '定期检修维护',
      '故障诊断维修',
      '设备升级服务'
    ]
  },
  {
    id: 3,
    icon: '📊',
    title: '数据分析',
    description: '农业数据分析和决策支持服务',
    items: [
      '生产数据分析',
      '环境监测分析',
      '产量预测分析',
      '优化建议制定'
    ]
  }
])

// 预约表单
const appointmentForm = ref({
  name: '',
  phone: '',
  serviceType: '',
  description: '',
  date: ''
})

// 提交预约
const submitAppointment = () => {
  console.log('提交预约:', appointmentForm.value)
  // 实现预约提交逻辑
}

// 服务记录
const serviceRecords = ref([
  {
    id: 1,
    date: '2024-03-20',
    type: '种植指导',
    status: 'completed',
    feedback: '非常满意，专家指导很专业'
  },
  {
    id: 2,
    date: '2024-03-15',
    type: '设备维护',
    status: 'completed',
    feedback: '设备问题得到及时解决'
  }
])
</script>

<template>
  <div class="farmer-view">
    <BackButton />
    <h2>为农服务</h2>
    
    <div class="content">
      <!-- 服务类型展示 -->
      <section class="services-section">
        <h3>服务项目</h3>
        <div class="services-grid">
          <div v-for="service in services"
               :key="service.id"
               class="service-card">
            <div class="service-icon">{{ service.icon }}</div>
            <h4>{{ service.title }}</h4>
            <p>{{ service.description }}</p>
            <ul class="service-items">
              <li v-for="(item, index) in service.items"
                  :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 预约表单 -->
      <section class="appointment-section">
        <h3>在线预约</h3>
        <form @submit.prevent="submitAppointment" class="appointment-form">
          <div class="form-group">
            <label>姓名</label>
            <input type="text" v-model="appointmentForm.name" required>
          </div>
          <div class="form-group">
            <label>联系电话</label>
            <input type="tel" v-model="appointmentForm.phone" required>
          </div>
          <div class="form-group">
            <label>服务类型</label>
            <select v-model="appointmentForm.serviceType" required>
              <option value="">请选择服务类型</option>
              <option v-for="service in services"
                      :key="service.id"
                      :value="service.title">
                {{ service.title }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>预约日期</label>
            <input type="date" v-model="appointmentForm.date" required>
          </div>
          <div class="form-group">
            <label>需求描述</label>
            <textarea v-model="appointmentForm.description" rows="4"></textarea>
          </div>
          <button type="submit" class="submit-btn">提交预约</button>
        </form>
      </section>

      <!-- 服务记录 -->
      <section class="records-section">
        <h3>服务记录</h3>
        <div class="records-list">
          <div v-for="record in serviceRecords"
               :key="record.id"
               class="record-card">
            <div class="record-header">
              <span class="record-date">{{ record.date }}</span>
              <span :class="['status-tag', record.status]">
                {{ record.status === 'completed' ? '已完成' : '进行中' }}
              </span>
            </div>
            <h4>{{ record.type }}</h4>
            <p class="feedback">{{ record.feedback }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.farmer-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* 服务卡片样式 */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.service-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.service-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.service-items {
  list-style: none;
  padding: 0;
  margin: 16px 0 0 0;
}

.service-items li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  color: #666;
}

/* 预约表单样式 */
.appointment-form {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: #45a049;
}

/* 服务记录样式 */
.records-list {
  display: grid;
  gap: 16px;
}

.record-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.status-tag {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
}

.status-tag.completed {
  background: #e8f5e9;
  color: #4caf50;
}

.feedback {
  color: #666;
  font-style: italic;
  margin-top: 12px;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .service-card,
  .appointment-form,
  .record-card {
    background: #2d2d2d;
  }

  .service-items li {
    border-color: #444;
    color: #bbb;
  }

  .form-group label {
    color: #fff;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    background: #1a1a1a;
    border-color: #444;
    color: #fff;
  }

  .status-tag.completed {
    background: #1b2e1e;
    color: #81c784;
  }

  .feedback {
    color: #bbb;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }

  .service-card {
    text-align: center;
  }

  .form-group {
    margin-bottom: 16px;
  }
}
</style> 