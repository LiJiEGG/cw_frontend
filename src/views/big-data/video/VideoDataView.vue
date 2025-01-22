<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import BackButton from '@/components/common/BackButton.vue'
import EZUIKit from 'ezuikit-js'

// 温室列表
const greenhouses = ref([
  { id: 1, name: '1号温室', area: 'A区' },
  { id: 2, name: '2号温室', area: 'A区' },
  { id: 3, name: '3号温室', area: 'B区' },
  { id: 4, name: '4号温室', area: 'B区' },
  { id: 5, name: '5号温室', area: 'C区' }
]);

// 当前选中的温室
const currentGreenhouse = ref(greenhouses.value[0]);

// 按区域分组的温室
const greenhousesByArea = computed(() => {
  const grouped = {} as Record<string, typeof greenhouses.value>;
  greenhouses.value.forEach(greenhouse => {
    if (!grouped[greenhouse.area]) {
      grouped[greenhouse.area] = [];
    }
    grouped[greenhouse.area].push(greenhouse);
  });
  return grouped;
});

// 视频监控类型
const monitorTypes = [
  {
    id: 'growth',
    title: '生长监控',
    icon: '🌱',
    description: '实时监控作物生长状态',
    deviceId: 'camera001',
    status: 'active'
  },
  {
    id: 'pest',
    title: '病虫害识别',
    icon: '🔍',
    description: '自动识别病虫害情况',
    deviceId: 'camera002',
    status: 'active'
  },
  {
    id: 'operation',
    title: '农事操作',
    icon: '👨‍🌾',
    description: '记录农事操作过程',
    deviceId: 'camera003',
    status: 'active'
  },
//   {
//     id: 'security',
//     title: '安全监控',
//     icon: '🔒',
//     description: '设施安全监控',
//     deviceId: 'camera004',
//     status: 'active'
//   }
];

// 当前选中的监控类型
const currentType = ref(monitorTypes[0]);

// 视频播放器实例
let player: any = null;

// 初始化播放器
const initPlayer = (deviceId: string) => {
  if (player) {
    player.stop();
  }

  const videoConfig = {
    id: 'video-player',
    url: `ezopen://open.ys7.com/${deviceId}/1.hd.live`,
    accessToken: 'your-access-token',
    template: 'simple',
    autoplay: true,
    audio: 1
  };

  player = new EZUIKit.EZUIKitPlayer(videoConfig);
};

// 切换监控类型
const switchMonitorType = (type: typeof monitorTypes[0]) => {
  currentType.value = type;
  initPlayer(type.deviceId);
};

// 组件卸载时停止播放
onUnmounted(() => {
  if (player) {
    player.stop();
  }
});

// 初始化
onMounted(() => {
  initPlayer(currentType.value.deviceId);
});

// 生长监控数据
const growthData = ref({
  recentCaptures: [
    {
      id: 1,
      time: '2024-03-21 15:30',
      imageUrl: '/images/growth/capture1.jpg',
      height: '45cm',
      coverage: '85%',
      status: '正常',
      notes: '生长情况良好，叶色正常'
    },
    // ... 更多数据
  ],
  alerts: [
    {
      id: 1,
      type: '生长异常',
      location: 'A区-3排-5号',
      time: '2024-03-21 14:20',
      level: 'warning',
      description: '植株生长速度低于平均水平'
    }
  ]
});

// 病虫害识别数据
const pestData = ref({
  detections: [
    {
      id: 1,
      time: '2024-03-21 15:30',
      type: '叶斑病',
      location: 'B区-2排-8号',
      severity: 'medium',
      imageUrl: '/images/pest/detection1.jpg',
      confidence: '89%',
      status: '待处理'
    },
    // ... 更多数据
  ],
  statistics: {
    total: 15,
    pending: 5,
    processing: 3,
    resolved: 7,
    byType: {
      '叶斑病': 5,
      '白粉病': 3,
      '蚜虫': 4,
      '其他': 3
    }
  }
});

// 农事操作数据
const operationData = ref({
  records: [
    {
      id: 1,
      time: '2024-03-21 09:30',
      type: '施肥',
      operator: '张三',
      location: 'A区',
      details: '复合肥 200kg',
      imageUrl: '/images/operation/record1.jpg',
      status: '已完成'
    },
    // ... 更多数据
  ],
  statistics: {
    today: 8,
    pending: 3,
    completed: 5,
    byType: {
      '施肥': 3,
      '打药': 2,
      '修剪': 2,
      '其他': 1
    }
  }
});

// 默认图片
import defaultImage from '@/assets/images/default/no-image.png'
// const defaultImage = '/images/default/no-image.png';

// 图片加载失败处理
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = defaultImage;
  img.classList.add('image-error');
  // 添加失败提示文本到父元素
  const container = img.parentElement;
  if (container) {
    const errorText = document.createElement('div');
    errorText.className = 'error-message';
    // errorText.textContent = '图片加载失败';
    container.appendChild(errorText);
  }
};

