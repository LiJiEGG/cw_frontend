<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

// 知识分类
const categories = ref([
  {
    id: 1,
    name: '种植技术',
    icon: '🌱',
    articles: [
      {
        id: 1,
        title: '黄瓜水培种植技术要点',
        date: '2024-03-20',
        views: 1250,
        summary: '详细介绍黄瓜水培种植的关键技术要点，包括营养液配制、环境控制等内容...'
      },
      {
        id: 2,
        title: '温室环境调控指南',
        date: '2024-03-18',
        views: 980,
        summary: '全面讲解温室环境调控的原理和方法，帮助种植者提高产量和品质...'
      }
    ]
  },
  {
    id: 2,
    name: '病虫害防治',
    icon: '🔍',
    articles: [
      {
        id: 3,
        title: '常见病虫害识别与防治',
        date: '2024-03-15',
        views: 1560,
        summary: '图文并茂地介绍蔬菜常见病虫害的识别方法和防治措施...'
      }
    ]
  },
  {
    id: 3,
    name: '智能设备',
    icon: '🤖',
    articles: [
      {
        id: 4,
        title: '物联网设备使用指南',
        date: '2024-03-12',
        views: 860,
        summary: '详细说明各类传感器和控制设备的安装、使用和维护方法...'
      }
    ]
  }
])

// 热门文章
const hotArticles = ref([
  {
    id: 1,
    title: '智能温室建设完全指南',
    views: 2580,
    likes: 168
  },
  {
    id: 2,
    title: '水肥一体化技术详解',
    views: 2130,
    likes: 145
  },
  {
    id: 3,
    title: '农业物联网应用实践',
    views: 1890,
    likes: 126
  }
])

// 搜索功能
const searchQuery = ref('')
const searchResults = ref([])

const handleSearch = () => {
  // 实现搜索逻辑
  console.log('搜索:', searchQuery.value)
}

// 查看文章详情
const viewArticle = (articleId: number) => {
  console.log('查看文章:', articleId)
}
</script>

<template>
  <div class="knowledge-view">
    <BackButton />
    <h2>知识普及</h2>
    
    <div class="content">
      <!-- 搜索栏 -->
      <div class="search-section">
        <div class="search-box">
          <input 
            type="text"
            v-model="searchQuery"
            placeholder="搜索文章..."
            @keyup.enter="handleSearch"
          >
          <button @click="handleSearch">搜索</button>
        </div>
      </div>

      <div class="main-content">
        <!-- 文章分类列表 -->
        <div class="categories-section">
          <div v-for="category in categories"
               :key="category.id"
               class="category-group">
            <div class="category-header">
              <span class="category-icon">{{ category.icon }}</span>
              <h3>{{ category.name }}</h3>
            </div>
            <div class="articles-list">
              <div v-for="article in category.articles"
                   :key="article.id"
                   class="article-card"
                   @click="viewArticle(article.id)">
                <div class="article-info">
                  <h4>{{ article.title }}</h4>
                  <p>{{ article.summary }}</p>
                  <div class="article-meta">
                    <span class="date">{{ article.date }}</span>
                    <span class="views">{{ article.views }} 阅读</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 侧边栏 -->
        <aside class="sidebar">
          <!-- 热门文章 -->
          <div class="hot-articles">
            <h3>热门文章</h3>
            <div class="hot-list">
              <div v-for="article in hotArticles"
                   :key="article.id"
                   class="hot-item"
                   @click="viewArticle(article.id)">
                <h4>{{ article.title }}</h4>
                <div class="stats">
                  <span>{{ article.views }} 阅读</span>
                  <span>{{ article.likes }} 点赞</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.knowledge-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 搜索栏样式 */
.search-section {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-box {
  display: flex;
  gap: 12px;
  max-width: 600px;
  margin: 0 auto;
}

.search-box input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.search-box button {
  padding: 12px 24px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-box button:hover {
  background: #45a049;
}

/* 主要内容布局 */
.main-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 24px;
}

/* 分类列表样式 */
.category-group {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.category-icon {
  font-size: 1.5rem;
}

.category-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.3rem;
}

.articles-list {
  display: grid;
  gap: 16px;
}

.article-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.article-card h4 {
  margin: 0 0 8px 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.article-card p {
  margin: 0 0 12px 0;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
}

.article-meta {
  display: flex;
  gap: 16px;
  color: #666;
  font-size: 0.85rem;
}

/* 侧边栏样式 */
.sidebar {
  position: sticky;
  top: 20px;
  align-self: start;
}

.hot-articles {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.hot-articles h3 {
  margin: 0 0 16px 0;
  color: #2c3e50;
  font-size: 1.2rem;
}

.hot-list {
  display: grid;
  gap: 12px;
}

.hot-item {
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hot-item:hover {
  transform: translateX(5px);
  background: #f0f0f0;
}

.hot-item h4 {
  margin: 0 0 8px 0;
  color: #2c3e50;
  font-size: 1rem;
}

.stats {
  display: flex;
  gap: 12px;
  color: #666;
  font-size: 0.85rem;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .search-section,
  .category-group,
  .hot-articles {
    background: #2d2d2d;
  }

  .search-box input {
    background: #1a1a1a;
    border-color: #444;
    color: #fff;
  }

  .category-header h3 {
    color: #fff;
  }

  .article-card {
    background: #1a1a1a;
  }

  .article-card h4 {
    color: #fff;
  }

  .article-card p {
    color: #bbb;
  }

  .article-meta {
    color: #888;
  }

  .hot-item {
    background: #1a1a1a;
  }

  .hot-item h4 {
    color: #fff;
  }

  .stats {
    color: #888;
  }

  .hot-item:hover {
    background: #333;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
  }
}
</style> 