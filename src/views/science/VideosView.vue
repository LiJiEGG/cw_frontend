<script setup lang="ts">
import { ref, computed } from 'vue'
import BackButton from '@/components/common/BackButton.vue'
// import BreadcrumbNav from '@/components/common/BreadcrumbNav.vue'

// 视频分类数据
const categories = ref([
  {
    id: 1,
    title: '种植技术',
    icon: '🌱',
    videos: [
      {
        id: 101,
        title: '水培蔬菜种植技术详解',
        duration: '15:30',
        views: 2580,
        date: '2024-03-20',
        cover: '🎦',
        tags: ['水培', '蔬菜', '技术']
      },
      {
        id: 102,
        title: '果树修剪技术指南',
        duration: '20:45',
        views: 1890,
        date: '2024-03-18',
        cover: '🎦',
        tags: ['果树', '修剪', '技术']
      }
    ]
  },
  {
    id: 2,
    title: '病虫害防治',
    icon: '🐛',
    videos: [
      {
        id: 201,
        title: '常见病虫害识别与防治',
        duration: '18:20',
        views: 3240,
        date: '2024-03-19',
        cover: '🎦',
        tags: ['病虫害', '防治']
      },
      {
        id: 202,
        title: '绿色防控技术应用',
        duration: '16:15',
        views: 2160,
        date: '2024-03-17',
        cover: '🎦',
        tags: ['绿色防控', '技术']
      }
    ]
  },
  {
    id: 3,
    title: '智能农业',
    icon: '🤖',
    videos: [
      {
        id: 301,
        title: '智能温室控制系统介绍',
        duration: '22:10',
        views: 4120,
        date: '2024-03-20',
        cover: '🎦',
        tags: ['智能温室', '控制系统']
      },
      {
        id: 302,
        title: '农业物联网应用实践',
        duration: '25:30',
        views: 3680,
        date: '2024-03-16',
        cover: '🎦',
        tags: ['物联网', '智能农业']
      }
    ]
  }
])

// 热门视频
const hotVideos = computed(() => {
  return categories.value
    .flatMap(category => category.videos)
    .sort((a, b) => b.views - a.views)
    .slice(0, 3)
})

// 搜索功能
const searchQuery = ref('')
const filteredCategories = computed(() => {
  const query = searchQuery.value.toLowerCase()
  if (!query) return categories.value

  return categories.value.map(category => ({
    ...category,
    videos: category.videos.filter(video => 
      video.title.toLowerCase().includes(query) ||
      video.tags.some(tag => tag.toLowerCase().includes(query))
    )
  })).filter(category => category.videos.length > 0)
})
</script>

<template>
  <div class="videos-view">
    <BackButton />
    
    <div class="content-section">
      <!-- 热门视频 -->
      <div class="hot-section">
        <h2>热门推荐</h2>
        <div class="hot-grid">
          <div v-for="video in hotVideos" 
               :key="video.id"
               class="hot-video-card">
            <div class="video-cover">{{ video.cover }}</div>
            <div class="video-info">
              <h3>{{ video.title }}</h3>
              <div class="video-meta">
                <span class="duration">{{ video.duration }}</span>
                <span class="views">{{ video.views }} 次观看</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 搜索栏 -->
      <div class="search-bar">
        <input 
          v-model="searchQuery"
          type="text"
          placeholder="搜索视频或标签..."
          class="search-input"
        >
      </div>

      <!-- 视频分类列表 -->
      <div class="categories">
        <div v-for="category in filteredCategories" 
             :key="category.id"
             class="category-section">
          <div class="category-header">
            <span class="category-icon">{{ category.icon }}</span>
            <h2>{{ category.title }}</h2>
          </div>
          
          <div class="videos-grid">
            <div v-for="video in category.videos"
                 :key="video.id"
                 class="video-card">
              <div class="video-cover">{{ video.cover }}</div>
              <div class="video-content">
                <h3>{{ video.title }}</h3>
                <div class="video-meta">
                  <span class="duration">{{ video.duration }}</span>
                  <span class="views">{{ video.views }} 次观看</span>
                </div>
                <div class="video-tags">
                  <span v-for="(tag, index) in video.tags"
                        :key="index"
                        class="tag">
                    {{ tag }}
                  </span>
                </div>
                <div class="video-date">{{ video.date }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.videos-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.content-section {
  margin-top: 20px;
}

.hot-section {
  margin-bottom: 40px;
}

.hot-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 20px;
}

.hot-video-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  transition: all 0.3s ease;
}

.hot-video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.search-bar {
  margin: 32px 0;
}

.search-input {
  width: 100%;
  padding: 12px 20px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.category-section {
  margin-bottom: 40px;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
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

.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.video-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  transition: all 0.3s ease;
}

.video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.video-cover {
  background: #f8f9fa;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
}

.video-content {
  padding: 16px;
}

.video-card h3 {
  color: #2c3e50;
  font-size: 1.1rem;
  margin: 0 0 8px;
  line-height: 1.4;
}

.video-meta {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 12px;
}

.video-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.tag {
  background: #f0f9f0;
  color: #4CAF50;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.85rem;
}

.video-date {
  color: #999;
  font-size: 0.85rem;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .hot-video-card,
  .video-card {
    background: #2d2d2d;
    border-color: #444;
  }

  .video-cover {
    background: #1a1a1a;
  }

  h2,
  .video-card h3 {
    color: #e5eaf3;
  }

  .video-meta {
    color: #bbb;
  }

  .tag {
    background: #1a2f1a;
    color: #81c784;
  }

  .video-date {
    color: #777;
  }

  .search-input {
    background: #2d2d2d;
    border-color: #444;
    color: #fff;
  }

  .search-input:focus {
    border-color: #81c784;
    box-shadow: 0 0 0 2px rgba(129, 199, 132, 0.2);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .videos-view {
    padding: 16px;
  }

  h2 {
    font-size: 1.5rem;
  }

  .video-cover {
    height: 140px;
  }

  .video-card h3 {
    font-size: 1rem;
  }
}
</style> 