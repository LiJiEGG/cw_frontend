<script setup lang="ts">
import BackButton from '@/components/common/BackButton.vue'
</script>

<template>
  <div class="definition-view">
    <BackButton />
    <h2>定义与目标</h2>
    <div class="content">
      <section class="definition-section">
        <h3>智慧农场定义</h3>
        <p>智慧农场是一个集成了物联网、人工智能、大数据等现代信息技术的现代化农业生产系统。它通过智能感知、自动控制和数据分析，实现农业生产的精准化、自动化和智能化管理。</p>
      </section>

      <section class="goals-section">
        <h3>主要目标</h3>
        <ul class="goals-list">
          <li>
            <span class="goal-icon">🎯</span>
            <div class="goal-content">
              <h4>提高生产效率</h4>
              <p>通过自动化和智能化管理，显著提升农业生产效率</p>
            </div>
          </li>
          <li>
            <span class="goal-icon">📈</span>
            <div class="goal-content">
              <h4>降低生产成本</h4>
              <p>优化资源利用，减少人力投入，降低运营成本</p>
            </div>
          </li>
          <li>
            <span class="goal-icon">🌱</span>
            <div class="goal-content">
              <h4>保障产品质量</h4>
              <p>实现精准化管理，提高农产品品质</p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.definition-view {
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

section {
  margin-bottom: 40px;
}

h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 20px;
}

h3 {
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #4CAF50;
}

p {
  color: #666;
  line-height: 1.6;
}

.goals-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 20px;
}

.goals-list li {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.goals-list li:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.goal-icon {
  font-size: 2rem;
}

.goal-content h4 {
  color: #2c3e50;
  margin: 0 0 8px 0;
  font-size: 1.1rem;
}

.goal-content p {
  margin: 0;
  font-size: 0.95rem;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .content {
    background: #2d2d2d;
  }

  h2, h3 {
    color: #fff;
  }

  .goals-list li {
    background: #1a1a1a;
  }

  .goal-content h4 {
    color: #fff;
  }

  p {
    color: #bbb;
  }
}
</style> 