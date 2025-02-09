import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CollectionView from '../views/big-data/CollectionView.vue'
import EnvironmentDataView from '../views/big-data/environment/EnvironmentDataView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      children: [
        {
          path: 'overview',
          name: 'dashboardOverview',
          component: () => import('../views/dashboard/OverviewView.vue')
        },
        {
          path: 'monitor',
          name: 'dashboardMonitor',
          component: () => import('../views/dashboard/MonitorView.vue')
        },
        {
          path: 'analysis',
          name: 'dashboardAnalysis',
          component: () => import('../views/dashboard/AnalysisView.vue')
        }
      ]
    },
    {
      path: '/smart-farm',
      name: 'smart-farm',
      component: () => import('../views/SmartFarmView.vue'),
      children: [
        {
          path: 'sensor',
          name: 'sensor',
          component: () => import('../views/smart-farm/SensorView.vue')
        },
        {
          path: 'data',
          name: 'data',
          component: () => import('../views/smart-farm/DataView.vue')
        },
        {
          path: 'operation',
          name: 'operation',
          component: () => import('../views/smart-farm/OperationView.vue')
        },
        {
          path: 'definition',
          name: 'definition',
          component: () => import('../views/smart-farm/DefinitionView.vue')
        },
        {
          path: 'architecture',
          name: 'architecture',
          component: () => import('../views/smart-farm/ArchitectureView.vue')
        },
        {
          path: 'technical',
          name: 'technical',
          component: () => import('../views/smart-farm/TechnicalView.vue')
        }
      ]
    },
    {
      path: '/big-data',
      name: 'bigData',
      component: () => import('../views/BigDataView.vue'),
      children: [
        {
          path: 'collection',
          name: 'collection',
          component: CollectionView
        },
        {
          path: 'collection/environment',
          name: 'environmentData',
          component: () => import('../views/big-data/environment/EnvironmentDataView.vue')
        },
        {
          path: 'collection/video',
          name: 'videoData',
          component: () => import('../views/big-data/video/VideoDataView.vue')
        },
        {
          path: 'collection/device',
          name: 'DeviceData',
          component: () => import('../views/big-data/device/DeviceDataView.vue'),
        },
        {
          path: 'analysis',
          name: 'analysis',
          component: () => import('../views/big-data/AnalysisView.vue')
        },
        {
          path: 'analysis/trend',
          name: 'trendAnalysis',
          component: () => import('../views/big-data/analysis/TrendAnalysisView.vue')
        },
        {
          path: 'service',
          name: 'service',
          component: () => import('../views/big-data/ServiceView.vue')
        },
        {
          path: 'collection/manual',
          name: 'manualData',
          component: () => import('../views/big-data/manual/ManualDataView.vue')
        },
        {
          path: 'analysis/intelligent-analytics',
          name: 'intelligentAnalytics',
          component: () => import('../views/big-data/analysis/IntelligentAnalyticsView.vue')
        }
      ]
    },
    {
      path: '/smart-operation',
      name: 'smartOperation',
      component: () => import('../views/SmartOperationView.vue'),
      children: [
        {
          path: 'environment',
          name: 'environment',
          component: () => import('../views/smart-operation/EnvironmentView.vue')
        },
        {
          path: 'equipment',
          name: 'equipment',
          component: () => import('../views/smart-operation/EquipmentView.vue')
        },
        {
          path: 'records',
          name: 'records',
          component: () => import('../views/smart-operation/RecordsView.vue')
        }
      ]
    },
    {
      path: '/digital-planting',
      name: 'digitalPlanting',
      component: () => import('../views/DigitalPlantingView.vue'),
      children: [
        {
          path: 'planting',
          name: 'planting',
          component: () => import('../views/digital-planting/PlantingView.vue')
        },
        {
          path: 'standard',
          name: 'standard',
          component: () => import('../views/digital-planting/StandardView.vue')
        },
        {
          path: 'irrigation',
          name: 'irrigation',
          component: () => import('../views/digital-planting/IrrigationView.vue')
        }
      ]
    },
    {
      path: '/product-trace',
      name: 'productTrace',
      component: () => import('../views/ProductTraceView.vue'),
      children: [
        {
          path: 'planting',
          name: 'tracePlanting',
          component: () => import('../views/product-trace/PlantingTraceView.vue')
        },
        {
          path: 'processing',
          name: 'traceProcessing',
          component: () => import('../views/product-trace/ProcessingTraceView.vue')
        },
        {
          path: 'logistics',
          name: 'traceLogistics',
          component: () => import('../views/product-trace/LogisticsTraceView.vue')
        },
        {
          path: 'certification',
          name: 'traceCertification',
          component: () => import('../views/product-trace/CertificationView.vue')
        }
      ]
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/ServicesView.vue'),
      children: [
        {
          path: '',
          name: 'servicesHome',
          component: () => import('../views/ServicesView.vue')
        },
        {
          path: 'about',
          name: 'servicesAbout',
          component: () => import('../views/services/AboutView.vue')
        },
        {
          path: 'knowledge',
          name: 'servicesKnowledge',
          component: () => import('../views/services/KnowledgeView.vue')
        },
        {
          path: 'farmer',
          name: 'servicesFarmer',
          component: () => import('../views/services/FarmerView.vue')
        },
        {
          path: 'experts',
          name: 'servicesExperts',
          component: () => import('../views/services/ExpertsView.vue')
        },
        {
          path: 'message',
          name: 'servicesMessage',
          component: () => import('../views/services/MessageView.vue')
        },
        {
          path: 'qa',
          name: 'servicesQA',
          component: () => import('../views/services/QAView.vue')
        },
        {
          path: 'video',
          name: 'servicesVideo',
          component: () => import('../views/services/VideoView.vue')
        },
        {
          path: 'visualization',
          name: 'servicesVisualization',
          component: () => import('../views/services/VisualizationView.vue')
        }
      ]
    },
    {
      path: '/science',
      name: 'science',
      component: () => import('../views/ScienceView.vue'),
      children: [
        {
          path: '',
          name: 'scienceHome',
          component: () => import('../views/ScienceView.vue')
        },
        {
          path: 'development',
          name: 'scienceDevelopment',
          component: () => import('../views/science/DevelopmentView.vue')
        },
        {
          path: 'greenhouse',
          name: 'scienceGreenhouse',
          component: () => import('../views/science/GreenhouseView.vue')
        },
        {
          path: 'knowledge',
          name: 'scienceKnowledge',
          component: () => import('../views/science/KnowledgeView.vue')
        },
        {
          path: 'culture',
          name: 'scienceCulture',
          component: () => import('../views/science/CultureView.vue')
        },
        {
          path: 'machinery',
          name: 'scienceMachinery',
          component: () => import('../views/science/MachineryView.vue')
        },
        {
          path: 'materials',
          name: 'scienceMaterials',
          component: () => import('../views/science/MaterialsView.vue')
        },
        {
          path: 'videos',
          name: 'scienceVideos',
          component: () => import('../views/science/VideosView.vue')
        }
      ]
    },
    {
      path: '/education',
      name: 'education',
      component: () => import('../views/EducationView.vue')
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/ShopView.vue')
    },
  ]
})

export default router 