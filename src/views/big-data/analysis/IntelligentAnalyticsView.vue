<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BackButton from '@/components/common/BackButton.vue';
import type { UploadProps, UploadUserFile } from 'element-plus';
import { ElMessage } from 'element-plus';

// 表单数据
const formData = ref({
  identifier: '', // 识别人
  greenhouse: '', // 温室编号
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
const greenhouseOptions = [
  { value: 'A-1', label: 'A-1温室' },
  { value: 'A-2', label: 'A-2温室' },
  { value: 'B-1', label: 'B-1温室' },
  { value: 'B-2', label: 'B-2温室' }
];

// 图片上传配置
const uploadConfig = {
  action: '/api/pest-disease/upload',
  multiple: true,
  limit: 5,
  accept: 'image/*'
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

// 提交识别
const submitIdentification = async () => {
  if (!formData.value.identifier || !formData.value.greenhouse || formData.value.imageList.length === 0) {
    ElMessage.warning('请填写必要信息并上传图片');
    return;
  }
  // TODO: 调用后端API进行识别
  ElMessage.success('提交成功，正在识别中...');
};

// 处理记录
const handleRecord = (id: number) => {
  const record = historyRecords.value.find(r => r.id === id);
  if (record) {
    record.status = '已处理';
    ElMessage.success('标记为已处理');
  }
};

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
          <el-form-item label="识别人" required>
            <el-input v-model="formData.identifier" placeholder="请输入识别人姓名" />
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
              :action="uploadConfig.action"
              :multiple="uploadConfig.multiple"
              :limit="uploadConfig.limit"
              :accept="uploadConfig.accept"
              :before-upload="beforeUpload"
            >
              <el-icon><Plus /></el-icon>
              <template #tip>
                <div class="upload-tip">
                  支持jpg/png格式，单个文件不超过5MB，最多上传5张
                </div>
              </template>
            </el-upload>
          </el-form-item>
          
          <el-form-item label="备注信息">
            <el-input
              v-model="formData.notes"
              type="textarea"
              rows="3"
              placeholder="请输入相关备注信息"
            />
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="submitIdentification">提交识别</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="history-card">
        <h3>识别记录</h3>
        <el-table :data="historyRecords" style="width: 100%">
          <el-table-column prop="date" label="识别时间" width="160" />
          <el-table-column prop="identifier" label="识别人" width="100" />
          <el-table-column prop="greenhouse" label="温室编号" width="100" />
          <el-table-column prop="position" label="采集位置" width="120" />
          <el-table-column label="识别结果" min-width="200">
            <template #default="{ row }">
              <div class="result-info">
                <p><strong>病害类型：</strong>{{ row.result.disease }}</p>
                <p><strong>置信度：</strong>{{ (row.result.probability * 100).toFixed(1) }}%</p>
                <p><strong>严重程度：</strong>{{ row.result.severity }}</p>
                <p><strong>处理建议：</strong>{{ row.result.suggestion }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="图片" width="100">
            <template #default="{ row }">
              <el-image
                :src="row.image"
                :preview-src-list="[row.image]"
                fit="cover"
                class="record-image"
              />
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="row.status === '已处理' ? 'success' : 'warning'">
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template #default="{ row }">
              <el-button
                v-if="row.status !== '已处理'"
                type="primary"
                link
                @click="handleRecord(row.id)"
              >
                标记处理
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 表型分析 -->
    <div v-else-if="activeFunction === 'phenotype'" class="function-content">
      <div class="form-card">
        <h3>表型分析</h3>
        <p class="coming-soon">表型分析功能开发中，敬请期待...</p>
        <div class="feature-preview">
          <h4>即将推出的功能：</h4>
          <ul>
            <li>叶片形态分析</li>
            <li>株型特征识别</li>
            <li>生长指标评估</li>
            <li>形态异常检测</li>
          </ul>
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
</style> 