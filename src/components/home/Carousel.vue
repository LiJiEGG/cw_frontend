<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
// 导入图片
import slide2 from '@/assets/images/slide2.webp'
import slide3 from '@/assets/images/slide3.webp'
import slide6 from '@/assets/images/slide6.jpg'

const slides = ref([
  {
    id: 1,
    image: slide2,
    title: '智能温室种植',
    description: '采用先进的物联网技术，实现温室智能化管理'
  },
  {
    id: 2,
    image: slide3,
    title: '数字化农业',
    description: '大数据驱动的现代农业解决方案'
  },
  {
    id: 3,
    image: slide6,
    title: '产品溯源',
    description: '全程可追溯的农产品质量管理体系'
  }
])

const currentSlide = ref(0)
let timer: number | null = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? slides.value.length - 1 : currentSlide.value - 1
}

const startAutoPlay = () => {
  timer = window.setInterval(nextSlide, 5000)
}

const stopAutoPlay = () => {
  if (timer) {
    clearInterval(timer)
  }
}

// 添加切换动画状态
const isTransitioning = ref(false)

// 修改切换函数，添加动画状态
const switchSlide = (direction: 'next' | 'prev') => {
  if (isTransitioning.value) return
  
  isTransitioning.value = true
  if (direction === 'next') {
    nextSlide()
  } else {
    prevSlide()
  }
  
  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

onMounted(() => {
  startAutoPlay()
})

onBeforeUnmount(() => {
  stopAutoPlay()
})
</script>

<template>
  <div 
    class="carousel" 
    @mouseenter="stopAutoPlay"
    @mouseleave="startAutoPlay"
  >
    <!-- 幻灯片容器 -->
    <div 
      class="slides" 
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      :class="{ transitioning: isTransitioning }"
    >
      <div 
        v-for="slide in slides" 
        :key="slide.id"
        class="slide"
      >
        <img :src="slide.image" :alt="slide.title">
        <div class="slide-content">
          <div class="content-wrapper">
            <h2>{{ slide.title }}</h2>
            <p>{{ slide.description }}</p>
            <button class="learn-more">了解更多</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 导航按钮 -->
    <button 
      class="nav-btn prev" 
      @click="switchSlide('prev')"
      :disabled="isTransitioning"
    >
      <span class="arrow">❮</span>
    </button>
    <button 
      class="nav-btn next" 
      @click="switchSlide('next')"
      :disabled="isTransitioning"
    >
      <span class="arrow">❯</span>
    </button>
    
    <!-- 指示器 -->
    <div class="dots">
      <button 
        v-for="(slide, index) in slides" 
        :key="slide.id"
        :class="['dot', { active: index === currentSlide }]"
        @click="currentSlide = index"
      >
        <span class="dot-content"></span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
  background: #000;
}

.slides {
  display: flex;
  height: 100%;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slides.transitioning {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide {
  min-width: 100%;
  position: relative;
  overflow: hidden;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: transform 6s ease-in-out;
}

.slide:hover img {
  transform: scale(1.1);
}

.slide-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 80px 40px 60px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s forwards;
}

.slide-content h2 {
  font-size: 2.5rem;
  margin-bottom: 16px;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.slide-content p {
  font-size: 1.2rem;
  margin-bottom: 24px;
  max-width: 600px;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.learn-more {
  padding: 12px 24px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.learn-more:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  color: white;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-50%) scale(1.1);
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.arrow {
  font-size: 24px;
  line-height: 1;
}

.prev {
  left: 20px;
}

.next {
  right: 20px;
}

.dots {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  backdrop-filter: blur(4px);
}

.dot {
  width: 30px;
  height: 8px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.dot-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.dot.active .dot-content {
  background: white;
}

.dot:hover .dot-content {
  background: rgba(255, 255, 255, 0.8);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .carousel {
    height: 400px;
  }

  .slide-content {
    padding: 40px 20px 40px;
  }

  .slide-content h2 {
    font-size: 1.8rem;
  }

  .slide-content p {
    font-size: 1rem;
  }

  .nav-btn {
    width: 40px;
    height: 40px;
  }

  .arrow {
    font-size: 20px;
  }
}
</style> 