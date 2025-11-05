<template>
  <section class="story-section">
    <!-- Animated Blobs -->
    <div class="blob blob-6"></div>
    <div class="blob blob-7"></div>

    <div class="container">
      <div class="story-content">
        <div class="story-illustration">
          <div class="www-graphic">
            <div class="browser-window">
              <div class="browser-header"></div>
              <div class="browser-content"></div>
            </div>
          </div>
        </div>
        <div class="story-text">
          <span class="subtitle-badge">Giải Pháp Tuyệt Đối</span>
          <h2 class="story-title">Câu chuyện chuyên đổi dịch vụ lưu trữ web thành công</h2>
          <p class="story-description">
            Chúng tôi được chắc rằng bạn sẽ nhận được một dịch vụ tuyệt vời cùng các gói
            dịch vụ web hosting chất lượng cao. Do đó các gói dịch vụ sẽ đáp ứng được
            tất cả các nhu cầu hiện tại và cả tương lai của bạn
          </p>
          <ul class="story-features">
            <li><span class="check-icon">✓</span> Sử dụng và bảo trì các máy chủ</li>
            <li><span class="check-icon">✓</span> Khách hàng thành công chuẩn trên bảo mật</li>
            <li><span class="check-icon">✓</span> Thực hiện thanh toán hàng tháng hoặc hàng năm</li>
          </ul>
          <button class="btn-cta">Tìm hiểu ➔</button>
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

.blob-6 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.3) 0%, rgba(255, 140, 66, 0.3) 100%);
  top: -50px;
  right: -80px;
  animation-delay: 3s;
}

.blob-7 {
  width: 350px;
  height: 350px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%);
  bottom: -100px;
  left: 10%;
  animation-delay: 8s;
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

/* Story Section */
.story-section {
  padding: 5rem 0;
  background: #f8f9fa;
  position: relative;
  overflow: hidden;
}

.story-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.story-illustration {
  position: relative;
  height: 400px;
  animation: floatSlow 6s ease-in-out infinite;
}

@keyframes floatSlow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.www-graphic {
  position: relative;
  width: 100%;
  height: 100%;
}

.browser-window {
  width: 80%;
  height: 250px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 10%;
  top: 50%;
  transform: translateY(-50%) perspective(1000px) rotateY(-10deg);
  animation: browserPulse 3s ease-in-out infinite;
}

@keyframes browserPulse {
  0%, 100% {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
  50% {
    box-shadow: 0 20px 50px rgba(102, 126, 234, 0.4);
  }
}

.browser-header {
  height: 30px;
  background: #e0e0e0;
  border-radius: 10px 10px 0 0;
}

.browser-content {
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: calc(100% - 30px);
}

.subtitle-badge {
  display: inline-block;
  background: #fff3e0;
  color: #ff8c42;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.story-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  line-height: 1.4;
}

.story-description {
  color: #666;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.story-features {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.story-features li {
  padding: 0.5rem 0;
  color: #444;
  font-size: 1rem;
}

.check-icon {
  color: #4caf50;
  margin-right: 0.5rem;
  font-weight: 700;
}

.btn-cta {
  background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
  color: white;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.btn-cta:hover::before {
  left: 100%;
}

.btn-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 107, 53, 0.4);
}

@media (max-width: 768px) {
  .story-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .story-title {
    font-size: 1.75rem;
  }

  .story-illustration {
    height: 300px;
  }
}
</style>
