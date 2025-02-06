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
import request from '@/utils/request';

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
  fruitStatus: '未开花',
  greenhouse: '',
  notes: ''
});

// 修改温室选项，从后端获取
const greenhouseOptions = ref<{ value: number; label: string }[]>([]);

// 添加加载状态
const loading = ref(false);

// 添加保存状态
const saving = ref(false);

// 修改加载表格数据函数
const loadTableData = async () => {
  loading.value = true;
  try {
    // 构建查询参数
    const params: Record<string, any> = {
      page: pagination.value.currentPage,
      per_page: pagination.value.pageSize
    };

    // 添加日期范围
    if (searchForm.value.dateRange?.length === 2) {
      params.start_date = searchForm.value.dateRange[0];
      params.end_date = searchForm.value.dateRange[1];
    }

    // 修改温室ID的处理
    if (searchForm.value.greenhouse) {
      params.greenhouse_id = typeof searchForm.value.greenhouse === 'string'
        ? Number(searchForm.value.greenhouse.match(/^\d+/)?.[0])
        : searchForm.value.greenhouse;
    }
    if (searchForm.value.collectionType) {
      params.collection_type = searchForm.value.collectionType;
    }
    if (searchForm.value.fruitStatus) {
      params.fruit_status = searchForm.value.fruitStatus;
    }
    if (searchForm.value.collector) {
      params.collector = searchForm.value.collector;
    }

    // 调用API
    const response = await request.get('/api/growth-records', { params });

    // 更新数据
    tableData.value = response.data.records;
    pagination.value.total = response.data.total;
  } catch (error) {
    console.error('Failed to load growth records:', error);
    ElMessage.error('加载数据失败');
  } finally {
    loading.value = false;
  }
};

// 修改温室选项，从后端获取
const loadGreenhouseOptions = async () => {
  try {
    const response = await request.get('/api/greenhouses');
    greenhouseOptions.value = response.data.map((greenhouse: any) => ({
      value: greenhouse.id,
      label: `${greenhouse.area}-${greenhouse.name}`,  // 修改显示格式为"区-温室号"
    }));
  } catch (error) {
    console.error('Failed to load greenhouse options:', error);
    ElMessage.error('加载温室列表失败');
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
    await ElMessageBox.confirm(
      '此操作将永久删除该记录, 是否继续?', 
      '提示', 
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    );
    
    await request.delete(`/api/growth-records/${row.id}`);
    ElMessage.success('删除成功');
    // 重新加载数据
    loadTableData();
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to delete growth record:', error);
      ElMessage.error('删除失败');
    }
  }
};

// 修改保存编辑函数
const saveEdit = async () => {
  if (!editingRecord.value) return;
  
  saving.value = true;
  try {
    // 验证必填字段
    if (!editingRecord.value.plantDate) {
      throw new Error('请选择定植日期');
    }
    if (!editingRecord.value.greenhouse) {
      throw new Error('请选择温室');
    }
    if (!editingRecord.value.collector) {
      throw new Error('请输入采集人');
    }

    // 准备提交的数据
    const submitData = {
      ...editingRecord.value,
      // 确保数值类型正确
      height: Number(editingRecord.value.height),
      stemDiameter: Number(editingRecord.value.stemDiameter),
      leafCount: Number(editingRecord.value.leafCount),
      leafArea: Number(editingRecord.value.leafArea),
      // 确保日期格式正确
      plantDate: editingRecord.value.plantDate.split('T')[0],
      floweringDate: editingRecord.value.floweringDate?.split('T')[0] || null,
      pollinationDate: editingRecord.value.pollinationDate?.split('T')[0] || null,
      harvestDate: editingRecord.value.harvestDate?.split('T')[0] || null,
      // 确保采集时间格式正确
      collectTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
      // 只保留温室ID
      greenhouse: typeof editingRecord.value.greenhouse === 'string' 
        ? Number(editingRecord.value.greenhouse.match(/^\d+/)?.[0])
        : editingRecord.value.greenhouse
    };


    // 调用API更新记录
    await request.put(`/api/growth-records/${editingRecord.value.id}`, submitData);
    ElMessage.success('更新成功');
    editDialogVisible.value = false;
    // 重新加载数据
    loadTableData();
  } catch (error) {
    if (error instanceof Error) {
      ElMessage.error(error.message);
    } else {
      console.error('Failed to update growth record:', error);
      ElMessage.error('更新失败');
    }
  } finally {
    saving.value = false;
  }
};

