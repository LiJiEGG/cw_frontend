<script setup lang="ts">
import slide4 from '@/assets/images/slide4.webp'
</script>

<template>
  <section class="company-intro">
    <h2>公司介绍</h2>
    <div class="content">
      <div class="text">
        <p>我们是一家专注于智能温室种植的科技公司，致力于将现代化技术应用于农业生产中。通过物联网、大数据、人工智能等技术，我们为客户提供全方位的智慧农业解决方案。</p>
        <div class="features">
          <div class="feature">
            <span class="icon">🌱</span>
            <h3>智能种植</h3>
            <p>自动化环境控制</p>
          </div>
          <div class="feature">
            <span class="icon">📊</span>
            <h3>数据分析</h3>
            <p>精准农业决策</p>
          </div>
          <div class="feature">
            <span class="icon">🤖</span>
            <h3>机器人作业</h3>
            <p>高效农事管理</p>
          </div>
        </div>
      </div>
      <div class="image">
        <img 
          :src="slide4"
          alt="公司实景"
          loading="lazy"
        >
      </div>
    </div>
  </section>
</template>

<style scoped>
.company-intro {
  padding: 60px 20px;
  background: #f8f9fa;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 40px;
  font-size: 2rem;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.text p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 30px;
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.feature {
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.feature .icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.feature h3 {
  color: #2c3e50;
  margin-bottom: 8px;
}

.feature p {
  font-size: 0.9rem;
  margin: 0;
}

.image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
  }
  
  .features {
    grid-template-columns: 1fr;
  }
}
</style> 