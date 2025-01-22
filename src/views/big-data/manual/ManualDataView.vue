<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BackButton from '@/components/common/BackButton.vue';
import {
  ElMessage,
  ElMessageBox,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElDialog,
  ElTag
} from 'element-plus';
import 'element-plus/dist/index.css';

// 定义数据类型
interface GrowthRecord {
  id: number;
  plantDate: string;
  height: number;
  stemDiameter: number;
  leafCount: number;
  leafArea: number;
  floweringDate: string;
  pollinationDate: string;
  fruitStatus: string;
  harvestDate: string;
  collectionType: 'manual' | 'auto';
  collector: string;
  collectTime: string;
  greenhouse: string;
  notes: string;
}

// 表格数据
const tableData = ref<GrowthRecord[]>([]);

// 分页配置
const pagination = ref({
  currentPage: 1,
  pageSize: 20,
  total: 0
});

// 搜索条件
const searchForm = ref({
  dateRange: [] as string[],
  greenhouse: '',
  collectionType: '',
  fruitStatus: '',
  collector: ''
});

// 编辑对话框
const editDialogVisible = ref(false);
const editingRecord = ref<GrowthRecord | null>(null);

// 新增对话框
const addDialogVisible = ref(false);
const newRecord = ref<Partial<GrowthRecord>>({
  collectionType: 'manual',
  collectTime: new Date().toISOString().split('T')[0],
  height: 0,
  stemDiameter: 0,
  leafCount: 0,
  leafArea: 0,
  fruitStatus: '未结果',
  notes: ''
});

// 温室选项
const greenhouseOptions = [
  { value: 'A-1', label: 'A区1号温室' },
  { value: 'A-2', label: 'A区2号温室' },
  { value: 'B-1', label: 'B区1号温室' },
  { value: 'B-2', label: 'B区2号温室' }
];

// 添加加载状态
const loading = ref(false);

// 修改加载表格数据函数
const loadTableData = async () => {
  loading.value = true;
  try {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 模拟API调用
    let mockData: GrowthRecord[] = Array(50).fill(null).map((_, index) => ({
      id: index + 1,
      plantDate: '2024-03-01',
      height: Number((45 + Math.random() * 10).toFixed(2)),
      stemDiameter: Number((2.5 + Math.random()).toFixed(2)),
      leafCount: Math.floor(8 + Math.random() * 4),
      leafArea: Number((120 + Math.random() * 30).toFixed(2)),
      floweringDate: '2024-03-15',
      pollinationDate: '2024-03-16',
      fruitStatus: ['未结果', '结果期', '成熟期'][Math.floor(Math.random() * 3)],
      harvestDate: '2024-04-01',
      collectionType: Math.random() > 0.5 ? 'manual' : 'auto',
      collector: ['张三', '李四', '王五', '自动系统'][Math.floor(Math.random() * 4)],
      collectTime: new Date().toISOString().split('T')[0],
      greenhouse: greenhouseOptions[Math.floor(Math.random() * greenhouseOptions.length)].value,
      notes: '生长状况良好'
    }));

    // 应用搜索过滤
    if (searchForm.value.dateRange?.length === 2) {
      const [startDate, endDate] = searchForm.value.dateRange;
      mockData = mockData.filter(item => 
        item.plantDate >= startDate && item.plantDate <= endDate
      );
    }

    if (searchForm.value.greenhouse) {
      mockData = mockData.filter(item => 
        item.greenhouse === searchForm.value.greenhouse
      );
    }

    if (searchForm.value.collectionType) {
      mockData = mockData.filter(item => 
        item.collectionType === searchForm.value.collectionType
      );
    }

    if (searchForm.value.fruitStatus) {
      mockData = mockData.filter(item => 
        item.fruitStatus === searchForm.value.fruitStatus
      );
    }

    if (searchForm.value.collector) {
      mockData = mockData.filter(item => 
        item.collector.includes(searchForm.value.collector)
      );
    }

    // 应用分页
    const start = (pagination.value.currentPage - 1) * pagination.value.pageSize;
    const end = start + pagination.value.pageSize;
    
    pagination.value.total = mockData.length;
    tableData.value = mockData.slice(start, end);
  } finally {
    loading.value = false;
  }
};

// 监听分页变化
const handlePageChange = (newPage: number) => {
  pagination.value.currentPage = newPage;
  loadTableData();
};

const handleSizeChange = (newSize: number) => {
  pagination.value.pageSize = newSize;
  pagination.value.currentPage = 1;
  loadTableData();
};

// 搜索
const handleSearch = () => {
  pagination.value.currentPage = 1;
  loadTableData();
};

// 重置搜索
const resetSearch = () => {
  searchForm.value = {
    dateRange: [],
    greenhouse: '',
    collectionType: '',
    fruitStatus: '',
    collector: ''
  };
  pagination.value.currentPage = 1;
  handleSearch();
};

