<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import EZUIKit from 'ezuikit-js'

// 视频监控配置
const videoConfig = {
  id: 'ezuikit-player',
  url: 'ezopen://open.ys7.com/BA1654073/1.hd.live', // 替换为您的设备序列号
  accessToken: 'at.290l98388os8t7ysciv08dhe4dbdiq5z-51e8qjc6pe-14c910y-lgtopmxft', // 替换为您的访问令牌
  template: 'pcLive',
}

let player: any = null

onMounted(() => {
  // 初始化播放器
  player = new EZUIKit.EZUIKitPlayer(videoConfig)
})

onBeforeUnmount(() => {
  // 组件销毁时停止播放并释放资源
  if (player) {
    player.stop()
    player = null
  }
})
</script>

<template>
  <div class="video-monitor">
    <h3>实时监控</h3>
    <div class="player-container">
      <div id="ezuikit-player"></div>
    </div>
  </div>
</template>

<style scoped>
.video-monitor {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.player-container {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #f8f9fa;
  border-radius: 4px;
  overflow: hidden;
}

#ezuikit-player {
  width: 100%;
  height: 100%;
}
</style> 