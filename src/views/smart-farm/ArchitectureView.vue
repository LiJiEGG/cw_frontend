<script setup lang="ts">
import BackButton from '@/components/common/BackButton.vue'
</script>

<template>
  <div class="architecture-view">
    <BackButton />
    <h2>总体架构设计</h2>
    <div class="content">
      <section class="architecture-section">
        <h3>系统架构</h3>
        <div class="layer-grid">
          <div class="layer-card">
            <div class="layer-icon">🔌</div>
            <h4>感知层</h4>
            <p>各类传感器、执行器和智能设备</p>
            <ul>
              <li>环境传感器</li>
              <li>视频监控设备</li>
              <li>自动控制设备</li>
            </ul>
          </div>
          
          <div class="layer-card">
            <div class="layer-icon">🌐</div>
            <h4>网络层</h4>
            <p>数据传输和网络通信</p>
            <ul>
              <li>物联网通信</li>
              <li>5G网络</li>
              <li>局域网络</li>
            </ul>
          </div>
          
          <div class="layer-card">
            <div class="layer-icon">💻</div>
            <h4>平台层</h4>
            <p>数据处理和业务逻辑</p>
            <ul>
              <li>数据存储</li>
              <li>数据分析</li>
              <li>智能决策</li>
            </ul>
          </div>
          
          <div class="layer-card">
            <div class="layer-icon">📱</div>
            <h4>应用层</h4>
            <p>用户界面和应用功能</p>
            <ul>
              <li>监控管理</li>
              <li>智能控制</li>
              <li>数据可视化</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="features-section">
        <h3>主要特点</h3>
        <div class="features-list">
          <div class="feature-item">
            <span class="feature-icon">🔄</span>
            <div class="feature-content">
              <h4>模块化设计</h4>
              <p>系统各个模块独立，便于维护和扩展</p>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🔒</span>
            <div class="feature-content">
              <h4>安全可靠</h4>
              <p>多层安全防护，确保系统稳定运行</p>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">⚡</span>
            <div class="feature-content">
              <h4>高性能</h4>
              <p>优化的系统架构，保证高效运行</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.architecture-view {
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

.layer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.layer-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.layer-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.layer-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
  text-align: center;
}

.layer-card h4 {
  color: #2c3e50;
  margin: 0 0 12px 0;
  font-size: 1.2rem;
  text-align: center;
}

.layer-card p {
  color: #666;
  margin-bottom: 16px;
  text-align: center;
}

.layer-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.layer-card ul li {
  color: #666;
  padding: 8px 0;
  border-top: 1px solid #eee;
  text-align: center;
}

.features-list {
  display: grid;
  gap: 20px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2rem;
}

.feature-content h4 {
  color: #2c3e50;
  margin: 0 0 8px 0;
  font-size: 1.1rem;
}

.feature-content p {
  margin: 0;
  color: #666;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .content {
    background: #2d2d2d;
  }

  h2, h3 {
    color: #fff;
  }

  .layer-card {
    background: #1a1a1a;
  }

  .layer-card h4 {
    color: #fff;
  }

  .layer-card p,
  .layer-card ul li {
    color: #bbb;
  }

  .layer-card ul li {
    border-color: #333;
  }

  .feature-item {
    background: #1a1a1a;
  }

  .feature-content h4 {
    color: #fff;
  }

  .feature-content p {
    color: #bbb;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .layer-grid {
    grid-template-columns: 1fr;
  }

  .layer-card {
    text-align: center;
  }
}
</style> 