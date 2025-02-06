<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showMobileMenu = ref(false)
const isMobile = ref(false)
const isMenuOpen = ref(false)

const navItems = ref([
  { path: '/', name: '首页', icon: '🏠' },
  { path: '/smart-farm', name: '无人农场', icon: '🌾' },
  { path: '/big-data', name: '大数据系统', icon: '📊' },
  { path: '/smart-operation', name: '智能作业', icon: '🤖' },
  { path: '/digital-planting', name: '种植数字化', icon: '🌱' },
  { path: '/product-trace', name: '产品溯源', icon: '🔍' },
  { path: '/services', name: '综合服务', icon: '🛠' },
  { path: '/science', name: '科普栏目', icon: '📚' },
  { path: '/education', name: '游学教育', icon: '🎓' },
  { path: '/shop', name: '网上商城', icon: '🛒' },
  { path: '/dashboard', name: '数字驾驶舱', icon: '🎮' },
])

// 添加子模块标题映射
const subModuleTitles: Record<string, string> = {
  '/smart-farm/sensor': '感知与控制',
  '/smart-farm/data': '数据处理与分析',
  '/smart-farm/operation': '作业与执行',
  '/smart-farm/definition': '定义与目标',
  '/smart-farm/architecture': '总体架构设计',
  '/smart-farm/technical': '技术方案',
  '/big-data/collection': '数据采集',
  '/big-data/analysis': '数据分析',
  '/big-data/service': '数据服务',
  '/smart-operation/environment': '温室环境控制',
  '/smart-operation/equipment': '自动化设备控制',
  '/smart-operation/records': '控制记录',
  '/digital-planting/planting': '数字化种植',
  '/digital-planting/standard': '标准化生产',
  '/digital-planting/irrigation': '水肥智能化',
  '/science': '科普栏目',
  '/science/development': '农业发展',
  '/science/greenhouse': '温室发展',
  '/science/knowledge': '农业知识',
  '/science/culture': '农业文化',
  '/science/machinery': '农业机械',
  '/science/materials': '农用物资',
  '/science/videos': '科普视频',
  '/services': '综合服务',
  '/services/about': '关于我们',
  '/services/knowledge': '知识服务',
  '/services/farmer': '农户服务',
  '/services/experts': '专家服务',
  '/services/message': '留言反馈',
  '/services/qa': '在线问答',
  '/services/visualization': '数据可视化',
  '/product-trace': '产品溯源',
  '/product-trace/planting': '种植记录',
  '/product-trace/processing': '加工记录',
  '/product-trace/logistics': '物流记录',
  '/product-trace/certification': '认证信息'
}

// 添加子模块图标映射
const subModuleIcons: Record<string, string> = {
  '/smart-farm/sensor': '🔍',
  '/smart-farm/data': '📊',
  '/smart-farm/operation': '🤖',
  '/smart-farm/definition': '📋',
  '/smart-farm/architecture': '🏗️',
  '/smart-farm/technical': '📝',
  '/big-data/collection': '📥',
  '/big-data/analysis': '📊',
  '/big-data/service': '🔄',
  '/smart-operation/environment': '🌡️',
  '/smart-operation/equipment': '🤖',
  '/smart-operation/records': '📝',
  '/digital-planting/planting': '🌱',
  '/digital-planting/standard': '📋',
  '/digital-planting/irrigation': '💧',
  '/science': '📚',
  '/science/development': '📈',
  '/science/greenhouse': '🏗️',
  '/science/knowledge': '📚',
  '/science/culture': '🎭',
  '/science/machinery': '🚜',
  '/science/materials': '🌾',
  '/science/videos': '🎥',
  '/services': '🛠️',
  '/services/about': 'ℹ️',
  '/services/knowledge': '📚',
  '/services/farmer': '👨‍🌾',
  '/services/experts': '👨‍🔬',
  '/services/message': '💬',
  '/services/qa': '❓',
  '/services/visualization': '📊',
  '/product-trace': '🔍',
  '/product-trace/planting': '🌱',
  '/product-trace/processing': '⚙️',
  '/product-trace/logistics': '🚛',
  '/product-trace/certification': '📜'
}

// 添加模块描述映射
const moduleDescriptions: Record<string, string> = {
  '/science': '农业科技知识传播与分享平台',
  '/services': '为农业生产提供全方位服务支持',
  '/product-trace': '农产品全程可追溯管理系统'
}

// 获取当前页面图标
const getCurrentIcon = computed(() => {
  if (route.path.startsWith('/smart-farm/') || route.path.startsWith('/big-data/')) {
    return subModuleIcons[route.path] || '🌾'
  }
  return navItems.value.find(item => item.path === route.path)?.icon || '🏠'
})

