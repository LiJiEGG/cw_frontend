<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import BackButton from '@/components/common/BackButton.vue';
import request from '@/utils/request';
import { ElMessage } from 'element-plus';
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
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

// 生长趋势数据
const growthTrendData = ref({
  height: {
    labels: [],
    datasets: [
      {
        label: '实际株高(cm)',
        data: [],
        borderColor: '#409EFF',
        tension: 0.4
      },
      {
        label: '预测株高(cm)',
        data: [],
        borderColor: '#67C23A',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  },
  stemDiameter: {
    labels: [],
    datasets: [
      {
        label: '实际茎粗(cm)',
        data: [],
        borderColor: '#E6A23C',
        tension: 0.4
      },
      {
        label: '预测茎粗(cm)',
        data: [],
        borderColor: '#F56C6C',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  },
  leafArea: {
    labels: [],
    datasets: [
      {
        label: '实际叶面积(cm²)',
        data: [],
        borderColor: '#67C23A',
        tension: 0.4
      },
      {
        label: '预测叶面积(cm²)',
        data: [],
        borderColor: '#409EFF',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  },
  leafCount: {
    labels: [],
    datasets: [
      {
        label: '实际叶片数(片)',
        data: [],
        borderColor: '#F56C6C',
        tension: 0.4
      },
      {
        label: '预测叶片数(片)',
        data: [],
        borderColor: '#E6A23C',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  },
  flowerDensity: {
    labels: [],
    datasets: [
      {
        label: '实际开花密度(朵/株)',
        data: [],
        borderColor: '#909399',
        tension: 0.4
      },
      {
        label: '预测开花密度(朵/株)',
        data: [],
        borderColor: '#606266',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  }
});

// 产量预测数据
const yieldData = ref({
  labels: [],
  datasets: [
    {
      label: '实际产量(kg)',
      data: [],
      borderColor: '#409EFF',
      tension: 0.4
    },
    {
      label: '预测产量(kg)',
      data: [],
      borderColor: '#67C23A',
      borderDash: [5, 5],
      tension: 0.4
    }
  ]
});

// 环境预测数据类型定义
interface EnvironmentPrediction {
  record_date: string;
  daytime_temperature: number | null;
  night_temperature: number | null;
  predicted_night_temp: number | null;
  daytime_humidity: number | null;
  night_humidity: number | null;
  predicted_night_humidity: number | null;
  alert_level: string;
  alert_message: string | null;
}

// 环境预测数据
const environmentData = ref({
  temperature: {
    labels: [],
    datasets: [
      {
        label: '白天温度(°C)',
        data: [],
        borderColor: '#E6A23C',
        tension: 0.4
      },
      {
        label: '夜间温度(°C)',
        data: [],
        borderColor: '#409EFF',
        tension: 0.4
      },
      {
        label: '预测夜温(°C)',
        data: [],
        borderColor: '#67C23A',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  },
  humidity: {
    labels: [],
    datasets: [
      {
        label: '白天湿度(%)',
        data: [],
        borderColor: '#E6A23C',
        tension: 0.4
      },
      {
        label: '夜间湿度(%)',
        data: [],
        borderColor: '#409EFF',
        tension: 0.4
      },
      {
        label: '预测夜湿(%)',
        data: [],
        borderColor: '#67C23A',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  }
});

// 环境预警信息
const environmentWarnings = ref<{
  time: string;
  type: string;
  level: string;
  message: string;
}[]>([]);

// 添加土壤养分数据
const soilNutrientData = ref({
  nitrogen: {
    labels: [],
    datasets: [
      {
        label: '氮含量(mg/kg)',
        data: [],
        borderColor: '#409EFF',
        tension: 0.4
      },
      {
        label: '预测氮含量(mg/kg)',
        data: [],
        borderColor: '#67C23A',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  },
  phosphorus: {
    labels: [],
    datasets: [
      {
        label: '磷含量(mg/kg)',
        data: [],
        borderColor: '#E6A23C',
        tension: 0.4
      },
      {
        label: '预测磷含量(mg/kg)',
        data: [],
        borderColor: '#F56C6C',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  },
  potassium: {
    labels: [],
    datasets: [
      {
        label: '钾含量(mg/kg)',
        data: [],
        borderColor: '#909399',
        tension: 0.4
      },
      {
        label: '预测钾含量(mg/kg)',
        data: [],
        borderColor: '#606266',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  },
  ph: {
    labels: [],
    datasets: [
      {
        label: 'pH值',
        data: [],
        borderColor: '#67C23A',
        tension: 0.4
      },
      {
        label: '预测pH值',
        data: [],
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
      position: 'top' as const,
      display: true
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  },
  elements: {
    point: {
      radius: 3,
      hoverRadius: 5
    },
    line: {
      tension: 0.4
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
      prediction: '暂无预测数据',
      trend: '暂无趋势分析'
    },
    stemDiameter: {
      prediction: '暂无预测数据',
      trend: '暂无趋势分析'
    },
    leafArea: {
      prediction: '暂无预测数据',
      trend: '暂无趋势分析'
    },
    leafCount: {
      prediction: '暂无预测数据',
      trend: '暂无趋势分析'
    },
    flowerDensity: {
      prediction: '暂无预测数据',
      trend: '暂无趋势分析'
    },
    suggestion: '暂无建议'
  },
  yield: {
    prediction: '暂无预测数据',
    trend: '暂无趋势分析',
    suggestion: '暂无建议'
  },
  environment: {
    temperature: '暂无温度趋势分析',
    humidity: '暂无湿度趋势分析',
    suggestion: '暂无建议'
  },
  soil: {
    nitrogen: {
      prediction: '暂无预测数据',
      trend: '暂无趋势分析'
    },
    phosphorus: {
      prediction: '暂无预测数据',
      trend: '暂无趋势分析'
    },
    potassium: {
      prediction: '暂无预测数据',
      trend: '暂无趋势分析'
    },
    ph: {
      prediction: '暂无预测数据',
      trend: '暂无趋势分析'
    },
    suggestion: '暂无建议'
  }
});

// 添加当前选中的温室
const currentGreenhouse = ref('');

// 温室选项
const greenhouseOptions = ref([]);

// 加载温室选项数据
const loadGreenhouseOptions = async () => {
  try {
    const response = await request.get('/api/greenhouse/stats');
    greenhouseOptions.value = response.data.map((gh: any) => ({
      value: gh.id.toString(),
      label: gh.name,
      status: gh.greenhouse.status,
      totalArea: `${gh.greenhouse.size}㎡`,
      totalPlants: gh.currentBatch ? `${gh.currentBatch.plantCount}株` : '0株',
      avgGrowth: gh.currentBatch ? gh.currentBatch.avgGrowthRate : '0cm/天',
      healthStatus: gh.currentBatch ? gh.currentBatch.healthRate : '0%'
    }));
    
    // 默认选中第一个温室并加载其数据
    if (greenhouseOptions.value.length > 0) {
      currentGreenhouse.value = greenhouseOptions.value[0].value;
      await Promise.all([
        loadGrowthTrends(greenhouseOptions.value[0].value),
        loadYieldTrends(greenhouseOptions.value[0].value)
      ]);
    }
  } catch (error) {
    console.error('Failed to load greenhouse options:', error);
    ElMessage.error('加载温室列表失败');
  }
};

// 添加温室统计数据
const greenhouseStats = ref([]);

// 加载温室统计数据
const loadGreenhouseStats = async () => {
  try {
    const response = await request.get('/api/greenhouse/stats');
    greenhouseStats.value = response.data;
  } catch (error) {
    console.error('Failed to load greenhouse stats:', error);
    ElMessage.error('加载温室信息失败');
  }
};

// 获取当前选中温室的统计信息
const currentStats = computed(() => {
  return greenhouseStats.value.find(gh => gh.id.toString() === currentGreenhouse.value);
});

// 获取状态标签类型
const getStatusType = (status: string) => {
  switch (status) {
    case '正常':
      return 'success';
    case '异常':
      return 'danger';
    case '维护中':
      return 'warning';
    case '空闲':
      return 'info';
    default:
      return 'info';
  }
};

// 获取质量等级标签类型
const getQualityType = (rating: string) => {
  switch (rating) {
    case 'A':
      return 'success';
    case 'B':
      return 'warning';
    case 'C':
      return 'danger';
    default:
      return 'info';
  }
};

// 切换温室
const handleGreenhouseChange = async (value: string) => {
  currentGreenhouse.value = value;
  await Promise.all([
    loadGrowthTrends(value),
    loadYieldTrends(value),
    loadEnvironmentData(value)  // 添加环境数据加载
  ]);
};

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
  return getGreenhouseData(yieldData.value, multiplier);
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
      ...environmentData.value.temperature,
      datasets: environmentData.value.temperature.datasets.map(dataset => ({
        ...dataset,
        data: dataset.data.map(value => 
          value === null ? null : Number((value + variation.temp).toFixed(1)))
      }))
    },
    humidity: {
      ...environmentData.value.humidity,
      datasets: environmentData.value.humidity.datasets.map(dataset => ({
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

// 计算总体统计数据
const overallStats = computed(() => {
  if (!greenhouseStats.value || greenhouseStats.value.length === 0) return null;
  
  // 计算总面积
  const totalArea = greenhouseStats.value
    .reduce((sum, gh) => sum + (gh.greenhouse?.size || 0), 0)
    .toFixed(1) + '㎡';

  // 计算种植总数
  const totalPlants = greenhouseStats.value
    .reduce((sum, gh) => sum + (gh.currentBatch?.plantCount || 0), 0) + '株';

  // 计算平均生长速度
  const activeBatches = greenhouseStats.value.filter(gh => gh.currentBatch?.avgGrowthRate);
  const avgGrowth = activeBatches.length > 0
    ? (activeBatches.reduce((sum, gh) => sum + parseFloat(gh.currentBatch.avgGrowthRate), 0) / activeBatches.length).toFixed(1) + 'cm/天'
    : '0cm/天';

  // 计算平均健康率
  const healthyBatches = greenhouseStats.value.filter(gh => gh.currentBatch?.healthRate);
  const avgHealth = healthyBatches.length > 0
    ? (healthyBatches.reduce((sum, gh) => sum + parseFloat(gh.currentBatch.healthRate), 0) / healthyBatches.length).toFixed(1) + '%'
    : '0%';

  return {
    totalArea,
    totalPlants,
    avgGrowth,
    avgHealth
  };
});

// 安全的数据映射函数，添加缺失值补全功能
const safeMapData = (data: any[] | undefined) => {
  if (!Array.isArray(data) || data.length === 0) {
    return new Array(30).fill(null);
  }

  // 补全缺失值函数
  const fillMissingValues = (arr: (number | null)[]) => {
    const result = [...arr];
    
    // 处理开头的null值
    let firstValidIndex = result.findIndex(val => val !== null);
    if (firstValidIndex > 0) {
      const firstValidValue = result[firstValidIndex];
      for (let i = 0; i < firstValidIndex; i++) {
        result[i] = firstValidValue;
      }
    }

    // 处理中间和结尾的null值
    for (let i = 1; i < result.length; i++) {
      if (result[i] === null) {
        // 寻找前一个有效值
        let prevValue = null;
        for (let j = i - 1; j >= 0; j--) {
          if (result[j] !== null) {
            prevValue = result[j];
            break;
          }
        }
        
        // 寻找后一个有效值
        let nextValue = null;
        for (let j = i + 1; j < result.length; j++) {
          if (result[j] !== null) {
            nextValue = result[j];
            break;
          }
        }

        // 补全缺失值
        if (prevValue !== null && nextValue !== null) {
          // 如果前后都有值，取平均值
          result[i] = Number(((prevValue + nextValue) / 2).toFixed(1));
        } else if (prevValue !== null) {
          // 如果只有前值，使用前值
          result[i] = prevValue;
        } else if (nextValue !== null) {
          // 如果只有后值，使用后值
          result[i] = nextValue;
        }
      }
    }

    return result;
  };

  // 处理数据并补全缺失值
  const processedData = data.map(val => 
    val === null ? null : Number(Number(val).toFixed(1))
  );
  
  return fillMissingValues(processedData);
};

// 生长趋势数据加载方法
const loadGrowthTrends = async (greenhouseId: string) => {
  try {
    const response = await request.get(`/api/greenhouse/growth-trends/${greenhouseId}`);

    const { dateLabels, actualData, predictedData, analysis } = response.data;

    // 确保数据存在且格式正确
    if (!actualData || !predictedData) {
      throw new Error('数据格式错误');
    }

    // 确保数据格式正确
    const formattedData = {
      height: {
        labels: dateLabels || [],
        datasets: [
          {
            label: '实际株高(cm)',
            data: safeMapData(actualData.height),
            borderColor: '#409EFF',
            tension: 0.4,
            fill: false
          },
          {
            label: '预测株高(cm)',
            data: safeMapData(predictedData.height),
            borderColor: '#67C23A',
            borderDash: [5, 5],
            tension: 0.4,
            fill: false
          }
        ]
      },
      stemDiameter: {
        labels: dateLabels || [],
        datasets: [
          {
            label: '实际茎粗(mm)',
            data: safeMapData(actualData.stemDiameter),
            borderColor: '#E6A23C',
            tension: 0.4
          },
          {
            label: '预测茎粗(mm)',
            data: safeMapData(predictedData.stemDiameter),
            borderColor: '#F56C6C',
            borderDash: [5, 5],
            tension: 0.4
          }
        ]
      },
      leafArea: {
        labels: dateLabels || [],
        datasets: [
          {
            label: '实际叶面积(cm²)',
            data: safeMapData(actualData.leafArea),
            borderColor: '#67C23A',
            tension: 0.4
          },
          {
            label: '预测叶面积(cm²)',
            data: safeMapData(predictedData.leafArea),
            borderColor: '#409EFF',
            borderDash: [5, 5],
            tension: 0.4
          }
        ]
      },
      leafCount: {
        labels: dateLabels || [],
        datasets: [
          {
            label: '实际叶片数(片)',
            data: safeMapData(actualData.leafCount),
            borderColor: '#F56C6C',
            tension: 0.4
          },
          {
            label: '预测叶片数(片)',
            data: safeMapData(predictedData.leafCount),
            borderColor: '#E6A23C',
            borderDash: [5, 5],
            tension: 0.4
          }
        ]
      }
    };

    // 更新图表数据
    growthTrendData.value = formattedData;

    // 更新分析结果
    analysisResults.value = {
      growth: {
        height: {
          prediction: analysis?.growth?.height?.prediction || '暂无预测数据',
          trend: analysis?.growth?.height?.trend || '暂无趋势分析'
        },
        stemDiameter: {
          prediction: analysis?.growth?.stemDiameter?.prediction || '暂无预测数据',
          trend: analysis?.growth?.stemDiameter?.trend || '暂无趋势分析'
        },
        leafArea: {
          prediction: analysis?.growth?.leafArea?.prediction || '暂无预测数据',
          trend: analysis?.growth?.leafArea?.trend || '暂无趋势分析'
        },
        leafCount: {
          prediction: analysis?.growth?.leafCount?.prediction || '暂无预测数据',
          trend: analysis?.growth?.leafCount?.trend || '暂无趋势分析'
        },
        suggestion: analysis?.growth?.suggestion || '暂无建议'
      }
    };

  } catch (error) {
    console.error('加载生长趋势数据失败:', error);
    ElMessage.error('加载生长趋势数据失败');
    
    // 出错时显示空数据提示
    growthTrendData.value = {
      height: { labels: [], datasets: [] },
      stemDiameter: { labels: [], datasets: [] },
      leafArea: { labels: [], datasets: [] },
      leafCount: { labels: [], datasets: [] }
    };
    
    analysisResults.value = {
      growth: {
        height: { prediction: '暂无数据', trend: '暂无数据' },
        stemDiameter: { prediction: '暂无数据', trend: '暂无数据' },
        leafArea: { prediction: '暂无数据', trend: '暂无数据' },
        leafCount: { prediction: '暂无数据', trend: '暂无数据' },
        suggestion: '暂无数据'
      }
    };
  }
};

// 产量分析结果
const yieldAnalysis = ref({
  currentStatus: '未知',
  totalYield: 0,
  predictedTotal: 0,
  completionRate: 0,
  averageQuality: '未知',
  suggestion: '暂无建议'
});

// 加载产量预测数据
const loadYieldTrends = async (greenhouseId: string) => {
  try {
    const response = await request.get(`/api/yield/trends/${greenhouseId}`);
    const data = response.data;

    // 确保数据存在
    if (!data || !data.dateLabels) {
      throw new Error('Invalid data format');
    }

    // 更新图表数据
    yieldData.value = {
      labels: data.dateLabels,
      datasets: [
        {
          label: '实际产量(kg)',
          data: data.actualData.map((val: any) => val === null ? null : Number(val)),
          borderColor: '#409EFF',
          tension: 0.4
        },
        {
          label: '预测产量(kg)',
          data: data.predictedData.map((val: any) => val === null ? null : Number(val)),
          borderColor: '#67C23A',
          borderDash: [5, 5],
          tension: 0.4
        }
      ]
    };

    // 更新分析结果
    yieldAnalysis.value = {
      currentStatus: data.analysis.currentStatus || '未知',
      totalYield: Number(data.analysis.totalYield) || 0,
      predictedTotal: Number(data.analysis.predictedTotal) || 0,
      completionRate: Number(data.analysis.completionRate) || 0,
      averageQuality: data.analysis.averageQuality || '未知',
      suggestion: data.analysis.suggestion || '暂无建议'
    };

  } catch (error) {
    console.error('Failed to load yield trends:', error);
    ElMessage.error('加载产量预测数据失败');
    
    // 出错时重置数据
    yieldData.value = {
      labels: [],
      datasets: [
        {
          label: '实际产量(kg)',
          data: [],
          borderColor: '#409EFF',
          tension: 0.4
        },
        {
          label: '预测产量(kg)',
          data: [],
          borderColor: '#67C23A',
          borderDash: [5, 5],
          tension: 0.4
        }
      ]
    };
  }
};

// 加载环境预测数据
const loadEnvironmentData = async (greenhouseId: string) => {
  try {
    const response = await request.get(`/api/environment/predictions/${greenhouseId}`);
    const data: EnvironmentPrediction[] = response.data;

    // 处理图表数据
    const labels = data.map(item => item.record_date);
    
    // 更新温度图表数据
    environmentData.value.temperature = {
      labels,
      datasets: [
        {
          label: '白天温度(°C)',
          data: data.map(item => item.daytime_temperature),
          borderColor: '#E6A23C',
          tension: 0.4
        },
        {
          label: '夜间温度(°C)',
          data: data.map(item => item.night_temperature),
          borderColor: '#409EFF',
          tension: 0.4
        },
        {
          label: '预测夜温(°C)',
          data: data.map(item => item.predicted_night_temp),
          borderColor: '#67C23A',
          borderDash: [5, 5],
          tension: 0.4
        }
      ]
    };

    // 更新湿度图表数据
    environmentData.value.humidity = {
      labels,
      datasets: [
        {
          label: '白天湿度(%)',
          data: data.map(item => item.daytime_humidity),
          borderColor: '#E6A23C',
          tension: 0.4
        },
        {
          label: '夜间湿度(%)',
          data: data.map(item => item.night_humidity),
          borderColor: '#409EFF',
          tension: 0.4
        },
        {
          label: '预测夜湿(%)',
          data: data.map(item => item.predicted_night_humidity),
          borderColor: '#67C23A',
          borderDash: [5, 5],
          tension: 0.4
        }
      ]
    };

    // 更新预警信息
    environmentWarnings.value = data
      .filter(item => item.alert_level !== '正常' && item.alert_message)
      .map(item => ({
        time: item.record_date,
        type: '环境预警',
        level: getAlertLevel(item.alert_level),
        message: item.alert_message || ''
      }))
      .slice(-5); // 只显示最近5条预警

  } catch (error) {
    console.error('Failed to load environment predictions:', error);
    ElMessage.error('加载环境预测数据失败');
  }
};

// 告警等级转换
const getAlertLevel = (level: string): string => {
  switch (level) {
    case '严重':
      return 'error';
    case '中度':
      return 'warning';
    case '轻微':
      return 'info';
    default:
      return 'info';
  }
};

// 修改初始化函数
const initData = async () => {
  await loadGreenhouseOptions();
  await loadGreenhouseStats();
  if (currentGreenhouse.value) {
    await Promise.all([
      loadGrowthTrends(currentGreenhouse.value),
      loadYieldTrends(currentGreenhouse.value),
      loadEnvironmentData(currentGreenhouse.value)  // 添加环境数据加载
    ]);
  }
};

// 确保onMounted在所有方法定义之后
onMounted(() => {
  initData();
});

// 温度图表配置
const temperatureChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const
    },
    annotation: {
      annotations: {
        dayTempMinLine: {
          type: 'line',
          yMin: 25,
          yMax: 25,
          borderColor: '#E6A23C',
          borderWidth: 1,
          borderDash: [5, 5],
          label: {
            content: '白天最低温度(25°C)',
            enabled: true,
            position: 'left'
          }
        },
        dayTempMaxLine: {
          type: 'line',
          yMin: 32,
          yMax: 32,
          borderColor: '#F56C6C',
          borderWidth: 1,
          borderDash: [5, 5],
          label: {
            content: '白天最高温度(32°C)',
            enabled: true,
            position: 'left'
          }
        },
        nightTempMinLine: {
          type: 'line',
          yMin: 15,
          yMax: 15,
          borderColor: '#409EFF',
          borderWidth: 1,
          borderDash: [5, 5],
          label: {
            content: '夜间最低温度(15°C)',
            enabled: true,
            position: 'left'
          }
        },
        nightTempMaxLine: {
          type: 'line',
          yMin: 18,
          yMax: 18,
          borderColor: '#67C23A',
          borderWidth: 1,
          borderDash: [5, 5],
          label: {
            content: '夜间最高温度(18°C)',
            enabled: true,
            position: 'left'
          }
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: false
    }
  }
};

// 湿度图表配置
const humidityChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const
    },
    annotation: {
      annotations: {
        humidityMinLine: {
          type: 'line',
          yMin: 60,
          yMax: 60,
          borderColor: '#E6A23C',
          borderWidth: 1,
          borderDash: [5, 5],
          label: {
            content: '最低湿度(60%)',
            enabled: true,
            position: 'left'
          }
        },
        humidityMaxLine: {
          type: 'line',
          yMin: 90,
          yMax: 90,
          borderColor: '#F56C6C',
          borderWidth: 1,
          borderDash: [5, 5],
          label: {
            content: '最高湿度(90%)',
            enabled: true,
            position: 'left'
          }
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: false
    }
  }
};
</script>

<template>
  <div class="trend-analysis">
    <BackButton />
    <h2>趋势分析</h2>

        <!-- 温室概况 -->
      <div class="greenhouse-overview" v-if="overallStats">
      <div class="stat-card">
        <div class="stat-icon">🏗️</div>
        <div class="stat-content">
          <div class="stat-label">总面积</div>
          <div class="stat-value">{{ overallStats.totalArea }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">🌱</div>
        <div class="stat-content">
          <div class="stat-label">种植总数</div>
          <div class="stat-value">{{ overallStats.totalPlants }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">📈</div>
        <div class="stat-content">
          <div class="stat-label">平均生长速度</div>
          <div class="stat-value">{{ overallStats.avgGrowth }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">💪</div>
        <div class="stat-content">
          <div class="stat-label">平均健康率</div>
          <div class="stat-value">{{ overallStats.avgHealth }}</div>
        </div>
      </div>
    </div>

    <!-- 温室选择器 -->
    <div class="greenhouse-selector">
      <el-radio-group v-model="currentGreenhouse" @change="handleGreenhouseChange">
        <el-radio-button 
          v-for="gh in greenhouseOptions" 
          :key="gh.value" 
          :label="gh.value"
        >
          {{ gh.label }}
          <el-tag 
            :type="getStatusType(gh.status)"
            size="small" 
            class="status-tag"
          >
            {{ gh.status }}
          </el-tag>
        </el-radio-button>
      </el-radio-group>
    </div>

    <!-- 温室选择器和概况 -->
    <template v-if="currentStats && currentStats.currentBatch">
      <div class="info-section">
        <h3>种植概况</h3>
        <div class="info-cards">
          <div class="info-card">
            <div class="info-icon">🌱</div>
            <div class="info-content">
              <div class="info-label">作物品种</div>
              <div class="info-value">{{ currentStats.currentBatch.cropName }}</div>
              <div class="info-sub">{{ currentStats.currentBatch.variety }}</div>
            </div>
          </div>

          <div class="info-card">
            <div class="info-icon">📈</div>
            <div class="info-content">
              <div class="info-label">生长阶段</div>
              <div class="info-value">{{ currentStats.currentBatch.growthStage }}</div>
              <div class="info-sub">{{ currentStats.currentBatch.daysInStage }}天</div>
            </div>
          </div>

          <div class="info-card">
            <div class="info-icon">🌡️</div>
            <div class="info-content">
              <div class="info-label">生长速度</div>
              <div class="info-value">{{ currentStats.currentBatch.avgGrowthRate }}</div>
            </div>
          </div>

          <div class="info-card">
            <div class="info-icon">💪</div>
            <div class="info-content">
              <div class="info-label">健康状况</div>
              <div class="info-value">{{ currentStats.currentBatch.healthRate }}</div>
            </div>
          </div>
        </div>

        <!-- 管理信息 -->
        <el-collapse class="management-info">
          <el-collapse-item title="管理信息" name="1">
            <el-descriptions :column="2" border>
              <el-descriptions-item label="负责人">
                {{ currentStats.management.manager }}
              </el-descriptions-item>
              <el-descriptions-item label="质量等级">
                <el-tag :type="getQualityType(currentStats.currentBatch.qualityRating)">
                  {{ currentStats.currentBatch.qualityRating }}级
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="施肥方案">
                {{ currentStats.management.fertilizerPlan }}
              </el-descriptions-item>
              <el-descriptions-item label="浇水计划">
                {{ currentStats.management.waterSchedule }}
              </el-descriptions-item>
            </el-descriptions>
          </el-collapse-item>
          
          <el-collapse-item title="预警信息" name="2">
            <div class="warning-info" v-if="currentStats.warnings.pestControl">
              <div class="warning-title">病虫害防治记录：</div>
              <div class="warning-content">{{ currentStats.warnings.pestControl }}</div>
            </div>
            <div class="warning-info" v-if="currentStats.warnings.qualityNotes">
              <div class="warning-title">质量问题：</div>
              <div class="warning-content">{{ currentStats.warnings.qualityNotes }}</div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </template>


    <!-- 生长趋势预测 -->
    <div class="analysis-card">
      <h3>生长趋势预测</h3>
      <el-tabs>
        <el-tab-pane label="株高">
          <div class="chart-container">
            <Line :data="growthTrendData.height" :options="chartOptions" />
          </div>
          <div class="analysis-info">
            <p><strong>预测结果：</strong>{{ analysisResults.growth.height.prediction }}</p>
            <p><strong>趋势分析：</strong>{{ analysisResults.growth.height.trend }}</p>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="茎粗">
          <div class="chart-container">
            <Line :data="growthTrendData.stemDiameter" :options="chartOptions" />
          </div>
          <div class="analysis-info">
            <p><strong>预测结果：</strong>{{ analysisResults.growth.stemDiameter.prediction }}</p>
            <p><strong>趋势分析：</strong>{{ analysisResults.growth.stemDiameter.trend }}</p>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="叶面积">
          <div class="chart-container">
            <Line :data="growthTrendData.leafArea" :options="chartOptions" />
          </div>
          <div class="analysis-info">
            <p><strong>预测结果：</strong>{{ analysisResults.growth.leafArea.prediction }}</p>
            <p><strong>趋势分析：</strong>{{ analysisResults.growth.leafArea.trend }}</p>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="叶片数">
          <div class="chart-container">
            <Line :data="growthTrendData.leafCount" :options="chartOptions" />
          </div>
          <div class="analysis-info">
            <p><strong>预测结果：</strong>{{ analysisResults.growth.leafCount.prediction }}</p>
            <p><strong>趋势分析：</strong>{{ analysisResults.growth.leafCount.trend }}</p>
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
        <Line 
          v-if="yieldData.labels.length > 0"
          :data="yieldData" 
          :options="chartOptions" 
        />
        <div v-else class="no-data">暂无数据</div>
      </div>
      <div class="analysis-results">
        <div class="result-item">
          <span class="label">当前状态：</span>
          <el-tag :type="getStatusType(yieldAnalysis.currentStatus)">
            {{ yieldAnalysis.currentStatus }}
          </el-tag>
        </div>
        <div class="result-item">
          <span class="label">已采收产量：</span>
          <span class="value">{{ yieldAnalysis.totalYield.toFixed(1) }}kg</span>
        </div>
        <div class="result-item">
          <span class="label">预计总产量：</span>
          <span class="value">{{ yieldAnalysis.predictedTotal.toFixed(1) }}kg</span>
        </div>
        <div class="result-item">
          <span class="label">完成进度：</span>
          <el-progress 
            :percentage="yieldAnalysis.completionRate" 
            :status="getProgressStatus(yieldAnalysis.completionRate)"
          />
        </div>
        <div class="result-item">
          <span class="label">平均质量：</span>
          <el-tag :type="getQualityType(yieldAnalysis.averageQuality)">
            {{ yieldAnalysis.averageQuality }}
          </el-tag>
        </div>
        <div class="result-item suggestion">
          <p><strong>建议措施：</strong>{{ yieldAnalysis.suggestion }}</p>
        </div>
      </div>
    </div>

    <!-- 环境预测与告警 -->
    <div class="analysis-card">
      <h3>环境预测与告警</h3>
      <div class="chart-container">
        <Line 
          v-if="environmentData.temperature.labels.length > 0"
          :data="environmentData.temperature" 
          :options="temperatureChartOptions"
        />
        <div v-else class="no-data">暂无温度数据</div>
      </div>
      <div class="chart-container">
        <Line 
          v-if="environmentData.humidity.labels.length > 0"
          :data="environmentData.humidity" 
          :options="humidityChartOptions"
        />
        <div v-else class="no-data">暂无湿度数据</div>
      </div>
      <div class="warnings">
        <h4>预警信息</h4>
        <el-timeline>
          <el-timeline-item
            v-for="warning in environmentWarnings"
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
    <!-- <div class="analysis-card">
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
    </div> -->
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

/* 添加新的样式 */
.info-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.info-card {
  display: flex;
  align-items: center;
  padding: 16px;
  background: var(--el-color-primary-light-9);
  border-radius: 8px;
}

.info-icon {
  font-size: 24px;
  margin-right: 12px;
}

.info-content {
  flex: 1;
}

.info-label {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  margin-bottom: 4px;
}

.info-value {
  font-size: 20px;
  font-weight: 600;
  color: var(--el-color-primary);
}

.info-sub {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-top: 2px;
}

.management-info {
  margin-top: 20px;
}

.warning-info {
  margin-bottom: 16px;
}

.warning-title {
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--el-color-danger);
}

.warning-content {
  color: var(--el-text-color-regular);
  line-height: 1.5;
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .info-section {
    background: var(--el-bg-color);
  }

  .info-card {
    background: var(--el-color-primary-light-3);
  }
}

.analysis-results {
  margin-top: 20px;
  padding: 16px;
  background: var(--el-fill-color-light);
  border-radius: 4px;
}

.result-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
}

.result-item .label {
  width: 100px;
  color: var(--el-text-color-secondary);
}

.result-item .value {
  font-weight: 600;
  color: var(--el-color-primary);
}

.suggestion {
  margin-top: 16px;
  display: block;
}

.suggestion strong {
  color: var(--el-text-color-regular);
  margin-right: 8px;
}

.no-data {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--el-text-color-secondary);
  font-size: 14px;
}
</style>

<script lang="ts">
// 工具函数
const getStatusType = (status: string) => {
  const typeMap: Record<string, string> = {
    '未开始': 'info',
    '进行中': 'warning',
    '已完成': 'success',
    '未知': 'info'
  };
  return typeMap[status] || 'info';
};

const getQualityType = (quality: string) => {
  const typeMap: Record<string, string> = {
    '优秀': 'success',
    '良好': 'warning',
    '一般': 'info',
    '较差': 'danger',
    '未知': 'info'
  };
  return typeMap[quality] || 'info';
};

const getProgressStatus = (rate: number) => {
  if (rate >= 100) return 'success';
  if (rate >= 80) return 'warning';
  return '';
};
</script> 