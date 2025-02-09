<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import BackButton from '@/components/common/BackButton.vue';
import type { UploadProps, UploadUserFile } from 'element-plus';
import { ElMessage, ElLoading, ElMessageBox, ElDialog } from 'element-plus';
import request from '@/utils/request';
import { ElImageViewer } from 'element-plus';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { 
  InfoFilled, 
  Upload, 
  Mouse, 
  Delete,
  Close,
  Picture
} from '@element-plus/icons-vue'

// 注册 Chart.js 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// 定义分析结果的接口
interface AnalysisResult {
  healthIndex: string | number;
  leafArea?: number;
  leafLength?: number;
  leafWidth?: number;
  shapeIndex?: number;
  plantHeight?: number;
  crownWidth?: number;
  branchCount?: number;
  growthScore?: number;
  indicators?: Array<{ name: string; value: string; status: string }>;
  recommendations?: string[];
  anomalies?: Array<{ title: string; severity: string; description: string }>;
  health_index: string | number;
  leaf_area: number;
  plant_height: number;
}

// 病虫害识别记录类型定义
interface PestRecognitionRecord {
  id: number;
  greenhouse_id: number;
  plant_position: string;
  symptom_description: string;
  original_image_path: string;
  recognized_image_path: string | null;
  recognition_result: string | null;
  confidence_score: number | null;
  pest_type: string | null;
  severity_level: string | null;
  treatment_suggestion: string | null;
  recognition_status: string;
  recognition_time: string | null;
  created_by: string;
  created_at: string;
}

// 温室选项类型定义
interface Greenhouse {
  id: number;
  name: string;
  area: number;
}

// 表单数据
const formData = ref({
  identifier: '', // 操作员
  greenhouse: null as number | null, // 修改为number类型，因为后端需要greenhouse_id
  position: '', // 采集位置
  notes: '', // 备注信息
  imageList: [] as UploadUserFile[] // 图片列表
});

// 历史记录
const historyRecords = ref<any[]>([]);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

// 表型分析表单数据 - 移到最前面定义
const phenotypeForm = ref({
  greenhouseId: null as number | null,
  plantingBatchId: null as number | null,
  operator: '',
  position: '',
  collectionType: 'auto',
  imageList: [] as UploadUserFile[],
  notes: ''
});

// 温室选项
const greenhouseOptions = ref<{ value: number; label: string }[]>([]);

// 种植批次选项
const batchOptions = ref<{ value: number; label: string }[]>([]);

// 加载温室选项
const loadGreenhouseOptions = async () => {
  try {
    const response = await request.get('/api/greenhouses');
    greenhouseOptions.value = response.data.map((greenhouse: any) => ({
      value: greenhouse.id,
      label: greenhouse.name + "-" + greenhouse.area
    }));
  } catch (error) {
    console.error('Failed to load greenhouse options:', error);
    ElMessage.error('加载温室列表失败');
  }
};

// 加载种植批次选项
const loadBatchOptions = async (greenhouseId: number) => {
  try {
    const response = await request.get('/api/planting-batches', {
      params: { greenhouse_id: greenhouseId }
    });
    batchOptions.value = response.data.map((batch: any) => ({
      value: batch.id,
      label: `${batch.batch_code} (${batch.crop_name}-${batch.variety})`
    }));
  } catch (error) {
    console.error('Failed to load batch options:', error);
    ElMessage.error('加载种植批次失败');
  }
};

// 监听温室选择变化
watch(() => phenotypeForm.value.greenhouseId, (newVal) => {
  if (newVal) {
    loadBatchOptions(newVal);
  } else {
    batchOptions.value = [];
    phenotypeForm.value.plantingBatchId = null;
  }
});

// 表单验证函数
const validateForm = () => {
  if (!phenotypeForm.value.greenhouseId) {
    ElMessage.warning('请选择温室');
    return false;
  }
  if (!phenotypeForm.value.plantingBatchId) {
    ElMessage.warning('请选择种植批次');
    return false;
  }
  if (!phenotypeForm.value.operator) {
    ElMessage.warning('请输入操作员');
    return false;
  }
  if (phenotypeForm.value.imageList.length === 0) {
    ElMessage.warning('请上传图片');
    return false;
  }
  return true;
};

// 修改图片上传配置
const uploadConfig = {
  // 移除 action 配置，因为我们不需要自动上传
  multiple: false, // 改为单图上传
  limit: 1,
  accept: 'image/*',
  autoUpload: false // 禁用自动上传
};

// 修改图片变更处理函数
const handleImageChange: UploadProps['onChange'] = (uploadFile) => {
  if (uploadFile.raw) {
    phenotypeForm.value.imageList = [uploadFile];
  }
};

// 添加图片URL获取函数
const getPreviewUrl = computed(() => {
  const file = phenotypeForm.value.imageList[0];
  return file?.raw ? URL.createObjectURL(file.raw) : '';
});

// 图片上传前的处理
const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  const isImage = file.type.startsWith('image/');
  const isLt5M = file.size / 1024 / 1024 < 5;

  if (!isImage) {
    ElMessage.error('只能上传图片文件！');
    return false;
  }
  if (!isLt5M) {
    ElMessage.error('图片大小不能超过 5MB！');
    return false;
  }
  return true;
};

// 记录列表和筛选条件
const recognitionRecords = ref<PestRecognitionRecord[]>([]);
const recordFilter = ref({
  status: ''
});