// 处理编辑
const handleEdit = (row: GrowthRecord) => {
  editingRecord.value = { ...row };
  editDialogVisible.value = true;
};

// 处理删除
const handleDelete = async (row: GrowthRecord) => {
  try {
    await ElMessageBox.confirm('确定要删除这条记录吗？', '提示', {
      type: 'warning'
    });
    // 实际项目中这里应该调用API
    const index = tableData.value.findIndex(item => item.id === row.id);
    if (index > -1) {
      tableData.value.splice(index, 1);
      ElMessage.success('删除成功');
    }
  } catch {
    // 用户取消删除
  }
};

// 保存编辑
const saveEdit = () => {
  if (!editingRecord.value) return;
  
  // 实际项目中这里应该调用API
  const index = tableData.value.findIndex(item => item.id === editingRecord.value?.id);
  if (index > -1) {
    tableData.value[index] = { ...editingRecord.value };
    ElMessage.success('更新成功');
    editDialogVisible.value = false;
  }
};

// 添加新记录
const addRecord = () => {
  // 实际项目中这里应该调用API
  const record: GrowthRecord = {
    id: tableData.value.length + 1,
    ...newRecord.value as Omit<GrowthRecord, 'id'>
  };
  
  tableData.value.unshift(record);
  ElMessage.success('添加成功');
  addDialogVisible.value = false;
  newRecord.value = {
    collectionType: 'manual',
    collectTime: new Date().toISOString().split('T')[0]
  };
};

onMounted(() => {
  loadTableData();
});
</script>

