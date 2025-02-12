<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const modules = ref([
  {
    id: 1,
    icon: '👥',
    title: '关于我们',
    path: '/services/about',
    description: '了解公司简介和发展历程'
  },
  {
    id: 2,
    icon: '📚',
    title: '知识普及',
    path: '/services/knowledge',
    description: '农业科技知识库'
  },
  {
    id: 3,
    icon: '🌾',
    title: '为农服务',
    path: '/services/farmer',
    description: '农业技术咨询与支持'
  },
  {
    id: 4,
    icon: '👨‍🔬',
    title: '合作专家',
    path: '/services/experts',
    description: '专家团队在线咨询'
  },
  {
    id: 5,
    icon: '💬',
    title: '留言咨询',
    path: '/services/message',
    description: '在线留言与反馈'
  },
  {
    id: 6,
    icon: '🤖',
    title: '智能问答',
    path: '/services/qa',
    description: 'AI智能客服问答'
  },
  {
    id: 7,
    icon: '📊',
    title: '可视化平台',
    path: '/services/visualization',
    description: '数据可视化展示'
  },
  {
    id: 8,
    icon: '📹',
    title: '视频监控',
    path: '/services/video',
    description: '实时视频监控系统'
  }
])

const navigateToModule = (path: string) => {
  router.push(path)
}

const showModules = computed(() => route.path === '/services')
</script>

<!-- <template>
  <div class="services-view">
    <div class="module-header">
      <h2>综合服务</h2>
    </div>
    
    <div class="module-container">
      <div class="modules-grid">
        <div v-for="module in modules"
             :key="module.id"
             class="module-card"
             @click="navigateToModule(module.path)">
          <div class="card-content">
            <div class="icon-wrapper">
              <span class="module-icon">{{ module.icon }}</span>
            </div>
            <h3>{{ module.title }}</h3>
            <p>{{ module.description }}</p>
          </div>
          <div class="card-footer">
            <span class="enter-text">进入模块</span>
            <span class="arrow">→</span>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template> -->

<template>
  <div class="service">
    <transition name="fade-transform" mode="out-in">
      <div v-if="showModules" class="modules-grid">
        <div 
          v-for="module in modules" 
          :key="module.id"
          class="module-card"
          @click="navigateToModule(module.path)"
        >
          <div class="card-content">
            <div class="icon-wrapper">
              <span class="module-icon">{{ module.icon }}</span>
            </div>
            <h3>{{ module.title }}</h3>
            <p>{{ module.description }}</p>
          </div>
          <div class="card-footer">
            <span class="enter-text">进入模块</span>
            <span class="arrow">→</span>
          </div>
        </div>
      </div>
      <router-view v-else></router-view>
    </transition>
  </div>
</template>

<style scoped>
/* 使用与其他模块相同的基础样式 */
.service {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.module-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 220px;
  border: 1px solid #eee;
  animation: cardAppear 0.6s ease backwards;
}

.module-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: #4CAF50;
}

.card-content {
  padding: 24px;
}

.icon-wrapper {
  width: 56px;
  height: 56px;
  background: #f8f9fa;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.module-card:hover .icon-wrapper {
  background: #4CAF50;
  transform: scale(1.1);
}

.module-icon {
  font-size: 28px;
}

h3 {
  color: #2c3e50;
  font-size: 1.3rem;
  margin: 0 0 8px 0;
  font-weight: 600;
}

p {
  color: #666;
  margin: 0;
  line-height: 1.5;
  font-size: 0.95rem;
}

.card-footer {
  padding: 16px 24px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #eee;
  transition: all 0.3s ease;
}

.module-card:hover .card-footer {
  background: #4CAF50;
  border-color: #4CAF50;
}

.enter-text {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
  transition: color 0.3s ease;
}

.arrow {
  font-size: 1.2rem;
  color: #666;
  transition: all 0.3s ease;
}

.module-card:hover .enter-text,
.module-card:hover .arrow {
  color: white;
}

.module-card:hover .arrow {
  transform: translateX(5px);
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .module-card {
    background: #2d2d2d;
    border-color: #333;
  }

  .icon-wrapper {
    background: #1a1a1a;
  }

  h3 {
    color: #fff;
  }

  p {
    color: #bbb;
  }

  .card-footer {
    background: #1a1a1a;
    border-color: #333;
  }

  .enter-text,
  .arrow {
    color: #bbb;
  }

  .module-card:hover {
    border-color: #81c784;
  }

  .module-card:hover .icon-wrapper {
    background: #81c784;
  }

  .module-card:hover .card-footer {
    background: #81c784;
    border-color: #81c784;
  }
}

/* 动画效果 */
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.5s ease;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

@keyframes cardAppear {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 为每个卡片设置不同的延迟，创造级联动画效果 */
.module-card:nth-child(1) { animation-delay: 0.1s; }
.module-card:nth-child(2) { animation-delay: 0.2s; }
.module-card:nth-child(3) { animation-delay: 0.3s; }
.module-card:nth-child(4) { animation-delay: 0.4s; }

/* 响应式设计 */
@media (max-width: 768px) {
  .service {
    padding: 16px;
  }

  .module-card {
    min-height: 200px;
  }

  .icon-wrapper {
    width: 48px;
    height: 48px;
  }

  .module-icon {
    font-size: 24px;
  }

  h3 {
    font-size: 1.2rem;
  }

  p {
    font-size: 0.9rem;
  }
}
</style> 