// 加载识别记录
const loadRecognitionRecords = async () => {
  loading.value = true;
  try {
    const params = {
      page: currentPage.value,
      per_page: pageSize.value,
      status: recordFilter.value.status || undefined,
      greenhouse_id: formData.value.greenhouse || undefined
    };
    
    const response = await request.get('/api/pest/recognition/records', { params });
    const data = response.data;
    
    recognitionRecords.value = data.items;
    total.value = data.total;
  } catch (error) {
    console.error('Failed to load recognition records:', error);
    ElMessage.error('加载识别记录失败');
  } finally {
    loading.value = false;
  }
};

// 提交识别
const submitIdentification = async () => {
  if (!formData.value.identifier || !formData.value.greenhouse || formData.value.imageList.length === 0) {
    ElMessage.warning('请填写必要信息并上传图片');
    return;
  }

  loading.value = true;
  try {
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('greenhouse_id', formData.value.greenhouse.toString());
    formDataToSubmit.append('plant_position', formData.value.position);
    formDataToSubmit.append('symptom_description', formData.value.notes);
    formDataToSubmit.append('created_by', formData.value.identifier);
    
    // 修改图片文件的获取方式
    const uploadFile = formData.value.imageList[0];
    if (uploadFile && uploadFile.raw) {
      formDataToSubmit.append('image', uploadFile.raw);
    } else {
      ElMessage.warning('请选择有效的图片文件');
      loading.value = false;
      return;
    }
    
    const response = await request.post('/api/pest/recognition', formDataToSubmit, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    if (response.data) {
      ElMessage.success('提交成功，正在识别中...');
      
      // 重置表单
      formData.value = {
        identifier: '',
        greenhouse: null,
        position: '',
        notes: '',
        imageList: []
      };
      
      // 刷新记录列表
      loadRecognitionRecords();
    }
  } catch (error: any) {
    console.error('Failed to submit recognition:', error);
    ElMessage.error(error.response?.data?.error || '提交失败');
  } finally {
    loading.value = false;
  }
};

// 分页处理
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  loadHistoryRecords();
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  loadHistoryRecords();
};

// 监听筛选条件变化
watch(() => recordFilter.value.status, () => {
  currentPage.value = 1;
  loadRecognitionRecords();
});


// 添加当前激活的功能标识
const activeFunction = ref('pest-disease'); // pest-disease, phenotype, growth-status, farming-predict

// 功能卡片数据
const functionCards = [
  {
    id: 'pest-disease',
    title: '病虫害识别',
    icon: '🔍',
    description: '智能识别作物病虫害，提供防治建议'
  },
  {
    id: 'phenotype',
    title: '表型分析',
    icon: '🌱',
    description: '分析作物形态特征，评估生长质量'
  },
  {
    id: 'growth-status',
    title: '生长状态分析',
    icon: '📊',
    description: '评估当前生长状况，预测发展趋势'
  },
  {
    id: 'farming-predict',
    title: '农事预测与识别',
    icon: '🚜',
    description: '智能预测农事活动时机，识别作业需求'
  }
];

// 切换功能
const switchFunction = (functionId: string) => {
  activeFunction.value = functionId;
};

// 分析选项数据
const analysisOptions = [
  {
    id: 'leaf',
    title: '叶片形态分析',
    icon: '🍃',
    description: '分析叶片大小、形状等特征'
  },
  {
    id: 'plant',
    title: '株型特征识别',
    icon: '🌿',
    description: '识别植株整体结构特征'
  },
  {
    id: 'growth',
    title: '生长指标评估',
    icon: '📊',
    description: '评估植株生长发育状况'
  },
  {
    id: 'anomaly',
    title: '形态异常检测',
    icon: '⚠️',
    description: '检测植株形态异常情况'
  }
];

// 选中的分析类型
const selectedAnalysis = ref('');

// 修改 analysisResult 的类型
const analysisResult = ref<AnalysisResult | null>(null);

// 选择分析类型
const selectAnalysis = (analysisId: string) => {
  selectedAnalysis.value = analysisId;
  // 验证并触发分析
  handleAnalysis();
};

// 计算健康指数颜色
const healthColor = computed(() => {
  if (!analysisResult.value) return '#909399';
  const score = Number(analysisResult.value.health_index);
  if (score >= 80) return '#67C23A';
  if (score >= 60) return '#E6A23C'
  return '#F56C6C';
});

// 在script setup中添加状态类型转换函数
const getStatusType = (status: string) => {
  const typeMap: Record<string, string> = {
    'pending': 'info',
    'processing': 'warning',
    'completed': 'success',
    'failed': 'danger'
  };
  return typeMap[status] || 'info';
};

// 修改图片URL获取函数
const getImageUrl = (path: string) => {
  if (!path) return '';
  // 确保路径格式正确
  const cleanPath = path.replace(/^uploads\//, '').replace(/\\/g, '/');
  return `${import.meta.env.VITE_API_BASE_URL}/uploads/${cleanPath}`;
};

// 修改图表配置
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'category' as const,
      display: true,
      title: {
        display: true,
        text: '日期'
      }
    },
    y: {
      type: 'linear' as const,
      display: true,
      title: {
        display: true,
        text: '数值'
      }
    }
  },
  plugins: {
    legend: {
      position: 'top' as const
    }
  }
});

// 修改 growthTrendData 的类型和初始值
const growthTrendData = ref<any>({
  labels: [],
  datasets: []
});

