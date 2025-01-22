<script setup lang="ts">
import BackButton from '@/components/common/BackButton.vue'
</script>

<template>
  <div class="technical-view">
    <BackButton />
    <h2>技术方案</h2>
    <div class="content">
      <section class="tech-section">
        <h3>核心技术</h3>
        <div class="tech-grid">
          <div class="tech-card">
            <div class="tech-icon">🤖</div>
            <h4>人工智能</h4>
            <div class="tech-details">
              <ul>
                <li>机器学习算法</li>
                <li>深度学习模型</li>
                <li>智能决策系统</li>
                <li>计算机视觉</li>
              </ul>
            </div>
          </div>

          <div class="tech-card">
            <div class="tech-icon">📊</div>
            <h4>大数据技术</h4>
            <div class="tech-details">
              <ul>
                <li>数据采集处理</li>
                <li>分布式存储</li>
                <li>实时分析</li>
                <li>数据挖掘</li>
              </ul>
            </div>
          </div>

          <div class="tech-card">
            <div class="tech-icon">🌐</div>
            <h4>物联网技术</h4>
            <div class="tech-details">
              <ul>
                <li>传感器网络</li>
                <li>无线通信</li>
                <li>边缘计算</li>
                <li>设备控制</li>
              </ul>
            </div>
          </div>

          <div class="tech-card">
            <div class="tech-icon">☁️</div>
            <h4>云计算</h4>
            <div class="tech-details">
              <ul>
                <li>云服务架构</li>
                <li>微服务设计</li>
                <li>容器化部署</li>
                <li>负载均衡</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="implementation-section">
        <h3>实现方案</h3>
        <div class="steps-list">
          <div class="step-item">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>数据采集</h4>
              <p>通过分布式传感器网络实时采集环境数据、设备状态等信息</p>
            </div>
          </div>

          <div class="step-item">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>数据处理</h4>
              <p>利用边缘计算和云计算结合的方式进行数据清洗、存储和分析</p>
            </div>
          </div>

          <div class="step-item">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>智能分析</h4>
              <p>应用机器学习算法进行数据建模、预测和决策优化</p>
            </div>
          </div>

          <div class="step-item">
            <div class="step-number">4</div>
            <div class="step-content">
              <h4>自动控制</h4>
              <p>基于分析结果自动调节设备参数，实现智能化控制</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.technical-view {
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

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.tech-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.tech-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tech-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
  text-align: center;
}

.tech-card h4 {
  color: #2c3e50;
  margin: 0 0 16px 0;
  font-size: 1.2rem;
  text-align: center;
}

.tech-details ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tech-details li {
  color: #666;
  padding: 8px 0;
  border-top: 1px solid #eee;
  text-align: center;
}

.steps-list {
  display: grid;
  gap: 20px;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.step-item:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.step-number {
  width: 40px;
  height: 40px;
  background: #4CAF50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.step-content h4 {
  color: #2c3e50;
  margin: 0 0 8px 0;
  font-size: 1.1rem;
}

.step-content p {
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

  .tech-card {
    background: #1a1a1a;
  }

  .tech-card h4 {
    color: #fff;
  }

  .tech-details li {
    color: #bbb;
    border-color: #333;
  }

  .step-item {
    background: #1a1a1a;
  }

  .step-content h4 {
    color: #fff;
  }

  .step-content p {
    color: #bbb;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tech-grid {
    grid-template-columns: 1fr;
  }

  .step-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .step-number {
    margin-bottom: 12px;
  }
}
</style> 