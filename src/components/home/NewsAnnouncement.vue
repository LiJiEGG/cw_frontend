<script setup lang="ts">
const news = [
  {
    id: 1,
    date: '2024-01-15',
    title: '公司成功引入新一代智能温室控制系统',
    type: 'news'
  },
  {
    id: 2,
    date: '2024-01-10',
    title: '关于开展2024年春季种植技术培训的通知',
    type: 'announcement'
  },
  {
    id: 3,
    date: '2024-01-05',
    title: '我司产品获得有机认证',
    type: 'news'
  },
  {
    id: 4,
    date: '2024-01-01',
    title: '2024年农业补贴政策说明',
    type: 'announcement'
  }
]
</script>

<template>
  <section class="news-announcement">
    <h2>新闻公告</h2>
    <div class="tabs">
      <div class="news-list">
        <div 
          v-for="item in news" 
          :key="item.id"
          class="news-item"
        >
          <span class="date">{{ item.date }}</span>
          <span :class="['type-tag', item.type]">
            {{ item.type === 'news' ? '新闻' : '公告' }}
          </span>
          <h3>{{ item.title }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.news-announcement {
  padding: 60px 20px;
  background: white;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 40px;
  font-size: 2rem;
}

.tabs {
  max-width: 1200px;
  margin: 0 auto;
}

.news-list {
  display: grid;
  gap: 20px;
}

.news-item {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  gap: 20px;
  transition: transform 0.3s;
  cursor: pointer;
}

.news-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.date {
  color: #666;
  font-size: 0.9rem;
}

.type-tag {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.type-tag.news {
  background: #e3f2fd;
  color: #1976d2;
}

.type-tag.announcement {
  background: #fbe9e7;
  color: #d84315;
}

.news-item h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .news-item {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
</style> 