// 修改加载趋势数据的函数
const loadGrowthTrend = async (greenhouseId: number, plantingBatchId: number) => {
  try {
    const response = await request.get('/api/growth-records/trend', {
      params: {
        greenhouse_id: greenhouseId,
        planting_batch_id: plantingBatchId,
        days: 30
      }
    });
    
    if (response.data) {
      growthTrendData.value = {
        labels: response.data.dates,
        datasets: [
          {
            label: '株高(cm)',
            data: response.data.heights,
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            tension: 0.1,
            fill: true
          },
          {
            label: '叶面积(cm²)',
            data: response.data.leaf_areas,
            borderColor: '#2196F3',
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            tension: 0.1,
            fill: true
          }
        ]
      };
    }
  } catch (error) {
    console.error('Failed to load growth trend:', error);
  }
};

// 添加点击坐标存储
const segmentPoints = ref<Array<{x: number, y: number}>>([]);
const ignorePoints = ref<Array<{x: number, y: number}>>([]);

// 添加图片预览和点击区域
const imagePreview = ref<HTMLImageElement | null>(null);
const imageContainer = ref<HTMLDivElement | null>(null);

// 修改清除点击标记的函数
const clearPoints = () => {
  // 清除数组中的点
  segmentPoints.value = [];
  ignorePoints.value = [];

  // 清除DOM中的标记点
  if (imageContainer.value) {
    // 找到所有的点标记元素
    const markers = imageContainer.value.querySelectorAll('.point-marker');
    // 移除每个标记点
    markers.forEach(marker => {
      marker.remove();
    });
  }
};

// 添加最后点击坐标存储
const lastClickCoords = ref<{ imageX: number; imageY: number } | null>(null);

// 修改图片点击处理函数
const handleImageClick = (event: MouseEvent) => {
  if (!imageContainer.value || !imagePreview.value) return;

  const img = imagePreview.value;
  const imgRect = img.getBoundingClientRect();
  const containerRect = imageContainer.value.getBoundingClientRect();

  // 计算图片在容器中的实际显示尺寸和位置
  const displayWidth = imgRect.width;
  const displayHeight = imgRect.height;
  
  // 计算图片在容器中的偏移量
  const offsetX = imgRect.left - containerRect.left;
  const offsetY = imgRect.top - containerRect.top;

  // 计算点击位置相对于图片左上角的坐标
  const clickX = event.clientX - imgRect.left;
  const clickY = event.clientY - imgRect.top;

  // 计算缩放比例
  const scaleX = img.naturalWidth / displayWidth;
  const scaleY = img.naturalHeight / displayHeight;

  // 计算在原始图像上的坐标
  const imageX = Math.round(clickX * scaleX);
  const imageY = Math.round(clickY * scaleY);

  // 更新最后点击坐标
  lastClickCoords.value = { imageX, imageY };

  // 根据点击按钮添加到不同数组
  if (event.button === 0) { // 左键点击
    segmentPoints.value.push({ x: imageX, y: imageY });
    addPointMarker(clickX + offsetX, clickY + offsetY, 'segment');
  } else if (event.button === 2) { // 右键点击
    event.preventDefault();
    ignorePoints.value.push({ x: imageX, y: imageY });
    addPointMarker(clickX + offsetX, clickY + offsetY, 'ignore');
  }
};

// 修改添加点标记函数
const addPointMarker = (x: number, y: number, type: 'segment' | 'ignore') => {
  if (!imageContainer.value || !imagePreview.value) return;

  const marker = document.createElement('div');
  marker.className = `point-marker ${type}`;
  
  // 设置标记点位置（相对于图片容器）
  marker.style.position = 'absolute';
  marker.style.left = `${x}px`;
  marker.style.top = `${y}px`;
  marker.style.width = '8px';
  marker.style.height = '8px';
  marker.style.borderRadius = '50%';
  marker.style.transform = 'translate(-50%, -50%)';
  marker.style.pointerEvents = 'none';
  marker.style.zIndex = '10';
  
  if (type === 'segment') {
    marker.style.backgroundColor = 'rgba(82, 196, 26, 0.8)';
    marker.style.border = '2px solid #52c41a';
  } else {
    marker.style.backgroundColor = 'rgba(245, 34, 45, 0.8)';
    marker.style.border = '2px solid #f5222d';
  }

  imageContainer.value.appendChild(marker);
};

// 修改handleAnalysis函数
const handleAnalysis = async () => {
  if (!validateForm()) return;

  const formData = new FormData();
  formData.append('greenhouse_id', phenotypeForm.value.greenhouseId);
  formData.append('planting_batch_id', phenotypeForm.value.plantingBatchId);
  formData.append('operator', phenotypeForm.value.operator);
  formData.append('collection_type', phenotypeForm.value.collectionType || 'manual');
  formData.append('notes', phenotypeForm.value.notes || '');
  
  // 添加分割点坐标
  formData.append('segment_pts', JSON.stringify(segmentPoints.value));
  formData.append('ignore_pts', JSON.stringify(ignorePoints.value));
  
  if (phenotypeForm.value.imageList[0]?.raw) {
    formData.append('image', phenotypeForm.value.imageList[0].raw);
  }
  
  // 显示加载中
  const loading = ElLoading.service({
    lock: true,
    text: '分析中，请稍候...',
    background: 'rgba(0, 0, 0, 0.7)'
  });

  try {
    const response = await request.post('/api/phenotype/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.data?.data) {
      analysisResult.value = response.data.data.analysis_result;
      await loadGrowthTrend(phenotypeForm.value.greenhouseId!, phenotypeForm.value.plantingBatchId!);
      
      // 刷新历史记录
      await loadHistoryRecords();
      
      loading.close();
      dialogVisible.value = true;
      ElMessage.success('分析完成');
    }
  } catch (error) {
    console.error('Analysis failed:', error);
    ElMessage.error('分析请求失败');
  } finally {
    loading.close();
  }
};

