<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

interface Message {
  id: number
  type: 'user' | 'ai'
  content: string
  time: string
}

// 聊天记录
const chatHistory = ref<Message[]>([
  {
    id: 1,
    type: 'ai',
    content: '您好！我是智能助手，很高兴为您服务。请问有什么可以帮您？',
    time: '14:00'
  }
])

// 常见问题
const commonQuestions = ref([
  '如何调节温室温度？',
  '水培营养液如何配置？',
  '植物病虫害如何防治？',
  '智能设备如何连接？',
  '产品溯源怎么查询？'
])

// 输入框内容
const inputMessage = ref('')

// 是否显示加载状态
const isLoading = ref(false)

// 发送消息
const sendMessage = async () => {
  if (!inputMessage.value.trim()) return

  const userMessage: Message = {
    id: chatHistory.value.length + 1,
    type: 'user',
    content: inputMessage.value,
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }

  chatHistory.value.push(userMessage)
  const question = inputMessage.value
  inputMessage.value = ''
  
  // 显示加载状态
  isLoading.value = true

  try {
    // 模拟AI响应
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const aiMessage: Message = {
      id: chatHistory.value.length + 1,
      type: 'ai',
      content: `关于"${question}"，我的建议是...`,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }
    
    chatHistory.value.push(aiMessage)
  } finally {
    isLoading.value = false
  }
}

// 点击常见问题
const selectQuestion = (question: string) => {
  inputMessage.value = question
  sendMessage()
}
</script>

<template>
  <div class="qa-view">
    <BackButton />
    <h2>智能问答</h2>
    
    <div class="content">
      <div class="chat-container">
        <!-- 聊天窗口 -->
        <div class="chat-window">
          <div class="message-list">
            <div v-for="message in chatHistory"
                 :key="message.id"
                 :class="['message', message.type]">
              <div class="message-content">
                <div class="avatar">
                  {{ message.type === 'ai' ? '🤖' : '👤' }}
                </div>
                <div class="bubble">
                  {{ message.content }}
                  <span class="time">{{ message.time }}</span>
                </div>
              </div>
            </div>
            
            <!-- 加载状态 -->
            <div v-if="isLoading" class="message ai">
              <div class="message-content">
                <div class="avatar">🤖</div>
                <div class="bubble loading">
                  <span class="dot"></span>
                  <span class="dot"></span>
                  <span class="dot"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 输入区域 -->
        <div class="input-area">
          <input 
            type="text"
            v-model="inputMessage"
            placeholder="请输入您的问题..."
            @keyup.enter="sendMessage"
          >
          <button 
            class="send-btn"
            @click="sendMessage"
            :disabled="!inputMessage.trim() || isLoading"
          >
            发送
          </button>
        </div>
      </div>

      <!-- 常见问题 -->
      <div class="common-questions">
        <h3>常见问题</h3>
        <div class="question-list">
          <div v-for="(question, index) in commonQuestions"
               :key="index"
               class="question-item"
               @click="selectQuestion(question)">
            {{ question }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.qa-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 24px;
}

/* 聊天容器样式 */
.chat-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 600px;
}

.chat-window {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message {
  display: flex;
  flex-direction: column;
}

.message-content {
  display: flex;
  gap: 12px;
  max-width: 80%;
}

.message.user {
  align-items: flex-end;
}

.message.user .message-content {
  flex-direction: row-reverse;
}

.avatar {
  width: 40px;
  height: 40px;
  background: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.bubble {
  background: #f0f0f0;
  padding: 12px 16px;
  border-radius: 12px;
  position: relative;
}

.message.ai .bubble {
  border-top-left-radius: 4px;
  background: #e3f2fd;
}

.message.user .bubble {
  border-top-right-radius: 4px;
  background: #e8f5e9;
}

.time {
  font-size: 0.8rem;
  color: #666;
  margin-top: 4px;
  display: block;
}

/* 加载动画 */
.loading {
  display: flex;
  gap: 4px;
  padding: 12px 20px;
}

.dot {
  width: 8px;
  height: 8px;
  background: #666;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
}

.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

/* 输入区域样式 */
.input-area {
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 12px;
}

.input-area input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.send-btn {
  padding: 12px 24px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.send-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* 常见问题样式 */
.common-questions {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.question-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}

.question-item {
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.question-item:hover {
  background: #e9ecef;
  transform: translateX(5px);
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .chat-container,
  .common-questions {
    background: #2d2d2d;
  }

  .avatar {
    background: #1a1a1a;
  }

  .bubble {
    background: #1a1a1a;
    color: #fff;
  }

  .message.ai .bubble {
    background: #1a2b3c;
  }

  .message.user .bubble {
    background: #1b2e1e;
  }

  .time {
    color: #888;
  }

  .input-area {
    border-color: #444;
  }

  .input-area input {
    background: #1a1a1a;
    border-color: #444;
    color: #fff;
  }

  .question-item {
    background: #1a1a1a;
    color: #fff;
  }

  .question-item:hover {
    background: #333;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
  }

  .chat-container {
    height: 500px;
  }

  .message-content {
    max-width: 90%;
  }
}
</style> 