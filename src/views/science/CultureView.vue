<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

// 文化内容数据
const cultures = ref([
  {
    id: 1,
    title: '传统农耕文化',
    icon: '🌾',
    content: '中国传统农耕文化是中华文明的重要组成部分，包含了二十四节气、农谚、农具等丰富内容。',
    items: [
      {
        title: '二十四节气',
        description: '古老而精准的农业时令系统，指导农事活动。',
        image: '🗓️'
      },
      {
        title: '农谚文化',
        description: '凝聚着农民智慧的谚语，传承着农业生产经验。',
        image: '📜'
      },
      {
        title: '传统农具',
        description: '展现农耕文明发展历程的物质载体。',
        image: '⚒️'
      }
    ]
  },
  {
    id: 2,
    title: '农业民俗',
    icon: '🎭',
    content: '农业民俗文化反映了农耕社会的生活方式和精神追求，包括各类节庆活动和民间习俗。',
    items: [
      {
        title: '农事节庆',
        description: '春耕节、丰收节等传统节日活动。',
        image: '🎊'
      },
      {
        title: '民间习俗',
        description: '祈年祭天、农事祭祀等传统习俗。',
        image: '🏮'
      },
      {
        title: '农村娱乐',
        description: '秧歌、农民画等民间艺术形式。',
        image: '🎨'
      }
    ]
  },
  {
    id: 3,
    title: '现代农业文化',
    icon: '🌱',
    content: '现代农业文化融合传统与创新，展现新时代农业发展的新面貌。',
    items: [
      {
        title: '科技农业',
        description: '智慧农业、数字农业等现代农业形态。',
        image: '💻'
      },
      {
        title: '农业品牌',
        description: '地理标志产品、特色农产品品牌建设。',
        image: '🏷️'
      },
      {
        title: '乡村旅游',
        description: '休闲农业、农业观光等新型产业形态。',
        image: '🚗'
      }
    ]
  }
])

// 文化活动
const activities = ref([
  {
    date: '2024-05',
    title: '春耕文化节',
    location: '江南水乡',
    status: 'upcoming'
  },
  {
    date: '2024-08',
    title: '农民丰收节',
    location: '全国各地',
    status: 'upcoming'
  },
  {
    date: '2024-10',
    title: '农业科技文化展',
    location: '北京农业馆',
    status: 'planning'
  }
])
</script>

<template>
  <div class="culture-view">
    <BackButton />
    
    <div class="content-section">
      <div v-for="culture in cultures" 
           :key="culture.id"
           class="culture-section">
        <div class="culture-header">
          <span class="culture-icon">{{ culture.icon }}</span>
          <h2>{{ culture.title }}</h2>
        </div>
        <p class="culture-intro">{{ culture.content }}</p>
        
        <div class="items-grid">
          <div v-for="(item, index) in culture.items"
               :key="index"
               class="culture-item">
            <div class="item-image">{{ item.image }}</div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>

      <div class="activities-section">
        <h2>文化活动</h2>
        <div class="activities-list">
          <div v-for="(activity, index) in activities"
               :key="index"
               class="activity-card">
            <div class="activity-date">{{ activity.date }}</div>
            <div class="activity-info">
              <h3>{{ activity.title }}</h3>
              <p>{{ activity.location }}</p>
            </div>
            <div class="activity-status" :class="activity.status">
              {{ activity.status === 'upcoming' ? '即将开始' : '筹备中' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.culture-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.content-section {
  margin-top: 20px;
}

.culture-section {
  margin-bottom: 60px;
}

.culture-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.culture-icon {
  font-size: 32px;
}

h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin: 0;
  font-weight: 600;
}

.culture-intro {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 32px;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.culture-item {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  transition: all 0.3s ease;
  text-align: center;
}

.culture-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.item-image {
  font-size: 48px;
  margin-bottom: 16px;
}

.culture-item h3 {
  color: #2c3e50;
  font-size: 1.3rem;
  margin: 0 0 12px;
}

.culture-item p {
  color: #666;
  line-height: 1.5;
  margin: 0;
}

.activities-section {
  margin-top: 60px;
}

.activities-list {
  margin-top: 24px;
}

.activity-card {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  transition: all 0.3s ease;
}

.activity-card:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.activity-date {
  font-size: 1.1rem;
  font-weight: 600;
  color: #4CAF50;
  width: 100px;
}

.activity-info {
  flex: 1;
}

.activity-info h3 {
  color: #2c3e50;
  margin: 0 0 4px;
  font-size: 1.2rem;
}

.activity-info p {
  color: #666;
  margin: 0;
}

.activity-status {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.activity-status.upcoming {
  background: #e8f5e9;
  color: #4CAF50;
}

.activity-status.planning {
  background: #fff3e0;
  color: #ff9800;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  h2 {
    color: #e5eaf3;
  }

  .culture-intro {
    color: #bbb;
  }

  .culture-item,
  .activity-card {
    background: #2d2d2d;
    border-color: #444;
  }

  .culture-item h3,
  .activity-info h3 {
    color: #e5eaf3;
  }

  .culture-item p,
  .activity-info p {
    color: #bbb;
  }

  .activity-status.upcoming {
    background: #1b3620;
    color: #81c784;
  }

  .activity-status.planning {
    background: #2d2411;
    color: #ffb74d;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .culture-view {
    padding: 16px;
  }

  h2 {
    font-size: 1.5rem;
  }

  .culture-intro {
    font-size: 1rem;
  }

  .item-image {
    font-size: 40px;
  }

  .activity-card {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }

  .activity-date {
    width: auto;
  }
}
</style> 