// 修改图片变化监听
watch(() => phenotypeForm.value.imageList, () => {
  // 当图片变化时自动清除所有点
  clearPoints();
}, { deep: true }); // 添加deep选项以监听数组内部变化

// 添加对话框显示控制
const dialogVisible = ref(false);

// 添加删除图片的方法
const removeImage = () => {
  phenotypeForm.value.imageList = [];
  clearPoints();
};

// 获取状态标签
const getStatusLabel = (status: string) => {
  const statusMap: Record<string, string> = {
    'pending': '待处理',
    'processing': '处理中',
    'completed': '已完成',
    'failed': '失败'
  };
  return statusMap[status] || status;
};


// 加载历史记录
const loadHistoryRecords = async () => {
  // if (!phenotypeForm.value.greenhouseId || !phenotypeForm.value.plantingBatchId) {
  //   historyRecords.value = [];
  //   total.value = 0;
  //   return;
  // }
  
  loading.value = true;
  try {
    const response = await request.get('/api/phenotype/records', {
      params: {
        page: currentPage.value,
        per_page: pageSize.value,
        greenhouse_id: phenotypeForm.value.greenhouseId,
        planting_batch_id: phenotypeForm.value.plantingBatchId
      }
    });
    
    console.log('历史记录数据:', response.data); // 添加调试日志
    
    if (response.data) {
      historyRecords.value = response.data.items || [];
      total.value = response.data.total || 0;
    }
  } catch (error) {
    console.error('加载历史记录失败:', error);
    ElMessage.error('加载历史记录失败');
    historyRecords.value = [];
    total.value = 0;
  } finally {
    loading.value = false;
  }
};

// 监听温室和批次变化
watch([
  () => phenotypeForm.value.greenhouseId,
  () => phenotypeForm.value.plantingBatchId
], ([newGreenhouseId, newBatchId]) => {
  if (newGreenhouseId && newBatchId) {
    currentPage.value = 1;
    loadHistoryRecords();
  }
});

// 查看分析详情
const showAnalysisDetail = (record: any) => {
  analysisResult.value = {
    plant_height: record.plant_height,
    leaf_area: record.leaf_area,
    health_index: record.health_index,
    recommendations: record.analysis_recommendations
  };
  dialogVisible.value = true;
  // 加载生长趋势数据
  loadGrowthTrend(record.greenhouse_id, record.planting_batch_id);
};

// 初始化时加载数据
onMounted(() => {
  loadGreenhouseOptions();
  loadRecognitionRecords();
  loadHistoryRecords();
  // if (phenotypeForm.value.greenhouseId && phenotypeForm.value.plantingBatchId) {
  //   loadHistoryRecords();
  // }
});
</script>

