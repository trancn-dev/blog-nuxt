<template>
  <section class="pricing-section">
    <!-- Animated Blobs -->
    <div class="blob blob-4"></div>
    <div class="blob blob-5"></div>

    <div class="container">
      <h2 class="section-title">Bảng giá dịch vụ thiết kế website DYCA</h2>

      <div class="pricing-tabs">
        <button class="tab-btn active">Website</button>
        <button class="tab-btn">Landing Page</button>
      </div>

      <div class="pricing-grid">
        <!-- Gói Bắt đầu -->
        <div class="pricing-card">
          <div class="price-badge badge-basic">Gói Bắt đầu</div>
          <div class="price-amount">
            <span class="currency">Từ</span> 5.00.000đ
          </div>
          <p class="price-desc">Website căn bản cơ bản</p>
          <ul class="features-list">
            <li><span class="check">✓</span> Thiết kế theo website mẫu sẵn có</li>
            <li><span class="check">✓</span> Website chuẩn SEO</li>
            <li><span class="check">✓</span> Hỗ trợ 5 link</li>
            <li><span class="check">✓</span> Load tốc độ chuẩn</li>
            <li><span class="check">✓</span> Giao diện thân thiện và UX/UX</li>
            <li><span class="check">✓</span> Tối ưu giao diện trong trang</li>
            <li><span class="check">✓</span> Tối ưu giao diện điện thoại</li>
            <li><span class="check">✓</span> Hệ thống quản trị đơn giản</li>
            <li><span class="check">✓</span> Hệ thống 3 email chuyên nghiệp</li>
            <li><span class="check">✓</span> Hỗ trợ kỹ thuật miễn phí 6 tháng</li>
          </ul>
          <button class="btn-order">Đặt ngay</button>
        </div>

        <!-- Gói Chuyên nghiệp -->
        <div class="pricing-card featured">
          <div class="price-badge badge-pro">Chuyên nghiệp</div>
          <div class="price-amount">
            <span class="currency">Từ</span> 8.000.000đ
          </div>
          <p class="price-desc">Website cao cấp chuyên nghiệp</p>
          <ul class="features-list">
            <li><span class="check">✓</span> Thiết kế theo yêu cầu khách hàng</li>
            <li><span class="check">✓</span> Website chuẩn SEO</li>
            <li><span class="check">✓</span> Hỗ trợ đa link</li>
            <li><span class="check">✓</span> Load tốc độ nhanh</li>
            <li><span class="check">✓</span> Giao diện thân thiện và UX/UX</li>
            <li><span class="check">✓</span> Tối ưu giao diện trang ngoài</li>
            <li><span class="check">✓</span> Tối ưu giao diện điện thoại</li>
            <li><span class="check">✓</span> Hệ thống quản trị đa năng</li>
            <li><span class="check">✓</span> Hệ thống 5 email chuyên nghiệp</li>
            <li><span class="check">✓</span> Hỗ trợ kỹ thuật miễn phí 1 năm</li>
          </ul>
          <button class="btn-order">Đặt ngay</button>
        </div>

        <!-- Gói Nhận tư vấn -->
        <div class="pricing-card">
          <div class="price-badge badge-custom">Nhận hẹ vấn</div>
          <div class="price-amount">
            <span class="currency">Nhận tư vấn</span>
          </div>
          <p class="price-desc">Thiết kế website theo yêu cầu</p>
          <ul class="features-list">
            <li><span class="check">✓</span> Thiết kế theo yêu cầu đặc biệt</li>
            <li><span class="check">✓</span> Website chuẩn SEO</li>
            <li><span class="check">✓</span> Hỗ trợ đa link</li>
            <li><span class="check">✓</span> Load tốc độ cao</li>
            <li><span class="check">✓</span> Giao diện thân thiện và UX/UX</li>
            <li><span class="check">✓</span> Tối ưu giao diện trong trang</li>
            <li><span class="check">✓</span> Tối ưu giao diện điện thoại</li>
            <li><span class="check">✓</span> Hệ thống quản trị nâng cao</li>
            <li><span class="check">✓</span> Hệ thống email không giới hạn</li>
            <li><span class="check">✓</span> Hỗ trợ kỹ thuật miễn phí dài hạn</li>
          </ul>
          <button class="btn-order">Đặt ngay</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Animated Blobs */
.blob {
  position: absolute;
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  filter: blur(40px);
  opacity: 0.7;
  z-index: 0;
  animation: blob-animation 20s ease-in-out infinite;
}

.blob-4 {
  width: 350px;
  height: 350px;
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.25) 0%, rgba(255, 140, 66, 0.25) 100%);
  top: 10%;
  right: 5%;
  animation-delay: 2s;
}

.blob-5 {
  width: 450px;
  height: 450px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.25) 0%, rgba(118, 75, 162, 0.25) 100%);
  bottom: -100px;
  left: -100px;
  animation-delay: 7s;
}

@keyframes blob-animation {
  0%, 100% {
    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
    transform: translate(0, 0) scale(1);
  }
  25% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    transform: translate(30px, -50px) scale(1.1);
  }
  50% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
    transform: translate(-20px, 20px) scale(0.9);
  }
  75% {
    border-radius: 70% 30% 50% 50% / 30% 70% 50% 60%;
    transform: translate(50px, 30px) scale(1.05);
  }
}

/* Pricing Section */
.pricing-section {
  padding: 5rem 0;
  background: #f8f9fa;
  position: relative;
  overflow: hidden;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #1a1a1a;
  position: relative;
  z-index: 1;
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.pricing-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.tab-btn {
  padding: 0.75rem 2rem;
  border: none;
  background: white;
  border-radius: 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-btn.active {
  background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
  color: white;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.pricing-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  animation: slideInUp 0.6s ease-out backwards;
}

.pricing-card:nth-child(1) {
  animation-delay: 0.1s;
}

.pricing-card:nth-child(2) {
  animation-delay: 0.2s;
}

.pricing-card:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.pricing-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.pricing-card.featured {
  border: 3px solid #ff6b35;
  transform: scale(1.05);
}

.price-badge {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.badge-basic {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.badge-pro {
  background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
  color: white;
}

.badge-custom {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
}

.price-amount {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.currency {
  font-size: 1rem;
  font-weight: 400;
}

.price-desc {
  color: #666;
  margin-bottom: 1.5rem;
}

.features-list {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.features-list li {
  padding: 0.5rem 0;
  color: #444;
  font-size: 0.9rem;
}

.check {
  color: #4caf50;
  margin-right: 0.5rem;
  font-weight: 700;
}

.btn-order {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-order:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .pricing-grid {
    grid-template-columns: 1fr;
  }

  .pricing-card.featured {
    transform: scale(1);
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>
