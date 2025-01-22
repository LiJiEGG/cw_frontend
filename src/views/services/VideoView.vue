<script setup lang="ts">
import BackButton from '@/components/common/BackButton.vue'
import VideoMonitor from '@/components/services/VideoMonitor.vue'
</script>

<template>
  <div class="video-view">
    <BackButton />
    <h2>视频监控</h2>
    <div class="content">
      <VideoMonitor />
    </div>
  </div>
</template>

<style scoped>
.video-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.content {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  h2 {
    color: #e5eaf3;
  }

  .content {
    background: #2d2d2d;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .video-view {
    padding: 16px;
  }

  h2 {
    font-size: 1.5rem;
  }
}
</style> 