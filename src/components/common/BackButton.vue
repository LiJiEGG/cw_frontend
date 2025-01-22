<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const goBack = () => {
  // 获取当前路径
  const currentPath = route.path
  // 获取上一级路径
  const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'))
  // 返回上一级菜单
  router.push(parentPath)
}
</script>

<template>
  <button class="back-button" @click="goBack">
    <span class="back-arrow">←</span>
    <span class="back-text">返回</span>
  </button>
</template>

<style scoped>
.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
  color: #2c3e50;
}

.back-button:hover {
  background: #e9ecef;
  transform: translateX(-5px);
}

.back-arrow {
  font-size: 1.2rem;
}

.back-text {
  font-size: 0.95rem;
  font-weight: 500;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .back-button {
    background: #1a1a1a;
    color: #fff;
  }

  .back-button:hover {
    background: #333;
  }
}
</style> 