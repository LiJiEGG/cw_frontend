<script setup lang="ts">
import { ref, computed } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

// 知识分类数据
const categories = ref([
  {
    id: 1,
    title: '种植技术',
    icon: '🌱',
    articles: [
      {
        id: 101,
        title: '水培蔬菜种植技术要点',
        date: '2024-03-20',
        views: 1280,
        tags: ['水培', '蔬菜']
      },
      {
        id: 102,
        title: '果树修剪的关键时期与方法',
        date: '2024-03-18',
        views: 960,
        tags: ['果树', '修剪']
      },
      {
        id: 103,
        title: '设施农业育苗技术指南',
        date: '2024-03-15',
        views: 850,
        tags: ['育苗', '设施农业']
      }
    ]
  },
  {
    id: 2,
    title: '病虫害防治',
    icon: '🐛',
    articles: [
      {
        id: 201,
        title: '常见蔬菜病害防治方法',
        date: '2024-03-19',
        views: 1560,
        tags: ['病害', '防治']
      },
      {
        id: 202,
        title: '农作物虫害综合防治技术',
        date: '2024-03-17',
        views: 1100,
        tags: ['虫害', '综合防治']
      },
      {
        id: 203,
        title: '生物防治在现代农业中的应用',
        date: '2024-03-14',
        views: 920,
        tags: ['生物防治', '绿色农业']
      }
    ]
  },
  {
    id: 3,
    title: '农业气象',
    icon: '🌤️',
    articles: [
      {
        id: 301,
        title: '农业气象预报与应用',
        date: '2024-03-20',
        views: 780,
        tags: ['气象', '预报']
      },
      {
        id: 302,
        title: '极端天气对农作物的影响及防范',
        date: '2024-03-16',
        views: 1350,
        tags: ['极端天气', '防范']
      },
      {
        id: 303,
        title: '设施农业环境调控技术',
        date: '2024-03-13',
        views: 890,
        tags: ['环境调控', '设施农业']
      }
    ]
  },
  {
    id: 4,
    title: '农业科技',
    icon: '🔬',
    articles: [
      {
        id: 401,
        title: '智能农业发展趋势分析',
        date: '2024-03-19',
        views: 2100,
        tags: ['智能农业', '发展趋势']
      },
      {
        id: 402,
        title: '农业物联网技术应用实践',
        date: '2024-03-15',
        views: 1680,
        tags: ['物联网', '应用']
      },
      {
        id: 403,
        title: '农业大数据分析与应用',
        date: '2024-03-12',
        views: 1450,
        tags: ['大数据', '分析']
      }
    ]
  }
])

// 搜索关键词
const searchQuery = ref('')

// 筛选文章
const filteredArticles = computed(() => {
  const query = searchQuery.value.toLowerCase()
  if (!query) return categories.value

  return categories.value.map(category => ({
    ...category,
    articles: category.articles.filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.tags.some(tag => tag.toLowerCase().includes(query))
    )
  })).filter(category => category.articles.length > 0)
})
</script>

<template>
  <div class="knowledge-view">
    <BackButton />
    
    <div class="content-section">
      <div class="search-bar">
        <input 
          v-model="searchQuery"
          type="text"
          placeholder="搜索文章或标签..."
          class="search-input"
        >
      </div>

      <div class="categories">
        <div v-for="category in filteredArticles" 
             :key="category.id"
             class="category-section">
          <div class="category-header">
            <span class="category-icon">{{ category.icon }}</span>
            <h2>{{ category.title }}</h2>
          </div>
          
          <div class="articles-grid">
            <div v-for="article in category.articles" 
                 :key="article.id"
                 class="article-card">
              <h3>{{ article.title }}</h3>
              <div class="article-meta">
                <span class="date">{{ article.date }}</span>
                <span class="views">{{ article.views }} 阅读</span>
              </div>
              <div class="tags">
                <span v-for="(tag, index) in article.tags" 
                      :key="index"
                      class="tag">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
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

.content-section {
  margin-top: 20px;
}

.search-bar {
  margin-bottom: 32px;
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
  font-size: 24px;
}

h2 {
  color: #2c3e50;
  font-size: 1.6rem;
  margin: 0;
  font-weight: 600;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.article-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  transition: all 0.3s ease;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.article-card h3 {
  color: #2c3e50;
  font-size: 1.2rem;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 12px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: #f0f9f0;
  color: #4CAF50;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.85rem;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .search-input {
    background: #2d2d2d;
    border-color: #444;
    color: #fff;
  }

  .search-input:focus {
    border-color: #81c784;
    box-shadow: 0 0 0 2px rgba(129, 199, 132, 0.2);
  }

  h2 {
    color: #e5eaf3;
  }

  .article-card {
    background: #2d2d2d;
    border-color: #444;
  }

  .article-card h3 {
    color: #e5eaf3;
  }

  .article-meta {
    color: #bbb;
  }

  .tag {
    background: #1a2f1a;
    color: #81c784;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .knowledge-view {
    padding: 16px;
  }

  h2 {
    font-size: 1.4rem;
  }

  .article-card h3 {
    font-size: 1.1rem;
  }

  .articles-grid {
    grid-template-columns: 1fr;
  }
}
</style> 