const currentPageName = computed(() => {
  // 检查是否是子模块路径
  const subModuleTitle = subModuleTitles[route.path]
  if (subModuleTitle) {
    return subModuleTitle
  }
  
  // 如果不是子模块，则使用主模块标题
  const currentItem = navItems.value.find(item => item.path === route.path)
  return currentItem?.name || '首页'
})

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

// 获取面包屑路径数组
const getBreadcrumbs = computed(() => {
  const paths = route.path.split('/').filter(p => p)
  const breadcrumbs = []
  
  if (paths.length > 0) {
    // 添加第一级路径
    breadcrumbs.push({
      path: `/${paths[0]}`,
      name: navItems.value.find(item => item.path === `/${paths[0]}`)?.name || ''
    })
    
    // 添加第二级路径（如果存在）
    if (paths.length > 1) {
      const secondPath = `/${paths[0]}/${paths[1]}`
      breadcrumbs.push({
        path: secondPath,
        name: subModuleTitles[secondPath] || ''
      })
    }
    
    // 添加第三级路径（如果存在）
    if (paths.length > 2) {
      const thirdPath = `/${paths[0]}/${paths[1]}/${paths[2]}`
      breadcrumbs.push({
        path: thirdPath,
        name: subModuleTitles[thirdPath] || ''
      })
    }
  }
  
  return breadcrumbs
})

const toggleMenu = () => {
  console.log('Toggle menu clicked, current state:', isMenuOpen.value)
  isMenuOpen.value = !isMenuOpen.value
  console.log('New state:', isMenuOpen.value)
}

const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 768
  if (!isMobile.value) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<template>
  <!-- 添加网站图标 -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/png" href="/favicon.png">
  <header :class="{ 'mobile-menu-open': showMobileMenu }">
    <div class="header-container">
      <div class="logo">
        <svg 
          class="logo-image"
          viewBox="0 0 100 100"
          width="40"
          height="40"
        >
          <circle cx="50" cy="50" r="45" fill="#4CAF50" />
          <circle cx="30" cy="30" r="12" fill="#FFC107" />
          <path
            d="M15 65 
               Q30 55 45 65 
               Q60 75 75 65 
               L85 85 
               L15 85 
               Z"
            fill="#8BC34A"
          />
          <path
            d="M45 65 
               L45 45
               M45 55
               Q40 50 35 55
               M45 55
               Q50 50 55 55
               M60 65
               L60 40
               M60 50
               Q55 45 50 50
               M60 50
               Q65 45 70 50"
            stroke="#FFFFFF"
            stroke-width="3"
            fill="none"
            stroke-linecap="round"
          />
        </svg>
        <span class="company-name">智慧农业</span>
      </div>

      <!-- 导航菜单 -->
      <nav class="nav-menu">
        <!-- 汉堡菜单按钮 -->
        <button 
          class="hamburger-btn" 
          :class="{ 'is-open': isMenuOpen }"
          @click="toggleMenu" 
          v-show="isMobile"
          aria-label="菜单"
        >
          <div class="hamburger-lines">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        
        <!-- 导航菜单列表 -->
        <div class="nav-links" :class="{ 'is-open': isMenuOpen }">
          <RouterLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="nav-link"
            @click="isMenuOpen = false"
          >
            <span class="icon">{{ item.icon }}</span>
            <span class="text">{{ item.name }}</span>
          </RouterLink>
        </div>
      </nav>
    </div>
  </header>

  <!-- 页面标题 -->
  <div class="page-title">
    <div class="title-container">
      <div class="title-content">
        <div class="icon-wrapper">
          <span class="page-icon">
            {{ getCurrentIcon }}
          </span>
        </div>
        <div class="title-text">
          <h1>{{ currentPageName }}</h1>
          <p class="breadcrumb">
            <span class="home" @click="$router.push('/')">首页</span>
            <template v-for="(crumb, index) in getBreadcrumbs" :key="crumb.path">
              <span class="separator">›</span>
              <span 
                :class="{ 'parent': index < getBreadcrumbs.length - 1, 'current': index === getBreadcrumbs.length - 1 }"
                @click="index < getBreadcrumbs.length - 1 && $router.push(crumb.path)"
              >
                {{ crumb.name }}
              </span>
            </template>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- 路由视图 -->
  <RouterView v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>
</template>

