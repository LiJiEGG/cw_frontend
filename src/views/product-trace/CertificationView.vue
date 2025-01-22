<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

// 产品认证信息
const certificationInfo = ref({
  productName: '有机西红柿酱',
  productBatch: 'PC202403200001',
  certifications: [
    {
      id: 1,
      name: '有机产品认证',
      code: 'ORG20240320001',
      issuer: '中国有机产品认证中心',
      issueDate: '2024-03-20',
      validUntil: '2025-03-19',
      status: 'valid'
    },
    {
      id: 2,
      name: 'ISO22000认证',
      code: 'ISO22K20240320001',
      issuer: '通标标准技术服务有限公司',
      issueDate: '2024-03-20',
      validUntil: '2025-03-19',
      status: 'valid'
    }
  ]
})

// 检测报告列表
const testReports = ref([
  {
    id: 1,
    type: '农残检测',
    reportNo: 'TR202403200001',
    testDate: '2024-03-20',
    laboratory: '省农产品质量检测中心',
    items: [
      { name: '有机磷', result: '未检出', standard: '≤0.1mg/kg', status: 'pass' },
      { name: '氨基甲酸酯', result: '未检出', standard: '≤0.1mg/kg', status: 'pass' },
      { name: '菊酯类', result: '未检出', standard: '≤0.1mg/kg', status: 'pass' }
    ]
  },
  {
    id: 2,
    type: '重金属检测',
    reportNo: 'TR202403200002',
    testDate: '2024-03-20',
    laboratory: '省农产品质量检测中心',
    items: [
      { name: '铅', result: '0.02mg/kg', standard: '≤0.2mg/kg', status: 'pass' },
      { name: '镉', result: '0.01mg/kg', standard: '≤0.1mg/kg', status: 'pass' },
      { name: '汞', result: '0.001mg/kg', standard: '≤0.01mg/kg', status: 'pass' }
    ]
  }
])

// 认证机构信息
const certificationBodies = ref([
  {
    id: 1,
    name: '中国有机产品认证中心',
    code: 'COFCC',
    address: '北京市海淀区',
    contact: '010-12345678',
    scope: ['有机产品认证', '良好农业规范认证'],
    qualification: 'CNAS认可',
    validUntil: '2025-12-31'
  },
  {
    id: 2,
    name: '通标标准技术服务有限公司',
    code: 'SGS-CHINA',
    address: '上海市徐汇区',
    contact: '021-12345678',
    scope: ['ISO认证', 'HACCP认证'],
    qualification: 'CNAS认可',
    validUntil: '2025-12-31'
  }
])

// 生成二维码
const generateQRCode = () => {
  console.log('生成认证溯源二维码')
}

// 导出报告
const exportReport = () => {
  console.log('导出认证溯源报告')
}

// 查看证书原件
const viewCertificate = (certId: number) => {
  console.log('查看证书原件:', certId)
}

// 查看检测报告原件
const viewTestReport = (reportId: number) => {
  console.log('查看检测报告原件:', reportId)
}
</script>