<template>
  <div class="manual-data-view">
    <BackButton />
    <h2>生长记录数据</h2>

    <!-- 搜索表单 -->
    <div class="search-form">
      <el-form :model="searchForm" inline>
        <el-form-item label="日期范围">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="温室">
          <el-select v-model="searchForm.greenhouse" placeholder="选择温室" clearable>
            <el-option
              v-for="item in greenhouseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="采集方式">
          <el-select v-model="searchForm.collectionType" placeholder="选择采集方式" clearable>
            <el-option label="手动采集" value="manual" />
            <el-option label="自动采集" value="auto" />
          </el-select>
        </el-form-item>
        <el-form-item label="果实状况">
          <el-select v-model="searchForm.fruitStatus" placeholder="选择状态" clearable>
            <el-option label="未结果" value="未结果" />
            <el-option label="结果期" value="结果期" />
            <el-option label="成熟期" value="成熟期" />
          </el-select>
        </el-form-item>
        <el-form-item label="采集人">
          <el-input 
            v-model="searchForm.collector" 
            placeholder="请输入采集人"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
          <el-button type="success" @click="addDialogVisible = true">新增记录</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 数据表格 -->
    <el-table 
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-background="rgba(255, 255, 255, 0.7)"
      :data="tableData" 
      border 
      style="width: 100%"
      header-align="center"
      :cell-style="{ textAlign: 'center' }"
    >
      <el-table-column prop="plantDate" label="定植日期" width="120" sortable align="center" />
      <el-table-column prop="height" label="苗高(cm)" width="100" sortable align="center">
        <template #default="{ row }">
          {{ row.height.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column prop="stemDiameter" label="茎粗(cm)" width="100" sortable align="center">
        <template #default="{ row }">
          {{ row.stemDiameter.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column prop="leafCount" label="叶片数" width="100" sortable align="center" />
      <el-table-column prop="leafArea" label="叶面积(cm²)" width="120" sortable align="center">
        <template #default="{ row }">
          {{ row.leafArea.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column prop="floweringDate" label="开花日期" width="120" />
      <el-table-column prop="pollinationDate" label="授粉日期" width="120" />
      <el-table-column prop="fruitStatus" label="果实状况" width="100" />
      <el-table-column prop="harvestDate" label="采收日期" width="120" />
      <el-table-column prop="collectionType" label="采集方式" width="100">
        <template #default="{ row }">
          <el-tag :type="row.collectionType === 'manual' ? 'warning' : 'success'">
            {{ row.collectionType === 'manual' ? '手动' : '自动' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="collector" label="采集人" width="100" />
      <el-table-column prop="greenhouse" label="温室" width="120" />
      <el-table-column label="操作" fixed="right" width="150">
        <template #default="{ row }">
          <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加分页切换动画 -->
    <Transition name="fade">
      <div class="pagination" v-show="!loading">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </Transition>

    <!-- 编辑对话框 -->
    <el-dialog
      v-model="editDialogVisible"
      title="编辑记录"
      width="50%"
    >
      <el-form :model="editingRecord" label-width="100px" v-if="editingRecord">
        <el-form-item label="定植日期" required>
          <el-date-picker 
            v-model="editingRecord.plantDate" 
            type="date" 
            placeholder="选择日期"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="温室" required>
          <el-select v-model="editingRecord.greenhouse" placeholder="选择温室" style="width: 100%">
            <el-option
              v-for="item in greenhouseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="苗高(cm)" required>
          <el-input-number 
            v-model="editingRecord.height" 
            :min="0" 
            :max="200"
            :precision="2"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="茎粗(cm)" required>
          <el-input-number 
            v-model="editingRecord.stemDiameter" 
            :min="0" 
            :max="10"
            :precision="2"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="叶片数" required>
          <el-input-number 
            v-model="editingRecord.leafCount" 
            :min="0" 
            :max="100"
            :precision="0"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="叶面积(cm²)" required>
          <el-input-number 
            v-model="editingRecord.leafArea" 
            :min="0" 
            :max="1000"
            :precision="2"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="开花日期">
          <el-date-picker 
            v-model="editingRecord.floweringDate" 
            type="date" 
            placeholder="选择日期"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="授粉日期">
          <el-date-picker 
            v-model="editingRecord.pollinationDate" 
            type="date" 
            placeholder="选择日期"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="果实状况" required>
          <el-select v-model="editingRecord.fruitStatus" placeholder="选择状态" style="width: 100%">
            <el-option label="未结果" value="未结果" />
            <el-option label="结果期" value="结果期" />
            <el-option label="成熟期" value="成熟期" />
          </el-select>
        </el-form-item>

        <el-form-item label="采收日期">
          <el-date-picker 
            v-model="editingRecord.harvestDate" 
            type="date" 
            placeholder="选择日期"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="采集方式" required>
          <el-select v-model="editingRecord.collectionType" placeholder="选择采集方式" style="width: 100%">
            <el-option label="手动采集" value="manual" />
            <el-option label="自动采集" value="auto" />
          </el-select>
        </el-form-item>

        <el-form-item label="采集人" required>
          <el-input v-model="editingRecord.collector" placeholder="请输入采集人" />
        </el-form-item>

        <el-form-item label="备注">
          <el-input 
            v-model="editingRecord.notes" 
            type="textarea" 
            :rows="3" 
            placeholder="请输入备注信息"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveEdit">保存</el-button>
      </template>
    </el-dialog>

    <!-- 新增对话框 -->
    <el-dialog
      v-model="addDialogVisible"
      title="新增记录"
      width="50%"
    >
      <el-form :model="newRecord" label-width="100px">
        <el-form-item label="定植日期" required>
          <el-date-picker 
            v-model="newRecord.plantDate" 
            type="date" 
            placeholder="选择日期"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="温室" required>
          <el-select v-model="newRecord.greenhouse" placeholder="选择温室" style="width: 100%">
            <el-option
              v-for="item in greenhouseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="苗高(cm)" required>
          <el-input-number 
            v-model="newRecord.height" 
            :min="0" 
            :max="200"
            :precision="2"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="茎粗(cm)" required>
          <el-input-number 
            v-model="newRecord.stemDiameter" 
            :min="0" 
            :max="10"
            :precision="2"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="叶片数" required>
          <el-input-number 
            v-model="newRecord.leafCount" 
            :min="0" 
            :max="100"
            :precision="0"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="叶面积(cm²)" required>
          <el-input-number 
            v-model="newRecord.leafArea" 
            :min="0" 
            :max="1000"
            :precision="2"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="开花日期">
          <el-date-picker 
            v-model="newRecord.floweringDate" 
            type="date" 
            placeholder="选择日期"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="授粉日期">
          <el-date-picker 
            v-model="newRecord.pollinationDate" 
            type="date" 
            placeholder="选择日期"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="果实状况" required>
          <el-select v-model="newRecord.fruitStatus" placeholder="选择状态" style="width: 100%">
            <el-option label="未结果" value="未结果" />
            <el-option label="结果期" value="结果期" />
            <el-option label="成熟期" value="成熟期" />
          </el-select>
        </el-form-item>

        <el-form-item label="采收日期">
          <el-date-picker 
            v-model="newRecord.harvestDate" 
            type="date" 
            placeholder="选择日期"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="采集方式" required>
          <el-select v-model="newRecord.collectionType" placeholder="选择采集方式" style="width: 100%">
            <el-option label="手动采集" value="manual" />
            <el-option label="自动采集" value="auto" />
          </el-select>
        </el-form-item>

        <el-form-item label="采集人" required>
          <el-input v-model="newRecord.collector" placeholder="请输入采集人" />
        </el-form-item>

        <el-form-item label="备注">
          <el-input 
            v-model="newRecord.notes" 
            type="textarea" 
            :rows="3" 
            placeholder="请输入备注信息"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addRecord">添加</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.manual-data-view {
  padding: 20px;
  overflow-x: auto;
}

.search-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.search-form :deep(.el-form-item) {
  margin-bottom: 16px;
  margin-right: 16px;
}

.search-form :deep(.el-input),
.search-form :deep(.el-select) {
  width: 200px;
}

.search-form :deep(.el-date-editor) {
  width: 320px;
}

.pagination {
  margin-top: 20px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-end;
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .search-form,
  .pagination {
    background: #1a1a1a;
  }
}
</style> 