// 历史记录数据
const historyData = ref({
  growth: {
    title: '生长历史',
    records: [
      {
        id: 1,
        date: '2024-03-21',
        data: [
          { time: '08:00', height: '43cm', coverage: '82%', status: '正常' },
          { time: '12:00', height: '44cm', coverage: '83%', status: '正常' },
          { time: '16:00', height: '45cm', coverage: '85%', status: '正常' }
        ]
      },
      {
        id: 2,
        date: '2024-03-20',
        data: [
          { time: '08:00', height: '41cm', coverage: '80%', status: '正常' },
          { time: '12:00', height: '42cm', coverage: '81%', status: '正常' },
          { time: '16:00', height: '43cm', coverage: '82%', status: '正常' }
        ]
      }
    ]
  },
  pest: {
    title: '病虫害历史',
    records: [
      {
        id: 1,
        date: '2024-03-21',
        detections: [
          { time: '09:30', type: '叶斑病', location: 'B区-2排-8号', status: '已处理' },
          { time: '14:20', type: '白粉病', location: 'A区-1排-3号', status: '已处理' }
        ]
      },
      {
        id: 2,
        date: '2024-03-20',
        detections: [
          { time: '10:15', type: '蚜虫', location: 'C区-4排-2号', status: '已处理' }
        ]
      }
    ]
  },
  operation: {
    title: '农事历史',
    records: [
      {
        id: 1,
        date: '2024-03-21',
        operations: [
          { time: '08:30', type: '施肥', operator: '张三', details: '复合肥 200kg' },
          { time: '14:00', type: '打药', operator: '李四', details: '杀虫剂喷洒' }
        ]
      },
      {
        id: 2,
        date: '2024-03-20',
        operations: [
          { time: '09:00', type: '修剪', operator: '王五', details: '侧枝修剪' }
        ]
      }
    ]
  }
});

// 显示历史记录弹窗
const showHistory = ref(false);
const currentHistory = ref<'growth' | 'pest' | 'operation'>('growth');

// 打开历史记录
const openHistory = (type: 'growth' | 'pest' | 'operation') => {
  currentHistory.value = type;
  showHistory.value = true;
};

// 监听温室切换
const handleGreenhouseChange = (event: Event) => {
  const select = event.target as HTMLSelectElement;
  const selectedIndex = select.selectedIndex;
  const selectedGreenhouse = greenhouses.value[selectedIndex];
  
  if (selectedGreenhouse) {
    currentGreenhouse.value = selectedGreenhouse;
    // 更新各类数据
    updateGrowthData(selectedGreenhouse.id);
    updatePestData(selectedGreenhouse.id);
    updateOperationData(selectedGreenhouse.id);
    updateHistoryData(selectedGreenhouse.id);
    // 更新视频源
    initPlayer(`${currentType.value.deviceId}-${selectedGreenhouse.id}`);
  }
};

// 基于温室ID生成稳定的随机数
const getRandomValue = (min: number, max: number, seed: number, greenhouseId: number) => {
  const random = Math.sin(greenhouseId * seed) * 10000;
  return min + (random - Math.floor(random)) * (max - min);
};

// 更新生长监控数据
const updateGrowthData = (greenhouseId: number) => {
  // 根据温室特性设置基准值
  const baseHeight = 35 + (greenhouseId * 3); // 不同温室有不同的基准株高
  const baseCoverage = 75 + (greenhouseId * 2); // 不同温室有不同的基准覆盖率
  
  growthData.value = {
    recentCaptures: [
      {
        id: 1,
        time: '2024-03-21 15:30',
        imageUrl: `/images/growth/${greenhouseId}/capture1.jpg`,
        height: `${Math.floor(baseHeight + getRandomValue(0, 10, 1, greenhouseId))}cm`,
        coverage: `${Math.floor(baseCoverage + getRandomValue(0, 15, 2, greenhouseId))}%`,
        status: getRandomValue(0, 1, 3, greenhouseId) > 0.8 ? '需关注' : '正常',
        notes: `${currentGreenhouse.value.name}生长情况${getRandomValue(0, 1, 4, greenhouseId) > 0.8 ? '需关注' : '良好'}`
      }
    ],
    alerts: getRandomValue(0, 1, 5, greenhouseId) > 0.7 ? [
      {
        id: 1,
        type: '生长异常',
        location: `${currentGreenhouse.value.area}-${greenhouseId}号温室`,
        time: '2024-03-21 14:20',
        level: getRandomValue(0, 1, 6, greenhouseId) > 0.5 ? 'warning' : 'critical',
        description: '植株生长速度低于平均水平'
      }
    ] : []
  };
};

