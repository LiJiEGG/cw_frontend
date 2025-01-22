<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

// 物资分类数据
const materials = ref([
  {
    id: 1,
    title: '种植资材',
    icon: '🌱',
    items: [
      {
        name: '种子种苗',
        specs: ['常规种子', '良种', '嫁接苗'],
        usage: '作物繁殖与栽培',
        tips: '选择适合当地气候的品种，注意储存条件'
      },
      {
        name: '栽培基质',
        specs: ['营养土', '蛭石', '椰糠'],
        usage: '育苗和栽培',
        tips: '根据作物需求选择合适基质'
      }
    ]
  },
  {
    id: 2,
    title: '肥料农药',
    icon: '💊',
    items: [
      {
        name: '化肥',
        specs: ['氮肥', '磷肥', '钾肥', '复合肥'],
        usage: '作物营养供给',
        tips: '按需施用，避免过量'
      },
      {
        name: '农药',
        specs: ['杀虫剂', '杀菌剂', '除草剂'],
        usage: '病虫害防治',
        tips: '遵守安全间隔期，科学使用'
      }
    ]
  },
  {
    id: 3,
    title: '农膜农具',
    icon: '🛠️',
    items: [
      {
        name: '农用薄膜',
        specs: ['地膜', '大棚膜', '遮阳网'],
        usage: '保温保湿，调节光照',
        tips: '及时回收，防止白色污染'
      },
      {
        name: '农具工具',
        specs: ['锄头', '喷壶', '剪刀'],
        usage: '日常农事操作',
        tips: '使用后及时清洁保养'
      }
    ]
  },
  {
    id: 4,
    title: '设施配件',
    icon: '⚙️',
    items: [
      {
        name: '灌溉设备',
        specs: ['滴灌带', '喷头', '过滤器'],
        usage: '作物灌溉',
        tips: '定期检查，及时维护'
      },
      {
        name: '环控设备',
        specs: ['温度计', '湿度计', '控制器'],
        usage: '环境监测与调控',
        tips: '确保设备准确性'
      }
    ]
  }
])

// 采购建议
const purchaseTips = ref([
  {
    title: '选购要点',
    items: [
      '选择正规渠道购买',
      '查验产品合格证',
      '对比价格和质量',
      '注意产品有效期'
    ]
  },
  {
    title: '储存管理',
    items: [
      '分类存放，标识清晰',
      '控制温湿度条件',
      '定期检查库存',
      '做好出入库记录'
    ]
  }
])
</script>

<template>
  <div class="materials-view">
    <BackButton />
    
    <div class="content-section">
      <div class="materials-grid">
        <div v-for="category in materials" 
             :key="category.id"
             class="category-card">
          <div class="category-header">
            <span class="category-icon">{{ category.icon }}</span>
            <h2>{{ category.title }}</h2>
          </div>
          
          <div class="items-list">
            <div v-for="(item, index) in category.items"
                 :key="index"
                 class="material-item">
              <h3>{{ item.name }}</h3>
              <div class="specs">
                <h4>规格类型</h4>
                <div class="specs-tags">
                  <span v-for="(spec, sIndex) in item.specs"
                        :key="sIndex"
                        class="spec-tag">
                    {{ spec }}
                  </span>
                </div>
              </div>
              <div class="usage">
                <h4>使用用途</h4>
                <p>{{ item.usage }}</p>
              </div>
              <div class="tips">
                <h4>使用提示</h4>
                <p>{{ item.tips }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tips-section">
        <h2>采购与管理建议</h2>
        <div class="tips-grid">
          <div v-for="(tip, index) in purchaseTips"
               :key="index"
               class="tip-card">
            <h3>{{ tip.title }}</h3>
            <ul>
              <li v-for="(item, iIndex) in tip.items"
                  :key="iIndex">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.materials-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.content-section {
  margin-top: 20px;
}

.materials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}

.category-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
}

.category-icon {
  font-size: 28px;
}

h2 {
  color: #2c3e50;
  font-size: 1.6rem;
  margin: 0;
  font-weight: 600;
}

.material-item {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 16px;
}

.material-item:last-child {
  margin-bottom: 0;
}

.material-item h3 {
  color: #2c3e50;
  font-size: 1.2rem;
  margin: 0 0 16px;
}

h4 {
  color: #4CAF50;
  font-size: 1rem;
  margin: 0 0 8px;
}

.specs-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.spec-tag {
  background: #f0f9f0;
  color: #4CAF50;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.85rem;
}

.usage p,
.tips p {
  color: #666;
  line-height: 1.5;
  margin: 0 0 16px;
}

.tips-section {
  margin-top: 40px;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 20px;
}

.tip-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
}

.tip-card h3 {
  color: #2c3e50;
  font-size: 1.2rem;
  margin: 0 0 16px;
}

.tip-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tip-card li {
  color: #666;
  padding: 8px 0 8px 20px;
  position: relative;
}

.tip-card li::before {
  content: "•";
  color: #4CAF50;
  position: absolute;
  left: 0;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .category-card,
  .tip-card {
    background: #2d2d2d;
    border-color: #444;
  }

  .category-header {
    border-color: #444;
  }

  h2,
  .material-item h3,
  .tip-card h3 {
    color: #e5eaf3;
  }

  .material-item {
    background: #1a1a1a;
  }

  .spec-tag {
    background: #1a2f1a;
    color: #81c784;
  }

  .usage p,
  .tips p,
  .tip-card li {
    color: #bbb;
  }

  .tip-card li::before {
    color: #81c784;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .materials-view {
    padding: 16px;
  }

  h2 {
    font-size: 1.4rem;
  }

  .material-item {
    padding: 16px;
  }

  .material-item h3 {
    font-size: 1.1rem;
  }

  .specs-tags {
    justify-content: flex-start;
  }
}
</style> 