<template>
  <div class="certification-trace">
    <BackButton />
    <h2>认证溯源</h2>
    
    <div class="content">
      <!-- 认证信息 -->
      <section class="certification-section">
        <h3>认证信息</h3>
        <div class="certification-list">
          <div v-for="cert in certificationInfo.certifications"
               :key="cert.id"
               class="certification-card">
            <div class="cert-header">
              <div class="cert-title">
                <h4>{{ cert.name }}</h4>
                <span class="cert-status" :class="cert.status">
                  {{ cert.status === 'valid' ? '有效' : '已过期' }}
                </span>
              </div>
              <button class="view-btn" @click="viewCertificate(cert.id)">
                查看证书
              </button>
            </div>
            <div class="cert-content">
              <div class="cert-info">
                <span class="label">证书编号</span>
                <span class="value">{{ cert.code }}</span>
              </div>
              <div class="cert-info">
                <span class="label">发证机构</span>
                <span class="value">{{ cert.issuer }}</span>
              </div>
              <div class="cert-info">
                <span class="label">发证日期</span>
                <span class="value">{{ cert.issueDate }}</span>
              </div>
              <div class="cert-info">
                <span class="label">有效期至</span>
                <span class="value">{{ cert.validUntil }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 检测报告 -->
      <section class="report-section">
        <h3>检测报告</h3>
        <div class="report-list">
          <div v-for="report in testReports"
               :key="report.id"
               class="report-card">
            <div class="report-header">
              <div class="report-title">
                <h4>{{ report.type }}</h4>
                <span class="report-no">报告编号：{{ report.reportNo }}</span>
              </div>
              <button class="view-btn" @click="viewTestReport(report.id)">
                查看报告
              </button>
            </div>
            <div class="report-info">
              <div class="info-row">
                <span class="label">检测日期</span>
                <span class="value">{{ report.testDate }}</span>
              </div>
              <div class="info-row">
                <span class="label">检测机构</span>
                <span class="value">{{ report.laboratory }}</span>
              </div>
            </div>
            <div class="test-items">
              <div v-for="item in report.items"
                   :key="item.name"
                   class="test-item"
                   :class="item.status">
                <span class="item-name">{{ item.name }}</span>
                <span class="item-result">{{ item.result }}</span>
                <span class="item-standard">标准：{{ item.standard }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 认证机构 -->
      <section class="organization-section">
        <h3>认证机构</h3>
        <div class="organization-list">
          <div v-for="org in certificationBodies"
               :key="org.id"
               class="organization-card">
            <div class="org-header">
              <h4>{{ org.name }}</h4>
              <span class="org-code">机构代码：{{ org.code }}</span>
            </div>
            <div class="org-content">
              <div class="info-row">
                <span class="label">地址</span>
                <span class="value">{{ org.address }}</span>
              </div>
              <div class="info-row">
                <span class="label">联系方式</span>
                <span class="value">{{ org.contact }}</span>
              </div>
              <div class="info-row">
                <span class="label">认证范围</span>
                <span class="value">{{ org.scope.join('、') }}</span>
              </div>
              <div class="info-row">
                <span class="label">资质认可</span>
                <span class="value">{{ org.qualification }}</span>
              </div>
              <div class="info-row">
                <span class="label">有效期至</span>
                <span class="value">{{ org.validUntil }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <button class="btn primary" @click="generateQRCode">
          生成溯源二维码
        </button>
        <button class="btn secondary" @click="exportReport">
          导出溯源报告
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 使用与其他溯源视图相同的基础样式 */
.certification-trace {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.content {
  display: grid;
  gap: 24px;
}

section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 24px;
}

h3 {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 8px;
  border-bottom: 2px solid #4CAF50;
}

h4 {
  font-size: 1.1rem;
  color: #2c3e50;
  margin: 0;
}

.label {
  color: #666;
  font-size: 0.9rem;
}

.value {
  color: #2c3e50;
  font-weight: 500;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.action-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 24px;
}

.btn {
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn.primary {
  background: #4CAF50;
  color: white;
}

.btn.secondary {
  background: #f8f9fa;
  color: #2c3e50;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 认证信息特有样式 */
.certification-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.certification-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cert-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.cert-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cert-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.cert-status.valid {
  background: #e8f5e9;
  color: #4caf50;
}

.cert-status.expired {
  background: #ffebee;
  color: #f44336;
}

.view-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background: #e3f2fd;
  color: #2196f3;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-btn:hover {
  background: #2196f3;
  color: white;
}

.cert-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

/* 检测报告特有样式 */
.report-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.report-no {
  color: #666;
  font-size: 0.9rem;
}

.test-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.test-item {
  background: white;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.test-item.pass {
  border-left: 4px solid #4caf50;
}

.test-item.fail {
  border-left: 4px solid #f44336;
}

.item-result {
  font-weight: 500;
  color: #2c3e50;
}

.item-standard {
  color: #666;
  font-size: 0.9rem;
}

/* 认证机构特有样式 */
.organization-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.org-header {
  margin-bottom: 16px;
}

.org-code {
  color: #666;
  font-size: 0.9rem;
}

.org-content {
  display: grid;
  gap: 12px;
}

/* 深色模式特有样式 */
@media (prefers-color-scheme: dark) {
  h2 {
    color: #fff;
  }

  h3, h4 {
    color: #fff;
  }

  section {
    background: #2d2d2d;
  }

  .value {
    color: #fff;
  }

  .label {
    color: #bbb;
  }

  .info-row {
    border-color: #333;
  }

  .btn.secondary {
    background: #1a1a1a;
    color: #fff;
  }

  .certification-card,
  .report-card,
  .organization-card {
    background: #1a1a1a;
    border: 1px solid #333;
  }

  .test-item {
    background: #2d2d2d;
  }

  .item-result {
    color: #fff;
  }

  .item-standard,
  .report-no,
  .org-code {
    color: #bbb;
  }

  .view-btn {
    background: #1a2b3c;
  }

  .view-btn:hover {
    background: #2196f3;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .certification-trace {
    padding: 16px;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  section {
    padding: 16px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .cert-content,
  .test-items {
    grid-template-columns: 1fr;
  }

  .cert-header,
  .report-header {
    flex-direction: column;
    gap: 12px;
  }

  .view-btn {
    width: 100%;
  }
}
</style> 