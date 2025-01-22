<script setup lang="ts">
import Carousel from '../components/home/Carousel.vue'
import CompanyIntro from '../components/home/CompanyIntro.vue'
import NewsAnnouncement from '../components/home/NewsAnnouncement.vue'
import SystemModules from '../components/home/SystemModules.vue'
import Footer from '../components/common/Footer.vue'
</script>

<template>
  <main>
    <Carousel />
    <CompanyIntro />
    <NewsAnnouncement />
    <SystemModules />
    <Footer />
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main > :last-child {
  margin-top: auto;
}
</style> 