// 更新病虫害识别数据
const updatePestData = (greenhouseId: number) => {
  const pestTypes = ['叶斑病', '白粉病', '蚜虫', '炭疽病'];
  const randomPestType = pestTypes[Math.floor(getRandomValue(0, pestTypes.length, 1, greenhouseId))];
  
  // 根据温室特性调整病虫害概率
  const detectionProbability = getRandomValue(0, 1, 2, greenhouseId);
  
  pestData.value = {
    detections: detectionProbability > 0.6 ? [
      {
        id: 1,
        time: '2024-03-21 15:30',
        type: randomPestType,
        location: `${currentGreenhouse.value.area}-${greenhouseId}号温室`,
        severity: getRandomValue(0, 1, 3, greenhouseId) > 0.5 ? 'medium' : 'high',
        imageUrl: `/images/pest/${greenhouseId}/detection1.jpg`,
        confidence: `${Math.floor(getRandomValue(85, 98, 4, greenhouseId))}%`,
        status: getRandomValue(0, 1, 5, greenhouseId) > 0.5 ? '待处理' : '处理中'
      }
    ] : [],
    statistics: {
      total: Math.floor(getRandomValue(5, 15, 6, greenhouseId)),
      pending: Math.floor(getRandomValue(1, 5, 7, greenhouseId)),
      processing: Math.floor(getRandomValue(1, 3, 8, greenhouseId)),
      resolved: Math.floor(getRandomValue(3, 8, 9, greenhouseId)),
      byType: {
        '叶斑病': Math.floor(getRandomValue(1, 5, 10, greenhouseId)),
        '白粉病': Math.floor(getRandomValue(1, 4, 11, greenhouseId)),
        '蚜虫': Math.floor(getRandomValue(1, 4, 12, greenhouseId)),
        '其他': Math.floor(getRandomValue(1, 3, 13, greenhouseId))
      }
    }
  };
};

// 更新农事操作数据
const updateOperationData = (greenhouseId: number) => {
  const operationTypes = ['施肥', '打药', '修剪', '浇水'];
  const operators = ['张三', '李四', '王五', '赵六'];
  
  // 根据温室特性选择操作类型和人员
  const randomType = operationTypes[Math.floor(getRandomValue(0, operationTypes.length, 1, greenhouseId))];
  const randomOperator = operators[Math.floor(getRandomValue(0, operators.length, 2, greenhouseId))];
  
  // 根据温室特性生成工作量
  const workloadFactor = 1 + (greenhouseId * 0.2); // 不同温室有不同的工作量系数
  
  operationData.value = {
    records: [
      {
        id: 1,
        time: '2024-03-21 09:30',
        type: randomType,
        operator: randomOperator,
        location: `${currentGreenhouse.value.area}-${greenhouseId}号温室`,
        details: getOperationDetails(randomType, greenhouseId),
        imageUrl: `/images/operation/${greenhouseId}/record1.jpg`,
        status: getRandomValue(0, 1, 3, greenhouseId) > 0.3 ? '已完成' : '进行中'
      }
    ],
    statistics: {
      today: Math.floor(getRandomValue(5, 10, 4, greenhouseId) * workloadFactor),
      pending: Math.floor(getRandomValue(1, 4, 5, greenhouseId) * workloadFactor),
      completed: Math.floor(getRandomValue(4, 8, 6, greenhouseId) * workloadFactor),
      byType: {
        '施肥': Math.floor(getRandomValue(1, 4, 7, greenhouseId) * workloadFactor),
        '打药': Math.floor(getRandomValue(1, 3, 8, greenhouseId) * workloadFactor),
        '修剪': Math.floor(getRandomValue(1, 3, 9, greenhouseId) * workloadFactor),
        '其他': Math.floor(getRandomValue(1, 2, 10, greenhouseId) * workloadFactor)
      }
    }
  };
};

// 获取农事操作详情
const getOperationDetails = (type: string, greenhouseId: number) => {
  const details = {
    '施肥': [`复合肥 ${Math.floor(150 + greenhouseId * 20)}kg`, `有机肥 ${Math.floor(120 + greenhouseId * 15)}kg`, `氮肥 ${Math.floor(80 + greenhouseId * 10)}kg`],
    '打药': ['杀虫剂喷洒', '杀菌剂喷洒', '叶面肥喷洒'],
    '修剪': ['侧枝修剪', '病叶修剪', '顶芽修剪'],
    '浇水': [`常规浇水 ${Math.floor(200 + greenhouseId * 25)}L`, '营养液浇灌', '滴灌']
  };
  
  const options = details[type as keyof typeof details];
  const index = Math.floor(getRandomValue(0, options.length, 11, greenhouseId));
  return options[index];
};

