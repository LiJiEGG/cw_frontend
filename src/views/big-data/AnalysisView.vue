<script setup lang="ts">
import { useRouter } from 'vue-router'
import BackButton from '@/components/common/BackButton.vue'
const router = useRouter()
</script>

<template>
  <div class="analysis-view">
    <BackButton />
    <h2>数据分析</h2>
    <div class="content">
      <section class="analysis-section">
        <h3>分析模块</h3>
        <div class="module-grid">
          <div class="module-card"
               @click="router.push('/big-data/analysis/trend')"
               :class="{ clickable: true }">
            <div class="module-icon">📈</div>
            <h4>分析与预测</h4>
            <ul>
              <li>生长趋势</li>
              <li>产量预测</li>
              <li>环境预测与告警</li>
              <li>土壤养分监控分析</li>
            </ul>
          </div>

          <div class="module-card"
               @click="router.push('/big-data/analysis/intelligent-analytics')"
               :class="{ clickable: true }">
            <div class="module-icon">🔍</div>
            <h4>智能分析</h4>
            <ul>
              <li>病虫害识别</li>
              <li>表型分析</li>
              <li>生长状态分析</li>
              <li>农事预测与识别</li>
            </ul>
          </div>

          <div class="module-card">
            <div class="module-icon">🎯</div>
            <h4>优化决策</h4>
            <ul>
              <li>环境调控</li>
              <li>灌溉策略</li>
              <li>施肥方案</li>
              <li>采收时机</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="tech-section">
        <h3>技术特点</h3>
        <div class="tech-list">
          <div class="tech-item">
            <div class="tech-icon">🤖</div>
            <div class="tech-content">
              <h4>机器学习</h4>
              <p>应用深度学习算法，实现智能化分析和预测</p>
            </div>
          </div>

          <div class="tech-item">
            <div class="tech-icon">⚡</div>
            <div class="tech-content">
              <h4>实时处理</h4>
              <p>基于流计算框架，支持数据实时分析</p>
            </div>
          </div>

          <div class="tech-item">
            <div class="tech-icon">📊</div>
            <div class="tech-content">
              <h4>可视化展示</h4>
              <p>多维度数据可视化，直观展现分析结果</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.analysis-view {
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
  margin-bottom: 24px;
  padding-bottom: 8px;
  border-bottom: 2px solid #4CAF50;
}

.module-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.module-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

/* 添加鼠标悬停效果 */
.module-card.clickable {
  cursor: pointer;
}

.module-card.clickable:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: #f0f2f5;
}

.module-card.clickable:active {
  transform: translateY(-2px);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .module-card.clickable:hover {
    background: #2c2c2c;
  }
}

.module-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
  text-align: center;
}

.module-card h4 {
  color: #2c3e50;
  margin: 0 0 16px 0;
  font-size: 1.2rem;
  text-align: center;
}

.module-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.module-card li {
  color: #666;
  padding: 8px 0;
  border-top: 1px solid #eee;
  text-align: center;
}

.tech-list {
  display: grid;
  gap: 20px;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.tech-item:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tech-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  background: #4CAF50;
  color: white;
  border-radius: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tech-content h4 {
  color: #2c3e50;
  margin: 0 0 8px 0;
  font-size: 1.2rem;
}

.tech-content p {
  margin: 0;
  color: #666;
  line-height: 1.5;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .content {
    background: #2d2d2d;
  }

  h2, h3 {
    color: #fff;
  }

  .module-card {
    background: #1a1a1a;
  }

  .module-card h4 {
    color: #fff;
  }

  .module-card li {
    color: #bbb;
    border-color: #333;
  }

  .tech-item {
    background: #1a1a1a;
  }

  .tech-content h4 {
    color: #fff;
  }

  .tech-content p {
    color: #bbb;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .module-grid {
    grid-template-columns: 1fr;
  }

  .tech-item {
    flex-direction: column;
    text-align: center;
  }

  .tech-icon {
    margin-bottom: 12px;
  }
}
</style> 