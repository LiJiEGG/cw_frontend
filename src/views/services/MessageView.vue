<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

// 留言表单
const messageForm = ref({
  name: '',
  phone: '',
  email: '',
  type: '',
  content: ''
})

// 留言类型
const messageTypes = [
  { value: 'consultation', label: '技术咨询' },
  { value: 'suggestion', label: '建议反馈' },
  { value: 'complaint', label: '问题投诉' },
  { value: 'cooperation', label: '商务合作' }
]

// 历史留言
const messageHistory = ref([
  {
    id: 1,
    type: 'consultation',
    content: '请问水培黄瓜种植需要注意哪些关键环节？',
    date: '2024-03-20',
    status: 'replied',
    reply: '您好，水培黄瓜种植的关键环节包括：1. 营养液配方调配...'
  },
  {
    id: 2,
    type: 'suggestion',
    content: '建议增加更多在线培训课程',
    date: '2024-03-18',
    status: 'pending',
    reply: ''
  }
])

// 提交留言
const submitMessage = () => {
  console.log('提交留言:', messageForm.value)
  // 实现留言提交逻辑
}

// 获取留言类型标签
const getTypeLabel = (type: string) => {
  const found = messageTypes.find(t => t.value === type)
  return found ? found.label : type
}
</script>

<template>
  <div class="message-view">
    <BackButton />
    <h2>留言咨询</h2>
    
    <div class="content">
      <!-- 留言表单 -->
      <section class="message-form-section">
        <h3>在线留言</h3>
        <form @submit.prevent="submitMessage" class="message-form">
          <div class="form-row">
            <div class="form-group">
              <label>姓名</label>
              <input type="text" v-model="messageForm.name" required>
            </div>
            <div class="form-group">
              <label>联系电话</label>
              <input type="tel" v-model="messageForm.phone" required>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>电子邮箱</label>
              <input type="email" v-model="messageForm.email">
            </div>
            <div class="form-group">
              <label>留言类型</label>
              <select v-model="messageForm.type" required>
                <option value="">请选择留言类型</option>
                <option v-for="type in messageTypes"
                        :key="type.value"
                        :value="type.value">
                  {{ type.label }}
                </option>
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label>留言内容</label>
            <textarea v-model="messageForm.content" 
                      rows="6" 
                      placeholder="请详细描述您的问题或建议..."
                      required></textarea>
          </div>
          
          <button type="submit" class="submit-btn">提交留言</button>
        </form>
      </section>

      <!-- 留言历史 -->
      <section class="message-history-section">
        <h3>留言记录</h3>
        <div class="message-list">
          <div v-for="message in messageHistory"
               :key="message.id"
               class="message-card">
            <div class="message-header">
              <span class="message-type">{{ getTypeLabel(message.type) }}</span>
              <span class="message-date">{{ message.date }}</span>
            </div>
            <div class="message-content">{{ message.content }}</div>
            <div v-if="message.status === 'replied'" class="message-reply">
              <div class="reply-label">回复：</div>
              <div class="reply-content">{{ message.reply }}</div>
            </div>
            <div class="message-status" :class="message.status">
              {{ message.status === 'replied' ? '已回复' : '待回复' }}
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.message-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* 表单样式 */
.message-form-section {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
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

/* 留言历史样式 */
.message-list {
  display: grid;
  gap: 20px;
}

.message-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.message-type {
  padding: 4px 12px;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 20px;
  font-size: 0.85rem;
}

.message-date {
  color: #666;
  font-size: 0.9rem;
}

.message-content {
  color: #2c3e50;
  line-height: 1.5;
  margin-bottom: 16px;
}

.message-reply {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
}

.reply-label {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 4px;
}

.reply-content {
  color: #2c3e50;
  line-height: 1.5;
}

.message-status {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
}

.message-status.replied {
  background: #e8f5e9;
  color: #4caf50;
}

.message-status.pending {
  background: #fff3e0;
  color: #f57c00;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .message-form-section,
  .message-card {
    background: #2d2d2d;
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

  .message-content {
    color: #fff;
  }

  .message-reply {
    background: #1a1a1a;
  }

  .reply-content {
    color: #fff;
  }

  .message-date {
    color: #bbb;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .message-card {
    padding: 16px;
  }

  .message-status {
    position: static;
    display: inline-block;
    margin-top: 12px;
  }
}
</style> 