// 更新历史数据
const updateHistoryData = (greenhouseId: number) => {
  historyData.value = {
    growth: {
      title: '生长历史',
      records: [
        {
          id: 1,
          date: '2024-03-21',
          data: [
            { 
              time: '08:00', 
              height: `${40 + Math.floor(Math.random() * 10)}cm`, 
              coverage: `${80 + Math.floor(Math.random() * 15)}%`, 
              status: '正常' 
            },
            { 
              time: '12:00', 
              height: `${41 + Math.floor(Math.random() * 10)}cm`, 
              coverage: `${81 + Math.floor(Math.random() * 15)}%`, 
              status: '正常' 
            },
            { 
              time: '16:00', 
              height: `${42 + Math.floor(Math.random() * 10)}cm`, 
              coverage: `${82 + Math.floor(Math.random() * 15)}%`, 
              status: '正常' 
            }
          ]
        },
        {
          id: 2,
          date: '2024-03-20',
          data: [
            { 
              time: '08:00', 
              height: `${38 + Math.floor(Math.random() * 10)}cm`, 
              coverage: `${78 + Math.floor(Math.random() * 15)}%`, 
              status: '正常' 
            },
            { 
              time: '12:00', 
              height: `${39 + Math.floor(Math.random() * 10)}cm`, 
              coverage: `${79 + Math.floor(Math.random() * 15)}%`, 
              status: '正常' 
            },
            { 
              time: '16:00', 
              height: `${40 + Math.floor(Math.random() * 10)}cm`, 
              coverage: `${80 + Math.floor(Math.random() * 15)}%`, 
              status: '正常' 
            }
          ]
        }
      ]
    },
    pest: {
      title: '病虫害历史',
      records: [
        {
          id: 1,
          date: '2024-03-21',
          detections: [
            { 
              time: '09:30', 
              type: '叶斑病', 
              location: `${currentGreenhouse.value.area}-${greenhouseId}号温室-2排-8号`, 
              status: '已处理' 
            },
            { 
              time: '14:20', 
              type: '白粉病', 
              location: `${currentGreenhouse.value.area}-${greenhouseId}号温室-1排-3号`, 
              status: '已处理' 
            }
          ]
        },
        {
          id: 2,
          date: '2024-03-20',
          detections: [
            { 
              time: '10:15', 
              type: '蚜虫', 
              location: `${currentGreenhouse.value.area}-${greenhouseId}号温室-4排-2号`, 
              status: '已处理' 
            }
          ]
        }
      ]
    },
    operation: {
      title: '农事历史',
      records: [
        {
          id: 1,
          date: '2024-03-21',
          operations: [
            { 
              time: '08:30', 
              type: '施肥', 
              operator: '张三', 
              details: `${currentGreenhouse.value.name}复合肥施用 200kg` 
            },
            { 
              time: '14:00', 
              type: '打药', 
              operator: '李四', 
              details: `${currentGreenhouse.value.name}杀虫剂喷洒` 
            }
          ]
        },
        {
          id: 2,
          date: '2024-03-20',
          operations: [
            { 
              time: '09:00', 
              type: '修剪', 
              operator: '王五', 
              details: `${currentGreenhouse.value.name}侧枝修剪` 
            }
          ]
        }
      ]
    }
  };
};

// 组件挂载时初始化数据
onMounted(() => {
  initPlayer(`${currentType.value.deviceId}-${currentGreenhouse.value.id}`);
  handleGreenhouseChange({ 
    target: { 
      selectedIndex: 0 
    } 
  } as unknown as Event);
});
</script>

