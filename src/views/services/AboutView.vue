<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

// 公司简介数据
const companyInfo = ref({
  name: '智慧农业科技有限公司',
  established: '2020年',
  location: '江苏省南京市江宁区',
  area: '5000平方米',
  employees: '200+',
  description: '我们是一家专注于智慧农业解决方案的高科技企业，致力于将物联网、大数据、人工智能等现代信息技术应用于农业生产中，为农业现代化发展提供全方位的技术支持和服务。'
})

// 发展历程
const milestones = ref([
  {
    year: '2020',
    events: [
      '公司成立',
      '获得国家高新技术企业认证',
      '完成A轮融资'
    ]
  },
  {
    year: '2021',
    events: [
      '智慧农场系统1.0版本发布',
      '建立示范基地',
      '服务客户突破100家'
    ]
  },
  {
    year: '2022',
    events: [
      '获得多项发明专利',
      '完成B轮融资',
      '产品线扩展到全产业链'
    ]
  },
  {
    year: '2023',
    events: [
      '智慧农场系统2.0版本发布',
      '服务区域扩展到全国',
      '年营收突破1亿元'
    ]
  }
])

// 企业文化
const culture = ref({
  vision: '打造智慧农业生态系统，引领农业数字化转型',
  mission: '用科技创新推动农业发展，为农业现代化贡献力量',
  values: [
    {
      title: '创新驱动',
      description: '持续技术创新，引领行业发展'
    },
    {
      title: '质量至上',
      description: '追求卓越品质，确保服务可靠'
    },
    {
      title: '客户为本',
      description: '以客户需求为导向，提供优质服务'
    },
    {
      title: '合作共赢',
      description: '携手合作伙伴，共创美好未来'
    }
  ]
})

// 荣誉资质
const honors = ref([
  {
    year: '2023',
    title: '国家级科技创新奖',
    issuer: '科技部'
  },
  {
    year: '2022',
    title: '智慧农业示范企业',
    issuer: '农业农村部'
  },
  {
    year: '2021',
    title: '数字农业领军企业',
    issuer: '省农业厅'
  }
])
</script>

<template>
  <div class="about-view">
    <BackButton />
    <h2>关于我们</h2>
    
    <div class="content">
      <!-- 公司简介 -->
      <section class="company-section">
        <h3>公司简介</h3>
        <div class="company-info">
          <div class="info-grid">
            <div class="info-item">
              <span class="label">公司名称</span>
              <span class="value">{{ companyInfo.name }}</span>
            </div>
            <div class="info-item">
              <span class="label">成立时间</span>
              <span class="value">{{ companyInfo.established }}</span>
            </div>
            <div class="info-item">
              <span class="label">公司地址</span>
              <span class="value">{{ companyInfo.location }}</span>
            </div>
            <div class="info-item">
              <span class="label">经营面积</span>
              <span class="value">{{ companyInfo.area }}</span>
            </div>
            <div class="info-item">
              <span class="label">员工规模</span>
              <span class="value">{{ companyInfo.employees }}</span>
            </div>
          </div>
          <div class="company-desc">
            <p>{{ companyInfo.description }}</p>
          </div>
        </div>
      </section>

      <!-- 发展历程 -->
      <section class="milestone-section">
        <h3>发展历程</h3>
        <div class="timeline">
          <div v-for="milestone in milestones"
               :key="milestone.year"
               class="timeline-item">
            <div class="year-point">{{ milestone.year }}</div>
            <div class="events-card">
              <ul class="events-list">
                <li v-for="(event, index) in milestone.events"
                    :key="index">
                  {{ event }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 企业文化 -->
      <section class="culture-section">
        <h3>企业文化</h3>
        <div class="culture-content">
          <div class="vision-mission">
            <div class="vision">
              <h4>企业愿景</h4>
              <p>{{ culture.vision }}</p>
            </div>
            <div class="mission">
              <h4>企业使命</h4>
              <p>{{ culture.mission }}</p>
            </div>
          </div>
          <div class="values-grid">
            <div v-for="value in culture.values"
                 :key="value.title"
                 class="value-card">
              <h4>{{ value.title }}</h4>
              <p>{{ value.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 荣誉资质 -->
      <section class="honors-section">
        <h3>荣誉资质</h3>
        <div class="honors-list">
          <div v-for="honor in honors"
               :key="honor.title"
               class="honor-card">
            <span class="honor-year">{{ honor.year }}</span>
            <div class="honor-content">
              <h4>{{ honor.title }}</h4>
              <p>颁发单位：{{ honor.issuer }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.content {
  display: grid;
  gap: 40px;
}

section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 24px;
}

h3 {
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 8px;
  border-bottom: 2px solid #4CAF50;
}

/* 公司简介样式 */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  color: #666;
  font-size: 0.9rem;
}

.value {
  color: #2c3e50;
  font-weight: 500;
}

.company-desc {
  line-height: 1.6;
  color: #666;
}

/* 发展历程样式 */
.timeline {
  position: relative;
  padding-left: 32px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e0e0e0;
}

.timeline-item {
  position: relative;
  margin-bottom: 32px;
}

.year-point {
  position: absolute;
  left: -40px;
  background: #4CAF50;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
}

.events-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
}

.events-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.events-list li {
  padding: 8px 0;
  color: #2c3e50;
  border-bottom: 1px solid #eee;
}

.events-list li:last-child {
  border-bottom: none;
}

/* 企业文化样式 */
.culture-content {
  display: grid;
  gap: 24px;
}

.vision-mission {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.vision, .mission {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.value-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.value-card h4 {
  color: #4CAF50;
  margin-bottom: 12px;
}

.value-card p {
  color: #666;
}

/* 荣誉资质样式 */
.honors-list {
  display: grid;
  gap: 16px;
}

.honor-card {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
}

.honor-year {
  font-size: 1.2rem;
  font-weight: 500;
  color: #4CAF50;
  min-width: 80px;
}

.honor-content h4 {
  margin: 0 0 4px 0;
  color: #2c3e50;
}

.honor-content p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  section {
    background: #2d2d2d;
  }

  h2, h3 {
    color: #fff;
  }

  .value {
    color: #fff;
  }

  .events-card,
  .vision,
  .mission,
  .value-card,
  .honor-card {
    background: #1a1a1a;
  }

  .events-list li {
    color: #fff;
    border-color: #333;
  }

  .value-card p,
  .honor-content p {
    color: #bbb;
  }

  .timeline::before {
    background: #444;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }

  .vision-mission {
    grid-template-columns: 1fr;
  }

  .honor-card {
    flex-direction: column;
    text-align: center;
  }

  .honor-year {
    min-width: auto;
  }
}
</style> 