// 修改添加记录函数
const addRecord = async () => {
  try {
    // 验证必填字段
    if (!newRecord.value.plantDate) {
      throw new Error('请选择定植日期');
    }
    if (!newRecord.value.greenhouse) {
      throw new Error('请选择温室');
    }
    if (!newRecord.value.collector) {
      throw new Error('请输入采集人');
    }

    // 准备提交的数据
    const submitData = {
      ...newRecord.value,
      // 确保数值类型正确
      height: Number(newRecord.value.height),
      stemDiameter: Number(newRecord.value.stemDiameter),
      leafCount: Number(newRecord.value.leafCount),
      leafArea: Number(newRecord.value.leafArea),
      // 确保日期格式正确
      plantDate: formatDate(newRecord.value.plantDate),
      floweringDate: newRecord.value.floweringDate ? formatDate(newRecord.value.floweringDate) : null,
      pollinationDate: newRecord.value.pollinationDate ? formatDate(newRecord.value.pollinationDate) : null,
      harvestDate: newRecord.value.harvestDate ? formatDate(newRecord.value.harvestDate) : null,
      // 确保采集时间格式正确
      collectTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
      // 只保留温室ID
      greenhouse: typeof newRecord.value.greenhouse === 'string' 
        ? Number(newRecord.value.greenhouse.match(/^\d+/)?.[0])
        : newRecord.value.greenhouse
    };

    // 调用API添加记录
    await request.post('/api/growth-records', submitData);
    ElMessage.success('添加成功');
    addDialogVisible.value = false;
    // 重置表单
    newRecord.value = {
      collectionType: 'manual',
      collectTime: new Date().toISOString().split('T')[0],
      height: 0,
      stemDiameter: 0,
      leafCount: 0,
      leafArea: 0,
      fruitStatus: '未开花',
      greenhouse: '',
      notes: ''
    };
    // 重新加载数据
    loadTableData();
  } catch (error) {
    if (error instanceof Error) {
      ElMessage.error(error.message);
    } else {
      console.error('Failed to add growth record:', error);
      ElMessage.error('添加失败');
    }
  }
};

// 添加日期格式化函数
const formatDate = (date: Date | string | null): string | null => {
  if (!date) return null;
  if (date instanceof Date) {
    return date.toISOString().split('T')[0];
  }
  if (typeof date === 'string') {
    // 如果已经是 YYYY-MM-DD 格式就直接返回
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return date;
    }
    // 否则尝试转换
    return new Date(date).toISOString().split('T')[0];
  }
  return null;
};

// 修改表格中温室的显示
const formatGreenhouse = (greenhouse: string) => {
  // 从后端获取的温室列表
  const found = greenhouseOptions.value.find(
    option => option.label.includes(greenhouse)
  );
  return found ? found.label : greenhouse;
};

// 在组件挂载时加载数据
onMounted(() => {
  loadGreenhouseOptions();
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
            <el-option label="未开花" value="未开花" />
            <el-option label="开花期" value="开花期" />
            <el-option label="坐果期" value="坐果期" />
            <el-option label="果实膨大期" value="果实膨大期" />
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
      <el-table-column prop="greenhouse" label="温室" width="120">
        <template #default="{ row }">
          {{ formatGreenhouse(row.greenhouse) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template #default="{ row }">
          <el-button 
            type="primary" 
            size="small" 
            @click="handleEdit(row)"
          >
            编辑
          </el-button>
          <el-button 
            type="danger" 
            size="small" 
            @click="handleDelete(row)"
          >
            删除
          </el-button>
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
            <el-option label="未开花" value="未开花" />
            <el-option label="开花期" value="开花期" />
            <el-option label="坐果期" value="坐果期" />
            <el-option label="果实膨大期" value="果实膨大期" />
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
        <el-button 
          type="primary" 
          :loading="saving" 
          @click="saveEdit"
        >
          保存
        </el-button>
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
            <el-option label="未开花" value="未开花" />
            <el-option label="开花期" value="开花期" />
            <el-option label="坐果期" value="坐果期" />
            <el-option label="果实膨大期" value="果实膨大期" />
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