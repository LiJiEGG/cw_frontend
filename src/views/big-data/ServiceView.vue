<script setup lang="ts">
import BackButton from '@/components/common/BackButton.vue'
</script>

<template>
  <div class="service-view">
    <BackButton />
    <h2>数据服务</h2>
    <div class="content">
      <section class="service-section">
        <h3>服务内容</h3>
        <div class="service-grid">
          <div class="service-card">
            <div class="service-icon">🔄</div>
            <h4>数据共享</h4>
            <ul>
              <li>实时数据</li>
              <li>历史数据</li>
              <li>分析报告</li>
              <li>预警信息</li>
            </ul>
          </div>

          <div class="service-card">
            <div class="service-icon">📱</div>
            <h4>接口服务</h4>
            <ul>
              <li>REST API</li>
              <li>WebSocket</li>
              <li>数据推送</li>
              <li>权限管理</li>
            </ul>
          </div>

          <div class="service-card">
            <div class="service-icon">💡</div>
            <h4>智能服务</h4>
            <ul>
              <li>决策支持</li>
              <li>专家系统</li>
              <li>知识库</li>
              <li>在线咨询</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="feature-section">
        <h3>平台特点</h3>
        <div class="feature-list">
          <div class="feature-item">
            <div class="feature-icon">🔒</div>
            <div class="feature-content">
              <h4>安全可靠</h4>
              <p>多重安全防护，确保数据传输和存储安全</p>
            </div>
          </div>

          <div class="feature-item">
            <div class="feature-icon">⚡</div>
            <div class="feature-content">
              <h4>高性能</h4>
              <p>分布式架构，支持高并发和大规模数据处理</p>
            </div>
          </div>

          <div class="feature-item">
            <div class="feature-icon">🔌</div>
            <div class="feature-content">
              <h4>易扩展</h4>
              <p>标准化接口，支持多种协议和数据格式</p>
            </div>
          </div>

          <div class="feature-item">
            <div class="feature-icon">📊</div>
            <div class="feature-content">
              <h4>可视化</h4>
              <p>丰富的数据展示方式，支持自定义报表</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.service-view {
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

.service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.service-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.service-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
  text-align: center;
}

.service-card h4 {
  color: #2c3e50;
  margin: 0 0 16px 0;
  font-size: 1.2rem;
  text-align: center;
}

.service-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.service-card li {
  color: #666;
  padding: 8px 0;
  border-top: 1px solid #eee;
  text-align: center;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2rem;
  width: 50px;
  height: 50px;
  background: #4CAF50;
  color: white;
  border-radius: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-content {
  flex: 1;
}

.feature-content h4 {
  color: #2c3e50;
  margin: 0 0 8px 0;
  font-size: 1.1rem;
}

.feature-content p {
  margin: 0;
  color: #666;
  line-height: 1.5;
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

  .service-card {
    background: #1a1a1a;
  }

  .service-card h4 {
    color: #fff;
  }

  .service-card li {
    color: #bbb;
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
  .service-grid {
    grid-template-columns: 1fr;
  }

  .feature-list {
    grid-template-columns: 1fr;
  }

  .feature-item {
    flex-direction: column;
    text-align: center;
  }

  .feature-icon {
    margin-bottom: 12px;
  }

  .feature-content {
    text-align: center;
  }
}
</style> 