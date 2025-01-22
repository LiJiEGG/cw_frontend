<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

// 机械分类数据
const categories = ref([
  {
    id: 1,
    title: '耕作机械',
    icon: '🚜',
    machines: [
      {
        name: '智能拖拉机',
        features: ['GPS导航', '自动驾驶', '精准作业'],
        image: '🚜',
        description: '配备智能导航系统，可实现自动驾驶和精准作业。'
      },
      {
        name: '旋耕机',
        features: ['深度可调', '效率高', '适应性强'],
        image: '⚙️',
        description: '用于农田耕整，可调节耕作深度，作业效率高。'
      }
    ]
  },
  {
    id: 2,
    title: '种植机械',
    icon: '🌱',
    machines: [
      {
        name: '精量播种机',
        features: ['精准定量', '行距可调', '智能控制'],
        image: '📏',
        description: '实现精准定量播种，确保作物均匀生长。'
      },
      {
        name: '移栽机',
        features: ['自动化程度高', '损伤率低', '效率高'],
        image: '🌿',
        description: '用于秧苗移栽，减少人工劳动强度。'
      }
    ]
  },
  {
    id: 3,
    title: '收获机械',
    icon: '🌾',
    machines: [
      {
        name: '联合收割机',
        features: ['智能调平', '自动脱粒', '清选精度高'],
        image: '🚛',
        description: '一次性完成收割、脱粒、清选作业。'
      },
      {
        name: '采摘机器人',
        features: ['视觉识别', '柔性采摘', 'AI控制'],
        image: '🤖',
        description: '应用机器视觉技术，实现智能化采摘。'
      }
    ]
  },
  {
    id: 4,
    title: '植保机械',
    icon: '🚿',
    machines: [
      {
        name: '无人植保机',
        features: ['远程控制', '精准喷洒', '智能避障'],
        image: '🛩️',
        description: '采用无人机技术，实现精准施药。'
      },
      {
        name: '智能喷灌机',
        features: ['自动控制', '节水高效', '远程监控'],
        image: '💧',
        description: '实现智能化灌溉，提高水资源利用率。'
      }
    ]
  }
])

// 使用技巧
const tips = ref([
  {
    title: '日常维护',
    content: '定期检查机械状况，及时进行保养维护，延长使用寿命。',
    icon: '🔧'
  },
  {
    title: '安全操作',
    content: '严格遵守操作规程，确保人身和机械安全。',
    icon: '⚠️'
  },
  {
    title: '效率优化',
    content: '合理规划作业路线，优化机械作业效率。',
    icon: '📈'
  }
])
</script>

<template>
  <div class="machinery-view">
    <BackButton />
    
    <div class="content-section">
      <div v-for="category in categories" 
           :key="category.id"
           class="category-section">
        <div class="category-header">
          <span class="category-icon">{{ category.icon }}</span>
          <h2>{{ category.title }}</h2>
        </div>
        
        <div class="machines-grid">
          <div v-for="(machine, index) in category.machines"
               :key="index"
               class="machine-card">
            <div class="machine-icon">{{ machine.image }}</div>
            <div class="machine-content">
              <h3>{{ machine.name }}</h3>
              <p class="description">{{ machine.description }}</p>
              <div class="features">
                <span v-for="(feature, fIndex) in machine.features"
                      :key="fIndex"
                      class="feature-tag">
                  {{ feature }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tips-section">
        <h2>使用技巧</h2>
        <div class="tips-grid">
          <div v-for="(tip, index) in tips"
               :key="index"
               class="tip-card">
            <div class="tip-icon">{{ tip.icon }}</div>
            <h3>{{ tip.title }}</h3>
            <p>{{ tip.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.machinery-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.content-section {
  margin-top: 20px;
}

.category-section {
  margin-bottom: 40px;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.category-icon {
  font-size: 28px;
}

h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin: 0;
  font-weight: 600;
}

.machines-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.machine-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  transition: all 0.3s ease;
  display: flex;
  gap: 20px;
}

.machine-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.machine-icon {
  font-size: 40px;
  flex-shrink: 0;
}

.machine-content {
  flex: 1;
}

.machine-card h3 {
  color: #2c3e50;
  font-size: 1.3rem;
  margin: 0 0 8px;
}

.description {
  color: #666;
  line-height: 1.5;
  margin-bottom: 12px;
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.feature-tag {
  background: #f0f9f0;
  color: #4CAF50;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.85rem;
}

.tips-section {
  margin-top: 60px;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.tip-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  transition: all 0.3s ease;
  text-align: center;
}

.tip-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.tip-icon {
  font-size: 36px;
  margin-bottom: 16px;
}

.tip-card h3 {
  color: #2c3e50;
  font-size: 1.2rem;
  margin: 0 0 8px;
}

.tip-card p {
  color: #666;
  line-height: 1.5;
  margin: 0;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  h2 {
    color: #e5eaf3;
  }

  .machine-card,
  .tip-card {
    background: #2d2d2d;
    border-color: #444;
  }

  .machine-card h3,
  .tip-card h3 {
    color: #e5eaf3;
  }

  .description,
  .tip-card p {
    color: #bbb;
  }

  .feature-tag {
    background: #1a2f1a;
    color: #81c784;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .machinery-view {
    padding: 16px;
  }

  h2 {
    font-size: 1.5rem;
  }

  .machine-card {
    flex-direction: column;
    text-align: center;
  }

  .machine-icon {
    margin: 0 auto;
  }

  .features {
    justify-content: center;
  }
}
</style> 