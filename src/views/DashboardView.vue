<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const modules = ref([
  {
    id: 1,
    icon: '📊',
    title: '总览',
    path: '/dashboard/overview',
    description: '农场运营整体概况'
  },
  {
    id: 2,
    icon: '🎯',
    title: '实时监控',
    path: '/dashboard/monitor',
    description: '各项指标实时监测'
  },
  {
    id: 3,
    icon: '📈',
    title: '数据分析',
    path: '/dashboard/analysis',
    description: '深度分析与预测'
  }
])

const navigateToModule = (path: string) => {
  router.push(path)
}

const showModules = computed(() => route.path === '/dashboard')
</script>

<template>
  <div class="dashboard">
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
.dashboard {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.module-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
}

.module-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.card-content {
  padding: 20px;
}

.icon-wrapper {
  width: 60px;
  height: 60px;
  background: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.module-icon {
  font-size: 30px;
}

h3 {
  margin: 0 0 10px;
  color: #2c3e50;
  font-size: 1.4rem;
}

p {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
}

.card-footer {
  padding: 15px 20px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.enter-text {
  color: #666;
  font-size: 0.9rem;
}

.arrow {
  font-size: 1.2rem;
  color: #4CAF50;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .module-card {
    background: #2d2d2d;
  }

  .icon-wrapper {
    background: #1a1a1a;
  }

  h3 {
    color: #e5eaf3;
  }

  p {
    color: #bbb;
  }

  .card-footer {
    background: #1a1a1a;
  }

  .enter-text {
    color: #bbb;
  }

  .arrow {
    color: #81c784;
  }
}

/* 动画效果 */
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.5s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .dashboard {
    padding: 16px;
  }

  .modules-grid {
    padding: 10px;
  }

  .module-card {
    min-height: auto;
  }
}
</style> 