<template>
  <div class="video-view">
    <BackButton />
    <div class="header">
      <h2>视频监控</h2>
      <div class="greenhouse-selector">
        <select 
          v-model="currentGreenhouse"
          @change="handleGreenhouseChange">
          <optgroup v-for="(houses, area) in greenhousesByArea" 
                   :key="area" 
                   :label="area">
            <option v-for="house in houses" 
                    :key="house.id" 
                    :value="house">
              {{ house.name }}
            </option>
          </optgroup>
        </select>
      </div>
    </div>

    <div class="data-grid">
      <!-- 监控类型选择 -->
      <section class="data-section">
        <h3>监控类型</h3>
        <div class="monitor-types">
          <div v-for="type in monitorTypes"
               :key="type.id"
               class="type-card"
               :class="{ active: currentType.id === type.id }"
               @click="switchMonitorType(type)">
            <div class="type-icon">{{ type.icon }}</div>
            <div class="type-info">
              <h4>{{ type.title }}</h4>
              <p>{{ type.description }}</p>
            </div>
            <div class="type-status" :class="type.status">
              {{ type.status === 'active' ? '在线' : '离线' }}
            </div>
          </div>
        </div>
      </section>

      <!-- 视频播放区域 -->
      <section class="data-section">
        <h3>{{ currentType.title }}</h3>
        <div class="video-container">
          <div class="video-header">
            <div class="video-controls">
              <button class="control-btn">全屏</button>
              <button class="control-btn">截图</button>
              <button class="control-btn">录制</button>
            </div>
          </div>
          <div id="video-player" class="player"></div>
        </div>
      </section>

      <!-- 生长监控数据展示 -->
      <section v-if="currentType.id === 'growth'" class="data-section">
        <div class="section-header">
          <h3>采集数据</h3>
          <button class="history-btn" @click="openHistory('growth')">
            <span class="icon">📅</span>
            历史记录
          </button>
        </div>
        <div class="data-content">
          <div class="recent-captures">
            <h4>最近采集</h4>
            <div class="capture-grid">
              <div v-for="capture in growthData.recentCaptures" 
                   :key="capture.id" 
                   class="capture-card">
                <div class="capture-image">
                  <img :src="capture.imageUrl" 
                       :alt="capture.time"
                       @error="handleImageError"
                       :title="capture.notes">
                  <div class="image-overlay" v-if="!capture.imageUrl.includes('no-image')">
                    <span class="image-time">{{ capture.time }}</span>
                  </div>
                </div>
                <div class="capture-info">
                  <div class="info-item">
                    <span class="label">时间</span>
                    <span class="value">{{ capture.time }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">株高</span>
                    <span class="value">{{ capture.height }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">覆盖率</span>
                    <span class="value">{{ capture.coverage }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">状态</span>
                    <span class="value">{{ capture.status }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="alerts-list">
            <h4>异常提醒</h4>
            <div v-for="alert in growthData.alerts" 
                 :key="alert.id"
                 class="alert-item"
                 :class="alert.level">
              <div class="alert-icon">
                <span class="icon">⚠️</span>
                <div class="pulse-ring"></div>
              </div>
              <div class="alert-content">
                <div class="alert-header">
                  <div class="alert-type">{{ alert.type }}</div>
                  <div class="alert-time">{{ alert.time }}</div>
                </div>
                <div class="alert-location">
                  <span class="location-icon">📍</span>
                  {{ alert.location }}
                </div>
                <div class="alert-description">{{ alert.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 病虫害识别数据展示 -->
      <section v-if="currentType.id === 'pest'" class="data-section">
        <div class="section-header">
          <h3>识别结果</h3>
          <button class="history-btn" @click="openHistory('pest')">
            <span class="icon">📅</span>
            历史记录
          </button>
        </div>
        <div class="data-content">
          <div class="detection-stats">
            <div class="stat-card">
              <div class="stat-value">{{ pestData.statistics.total }}</div>
              <div class="stat-label">总检测数</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ pestData.statistics.pending }}</div>
              <div class="stat-label">待处理</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ pestData.statistics.processing }}</div>
              <div class="stat-label">处理中</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ pestData.statistics.resolved }}</div>
              <div class="stat-label">已解决</div>
            </div>
          </div>
          <div class="detection-list">
            <div v-for="detection in pestData.detections" 
                 :key="detection.id"
                 class="detection-card">
              <div class="detection-image">
                <img :src="detection.imageUrl" 
                     :alt="detection.type"
                     @error="handleImageError"
                     :title="detection.type">
                <div class="image-overlay" v-if="!detection.imageUrl.includes('no-image')">
                  <span class="confidence-badge">可信度: {{ detection.confidence }}</span>
                </div>
              </div>
              <div class="detection-info">
                <div class="detection-type">{{ detection.type }}</div>
                <div class="detection-meta">
                  <span>位置: {{ detection.location }}</span>
                  <span>可信度: {{ detection.confidence }}</span>
                </div>
                <div class="detection-status" :class="detection.status">
                  {{ detection.status }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 农事操作数据展示 -->
      <section v-if="currentType.id === 'operation'" class="data-section">
        <div class="section-header">
          <h3>作业记录</h3>
          <button class="history-btn" @click="openHistory('operation')">
            <span class="icon">📅</span>
            历史记录
          </button>
        </div>
        <div class="data-content">
          <div class="operation-summary">
            <div class="summary-card">
              <h4>今日作业</h4>
              <div class="summary-numbers">
                <div class="number-item">
                  <span class="number">{{ operationData.statistics.today }}</span>
                  <span class="label">总数</span>
                </div>
                <div class="number-item">
                  <span class="number">{{ operationData.statistics.completed }}</span>
                  <span class="label">已完成</span>
                </div>
                <div class="number-item">
                  <span class="number">{{ operationData.statistics.pending }}</span>
                  <span class="label">待完成</span>
                </div>
              </div>
            </div>
          </div>
          <div class="operation-records">
            <div v-for="record in operationData.records" 
                 :key="record.id"
                 class="record-card">
              <div class="record-time">{{ record.time }}</div>
              <div class="record-content">
                <div class="record-type">{{ record.type }}</div>
                <div class="record-details">
                  <div>操作员: {{ record.operator }}</div>
                  <div>位置: {{ record.location }}</div>
                  <div>详情: {{ record.details }}</div>
                </div>
              </div>
              <div class="record-status" :class="record.status">
                {{ record.status }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

  <!-- 历史记录弹窗 -->
  <Teleport to="body">
    <Transition name="modal">
      <div class="history-modal" v-if="showHistory" @click.self="showHistory = false">
        <div class="modal-content">
          <div class="modal-header">
            <h3>{{ historyData[currentHistory].title }}</h3>
            <button class="close-btn" @click="showHistory = false">×</button>
          </div>
          
          <div class="history-timeline">
            <div v-for="record in historyData[currentHistory].records" 
                 :key="record.id" 
                 class="timeline-item">
              <div class="timeline-date">{{ record.date }}</div>
              
              <!-- 生长历史 -->
              <template v-if="currentHistory === 'growth'">
                <div v-for="item in record.data" 
                     :key="item.time" 
                     class="timeline-content">
                  <div class="time-point">{{ item.time }}</div>
                  <div class="data-point">
                    <div>株高: {{ item.height }}</div>
                    <div>覆盖率: {{ item.coverage }}</div>
                    <div>状态: {{ item.status }}</div>
                  </div>
                </div>
              </template>

              <!-- 病虫害历史 -->
              <template v-if="currentHistory === 'pest'">
                <div v-for="detection in record.detections" 
                     :key="detection.time" 
                     class="timeline-content">
                  <div class="time-point">{{ detection.time }}</div>
                  <div class="data-point">
                    <div class="detection-type">{{ detection.type }}</div>
                    <div>位置: {{ detection.location }}</div>
                    <div>状态: {{ detection.status }}</div>
                  </div>
                </div>
              </template>

              <!-- 农事历史 -->
              <template v-if="currentHistory === 'operation'">
                <div v-for="operation in record.operations" 
                     :key="operation.time" 
                     class="timeline-content">
                  <div class="time-point">{{ operation.time }}</div>
                  <div class="data-point">
                    <div class="operation-type">{{ operation.type }}</div>
                    <div>操作员: {{ operation.operator }}</div>
                    <div>详情: {{ operation.details }}</div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.video-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.data-grid {
  display: grid;
  gap: 20px;
}

.data-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.greenhouse-selector {
  position: relative;
  min-width: 200px;
}

.greenhouse-selector select {
  width: 100%;
  padding: 8px 32px 8px 16px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  appearance: none;
  cursor: pointer;
}

.greenhouse-selector::after {
  content: '▼';
  font-size: 0.8rem;
  color: #666;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.monitor-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.type-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.type-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.type-card.active {
  background: #4CAF50;
  color: white;
}

.type-icon {
  font-size: 2rem;
}

.type-info {
  flex: 1;
}

.type-info h4 {
  margin: 0;
  font-size: 1.1rem;
}

.type-info p {
  margin: 4px 0 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

.type-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.type-status.active {
  background: #4CAF50;
  color: white;
}

.video-container {
  margin-top: 16px;
}

.video-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.video-controls {
  display: flex;
  gap: 8px;
}

.control-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #f5f5f5;
  cursor: pointer;
  transition: all 0.3s;
}

.control-btn:hover {
  background: #e0e0e0;
}

.player {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .data-section {
    background: #2d2d2d;
  }

  .type-card {
    background: #1a1a1a;
    color: #fff;
  }

  .type-card.active {
    background: #2e7d32;
  }

  .greenhouse-selector select {
    background: #2d2d2d;
    border-color: #444;
    color: #fff;
  }

  .greenhouse-selector::after {
    color: #888;
  }

  .control-btn {
    background: #333;
    color: #fff;
  }

  .control-btn:hover {
    background: #444;
  }

  select optgroup {
    background: #2d2d2d;
    color: #fff;
  }

  select option {
    background: #2d2d2d;
    color: #bbb;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .video-view {
    padding: 16px;
  }

  .header {
    flex-direction: column;
    gap: 16px;
  }

  .greenhouse-selector {
    width: 100%;
  }

  h2 {
    text-align: center;
  }

  .video-header {
    justify-content: center;
  }

  .type-card {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }

  .type-info {
    text-align: center;
  }
}

/* 数据展示相关样式 */
.data-content {
  margin-top: 20px;
}

/* 生长监控样式优化 */
.capture-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.capture-card {
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.capture-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.capture-image {
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-bottom: 1px solid #eee;
}

.capture-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.capture-card:hover .capture-image img {
  transform: scale(1.05);
}

.capture-info {
  padding: 16px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item .label {
  color: #666;
  font-weight: 500;
}

.info-item .value {
  color: #2c3e50;
  font-weight: 600;
}

/* 病虫害识别样式优化 */
.detection-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
}

.stat-value {
  font-size: 2rem;
  font-weight: 600;
  color: #4CAF50;
  margin-bottom: 8px;
}

.stat-label {
  color: #666;
  font-weight: 500;
}

.detection-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
}

.detection-card {
  display: flex;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.detection-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.detection-image {
  width: 120px;
  height: 120px;
  overflow: hidden;
}

.detection-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detection-info {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.detection-type {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.detection-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #666;
  font-size: 0.9rem;
}

.detection-status {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  align-self: flex-start;
}

.detection-status.pending {
  background: #FFF3E0;
  color: #F57C00;
}

/* 农事操作样式优化 */
.operation-summary {
  margin-bottom: 30px;
}

.summary-card {
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.summary-numbers {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.number-item {
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.number-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.number {
  font-size: 2rem;
  font-weight: 600;
  color: #4CAF50;
  margin-bottom: 8px;
}

.label {
  color: #666;
  font-weight: 500;
}

.operation-records {
  display: grid;
  gap: 16px;
}

.record-card {
  display: flex;
  align-items: center;
  padding: 20px;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.record-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.record-time {
  min-width: 140px;
  color: #666;
  font-weight: 500;
}

.record-content {
  flex: 1;
  margin: 0 20px;
}

.record-type {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.record-details {
  color: #666;
  font-size: 0.9rem;
  display: grid;
  gap: 4px;
}

.record-status {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.record-status.completed {
  background: #E8F5E9;
  color: #4CAF50;
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .capture-card,
  .stat-card,
  .detection-card,
  .record-card,
  .summary-card,
  .number-item {
    background: linear-gradient(145deg, #2d2d2d, #1a1a1a);
  }

  .capture-image {
    border-color: #333;
  }

  .info-item {
    border-color: #333;
  }

  .info-item .value,
  .detection-type,
  .record-type {
    color: #fff;
  }

  .info-item .label,
  .stat-label,
  .detection-meta,
  .record-time,
  .record-details {
    color: #bbb;
  }

  .stat-value,
  .number {
    color: #81C784;
  }

  .detection-status.pending {
    background: #2E2417;
    color: #FFB74D;
  }

  .record-status.completed {
    background: #1B5E20;
    color: #A5D6A7;
  }
}

/* 响应式设计补充 */
@media (max-width: 1024px) {
  .detection-stats,
  .summary-numbers {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .detection-card {
    flex-direction: column;
  }

  .detection-image {
    width: 100%;
    height: 200px;
  }

  .record-card {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }

  .record-time {
    min-width: auto;
  }

  .record-content {
    margin: 0;
  }
}

/* 图片相关样式优化 */
.capture-image,
.detection-image {
  position: relative;
  background: #f5f5f5;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.capture-image img,
.detection-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
}

.image-error {
  opacity: 0.7;
  filter: grayscale(1);
  max-width: 50%;
  max-height: 50%;
  object-fit: contain !important;
  width: auto !important;
  height: auto !important;
}

.capture-image .image-error {
  max-width: 120px;
  margin: 20px;
}

.detection-image .image-error {
  max-width: 80px;
  margin: 15px;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  font-size: 0.9rem;
}

.image-time {
  display: block;
  text-align: right;
  font-size: 0.85rem;
  opacity: 0.9;
}

.confidence-badge {
  display: inline-block;
  padding: 4px 8px;
  background: rgba(76, 175, 80, 0.9);
  border-radius: 4px;
  font-size: 0.85rem;
}

.error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, calc(-50% + 40px));
  background: rgba(244, 67, 54, 0.9);
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.85rem;
  z-index: 1;
  white-space: nowrap;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.capture-image::before,
.detection-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, #f5f5f5 25%, transparent 25%, transparent 75%, #f5f5f5 75%),
              linear-gradient(45deg, #f5f5f5 25%, transparent 25%, transparent 75%, #f5f5f5 75%);
  background-size: 12px 12px;
  background-position: 0 0, 6px 6px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.capture-image:has(.image-error)::before,
.detection-image:has(.image-error)::before {
  opacity: 0.08;
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .capture-image,
  .detection-image {
    background: #2d2d2d;
  }

  .image-error {
    opacity: 0.4;
    filter: grayscale(0.8) brightness(0.8);
  }

  .error-message {
    background: rgba(244, 67, 54, 0.75);
  }

  .capture-image::before,
  .detection-image::before {
    background: linear-gradient(45deg, #2d2d2d 25%, transparent 25%, transparent 75%, #2d2d2d 75%),
                linear-gradient(45deg, #2d2d2d 25%, transparent 25%, transparent 75%, #2d2d2d 75%);
  }
}

/* 响应式设计补充 */
@media (max-width: 768px) {
  .capture-image .image-error {
    max-width: 100px;
  }

  .detection-image .image-error {
    max-width: 70px;
  }

  .error-message {
    padding: 8px 16px;
    font-size: 0.9rem;
    transform: translate(-50%, calc(-50% + 35px));
  }
}

/* 异常提醒样式优化 */
.alerts-list {
  margin-top: 24px;
  display: grid;
  gap: 16px;
}

.alerts-list h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #d32f2f;
  margin-bottom: 16px;
}

.alerts-list h4::before {
  content: '🚨';
  font-size: 1.2em;
}

.alert-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: linear-gradient(145deg, #fff5f5, #ffebee);
  border-radius: 12px;
  border-left: 4px solid #d32f2f;
  box-shadow: 0 4px 12px rgba(211, 47, 47, 0.1);
  transition: all 0.3s ease;
}

.alert-item:hover {
  transform: translateX(4px);
  box-shadow: 0 6px 16px rgba(211, 47, 47, 0.15);
}

.alert-icon {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.alert-icon .icon {
  font-size: 1.5rem;
  z-index: 1;
}

.pulse-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(211, 47, 47, 0.1);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    opacity: 0.8;
  }
  70% {
    transform: scale(1.1);
    opacity: 0.3;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.8;
  }
}

.alert-content {
  flex: 1;
}

.alert-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.alert-type {
  font-weight: 600;
  color: #d32f2f;
  font-size: 1.1rem;
}

.alert-time {
  color: #666;
  font-size: 0.9rem;
}

.alert-location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 8px;
}

.location-icon {
  font-size: 1.1em;
}

.alert-description {
  color: #555;
  line-height: 1.5;
  font-size: 0.95rem;
}

/* 不同级别的警告样式 */
.alert-item.warning {
  background: linear-gradient(145deg, #fff8e1, #fff3e0);
  border-left-color: #f57c00;
}

.alert-item.warning .alert-type {
  color: #f57c00;
}

.alert-item.warning .pulse-ring {
  background: rgba(245, 124, 0, 0.1);
}

.alert-item.critical {
  background: linear-gradient(145deg, #fbe9e7, #ffebee);
  border-left-color: #d32f2f;
}

.alert-item.critical .pulse-ring {
  background: rgba(211, 47, 47, 0.1);
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .alert-item {
    background: linear-gradient(145deg, #2d1e1e, #1a1212);
    border-left-color: #ef5350;
  }

  .alert-type {
    color: #ef5350;
  }

  .alert-time,
  .alert-location {
    color: #bbb;
  }

  .alert-description {
    color: #ddd;
  }

  .alert-item.warning {
    background: linear-gradient(145deg, #2d2417, #1a1612);
    border-left-color: #ffb74d;
  }

  .alert-item.warning .alert-type {
    color: #ffb74d;
  }

  .alert-item.critical {
    background: linear-gradient(145deg, #2d1e1e, #1a1212);
    border-left-color: #ef5350;
  }
}

/* 响应式设计补充 */
@media (max-width: 768px) {
  .alert-item {
    flex-direction: row;
    padding: 12px;
  }

  .alert-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .alert-time {
    font-size: 0.85rem;
  }
}

/* 历史记录按钮样式 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.history-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #f5f5f5;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.history-btn:hover {
  background: #e0e0e0;
  transform: translateY(-2px);
}

.history-btn .icon {
  font-size: 1.2em;
}

/* 弹窗动画和样式优化 */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.history-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 24px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: transparent;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 4px;
}

.modal-header {
  position: sticky;
  top: 0;
  background: inherit;
  padding: 16px 0;
  margin: -16px 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px;
  color: #666;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: rotate(90deg);
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .modal-content {
    background: #1a1a1a;
  }

  .modal-content::-webkit-scrollbar-thumb {
    background: #444;
  }

  .close-btn:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}

/* 响应式设计补充 */
@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    padding: 16px;
    margin: 16px;
  }

  .modal-header {
    padding: 12px 0;
    margin: -12px 0 12px;
  }

  .close-btn {
    font-size: 1.2rem;
    width: 32px;
    height: 32px;
  }
}

/* 时间线样式 */
.history-timeline {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.timeline-item {
  position: relative;
  padding-left: 24px;
  border-left: 2px solid #e0e0e0;
}

.timeline-date {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 16px;
}

.timeline-content {
  margin-bottom: 16px;
  position: relative;
}

.time-point {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.time-point::before {
  content: '';
  position: absolute;
  left: -31px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #4CAF50;
  border: 3px solid white;
  box-shadow: 0 0 0 2px #4CAF50;
}

.data-point {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 8px;
  margin-left: 8px;
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .timeline-item {
    border-left-color: #444;
  }

  .timeline-date {
    color: #fff;
  }

  .time-point {
    color: #bbb;
  }

  .data-point {
    background: #2d2d2d;
    color: #fff;
  }

  .time-point::before {
    border-color: #1a1a1a;
  }
}

/* 响应式设计补充 */
@media (max-width: 768px) {
  .timeline-item {
    padding-left: 16px;
  }

  .time-point::before {
    left: -23px;
    width: 12px;
    height: 12px;
  }
}
</style> 