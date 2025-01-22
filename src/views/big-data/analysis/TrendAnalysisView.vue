<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import BackButton from '@/components/common/BackButton.vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// 使用静态日期
const dateLabels = [
  '3月1日', '3月2日', '3月3日', '3月4日', '3月5日', 
  '3月6日', '3月7日', '3月8日', '3月9日', '3月10日',
  '3月11日', '3月12日', '3月13日', '3月14日', '3月15日',
  '3月16日', '3月17日', '3月18日', '3月19日', '3月20日',
  '3月21日', '3月22日', '3月23日', '3月24日', '3月25日',
  '3月26日', '3月27日', '3月28日', '3月29日', '3月30日'
];

// 生长趋势数据
const growthTrendData = ref({
  height: {
    labels: dateLabels,
    datasets: [
      {
        label: '实际株高(cm)',
        data: [45, 46.2, 47.5, 48.8, 50.1, 51.3, 52.6, 53.9, 55.2, 56.4, 57.7, 59, 60.3, 61.5, 62.8],
        borderColor: '#409EFF',
        tension: 0.4
      },
      {
        label: '预测株高(cm)',
        data: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, 62.8,
               64.1, 65.4, 66.7, 67.9, 69.2, 70.5, 71.8, 73, 74.3, 75.6, 76.9, 78.1, 79.4, 80.7, 82],
        borderColor: '#67C23A',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  },
  stemDiameter: {
    labels: dateLabels,
    datasets: [
      {
        label: '实际茎粗(cm)',
        data: [1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6],
        borderColor: '#E6A23C',
        tension: 0.4
      },
      {
        label: '预测茎粗(cm)',
        data: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2.6,
               2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1],
        borderColor: '#F56C6C',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  },
  leafArea: {
    labels: dateLabels,
    datasets: [
      {
        label: '实际叶面积(cm²)',
        data: [120, 128, 135, 143, 150, 158, 165, 173, 180, 188, 195, 203, 210, 218, 225],
        borderColor: '#67C23A',
        tension: 0.4
      },
      {
        label: '预测叶面积(cm²)',
        data: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, 225,
               233, 240, 248, 255, 263, 270, 278, 285, 293, 300, 308, 315, 323, 330, 338],
        borderColor: '#409EFF',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  },
  leafCount: {
    labels: dateLabels,
    datasets: [
      {
        label: '实际叶片数(片)',
        data: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
        borderColor: '#F56C6C',
        tension: 0.4
      },
      {
        label: '预测叶片数(片)',
        data: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, 22,
               23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
        borderColor: '#E6A23C',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  },
  flowerDensity: {
    labels: dateLabels,
    datasets: [
      {
        label: '实际开花密度(朵/株)',
        data: [0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
        borderColor: '#909399',
        tension: 0.4
      },
      {
        label: '预测开花密度(朵/株)',
        data: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, 6,
               7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14],
        borderColor: '#606266',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  }
});

// 产量预测数据
const yieldPredictionData = ref({
  labels: dateLabels,
  datasets: [
    {
      label: '历史产量(kg)',
      data: [100, 108, 115, 123, 130, 138, 145, 153, 160, 168, 175, 183, 190, 198, 205],
      borderColor: '#E6A23C',
      tension: 0.4
    },
    {
      label: '预测产量(kg)',
      data: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, 205,
             213, 220, 228, 235, 243, 250, 258, 265, 273, 280, 288, 295, 303, 310, 318],
      borderColor: '#F56C6C',
      borderDash: [5, 5],
      tension: 0.4
    }
  ]
});

// 环境预测数据
const environmentPredictionData = ref({
  temperature: {
    labels: dateLabels,
    datasets: [
      {
        label: '实际温度(°C)',
        data: [25, 25.5, 24.8, 25.2, 25.8, 24.9, 25.3, 25.7, 24.6, 25.1, 25.6, 24.7, 25.2, 25.9, 25.4],
        borderColor: '#409EFF',
        tension: 0.4
      },
      {
        label: '预测温度(°C)',
        data: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, 25.4,
               25.8, 25.2, 25.6, 25.9, 25.3, 25.7, 26.1, 25.4, 25.8, 26.2, 25.5, 25.9, 26.3, 25.6, 26],
        borderColor: '#67C23A',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  },
  humidity: {
    labels: dateLabels,
    datasets: [
      {
        label: '实际湿度(%)',
        data: [65, 63, 66, 64, 62, 65, 63, 61, 64, 62, 60, 63, 61, 59, 62],
        borderColor: '#E6A23C',
        tension: 0.4
      },
      {
        label: '预测湿度(%)',
        data: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, 62,
               60, 63, 61, 59, 62, 60, 58, 61, 59, 57, 60, 58, 56, 59, 57],
        borderColor: '#F56C6C',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  }
});

// 添加土壤养分数据
const soilNutrientData = ref({
  nitrogen: {
    labels: dateLabels,
    datasets: [
      {
        label: '氮含量(mg/kg)',
        data: [180, 178, 175, 172, 170, 168, 165, 163, 160, 158, 155, 153, 150, 148, 145],
        borderColor: '#409EFF',
        tension: 0.4
      },
      {
        label: '预测氮含量(mg/kg)',
        data: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, 145,
               143, 140, 138, 135, 133, 130, 128, 125, 123, 120, 118, 115, 113, 110, 108],
        borderColor: '#67C23A',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  },
  phosphorus: {
    labels: dateLabels,
    datasets: [
      {
        label: '磷含量(mg/kg)',
        data: [45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31],
        borderColor: '#E6A23C',
        tension: 0.4
      },
      {
        label: '预测磷含量(mg/kg)',
        data: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, 31,
               30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16],
        borderColor: '#F56C6C',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  },
  potassium: {
    labels: dateLabels,
    datasets: [
      {
        label: '钾含量(mg/kg)',
        data: [220, 218, 215, 213, 210, 208, 205, 203, 200, 198, 195, 193, 190, 188, 185],
        borderColor: '#909399',
        tension: 0.4
      },
      {
        label: '预测钾含量(mg/kg)',
        data: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, 185,
               183, 180, 178, 175, 173, 170, 168, 165, 163, 160, 158, 155, 153, 150, 148],
        borderColor: '#606266',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  },
  ph: {
    labels: dateLabels,
    datasets: [
      {
        label: 'pH值',
        data: [6.5, 6.48, 6.45, 6.43, 6.4, 6.38, 6.35, 6.33, 6.3, 6.28, 6.25, 6.23, 6.2, 6.18, 6.15],
        borderColor: '#67C23A',
        tension: 0.4
      },
      {
        label: '预测pH值',
        data: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, 6.15,
               6.13, 6.1, 6.08, 6.05, 6.03, 6.0, 5.98, 5.95, 5.93, 5.9, 5.88, 5.85, 5.83, 5.8, 5.78],
        borderColor: '#409EFF',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  }
});

// 图表配置
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

// 预警信息
const warnings = ref([
  {
    type: '温度预警',
    message: '预计明天14:00-16:00温室A-1温度将超过32°C，建议：1. 开启遮阳系统 2. 调节通风设备',
    level: 'warning',
    time: '2024-03-22 10:00'
  },
  {
    type: '湿度预警',
    message: '预计今晚温室B-2湿度将降至45%以下，建议：1. 开启喷淋系统 2. 调节通风降温',
    level: 'warning',
    time: '2024-03-22 16:00'
  },
  {
    type: '生长异常',
    message: 'A-1温室3号区域植株生长速度低于预期20%，建议：1. 检查营养液浓度 2. 调整光照时间',
    level: 'error',
    time: '2024-03-22 09:30'
  }
]);

// 分析结果
const analysisResults = ref({
  growth: {
    height: {
      prediction: '预计15天后平均株高将达到82cm，生长速度符合标准范围。',
      trend: '生长曲线呈稳定上升趋势，日均生长速度1.2cm，波动范围±0.3cm。'
    },
    stemDiameter: {
      prediction: '预计茎粗将达到4.1cm，增长速度稳定。',
      trend: '茎粗增长趋势良好，植株支撑能力逐渐增强。'
    },
    leafArea: {
      prediction: '叶面积预计达到338cm²，光合作用效率提升。',
      trend: '叶面积扩张速度适中，有利于果实生长。'
    },
    leafCount: {
      prediction: '预计叶片数将增至37片，覆盖度理想。',
      trend: '叶片发育正常，营养生长良好。'
    },
    flowerDensity: {
      prediction: '开花密度预计达到14朵/株，坐果率预期良好。',
      trend: '开花进程符合生长期望，花芽分化正常。'
    },
    suggestion: '建议：1. 继续保持现有水肥管理方案 2. 适当增加钾肥比例 3. 注意控制温室温度在适宜范围'
  },
  yield: {
    prediction: '本季度预计总产量将达到3850kg，较上季度增长12.3%。',
    trend: '单株产量稳定增长，预计平均单株产量2.8kg。',
    suggestion: '建议：1. 适当增加钾肥施用量 2. 加强病虫害防治 3. 优化采收时间安排'
  },
  environment: {
    temperature: '温度变化趋势基本稳定，但午后温度偏高。',
    humidity: '湿度波动较大，夜间湿度偏低。',
    suggestion: '建议：1. 调整通风时段 2. 增加夜间加湿频次 3. 完善遮阳系统控制策略'
  },
  soil: {
    nitrogen: {
      prediction: '氮含量预计将降至108mg/kg，需要及时补充。',
      trend: '氮素消耗速度较快，已接近警戒值。'
    },
    phosphorus: {
      prediction: '磷含量预计降至16mg/kg，低于适宜范围。',
      trend: '磷素利用率较高，需要适时补充。'
    },
    potassium: {
      prediction: '钾含量预计降至148mg/kg，仍在适宜范围内。',
      trend: '钾素消耗平稳，维持在合理水平。'
    },
    ph: {
      prediction: 'pH值预计降至5.78，偏酸性。',
      trend: 'pH值呈缓慢下降趋势，需要调节。'
    },
    suggestion: '建议：1. 增施含氮肥料 2. 补充磷肥 3. 使用石灰调节pH值 4. 定期进行土壤检测'
  }
});

// 添加当前选中的温室
const currentGreenhouse = ref('A-1');

// 温室选项
const greenhouseOptions = [
  { value: 'A-1', label: 'A-1温室', status: '正常' },
  { value: 'A-2', label: 'A-2温室', status: '正常' },
  { value: 'B-1', label: 'B-1温室', status: '警告' },
  { value: 'B-2', label: 'B-2温室', status: '正常' }
];

// 温室统计数据
const greenhouseStats = computed(() => {
  const stats = {
    'A-1': {
      totalArea: '1000㎡',
      totalPlants: '2000株',
      avgGrowth: '1.3cm/天',
      healthStatus: '96%'
    },
    'A-2': {
      totalArea: '1000㎡',
      totalPlants: '2000株',
      avgGrowth: '1.2cm/天',
      healthStatus: '97%'
    },
    'B-1': {
      totalArea: '1200㎡',
      totalPlants: '2400株',
      avgGrowth: '1.1cm/天',
      healthStatus: '92%'
    },
    'B-2': {
      totalArea: '1200㎡',
      totalPlants: '2400株',
      avgGrowth: '1.2cm/天',
      healthStatus: '95%'
    }
  };

  return stats[currentGreenhouse.value];
});

// 生成温室特定的数据
const getGreenhouseData = (baseData: any, multiplier: number) => {
  if (!baseData?.labels) return baseData;
  
  return {
    labels: baseData.labels,
    datasets: baseData.datasets.map((dataset: any) => ({
      ...dataset,
      data: dataset.data.map((value: number | null) => 
        value === null ? null : Number((value * multiplier).toFixed(2)))
    }))
  };
};

// 根据温室过滤的生长数据
const filteredGrowthData = computed(() => {
  const multipliers = {
    'A-1': 1.05,
    'A-2': 1.02,
    'B-1': 0.95,
    'B-2': 1.01
  };

  const multiplier = multipliers[currentGreenhouse.value as keyof typeof multipliers];

  return {
    height: getGreenhouseData(growthTrendData.value.height, multiplier),
    stemDiameter: getGreenhouseData(growthTrendData.value.stemDiameter, multiplier),
    leafArea: getGreenhouseData(growthTrendData.value.leafArea, multiplier),
    leafCount: getGreenhouseData(growthTrendData.value.leafCount, multiplier),
    flowerDensity: getGreenhouseData(growthTrendData.value.flowerDensity, multiplier)
  };
});

// 过滤产量数据
const filteredYieldData = computed(() => {
  const multipliers = {
    'A-1': 1.08,
    'A-2': 1.03,
    'B-1': 0.92,
    'B-2': 0.98
  };

  const multiplier = multipliers[currentGreenhouse.value as keyof typeof multipliers];
  return getGreenhouseData(yieldPredictionData.value, multiplier);
});

// 过滤环境数据
const filteredEnvironmentData = computed(() => {
  const variations = {
    'A-1': { temp: 1.5, humid: -3 },
    'A-2': { temp: 0.8, humid: 2 },
    'B-1': { temp: 2, humid: -5 },
    'B-2': { temp: -0.5, humid: 4 }
  };

  const variation = variations[currentGreenhouse.value as keyof typeof variations];

  return {
    temperature: {
      ...environmentPredictionData.value.temperature,
      datasets: environmentPredictionData.value.temperature.datasets.map(dataset => ({
        ...dataset,
        data: dataset.data.map(value => 
          value === null ? null : Number((value + variation.temp).toFixed(1)))
      }))
    },
    humidity: {
      ...environmentPredictionData.value.humidity,
      datasets: environmentPredictionData.value.humidity.datasets.map(dataset => ({
        ...dataset,
        data: dataset.data.map(value => 
          value === null ? null : Number((value + variation.humid).toFixed(1)))
      }))
    }
  };
});

// 过滤土壤养分数据
const filteredSoilData = computed(() => {
  const variations = {
    'A-1': { n: 10, p: 3, k: 15, ph: 0.2 },
    'A-2': { n: 5, p: -2, k: 8, ph: 0.1 },
    'B-1': { n: -8, p: -5, k: -12, ph: -0.3 },
    'B-2': { n: 3, p: 2, k: 5, ph: 0.15 }
  };

  const variation = variations[currentGreenhouse.value as keyof typeof variations];

  return {
    nitrogen: getGreenhouseDataWithVariation(soilNutrientData.value.nitrogen, variation.n),
    phosphorus: getGreenhouseDataWithVariation(soilNutrientData.value.phosphorus, variation.p),
    potassium: getGreenhouseDataWithVariation(soilNutrientData.value.potassium, variation.k),
    ph: getGreenhouseDataWithVariation(soilNutrientData.value.ph, variation.ph)
  };
});

// 辅助函数：带偏移量的数据处理
const getGreenhouseDataWithVariation = (baseData: any, variation: number) => {
  return {
    labels: baseData.labels,
    datasets: baseData.datasets.map((dataset: any) => ({
      ...dataset,
      data: dataset.data.map((value: number | null) => 
        value === null ? null : Number((value + variation).toFixed(2)))
    }))
  };
};

// 切换温室
const handleGreenhouseChange = (value: string) => {
  currentGreenhouse.value = value;
};

onMounted(() => {
  // 不需要生成数据了，因为使用静态数据
});
</script>

<template>
  <div class="trend-analysis">
    <BackButton />
    <h2>趋势分析</h2>

    <!-- 温室选择器 -->
    <div class="greenhouse-selector">
      <el-radio-group v-model="currentGreenhouse" @change="handleGreenhouseChange">
        <el-radio-button v-for="gh in greenhouseOptions" :key="gh.value" :label="gh.value">
          {{ gh.label }}
          <el-tag
            :type="gh.status === '正常' ? 'success' : 'warning'"
            size="small"
            class="status-tag"
          >
            {{ gh.status }}
          </el-tag>
        </el-radio-button>
      </el-radio-group>
    </div>

    <!-- 温室概况 -->
    <div class="greenhouse-overview">
      <div class="stat-card">
        <div class="stat-icon">🏗️</div>
        <div class="stat-content">
          <div class="stat-label">总面积</div>
          <div class="stat-value">{{ greenhouseStats.totalArea }}</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🌱</div>
        <div class="stat-content">
          <div class="stat-label">种植总数</div>
          <div class="stat-value">{{ greenhouseStats.totalPlants }}</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📈</div>
        <div class="stat-content">
          <div class="stat-label">平均生长速度</div>
          <div class="stat-value">{{ greenhouseStats.avgGrowth }}</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">💪</div>
        <div class="stat-content">
          <div class="stat-label">健康率</div>
          <div class="stat-value">{{ greenhouseStats.healthStatus }}</div>
        </div>
      </div>
    </div>

    <!-- 生长趋势预测 -->
    <div class="analysis-card">
      <h3>生长趋势预测</h3>
      <el-tabs>
        <el-tab-pane label="株高">
          <div class="chart-container">
            <Line :data="filteredGrowthData.height" :options="chartOptions" />
          </div>
          <div class="analysis-info">
            <p><strong>预测结果：</strong>{{ analysisResults.growth.height.prediction }}</p>
            <p><strong>趋势分析：</strong>{{ analysisResults.growth.height.trend }}</p>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="茎粗">
          <div class="chart-container">
            <Line :data="filteredGrowthData.stemDiameter" :options="chartOptions" />
          </div>
          <div class="analysis-info">
            <p><strong>预测结果：</strong>{{ analysisResults.growth.stemDiameter.prediction }}</p>
            <p><strong>趋势分析：</strong>{{ analysisResults.growth.stemDiameter.trend }}</p>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="叶面积">
          <div class="chart-container">
            <Line :data="filteredGrowthData.leafArea" :options="chartOptions" />
          </div>
          <div class="analysis-info">
            <p><strong>预测结果：</strong>{{ analysisResults.growth.leafArea.prediction }}</p>
            <p><strong>趋势分析：</strong>{{ analysisResults.growth.leafArea.trend }}</p>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="叶片数">
          <div class="chart-container">
            <Line :data="filteredGrowthData.leafCount" :options="chartOptions" />
          </div>
          <div class="analysis-info">
            <p><strong>预测结果：</strong>{{ analysisResults.growth.leafCount.prediction }}</p>
            <p><strong>趋势分析：</strong>{{ analysisResults.growth.leafCount.trend }}</p>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="开花密度">
          <div class="chart-container">
            <Line :data="filteredGrowthData.flowerDensity" :options="chartOptions" />
          </div>
          <div class="analysis-info">
            <p><strong>预测结果：</strong>{{ analysisResults.growth.flowerDensity.prediction }}</p>
            <p><strong>趋势分析：</strong>{{ analysisResults.growth.flowerDensity.trend }}</p>
          </div>
        </el-tab-pane>
      </el-tabs>
      
      <div class="analysis-info">
        <p><strong>综合建议：</strong>{{ analysisResults.growth.suggestion }}</p>
      </div>
    </div>

    <!-- 产量预测 -->
    <div class="analysis-card">
      <h3>产量预测</h3>
      <div class="chart-container">
        <Line :data="filteredYieldData" :options="chartOptions" />
      </div>
      <div class="analysis-info">
        <p><strong>预测结果：</strong>{{ analysisResults.yield.prediction }}</p>
        <p><strong>趋势分析：</strong>{{ analysisResults.yield.trend }}</p>
        <p><strong>建议措施：</strong>{{ analysisResults.yield.suggestion }}</p>
      </div>
    </div>

    <!-- 环境预测与告警 -->
    <div class="analysis-card">
      <h3>环境预测与告警</h3>
      <div class="chart-container">
        <Line :data="filteredEnvironmentData.temperature" :options="chartOptions" />
      </div>
      <div class="chart-container">
        <Line :data="filteredEnvironmentData.humidity" :options="chartOptions" />
      </div>
      <div class="warnings">
        <h4>预警信息</h4>
        <el-timeline>
          <el-timeline-item
            v-for="warning in warnings"
            :key="warning.time"
            :type="warning.level"
            :timestamp="warning.time"
          >
            <h5>{{ warning.type }}</h5>
            <p>{{ warning.message }}</p>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>

    <!-- 添加土壤养分监控与分析 -->
    <div class="analysis-card">
      <h3>土壤养分监控与分析</h3>
      <el-tabs>
        <el-tab-pane label="氮素">
          <div class="chart-container">
            <Line :data="filteredSoilData.nitrogen" :options="chartOptions" />
          </div>
          <div class="analysis-info">
            <p><strong>预测结果：</strong>{{ analysisResults.soil.nitrogen.prediction }}</p>
            <p><strong>趋势分析：</strong>{{ analysisResults.soil.nitrogen.trend }}</p>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="磷素">
          <div class="chart-container">
            <Line :data="filteredSoilData.phosphorus" :options="chartOptions" />
          </div>
          <div class="analysis-info">
            <p><strong>预测结果：</strong>{{ analysisResults.soil.phosphorus.prediction }}</p>
            <p><strong>趋势分析：</strong>{{ analysisResults.soil.phosphorus.trend }}</p>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="钾素">
          <div class="chart-container">
            <Line :data="filteredSoilData.potassium" :options="chartOptions" />
          </div>
          <div class="analysis-info">
            <p><strong>预测结果：</strong>{{ analysisResults.soil.potassium.prediction }}</p>
            <p><strong>趋势分析：</strong>{{ analysisResults.soil.potassium.trend }}</p>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="pH值">
          <div class="chart-container">
            <Line :data="filteredSoilData.ph" :options="chartOptions" />
          </div>
          <div class="analysis-info">
            <p><strong>预测结果：</strong>{{ analysisResults.soil.ph.prediction }}</p>
            <p><strong>趋势分析：</strong>{{ analysisResults.soil.ph.trend }}</p>
          </div>
        </el-tab-pane>
      </el-tabs>
      
      <div class="analysis-info">
        <p><strong>综合建议：</strong>{{ analysisResults.soil.suggestion }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.trend-analysis {
  padding: 20px;
}

.analysis-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.chart-container {
  height: 300px;
  margin: 20px 0;
}

.analysis-info {
  margin-top: 16px;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 4px;
  border-left: 4px solid #409EFF;
}

.analysis-info p {
  margin: 8px 0;
  color: #666;
  line-height: 1.6;
}

.analysis-info strong {
  color: #303133;
  font-weight: 600;
}

.warnings {
  margin-top: 20px;
}

.warnings h4 {
  margin-bottom: 16px;
}

:deep(.el-timeline-item__node--warning) {
  background-color: var(--el-color-warning);
}

:deep(.el-timeline-item__content h5) {
  margin: 0;
  color: var(--el-color-warning);
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .analysis-card {
    background: #1a1a1a;
  }

  .analysis-info {
    background: #2c2c2c;
    border-left-color: #409EFF;
  }

  .analysis-info p {
    color: #bbb;
  }

  .analysis-info strong {
    color: #fff;
  }
}

/* 添加标签页样式 */
:deep(.el-tabs__nav) {
  margin-bottom: 20px;
}

:deep(.el-tabs__item) {
  font-size: 16px;
  padding: 0 20px;
}

:deep(.el-tabs__item.is-active) {
  color: var(--el-color-primary);
}

/* 添加土壤养分卡片特殊样式 */
.analysis-card:last-child .analysis-info {
  border-left-color: #67C23A;
}

/* 优化标签页样式 */
:deep(.el-tabs__nav-wrap::after) {
  height: 1px;
  background-color: var(--el-border-color-light);
}

:deep(.el-tabs__active-bar) {
  height: 3px;
  border-radius: 3px;
}

/* 温室选择器样式 */
.greenhouse-selector {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.status-tag {
  margin-left: 8px;
}

.greenhouse-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-icon {
  font-size: 2rem;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--el-color-primary-light-9);
  border-radius: 8px;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 20px;
  font-weight: 600;
  color: var(--el-color-primary);
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .stat-card {
    background: #1a1a1a;
  }

  .stat-label {
    color: #bbb;
  }

  .stat-icon {
    background: var(--el-color-primary-dark-2);
  }
}

/* 响应式布局优化 */
@media (max-width: 768px) {
  .greenhouse-overview {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .greenhouse-overview {
    grid-template-columns: 1fr;
  }
  
  .greenhouse-selector {
    overflow-x: auto;
    padding-bottom: 10px;
  }
}
</style> 