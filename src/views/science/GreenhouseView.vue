<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

// 温室类型数据
const greenhouseTypes = ref([
  {
    id: 1,
    title: '智能玻璃温室',
    icon: '🏗️',
    features: [
      '智能环境控制系统',
      '自动遮阳系统',
      '智能通风系统',
      '精准灌溉系统'
    ],
    advantages: '光照条件好，保温性能强，自动化程度高',
    suitable: '适用于高价值作物种植'
  },
  {
    id: 2,
    title: '连栋薄膜温室',
    icon: '🏢',
    features: [
      '大跨度结构',
      '自然通风',
      '滴灌系统',
      '卷帘系统'
    ],
    advantages: '造价适中，空间利用率高，适合规模化生产',
    suitable: '适用于蔬菜瓜果种植'
  },
  {
    id: 3,
    title: '日光温室',
    icon: '🌞',
    features: [
      '坡屋面采光',
      '后墙保温',
      '自然采光',
      '基本环境控制'
    ],
    advantages: '造价低，适应性强，维护成本低',
    suitable: '适用于北方地区冬季种植'
  }
])

// 发展历程
const timeline = ref([
  {
    year: '1970s',
    title: '温室起步',
    content: '简易塑料大棚开始在农业生产中应用'
  },
  {
    year: '1990s',
    title: '规模发展',
    content: '日光温室技术成熟，连栋温室开始推广'
  },
  {
    year: '2000s',
    title: '智能化初期',
    content: '引入自动化控制系统，环境调控更精准'
  },
  {
    year: '2010s',
    title: '现代化升级',
    content: '物联网技术应用，实现智能化管理'
  },
  {
    year: '2020s',
    title: '数字化转型',
    content: '大数据分析和AI技术融入温室管理'
  }
])
</script>

<template>
  <div class="greenhouse-view">
    <BackButton />
    
    <div class="content-section">
      <h2>温室类型</h2>
      <div class="types-grid">
        <div v-for="type in greenhouseTypes" 
             :key="type.id"
             class="type-card">
          <div class="type-header">
            <span class="type-icon">{{ type.icon }}</span>
            <h3>{{ type.title }}</h3>
          </div>
          <div class="type-content">
            <div class="features">
              <h4>主要特点</h4>
              <ul>
                <li v-for="(feature, index) in type.features" 
                    :key="index">
                  {{ feature }}
                </li>
              </ul>
            </div>
            <div class="advantages">
              <h4>优势</h4>
              <p>{{ type.advantages }}</p>
            </div>
            <div class="suitable">
              <h4>适用范围</h4>
              <p>{{ type.suitable }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="timeline-section">
        <h2>发展历程</h2>
        <div class="timeline">
          <div v-for="(item, index) in timeline" 
               :key="index"
               class="timeline-item">
            <div class="timeline-year">{{ item.year }}</div>
            <div class="timeline-content">
              <h4>{{ item.title }}</h4>
              <p>{{ item.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.greenhouse-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.content-section {
  margin-top: 20px;
}

h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 24px;
  font-weight: 600;
}

.types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.type-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  transition: all 0.3s ease;
}

.type-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.type-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
}

.type-icon {
  font-size: 28px;
}

.type-card h3 {
  color: #2c3e50;
  font-size: 1.4rem;
  margin: 0;
  font-weight: 600;
}

.type-content h4 {
  color: #4CAF50;
  font-size: 1.1rem;
  margin: 16px 0 8px;
}

.type-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.type-content li {
  color: #666;
  padding: 4px 0 4px 20px;
  position: relative;
}

.type-content li::before {
  content: "•";
  color: #4CAF50;
  position: absolute;
  left: 0;
}

.type-content p {
  color: #666;
  line-height: 1.6;
  margin: 8px 0;
}

.timeline-section {
  margin-top: 60px;
}

.timeline {
  position: relative;
  padding: 20px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background: #4CAF50;
}

.timeline-item {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 40px;
  position: relative;
}

.timeline-year {
  background: #4CAF50;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -10px;
}

.timeline-content {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  width: 40%;
  margin-top: 20px;
  transition: all 0.3s ease;
}

.timeline-item:nth-child(odd) .timeline-content {
  margin-right: 50%;
  margin-left: 30px;
}

.timeline-item:nth-child(even) .timeline-content {
  margin-left: 50%;
  margin-right: 30px;
}

.timeline-content:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.timeline-content h4 {
  color: #2c3e50;
  margin: 0 0 8px;
  font-size: 1.2rem;
}

.timeline-content p {
  color: #666;
  margin: 0;
  line-height: 1.6;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  h2 {
    color: #e5eaf3;
  }

  .type-card,
  .timeline-content {
    background: #2d2d2d;
    border-color: #333;
  }

  .type-header {
    border-color: #444;
  }

  .type-card h3,
  .timeline-content h4 {
    color: #e5eaf3;
  }

  .type-content h4 {
    color: #81c784;
  }

  .type-content li,
  .type-content p,
  .timeline-content p {
    color: #bbb;
  }

  .type-content li::before {
    color: #81c784;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .greenhouse-view {
    padding: 16px;
  }

  h2 {
    font-size: 1.5rem;
  }

  .timeline::before {
    left: 20px;
  }

  .timeline-year {
    left: 20px;
    transform: none;
  }

  .timeline-content {
    width: calc(100% - 60px);
    margin: 20px 0 0 60px !important;
  }
}
</style> 