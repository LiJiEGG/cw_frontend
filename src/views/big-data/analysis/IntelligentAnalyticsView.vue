<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import BackButton from '@/components/common/BackButton.vue';
import type { UploadProps, UploadUserFile } from 'element-plus';
import { ElMessage } from 'element-plus';
import request from '@/utils/request';
import { ElImageViewer } from 'element-plus';

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
const historyRecords = ref([
  {
    id: 1,
    date: '2024-03-22 10:30',
    identifier: '张三',
    greenhouse: 'A-1',
    position: '3号区域',
    result: {
      disease: '白粉病',
      probability: 0.92,
      severity: '中度',
      suggestion: '建议使用多菌灵进行防治，同时注意通风降温'
    },
    status: '已处理',
    image: 'path/to/image1.jpg'
  },
  {
    id: 2,
    date: '2024-03-21 15:45',
    identifier: '李四',
    greenhouse: 'B-2',
    position: '5号区域',
    result: {
      disease: '炭疽病',
      probability: 0.88,
      severity: '轻度',
      suggestion: '及时清除病叶，使用咪鲜胺进行预防性喷施'
    },
    status: '待处理',
    image: 'path/to/image2.jpg'
  }
]);

// 温室选项
const greenhouseOptions = ref<{ value: number; label: string }[]>([]);

// 加载温室选项
const loadGreenhouseOptions = async () => {
  try {
    const response = await request.get('/api/greenhouses');
    greenhouseOptions.value = response.data.map((greenhouse: Greenhouse) => ({
      value: greenhouse.id,
      label: greenhouse.name + "-" + greenhouse.area
    }));
  } catch (error) {
    console.error('Failed to load greenhouse options:', error);
    ElMessage.error('加载温室列表失败');
  }
};

// 修改图片上传配置
const uploadConfig = {
  // 移除 action 配置，因为我们不需要自动上传
  multiple: false, // 改为单图上传
  limit: 1,
  accept: 'image/*',
  autoUpload: false // 禁用自动上传
};

// 添加图片变更处理函数
const handleImageChange: UploadProps['onChange'] = (uploadFile) => {
  formData.value.imageList = [uploadFile];
};

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

// 分页和加载状态
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const loading = ref(false);
const submitting = ref(false);

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

  submitting.value = true;
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
      submitting.value = false;
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
    submitting.value = false;
  }
};

// 修改图片预览相关的代码
const previewVisible = ref(false);
const previewImage = ref('');
const previewList = ref<string[]>([]);

// 修改图片预览处理函数
const handlePreview = (path: string) => {
  if (!path) return;
  const url = getImageUrl(path);
  previewImage.value = url;
  previewList.value = [url];
  previewVisible.value = true;
};

// 添加关闭预览的处理函数
const closePreview = () => {
  previewVisible.value = false;
  previewImage.value = '';
  previewList.value = [];
};

// 分页处理
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  loadRecognitionRecords();
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  loadRecognitionRecords();
};

// 监听筛选条件变化
watch(() => recordFilter.value.status, () => {
  currentPage.value = 1;
  loadRecognitionRecords();
});

