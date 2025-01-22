<script setup lang="ts">
import { useRouter } from 'vue-router'
import BackButton from '@/components/common/BackButton.vue'

const router = useRouter()

// 跳转到设备数据页面
const goToDeviceData = () => {
  router.push({
    name: 'DeviceData'
  });
};
</script>

<template>
  <div class="collection-view">
    <BackButton />
    <!-- <h2>数据采集</h2> -->
    <div class="content">
      <!-- 物联网采集 -->
      <section class="collection-section">
        <h3>物联网采集</h3>
        <div class="source-grid">
          <div class="source-card" 
               @click="router.push('/big-data/collection/environment')"
               :class="{ clickable: true }">
            <div class="source-icon">🌡️</div>
            <h4>环境数据</h4>
            <ul>
              <li>温度湿度</li>
              <li>光照强度</li>
              <li>CO2浓度</li>
              <li>土壤数据</li>
            </ul>
            <div class="source-meta">
              <span class="frequency">实时采集</span>
              <span class="status-dot active"></span>
            </div>
          </div>

          <div class="source-card" 
               @click="router.push('/big-data/collection/video')"
               :class="{ clickable: true }">
            <div class="source-icon">📹</div>
            <h4>视频数据</h4>
            <ul>
              <li>生长监控</li>
              <li>病虫害识别</li>
              <li>农事操作</li>
              <li>安全监控</li>
            </ul>
            <div class="source-meta">
              <span class="frequency">实时采集</span>
              <span class="status-dot active"></span>
            </div>
          </div>

          <div class="source-card"
            @click="router.push('/big-data/collection/device')"
            :class="{ clickable: true }">
            <div class="source-icon">🤖</div>
            <h4>设备数据</h4>
            <ul>
              <li>运行状态</li>
              <li>能耗数据</li>
              <li>控制参数</li>
              <li>告警信息</li>
            </ul>
            <div class="source-meta">
              <span class="frequency">实时采集</span>
              <span class="status-dot active"></span>
            </div>
          </div>
        </div>
      </section>

      <!-- 人工采集 -->
      <section class="collection-section">
        <h3>人工采集</h3>
        <div class="source-grid">
          <div class="source-card"
               @click="router.push('/big-data/collection/manual')"
               :class="{ clickable: true }">
            <div class="source-icon">👨‍🌾</div>
            <h4>生长记录</h4>
            <ul>
              <li>植株高度</li>
              <li>叶片数量</li>
              <li>果实数量</li>
              <li>生长状态</li>
            </ul>
            <div class="source-meta">
              <span class="frequency">每日采集</span>
              <span class="status-dot pending"></span>
            </div>
          </div>

          <div class="source-card">
            <div class="source-icon">🔍</div>
            <h4>质量检测</h4>
            <ul>
              <li>农残检测</li>
              <li>品质等级</li>
              <li>病虫害记录</li>
              <li>产品抽检</li>
            </ul>
            <div class="source-meta">
              <span class="frequency">定期采集</span>
              <span class="status-dot pending"></span>
            </div>
          </div>

          <div class="source-card">
            <div class="source-icon">📝</div>
            <h4>作业记录</h4>
            <ul>
              <li>农事操作</li>
              <li>用工记录</li>
              <li>物资使用</li>
              <li>产量统计</li>
            </ul>
            <div class="source-meta">
              <span class="frequency">实时记录</span>
              <span class="status-dot pending"></span>
            </div>
          </div>
        </div>
      </section>

      <section class="process-section">
        <h3>采集流程</h3>
        <div class="process-list">
          <div class="process-item">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>数据获取</h4>
              <p>通过各类传感器和设备实时采集现场数据</p>
            </div>
          </div>

          <div class="process-item">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>数据预处理</h4>
              <p>对原始数据进行清洗、过滤和格式化处理</p>
            </div>
          </div>

          <div class="process-item">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>数据存储</h4>
              <p>将处理后的数据存入分布式数据库系统</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
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

.source-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.source-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.source-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.source-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
  text-align: center;
}

.source-card h4 {
  color: #2c3e50;
  margin: 0 0 16px 0;
  font-size: 1.2rem;
  text-align: center;
}

.source-card ul {
  list-style: none;
  padding: 0;
  margin: 0 0 16px 0;
}

.source-card li {
  color: #666;
  padding: 8px 0;
  border-top: 1px solid #eee;
  text-align: center;
}

.source-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.frequency {
  font-size: 0.9rem;
  color: #666;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-dot.active {
  background: #4caf50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
}

.status-dot.pending {
  background: #ff9800;
  box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.2);
}

.process-list {
  display: grid;
  gap: 20px;
}

.process-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.process-item:hover {
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

  .source-card {
    background: #1a1a1a;
  }

  .source-card h4 {
    color: #fff;
  }

  .source-card li {
    color: #bbb;
    border-color: #333;
  }

  .frequency {
    color: #888;
  }

  .process-item {
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
  .source-grid {
    grid-template-columns: 1fr;
  }

  .process-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .step-number {
    margin-bottom: 12px;
  }
}

.clickable {
  cursor: pointer;
  transition: all 0.3s ease;
}

.clickable:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* 添加路由切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.collection-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.collection-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card-arrow {
  font-size: 1.5rem;
  color: #666;
  transition: transform 0.3s ease;
}

.collection-card:hover .card-arrow {
  transform: translateX(4px);
}
</style> 