<template>
  <div class="intelligent-analytics-view">
    <BackButton />
    <h2>智能分析</h2>

    <!-- 功能切换卡片 -->
    <div class="function-cards">
      <div
        v-for="card in functionCards"
        :key="card.id"
        class="function-card"
        :class="{ active: activeFunction === card.id }"
        @click="switchFunction(card.id)"
      >
        <div class="card-icon">{{ card.icon }}</div>
        <h4>{{ card.title }}</h4>
        <p>{{ card.description }}</p>
      </div>
    </div>

    <!-- 病虫害识别 -->
    <div v-if="activeFunction === 'pest-disease'" class="function-content">
      <!-- 原有的病虫害识别表单和历史记录 -->
      <div class="form-card">
        <h3>识别信息</h3>
        <el-form :model="formData" label-width="100px">
          <el-form-item label="操作员" required>
            <el-input v-model="formData.identifier" placeholder="请输入操作员姓名" />
          </el-form-item>
          
          <el-form-item label="温室编号" required>
            <el-select v-model="formData.greenhouse" placeholder="请选择温室">
              <el-option
                v-for="item in greenhouseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          
          <el-form-item label="采集位置">
            <el-input v-model="formData.position" placeholder="请输入具体采集位置" />
          </el-form-item>
          
          <el-form-item label="图片上传" required>
            <el-upload
              v-model:file-list="formData.imageList"
              list-type="picture-card"
              :auto-upload="false"
              :multiple="uploadConfig.multiple"
              :limit="uploadConfig.limit"
              :accept="uploadConfig.accept"
              :before-upload="beforeUpload"
              @change="handleImageChange"
            >
              <el-icon><Plus /></el-icon>
              <template #tip>
                <div class="upload-tip">
                  支持jpg/png格式，单个文件不超过5MB
                </div>
              </template>
            </el-upload>
          </el-form-item>
          
          <el-form-item label="症状描述">
            <el-input
              v-model="formData.notes"
              type="textarea"
              :rows="3"
              placeholder="请输入相关症状描述"
            />
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="submitIdentification">提交识别</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="recognition-records">
        <div class="filter-bar">
          <el-select v-model="recordFilter.status" placeholder="状态筛选" clearable>
            <el-option label="待识别" value="待识别" />
            <el-option label="识别中" value="识别中" />
            <el-option label="已完成" value="已完成" />
            <el-option label="识别失败" value="识别失败" />
          </el-select>
        </div>

        <el-table :data="recognitionRecords" v-loading="loading">
          <el-table-column prop="created_at" label="提交时间" width="160" />
          <el-table-column prop="plant_position" label="植株位置" width="120" />
          <el-table-column prop="symptom_description" label="症状描述" show-overflow-tooltip />
          <el-table-column label="原始图片" width="100">
            <template #default="scope">
              <el-image
                v-if="scope.row.original_image_path"
                :src="getImageUrl(scope.row.original_image_path)"
                class="table-image"
                fit="cover"
                :preview-src-list="[getImageUrl(scope.row.original_image_path)]"
                preview-teleported
                :initial-index="0"
                hide-on-click-modal
              >
                <template #error>
                  <div class="image-error">
                    <el-icon><Picture /></el-icon>
                    <span>加载失败</span>
                  </div>
                </template>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column label="识别结果图" width="100">
            <template #default="scope">
              <el-image
                v-if="scope.row.recognized_image_path"
                :src="getImageUrl(scope.row.recognized_image_path)"
                class="table-image"
                fit="cover"
                :preview-src-list="[getImageUrl(scope.row.recognized_image_path)]"
                preview-teleported
                :initial-index="0"
                hide-on-click-modal
              >
                <template #error>
                  <div class="image-error">
                    <el-icon><Picture /></el-icon>
                    <span>加载失败</span>
                  </div>
                </template>
              </el-image>
              <span v-else class="no-result">
                {{ scope.row.recognition_status === '已完成' ? '无结果图' : '等待识别' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="recognition_result" label="识别结果" width="120" />
          <el-table-column prop="confidence_score" label="置信度" width="100">
            <template #default="scope">
              {{ scope.row.confidence_score ? `${scope.row.confidence_score}%` : '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="recognition_status" label="状态" width="100">
            <template #default="scope">
              <el-tag :type="getStatusType(scope.row.recognition_status)">
                {{ scope.row.recognition_status }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-container">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :total="total"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>

    <!-- 表型分析 -->
    <div v-else-if="activeFunction === 'phenotype'" class="function-content">
      <div class="phenotype-container">
        <!-- 上传区域 -->
        <div class="upload-section">
          <h3>基本信息</h3>
          <el-form :model="phenotypeForm" label-width="100px">
            <el-form-item label="选择温室" required>
              <el-select 
                v-model="phenotypeForm.greenhouseId"
                placeholder="请选择温室"
                clearable
              >
                <el-option 
                  v-for="item in greenhouseOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            
            <el-form-item label="种植批次" required>
              <el-select 
                v-model="phenotypeForm.plantingBatchId"
                placeholder="请选择种植批次"
                clearable
                :disabled="!phenotypeForm.greenhouseId"
              >
                <el-option 
                  v-for="item in batchOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            
            <el-form-item label="采集方式" required>
              <el-radio-group v-model="phenotypeForm.collectionType">
                <el-radio label="manual">人工采集</el-radio>
                <el-radio label="auto">自动采集</el-radio>
              </el-radio-group>
            </el-form-item>
            
            <el-form-item label="采集位置">
              <el-input v-model="phenotypeForm.position" placeholder="请输入采集位置" />
            </el-form-item>
            
            <el-form-item label="操作员" required>
              <el-input v-model="phenotypeForm.operator" placeholder="请输入操作员姓名" />
            </el-form-item>
            
            <el-form-item label="上传图片" required>
              <div class="upload-container">
                <!-- 上传组件 -->
                <el-upload
                  v-if="!phenotypeForm.imageList.length"
                  v-model:file-list="phenotypeForm.imageList"
                  class="phenotype-uploader"
                  :auto-upload="false"
                  :multiple="false"
                  :limit="1"
                  :accept="uploadConfig.accept"
                  :before-upload="beforeUpload"
                  @change="handleImageChange"
                  drag
                >
                  <div class="upload-content">
                    <el-icon class="upload-icon"><Upload /></el-icon>
                    <div class="upload-text">
                      <span class="main-text">点击或拖拽图片到此区域上传</span>
                      <span class="sub-text">支持 jpg/png 格式，单个文件不超过5MB</span>
                    </div>
                  </div>
                </el-upload>

                <!-- 修改图片预览和操作区域 -->
                <div v-else class="preview-container">
                  <div class="image-container" ref="imageContainer" @contextmenu.prevent>
                    <div class="image-wrapper">
                      <img 
                        v-if="getPreviewUrl"
                        ref="imagePreview"
                        :src="getPreviewUrl"
                        @mousedown="handleImageClick"
                        class="preview-image"
                      />
                    </div>
                  </div>
                  
                  <div class="operation-guide">
                    <div class="guide-section">
                      <div class="guide-header">
                        <el-icon><InfoFilled /></el-icon>
                        <span>操作指南</span>
                      </div>
                      <div class="guide-content">
                        <div class="guide-item">
                          <h5>点击操作说明：</h5>
                          <div class="point-examples">
                            <div class="point-example-item">
                              <div class="point-example segment"></div>
                              <span>左键点击: 添加分割点（用于标记叶片轮廓）</span>
                            </div>
                            <div class="point-example-item">
                              <div class="point-example ignore"></div>
                              <span>右键点击: 添加忽略点（用于标记需要排除的区域）</span>
                            </div>
                          </div>
                        </div>
                        <div class="guide-item">
                          <h5>使用建议：</h5>
                          <ul class="tips-list">
                            <li>建议在叶片边缘均匀添加4-6个分割点</li>
                            <li>如有重叠叶片，可使用忽略点标记</li>
                            <li>确保图片清晰且光照均匀</li>
                            <li>尽量保持叶片在图片中完整显示</li>
                          </ul>
                        </div>
                        <div class="guide-item">
                          <h5>快捷操作：</h5>
                          <div class="shortcut-list">
                            <div class="shortcut-item">
                              <el-icon><Mouse /></el-icon>
                              <span>左键点击 - 添加分割点</span>
                            </div>
                            <div class="shortcut-item">
                              <el-icon><Mouse /></el-icon>
                              <span>右键点击 - 添加忽略点</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="coordinates-info" v-if="lastClickCoords">
                        <h5>点击坐标信息：</h5>
                        <div class="coord-item">
                          <span>图像坐标: ({{ lastClickCoords.imageX }}, {{ lastClickCoords.imageY }})</span>
                        </div>
                      </div>
                      <div class="guide-actions">
                        <el-button size="small" @click="clearPoints">
                          <el-icon><Delete /></el-icon>
                          清除所有点
                        </el-button>
                        <el-button size="small" type="danger" @click="removeImage">
                          <el-icon><Close /></el-icon>
                          删除图片
                        </el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>
            
            <el-form-item label="备注信息">
              <el-input
                v-model="phenotypeForm.notes"
                type="textarea"
                :rows="3"
                placeholder="请输入相关备注信息"
              />
            </el-form-item>
          </el-form>
        </div>

        <!-- 分析选项 -->
        <div class="analysis-options">
          <h3>分析项目</h3>
          <div class="option-cards">
            <div 
              v-for="option in analysisOptions" 
              :key="option.id"
              :class="['option-card', { active: selectedAnalysis === option.id }]"
              @click="selectAnalysis(option.id)"
            >
              <div class="option-icon">{{ option.icon }}</div>
              <h4>{{ option.title }}</h4>
              <p>{{ option.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 添加历史记录表格 -->
      <div class="history-records">
        <h3>历史分析记录</h3>
        
        <el-empty
          v-if="!loading && (!historyRecords || historyRecords.length === 0)"
          description="暂无分析记录"
        />
        
        <el-table 
          v-else
          :data="historyRecords" 
          style="width: 100%" 
          v-loading="loading"
          border
        >
          <el-table-column prop="created_at" label="分析时间" width="160" />
          <el-table-column prop="operator" label="操作员" width="100" />
          <el-table-column label="采集方式" width="100">
            <template #default="{ row }">
              <el-tag size="small" type="info">
                {{ row.collection_type === 'manual' ? '人工采集' : '自动采集' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="getStatusType(row.analysis_status)" size="small">
                {{ getStatusLabel(row.analysis_status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="分析结果" min-width="300">
            <template #default="{ row }">
              <div v-if="row.analysis_status === 'completed'" class="result-grid">
                <div class="result-item">
                  <span class="label">株高:</span>
                  <span class="value">{{ row.plant_height }}cm</span>
                </div>
                <div class="result-item">
                  <span class="label">叶面积:</span>
                  <span class="value">{{ row.leaf_area }}cm²</span>
                </div>
                <div class="result-item">
                  <span class="label">健康指数:</span>
                  <span class="value">{{ row.health_index }}%</span>
                </div>
              </div>
              <el-tag 
                v-else-if="row.analysis_status === 'failed'" 
                type="danger" 
                size="small"
              >
                {{ row.error_message || '分析失败' }}
              </el-tag>
              <el-tag 
                v-else 
                type="warning" 
                size="small"
              >
                {{ row.analysis_status === 'pending' ? '等待分析' : '分析中...' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="图片" width="120">
            <template #default="{ row }">
              <el-image 
                v-if="row.original_image_path"
                :src="getImageUrl(row.original_image_path)"
                :preview-src-list="[getImageUrl(row.original_image_path)]"
                fit="cover"
                class="record-image"
                preview-teleported
                :initial-index="0"
                hide-on-click-modal
              >
                <template #error>
                  <div class="image-error">
                    <el-icon><Picture /></el-icon>
                    <span>加载失败</span>
                  </div>
                </template>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template #default="{ row }">
              <el-button 
                type="primary" 
                link
                @click="showAnalysisDetail(row)"
                :disabled="row.analysis_status !== 'completed'"
              >
                查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination" v-if="total > 0">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="total"
            layout="total, sizes, prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>

    <!-- 生长状态分析 -->
    <div v-else-if="activeFunction === 'growth-status'" class="function-content">
      <div class="form-card">
        <h3>生长状态分析</h3>
        <p class="coming-soon">生长状态分析功能开发中，敬请期待...</p>
        <div class="feature-preview">
          <h4>即将推出的功能：</h4>
          <ul>
            <li>生长势评估</li>
            <li>营养状况诊断</li>
            <li>生长周期判定</li>
            <li>长势预警提示</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 农事预测与识别 -->
    <div v-else-if="activeFunction === 'farming-predict'" class="function-content">
      <div class="form-card">
        <h3>农事预测与识别</h3>
        <p class="coming-soon">农事预测与识别功能开发中，敬请期待...</p>
        <div class="feature-preview">
          <h4>即将推出的功能：</h4>
          <ul>
            <li>最佳采收时机预测</li>
            <li>灌溉时机识别</li>
            <li>施肥建议生成</li>
            <li>农事计划排程</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 分析结果模态框 -->
    <el-dialog
      v-model="dialogVisible"
      title="分析结果"
      width="50%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      destroy-on-close
      class="analysis-dialog"
    >
      <div v-if="analysisResult" class="analysis-dialog-content">
        <div class="metrics">
          <div class="metric">
            <label>株高</label>
            <span>{{ analysisResult.plant_height }} cm</span>
          </div>
          <div class="metric">
            <label>叶面积</label>
            <span>{{ analysisResult.leaf_area }} cm²</span>
          </div>
          <div class="metric">
            <label>健康指数</label>
            <span :style="{ color: healthColor }">{{ analysisResult.health_index }}%</span>
          </div>
        </div>

        <div class="analysis-chart">
          <h4>生长趋势</h4>
          <div class="chart-container">
            <Line 
              v-if="growthTrendData.datasets.length > 0"
              :data="growthTrendData"
              :options="chartOptions"
              style="height: 200px"
            />
          </div>
        </div>

        <div class="recommendations">
          <h4>栽培建议</h4>
          <ul>
            <li v-for="(item, index) in analysisResult.recommendations" 
                :key="index"
                class="recommendation-item">
              <el-icon><InfoFilled /></el-icon>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.intelligent-analytics-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.form-card,
.history-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #4CAF50;
  color: #2c3e50;
}

.upload-tip {
  font-size: 12px;
  color: #666;
  margin-top: 8px;
}

.result-info {
  font-size: 14px;
  line-height: 1.5;
}

.result-info p {
  margin: 4px 0;
}

.record-image {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  cursor: zoom-in;
  object-fit: cover;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }

  :deep(.el-image__inner) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .form-card,
  .history-card {
    background: #1a1a1a;
  }

  h2, h3 {
    color: #fff;
  }

  .upload-tip {
    color: #bbb;
  }

  .result-info {
    color: #bbb;
  }
}

/* 添加功能卡片样式 */
.function-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.function-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.function-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.function-card.active {
  border-color: var(--el-color-primary);
  background: var(--el-color-primary-light-9);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 12px;
}

.function-card h4 {
  margin: 0 0 8px 0;
  color: #2c3e50;
}

.function-card p {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

/* 开发中功能样式 */
.coming-soon {
  text-align: center;
  color: #909399;
  font-size: 16px;
  margin: 30px 0;
}

.feature-preview {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
}

.feature-preview h4 {
  color: #2c3e50;
  margin-bottom: 16px;
}

.feature-preview ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.feature-preview li {
  padding: 12px;
  background: white;
  border-radius: 6px;
  text-align: center;
  color: #606266;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .function-card {
    background: #1a1a1a;
  }

  .function-card h4 {
    color: #fff;
  }

  .function-card p {
    color: #bbb;
  }

  .function-card.active {
    background: var(--el-color-primary-dark-2);
  }

  .feature-preview {
    background: #2c2c2c;
  }

  .feature-preview h4 {
    color: #fff;
  }

  .feature-preview li {
    background: #1a1a1a;
    color: #bbb;
  }

  .coming-soon {
    color: #909399;
  }
}

/* 表型分析样式 */
.phenotype-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.upload-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.phenotype-uploader {
  width: 100%;
}

.analysis-options {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.option-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.option-card {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  text-align: center;
}

.option-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.option-card.active {
  border-color: var(--el-color-primary);
  background: var(--el-color-primary-light-9);
}

.option-icon {
  font-size: 2rem;
  margin-bottom: 12px;
}

.option-card h4 {
  margin: 0 0 8px 0;
  color: #2c3e50;
}

.option-card p {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.recognition-records {
  margin-top: 20px;
}

.filter-bar {
  margin-bottom: 20px;
}

.table-image {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  cursor: zoom-in;
  object-fit: cover;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }

  :deep(.el-image__inner) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.image-error {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #909399;
  font-size: 12px;
}

.image-error .el-icon {
  font-size: 20px;
  margin-bottom: 4px;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}

.no-result {
  color: #909399;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  background: #f5f7fa;
  border-radius: 4px;
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .no-result {
    background: #2c2c2c;
    color: #bbb;
  }
}

.analysis-dialog-content {
  padding: 0;
}

.metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.metric {
  background: var(--el-fill-color-lighter);
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  transition: transform 0.2s;
}

.metric:hover {
  transform: translateY(-2px);
}

.metric label {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 13px;
  margin-bottom: 6px;
}

.metric span {
  font-size: 20px;
  font-weight: 600;
  color: var(--el-color-primary);
}

.analysis-chart {
  margin: 20px 0;
  background: var(--el-fill-color-lighter);
  padding: 15px;
  border-radius: 6px;
}

.analysis-chart h4 {
  font-size: 14px;
  margin-bottom: 15px;
  color: var(--el-text-color-regular);
}

.chart-container {
  background: var(--el-bg-color);
  padding: 10px;
  border-radius: 4px;
}

.recommendations {
  background: var(--el-fill-color-lighter);
  padding: 15px;
  border-radius: 6px;
}

.recommendations h4 {
  font-size: 14px;
  margin-bottom: 12px;
  color: var(--el-text-color-regular);
}

.recommendations ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.recommendation-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: var(--el-bg-color);
  border-radius: 4px;
  margin-bottom: 8px;
  color: var(--el-text-color-regular);
  font-size: 13px;
}

.recommendation-item:last-child {
  margin-bottom: 0;
}

.recommendation-item .el-icon {
  color: var(--el-color-primary);
  margin-right: 8px;
  font-size: 16px;
}

.dialog-footer {
  text-align: right;
}

/* 修改模态框相关样式 */
:deep(.analysis-dialog) {
  .el-dialog__header {
    margin: 0;
    padding: 15px 20px;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }
  
  .el-dialog__title {
    font-size: 16px;
    font-weight: 600;
  }
  
  .el-dialog__body {
    padding: 20px;
  }
  
  .el-dialog__footer {
    padding: 10px 20px;
    border-top: 1px solid var(--el-border-color-lighter);
  }
}

.upload-container {
  width: 100%;
}

.phenotype-uploader {
  width: 100%;
}

:deep(.el-upload-dragger) {
  width: 100%;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--el-fill-color-lighter);
  border: 2px dashed var(--el-border-color);
  border-radius: 8px;
  transition: all 0.3s;
}

:deep(.el-upload-dragger:hover) {
  border-color: var(--el-color-primary);
  background: var(--el-color-primary-light-9);
}

.upload-content {
  text-align: center;
}

.upload-icon {
  font-size: 48px;
  color: var(--el-text-color-secondary);
  margin-bottom: 16px;
}

.upload-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.main-text {
  font-size: 16px;
  color: var(--el-text-color-primary);
}

.sub-text {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

/* 修改图片预览区域样式 */
.preview-container {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.image-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--el-bg-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: 400px;
  overflow: hidden;
  flex: 1;
}

.image-wrapper {
  position: relative;
  display: inline-block;
  max-width: 100%;
  max-height: 100%;
}

.preview-image {
  display: block;
  max-width: 100%;
  max-height: 600px;
  object-fit: contain;
  border-radius: 4px;
  cursor: crosshair;
}

.operation-guide {
  width: 320px;
  flex-shrink: 0;
  position: sticky;
  top: 20px;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  align-self: flex-start;
}

.guide-section {
  padding: 20px;
}

.guide-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 500;
  color: white;
}

.guide-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.guide-item {
  h5 {
    color: var(--el-color-primary-light-8);
    margin: 0 0 8px 0;
    font-size: 15px;
  }
}

.point-examples {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.point-example-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);
}

.point-example {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
}

.point-example.segment {
  background-color: rgba(82, 196, 26, 0.8);
  border: 2px solid #52c41a;
}

.point-example.ignore {
  background-color: rgba(245, 34, 45, 0.8);
  border: 2px solid #f5222d;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 14px;

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.9);
    
    &::before {
      content: "•";
      color: var(--el-color-primary-light-8);
      font-size: 18px;
    }
  }
}

.shortcut-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.shortcut-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  
  .el-icon {
    color: var(--el-color-primary-light-8);
  }
}

.guide-actions {
  display: flex;
  gap: 8px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);

  .el-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    flex: 1;
    height: 36px;
    font-size: 13px;
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    color: white;
    transition: all 0.3s ease;
    
    .el-icon {
      margin-right: 4px;
      font-size: 16px;
    }
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    &.el-button--danger {
      background: rgba(245, 34, 45, 0.2);
      border-color: rgba(245, 34, 45, 0.3);
      
      &:hover {
        background: rgba(245, 34, 45, 0.3);
        border-color: rgba(245, 34, 45, 0.4);
      }
      
      .el-icon {
        color: rgba(245, 34, 45, 0.9);
      }
    }
  }
}

/* 添加按钮图标样式 */
.guide-actions .el-button {
  &:first-child .el-icon {
    color: var(--el-color-primary-light-7);
  }
}

.coordinates-info {
  margin-top: 16px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;

  h5 {
    color: var(--el-color-primary-light-8);
    margin: 0 0 8px 0;
    font-size: 14px;
  }

  .coord-item {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.9);
  }
}

/* 点标记样式 */
.point-marker {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 10;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  transition: none; /* 禁用过渡动画 */
}

.point-marker.segment {
  background-color: rgba(82, 196, 26, 0.8);
  border: 2px solid #52c41a;
}

.point-marker.ignore {
  background-color: rgba(245, 34, 45, 0.8);
  border: 2px solid #f5222d;
}

.history-records {
  margin-top: 30px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.error-message {
  color: var(--el-color-danger);
  font-size: 13px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.result-item .label {
  color: var(--el-text-color-secondary);
  font-size: 13px;
}

.result-item .value {
  font-weight: 500;
  font-size: 14px;
}

/* 图片预览相关样式 */
:deep(.el-image-viewer__wrapper) {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
}

:deep(.el-image-viewer__mask) {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1999;
}

:deep(.el-image-viewer__btn) {
  position: absolute;
  z-index: 2001;
  opacity: 0.8;
  cursor: pointer;
  
  &:hover {
    opacity: 1;
  }
}

:deep(.el-image-viewer__close) {
  top: 40px;
  right: 40px;
  width: 40px;
  height: 40px;
  font-size: 24px;
}

:deep(.el-image-viewer__canvas) {
  position: relative;
  z-index: 2000;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.el-image-viewer__img) {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}
</style> 