<style scoped>
/* 头部容器 */
header {
  padding: 0;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1655px;
  margin: 0 auto;
  padding: 0 20px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

/* Logo 样式 */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-image {
  width: 56px;
  height: 56px;
  transition: all 0.5s ease;
}

.logo:hover .logo-image {
  transform: scale(1.1);
}

.company-name {
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: -0.5px;
}

/* 导航菜单 */
nav {
  flex: 1;
  margin: 0 20px;
  overflow-x: auto;
  overflow-y: hidden;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  position: relative;
}

/* 隐藏滚动条 */
nav::-webkit-scrollbar {
  display: none;
}

.nav-container {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 10px;
  width: max-content;
  white-space: nowrap;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 14px;
  color: #2c3e50;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  white-space: nowrap;  /* 确保链接文字不换行 */
}

.nav-link:hover {
  background-color: #f8f9fa;
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  background-color: #4CAF50;
  color: white;
}

.icon {
  font-size: 1em;
  display: inline-block;
}

.text {
  font-size: 0.9em;
  display: inline-block;
}

/* 页面标题 */
.page-title {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 24px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.title-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.title-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-wrapper {
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: rotate(-5deg);
  transition: transform 0.3s ease;
}

.icon-wrapper:hover {
  transform: rotate(0deg) scale(1.05);
}

.page-icon {
  font-size: 20px;
}

.title-text {
  flex: 1;
}

h1 {
  font-size: 1.4rem;
  color: #2c3e50;
  margin: 0 0 4px 0;
  font-weight: 600;
  letter-spacing: -0.5px;
  position: relative;
  display: inline-block;
}

h1::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 40px;
  height: 4px;
  background: #4CAF50;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.title-text:hover h1::after {
  width: 100%;
}

.breadcrumb {
  font-size: 0.85rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 6px;
}

.home {
  color: #4CAF50;
  cursor: pointer;
  transition: color 0.3s;
}

.home:hover {
  color: #45a049;
}

.parent {
  color: #4CAF50;
  cursor: pointer;
  transition: color 0.3s;
}

.parent:hover {
  color: #45a049;
}

.separator {
  color: #999;
}

.current {
  color: #666;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  header {
    background-color: #1a1a1a;
  }

  .company-name {
    color: #fff;
  }

  .nav-link {
    color: #fff;
  }

  .nav-link:hover {
    background-color: #2d2d2d;
  }

  .page-title {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  .icon-wrapper {
    background: #2d2d2d;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  h1 {
    color: #fff;
  }

  .breadcrumb {
    color: #999;
  }

  .home {
    color: #81c784;
  }

  .home:hover {
    color: #a5d6a7;
  }

  .current {
    color: #bbb;
  }

  nav::after {
    background: linear-gradient(to right, transparent, #1a1a1a);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-title {
    padding: 20px 0;
  }

  .logo-image {
    width: 44px;
    height: 44px;
  }

  .company-name {
    font-size: 1.5rem;
  }

  .nav-link {
    font-size: 1.15rem;
  }

  .icon-wrapper {
    width: 36px;
    height: 36px;
  }

  .page-icon {
    font-size: 18px;
  }

  h1 {
    font-size: 1.3rem;
  }

  .breadcrumb {
    font-size: 0.8rem;
  }
}

/* 导航菜单基础样式 */
.nav-menu {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0 20px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
}

.hamburger-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 15px;
  z-index: 1000;
  margin-left: auto;
  transition: transform 0.3s ease;
}

.hamburger-btn:hover {
  transform: scale(1.1);
}

.hamburger-lines {
  width: 24px;
  height: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.hamburger-lines span {
  display: block;
  height: 2px;
  width: 100%;
  background: #333;
  border-radius: 4px;
  transition: all 0.3s ease;
}

/* 汉堡菜单动画效果 */
.hamburger-btn.is-open .hamburger-lines span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger-btn.is-open .hamburger-lines span:nth-child(2) {
  opacity: 0;
}

.hamburger-btn.is-open .hamburger-lines span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* 移动端样式 */
@media screen and (max-width: 768px) {
  .nav-menu {
    margin: 0;
    padding-right: 10px;
  }

  .hamburger-btn {
    display: block;
  }

  .nav-links {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    width: 100%;
    display: none;
    flex-direction: column;
    background: white;
    padding: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    z-index: 999;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.3s ease;
  }

  .nav-links.is-open {
    display: flex;
    opacity: 1;
    transform: translateY(0);
  }

  .nav-link {
    width: 100%;
    padding: 12px 16px;
    margin: 4px 0;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .nav-link:hover {
    background-color: #f5f5f5;
    transform: translateX(5px);
  }

  .nav-link .icon {
    margin-right: 12px;
    font-size: 1.2em;
  }

  .nav-link .text {
    font-weight: 500;
  }
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .hamburger-lines span {
    background: #fff;
  }

  .nav-links {
    background: #1a1a1a;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }

  .nav-link:hover {
    background-color: #2d2d2d;
  }
}

/* 页面切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 大屏幕优化 */
@media (min-width: 1400px) {
  .header-container {
    padding: 0 40px;
  }

  nav {
    margin: 0 40px;
  }

  .nav-container {
    gap: 6px;
    justify-content: space-between;
  }

  .nav-item {
    padding: 8px 12px;
    font-size: 0.95rem;
  }
}
</style> 