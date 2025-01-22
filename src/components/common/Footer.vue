<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h4>联系我们</h4>
        <p>📍 地址：山东省泰安市泰山区</p>
        <p>📞 电话：025-12345678</p>
        <p>📧 邮箱：contact@smartfarm.com</p>
      </div>
      
      <div class="footer-section">
        <h4>快速链接</h4>
        <ul>
          <li><router-link to="/about">关于我们</router-link></li>
          <li><router-link to="/services">综合服务</router-link></li>
          <li><router-link to="/science">科普栏目</router-link></li>
          <li><router-link to="/product-trace">产品溯源</router-link></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h4>关注我们</h4>
        <div class="social-links">
          <span>📱 微信公众号：智慧农场</span>
          <span>💼 商务合作：business@smartfarm.com</span>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} 智慧农业科技有限公司 版权所有</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #f8f9fa;
  padding: 40px 20px 20px;
  margin-top: 40px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
}

.footer-section h4 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.footer-section p {
  color: #666;
  margin: 10px 0;
  font-size: 0.95rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin: 10px 0;
}

.footer-section ul li a {
  color: #666;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section ul li a:hover {
  color: #4CAF50;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #666;
}

.footer-bottom {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  color: #666;
  font-size: 0.9rem;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .footer {
    background: #1a1a1a;
  }

  .footer-section h4 {
    color: #e5eaf3;
  }

  .footer-section p,
  .footer-section ul li a,
  .social-links,
  .footer-bottom {
    color: #bbb;
  }

  .footer-section ul li a:hover {
    color: #81c784;
  }

  .footer-bottom {
    border-color: #333;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer {
    padding: 30px 16px 16px;
    margin-top: 30px;
  }

  .footer-content {
    gap: 30px;
  }

  .footer-section {
    text-align: center;
  }

  .social-links {
    align-items: center;
  }
}
</style> 