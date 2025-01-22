<script setup lang="ts">
const modules = [
  {
    id: 1,
    icon: '🌾',
    title: '无人农场',
    description: '智能化管理，提高生产效率'
  },
  {
    id: 2,
    icon: '📊',
    title: '大数据系统',
    description: '数据驱动，科学决策'
  },
  {
    id: 3,
    icon: '🤖',
    title: '智能作业',
    description: '自动化操作，降低人工成本'
  },
  {
    id: 4,
    icon: '🌱',
    title: '种植数字化',
    description: '全程监控，保障产品品质'
  },
  {
    id: 5,
    icon: '🔍',
    title: '产品溯源',
    description: '全链追溯，保障食品安全'
  },
  {
    id: 6,
    icon: '🛠',
    title: '综合服务',
    description: '一站式解决方案'
  }
]
</script>

<template>
  <section class="system-modules">
    <h2>服务板块</h2>
    <div class="modules-grid">
      <div 
        v-for="module in modules" 
        :key="module.id"
        class="module-card"
      >
        <span class="icon">{{ module.icon }}</span>
        <h3>{{ module.title }}</h3>
        <p>{{ module.description }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.system-modules {
  padding: 60px 20px;
  background: #f8f9fa;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 40px;
  font-size: 2rem;
}

.modules-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.module-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.module-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.icon {
  font-size: 3rem;
  margin-bottom: 20px;
  display: block;
}

h3 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1.3rem;
}

p {
  color: #666;
  margin: 0;
  line-height: 1.5;
}
</style> 