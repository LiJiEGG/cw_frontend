<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

interface Breadcrumb {
  name: string
  path: string
}

const breadcrumbs = computed(() => {
  const paths = route.path.split('/').filter(Boolean)
  const items: Breadcrumb[] = []
  let fullPath = ''

  paths.forEach((path, index) => {
    fullPath += `/${path}`
    let name = ''

    switch (path) {
      case 'science':
        name = '科普栏目'
        break
      case 'development':
        name = '农业发展'
        break
      case 'greenhouse':
        name = '温室发展'
        break
      case 'knowledge':
        name = '农业知识'
        break
      case 'culture':
        name = '农业文化'
        break
      case 'machinery':
        name = '农业机械'
        break
      case 'materials':
        name = '农用物资'
        break
      case 'videos':
        name = '科普视频'
        break
      case 'services':
        name = '综合服务'
        break
      case 'product-trace':
        name = '产品溯源'
        break
      // ... 其他路由映射
      default:
        name = path
    }

    items.push({
      name,
      path: fullPath
    })
  })

  return items
})
</script>

<template>
  <div class="breadcrumb">
    <router-link to="/" class="breadcrumb-item">首页</router-link>
    <span class="separator" v-if="breadcrumbs.length > 0">/</span>
    <template v-for="(item, index) in breadcrumbs" :key="index">
      <router-link 
        :to="item.path"
        class="breadcrumb-item"
        :class="{ 'active': index === breadcrumbs.length - 1 }"
      >
        {{ item.name }}
      </router-link>
      <span class="separator" v-if="index < breadcrumbs.length - 1">/</span>
    </template>
  </div>
</template>

<style scoped>
.breadcrumb {
  padding: 12px 0;
  color: #666;
  font-size: 14px;
}

.breadcrumb-item {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb-item:hover {
  color: #4CAF50;
}

.breadcrumb-item.active {
  color: #4CAF50;
  cursor: default;
}

.separator {
  margin: 0 8px;
  color: #999;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .breadcrumb {
    color: #bbb;
  }

  .breadcrumb-item {
    color: #bbb;
  }

  .breadcrumb-item:hover {
    color: #81c784;
  }

  .breadcrumb-item.active {
    color: #81c784;
  }

  .separator {
    color: #666;
  }
}
</style> 