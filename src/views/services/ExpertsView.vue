<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

// 专家列表
const experts = ref([
  {
    id: 1,
    name: '张教授',
    title: '农业科学研究员',
    avatar: '👨‍🔬',
    specialties: ['水培技术', '病虫害防治', '农业物联网'],
    experience: '从事农业科研20年，主持多项国家级科研项目',
    available: true,
    rating: 4.9,
    consultCount: 1280
  },
  {
    id: 2,
    name: '李博士',
    title: '智能农业专家',
    avatar: '👩‍🔬',
    specialties: ['智能控制', '数据分析', '农业机器人'],
    experience: '智能农业领域专家，参与多个智慧农场建设项目',
    available: true,
    rating: 4.8,
    consultCount: 960
  },
  {
    id: 3,
    name: '王研究员',
    title: '植物营养学专家',
    avatar: '👨‍🌾',
    specialties: ['植物营养', '土壤改良', '肥料配方'],
    experience: '专注植物营养与土壤健康研究15年',
    available: false,
    rating: 4.9,
    consultCount: 1560
  }
])

// 咨询记录
const consultations = ref([
  {
    id: 1,
    expertName: '张教授',
    date: '2024-03-20',
    topic: '黄瓜苗期管理',
    status: 'completed',
    duration: '45分钟'
  },
  {
    id: 2,
    expertName: '李博士',
    date: '2024-03-15',
    topic: '智能灌溉系统调试',
    status: 'scheduled',
    duration: '待开始'
  }
])

// 预约表单
const appointmentForm = ref({
  expertId: '',
  date: '',
  time: '',
  topic: '',
  description: ''
})

// 显示预约表单
const showAppointmentForm = ref(false)
const selectedExpert = ref(null)

const openAppointmentForm = (expert: any) => {
  selectedExpert.value = expert
  showAppointmentForm.value = true
}

const submitAppointment = () => {
  console.log('提交预约:', appointmentForm.value)
  showAppointmentForm.value = false
  // 实现预约提交逻辑
}
</script>

<template>
  <div class="experts-view">
    <BackButton />
    <h2>合作专家</h2>
    
    <div class="content">
      <!-- 专家列表 -->
      <section class="experts-section">
        <div class="experts-grid">
          <div v-for="expert in experts"
               :key="expert.id"
               class="expert-card">
            <div class="expert-header">
              <div class="avatar">{{ expert.avatar }}</div>
              <div class="expert-info">
                <h3>{{ expert.name }}</h3>
                <span class="title">{{ expert.title }}</span>
              </div>
              <span :class="['status-badge', { available: expert.available }]">
                {{ expert.available ? '在线' : '忙碌' }}
              </span>
            </div>
            
            <div class="specialties">
              <span v-for="(specialty, index) in expert.specialties"
                    :key="index"
                    class="specialty-tag">
                {{ specialty }}
              </span>
            </div>
            
            <p class="experience">{{ expert.experience }}</p>
            
            <div class="stats">
              <div class="rating">
                <span class="star">⭐</span>
                <span>{{ expert.rating }}</span>
              </div>
              <div class="consult-count">
                已咨询 {{ expert.consultCount }} 次
              </div>
            </div>
            
            <button 
              class="consult-btn"
              :disabled="!expert.available"
              @click="openAppointmentForm(expert)"
            >
              预约咨询
            </button>
          </div>
        </div>
      </section>

      <!-- 咨询记录 -->
      <section class="consultations-section">
        <h3>咨询记录</h3>
        <div class="consultations-list">
          <div v-for="consultation in consultations"
               :key="consultation.id"
               class="consultation-card">
            <div class="consultation-header">
              <span class="expert-name">{{ consultation.expertName }}</span>
              <span :class="['status-tag', consultation.status]">
                {{ consultation.status === 'completed' ? '已完成' : '待进行' }}
              </span>
            </div>
            <div class="consultation-info">
              <div class="topic">{{ consultation.topic }}</div>
              <div class="meta">
                <span>{{ consultation.date }}</span>
                <span>{{ consultation.duration }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 预约表单弹窗 -->
      <div v-if="showAppointmentForm" class="modal-overlay">
        <div class="modal-content">
          <h3>预约咨询</h3>
          <form @submit.prevent="submitAppointment">
            <div class="form-group">
              <label>专家</label>
              <input type="text" :value="selectedExpert?.name" disabled>
            </div>
            <div class="form-group">
              <label>日期</label>
              <input type="date" v-model="appointmentForm.date" required>
            </div>
            <div class="form-group">
              <label>时间</label>
              <input type="time" v-model="appointmentForm.time" required>
            </div>
            <div class="form-group">
              <label>咨询主题</label>
              <input type="text" v-model="appointmentForm.topic" required>
            </div>
            <div class="form-group">
              <label>问题描述</label>
              <textarea v-model="appointmentForm.description" rows="4"></textarea>
            </div>
            <div class="modal-buttons">
              <button type="button" 
                      class="cancel-btn"
                      @click="showAppointmentForm = false">
                取消
              </button>
              <button type="submit" class="submit-btn">确认预约</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.experts-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* 专家卡片样式 */
.experts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}

.expert-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.expert-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.avatar {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  border-radius: 50%;
}

.expert-info {
  flex: 1;
}

.expert-info h3 {
  margin: 0;
  color: #2c3e50;
}

.title {
  color: #666;
  font-size: 0.9rem;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  background: #f8d7da;
  color: #dc3545;
}

.status-badge.available {
  background: #d4edda;
  color: #28a745;
}

.specialties {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.specialty-tag {
  padding: 4px 12px;
  background: #e9ecef;
  border-radius: 16px;
  font-size: 0.85rem;
  color: #495057;
}

.experience {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 16px;
}

.stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  color: #666;
  font-size: 0.9rem;
}

.rating {
  display: flex;
  align-items: center;
  gap: 4px;
}

.consult-btn {
  width: 100%;
  padding: 12px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.consult-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* 咨询记录样式 */
.consultation-card {
  background: white;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.consultation-header {
  display: flex;
  justify-content: space-between;
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

.status-tag.scheduled {
  background: #e3f2fd;
  color: #1976d2;
}

.consultation-info {
  color: #666;
  font-size: 0.9rem;
}

.topic {
  margin-bottom: 8px;
}

.meta {
  display: flex;
  justify-content: space-between;
  color: #888;
}

/* 弹窗样式 */
.modal-overlay {
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
}

.modal-buttons {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}

.cancel-btn {
  flex: 1;
  padding: 12px;
  background: #f8f9fa;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .expert-card,
  .consultation-card,
  .modal-content {
    background: #2d2d2d;
  }

  .expert-info h3 {
    color: #fff;
  }

  .title,
  .experience {
    color: #bbb;
  }

  .avatar {
    background: #1a1a1a;
  }

  .specialty-tag {
    background: #1a1a1a;
    color: #bbb;
  }

  .stats {
    color: #bbb;
  }

  .consultation-info {
    color: #bbb;
  }

  .meta {
    color: #888;
  }

  .cancel-btn {
    background: #1a1a1a;
    color: #fff;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .experts-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    width: 95%;
    margin: 20px;
  }
}
</style> 