// 初始化时加载数据
onMounted(() => {
  loadGreenhouseOptions();
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
const selectAnalysis = async (analysisId: string) => {
  selectedAnalysis.value = analysisId;
  
  // 验证必填信息
  if (!phenotypeForm.value.operator || !phenotypeForm.value.greenhouse || phenotypeForm.value.imageList.length === 0) {
    ElMessage.warning('请填写必要信息并上传图片');
    return;
  }

  // TODO: 调用后端API进行分析
  try {
    // 模拟API调用
    ElMessage.success('分析请求已提交，请稍候...');
    // const response = await api.analyzePhenotype({
    //   type: analysisId,
    //   ...phenotypeForm.value
    // });
    // analysisResult.value = response.data;
  } catch (error) {
    ElMessage.error('分析请求失败，请重试');
  }
};

// 计算健康指数颜色
const healthColor = computed(() => {
  if (!analysisResult.value) return '#909399';
  const score = Number(analysisResult.value.healthIndex);
  if (score >= 80) return '#67C23A';
  if (score >= 60) return '#E6A23C'
  return '#F56C6C';
});

// 表型分析表单数据
const phenotypeForm = ref({
  operator: '', // 操作员
  greenhouse: null as number | null, // 修改为number类型，因为后端需要greenhouse_id
  position: '', // 采集位置
  notes: '', // 备注信息
  imageList: [] as UploadUserFile[] // 图片列表
});

// 在script setup中添加状态类型转换函数
const getStatusType = (status: string) => {
  const typeMap: Record<string, string> = {
    '待识别': 'info',
    '识别中': 'warning',
    '已完成': 'success',
    '识别失败': 'danger'
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
                @click="handlePreview(scope.row.original_image_path)"
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
                @click="handlePreview(scope.row.recognized_image_path)"
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
            <el-form-item label="操作员" required>
              <el-input v-model="phenotypeForm.operator" placeholder="请输入操作员姓名" />
            </el-form-item>
            
            <el-form-item label="温室编号" required>
              <el-select v-model="phenotypeForm.greenhouse" placeholder="请选择温室">
                <el-option
                  v-for="item in greenhouseOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            
            <el-form-item label="采集位置">
              <el-input v-model="phenotypeForm.position" placeholder="请输入具体采集位置" />
            </el-form-item>
            
            <el-form-item label="图片上传" required>
              <el-upload
                v-model:file-list="phenotypeForm.imageList"
                class="phenotype-uploader"
                :auto-upload="false"
                :multiple="uploadConfig.multiple"
                :limit="uploadConfig.limit"
                :accept="uploadConfig.accept"
                :before-upload="beforeUpload"
                @change="handleImageChange"
                list-type="picture-card"
              >
                <el-icon><Plus /></el-icon>
                <template #tip>
                  <div class="upload-tip">
                    支持jpg/png格式，单个文件不超过5MB
                  </div>
                </template>
              </el-upload>
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

        <!-- 分析结果 -->
        <div class="analysis-results" v-if="analysisResult">
          <h3>分析结果</h3>
          <el-tabs type="border-card">
            <!-- 叶片形态分析结果 -->
            <el-tab-pane v-if="selectedAnalysis === 'leaf'" label="叶片形态分析">
              <div class="result-content">
                <div class="metrics-grid">
                  <div class="metric-item">
                    <h5>叶面积</h5>
                    <div class="value">{{ analysisResult.leafArea }} cm²</div>
                  </div>
                  <div class="metric-item">
                    <h5>叶片长度</h5>
                    <div class="value">{{ analysisResult.leafLength }} cm</div>
                  </div>
                  <div class="metric-item">
                    <h5>叶片宽度</h5>
                    <div class="value">{{ analysisResult.leafWidth }} cm</div>
                  </div>
                  <div class="metric-item">
                    <h5>叶片形状指数</h5>
                    <div class="value">{{ analysisResult.shapeIndex }}</div>
                  </div>
                </div>
                <div class="analysis-chart">
                  <!-- 这里可以添加图表组件 -->
                </div>
              </div>
            </el-tab-pane>

            <!-- 株型特征识别结果 -->
            <el-tab-pane v-if="selectedAnalysis === 'plant'" label="株型特征识别">
              <div class="result-content">
                <div class="metrics-grid">
                  <div class="metric-item">
                    <h5>株高</h5>
                    <div class="value">{{ analysisResult.plantHeight }} cm</div>
                  </div>
                  <div class="metric-item">
                    <h5>冠幅</h5>
                    <div class="value">{{ analysisResult.crownWidth }} cm</div>
                  </div>
                  <div class="metric-item">
                    <h5>分枝数</h5>
                    <div class="value">{{ analysisResult.branchCount }}</div>
                  </div>
                  <div class="metric-item">
                    <h5>生长势评分</h5>
                    <div class="value">{{ analysisResult.growthScore }}/100</div>
                  </div>
                </div>
                <div class="plant-structure">
                  <!-- 这里可以添加株型结构可视化 -->
                </div>
              </div>
            </el-tab-pane>

            <!-- 生长指标评估结果 -->
            <el-tab-pane v-if="selectedAnalysis === 'growth'" label="生长指标评估">
              <div class="result-content">
                <el-progress
                  type="dashboard"
                  :percentage="Number(analysisResult.healthIndex)"
                  :color="healthColor"
                />
                <div class="growth-indicators">
                  <el-tag 
                    v-for="indicator in analysisResult.indicators"
                    :key="indicator.name"
                    :type="indicator.status as any"
                  >
                    {{ indicator.name }}: {{ indicator.value }}
                  </el-tag>
                </div>
                <div class="recommendations">
                  <h5>改进建议</h5>
                  <ul>
                    <li v-for="(rec, index) in analysisResult.recommendations" 
                        :key="index">{{ rec }}</li>
                  </ul>
                </div>
              </div>
            </el-tab-pane>

            <!-- 形态异常检测结果 -->
            <el-tab-pane v-if="selectedAnalysis === 'anomaly'" label="形态异常检测">
              <div class="result-content">
                <div class="anomaly-list">
                  <el-alert
                    v-for="(anomaly, index) in analysisResult.anomalies"
                    :key="index"
                    :title="anomaly.title"
                    :type="anomaly.severity as any"
                    :description="anomaly.description"
                    show-icon
                    :closable="false"
                  />
                </div>
                <div class="anomaly-image">
                  <!-- 这里可以添加异常区域标注图 -->
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
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

    <!-- 添加独立的图片预览组件 -->
    <el-image-viewer
      v-if="previewVisible"
      :url-list="previewList"
      :initial-index="0"
      :hide-on-click-modal="true"
      @close="closePreview"
    />
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
  cursor: pointer;
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
  margin-top: 10px;
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

.analysis-results {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.metric-item {
  background: #f5f7fa;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

.metric-item h5 {
  margin: 0 0 8px 0;
  color: #666;
}

.metric-item .value {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--el-color-primary);
}

.growth-indicators {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
}

.recommendations {
  margin-top: 20px;
}

.recommendations ul {
  list-style: none;
  padding: 0;
}

.recommendations li {
  margin: 10px 0;
  padding: 10px;
  background: #f5f7fa;
  border-radius: 4px;
}

.anomaly-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .upload-section,
  .analysis-options,
  .analysis-results {
    background: #1a1a1a;
  }

  .option-card {
    background: #2c2c2c;
  }

  .option-card h4 {
    color: #fff;
  }

  .option-card p {
    color: #bbb;
  }

  .metric-item {
    background: #2c2c2c;
  }

  .metric-item h5 {
    color: #bbb;
  }

  .recommendations li {
    background: #2c2c2c;
    color: #bbb;
  }
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
  cursor: pointer;
  object-fit: cover;
  transition: transform 0.2s;
}

.table-image:hover {
  transform: scale(1.05);
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

/* 修改图片预览相关样式 */
:deep(.el-image-viewer__wrapper) {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2100;
}

:deep(.el-image-viewer__btn) {
  z-index: 2101;
}

:deep(.el-image-viewer__mask) {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0.5;
  background: #000;
  z-index: 2099;
}

:deep(.el-image-viewer__img) {
  max-width: 90%;
  max-height: 90%;
  position: relative;
  z-index: 2100;
}

/* 确保表格在预览时不受影响 */
.recognition-records {
  position: relative;
  z-index: 1;
}

.el-table {
  position: relative;
  z-index: 1;
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
</style> 