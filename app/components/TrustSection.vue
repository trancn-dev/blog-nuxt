<template>
  <section class="trust-section">
    <!-- Animated Blobs -->
    <div class="blob blob-8"></div>
    <div class="blob blob-9"></div>
    <div class="blob blob-10"></div>

    <div class="container">
      <div class="trust-content">
        <div class="trust-illustration">
          <div class="server-3d">
            <div class="server-tower"></div>
          </div>
        </div>
        <div class="trust-text">
          <h2 class="trust-title">Chúng tôi tự tin là đơn vị cung cấp giải pháp lưu trữ mạnh mẽ và tối nhất</h2>
          <p class="trust-description">
            DYCA đang khẳng định sự tự hào về những tài nguyên về việc cung cấp
            dịch vụ chuyên nghiệp nhanh và có tần xuất hoạt động tốt
          </p>
          <div class="trust-stats">
            <div class="stat-row">
              <div class="stat-item">
                <span class="stat-icon">✓</span>
                <span class="stat-text">Sử dụng free SSL certificate</span>
              </div>
              <div class="stat-item">
                <span class="stat-icon">✓</span>
                <span class="stat-text">Dịch khách hàng thực hậu website</span>
              </div>
            </div>
            <div class="stat-row">
              <div class="stat-item">
                <span class="stat-icon">✓</span>
                <span class="stat-text">Sử dụng phần cứng chất lượng</span>
              </div>
              <div class="stat-item">
                <span class="stat-icon">✓</span>
                <span class="stat-text">Dịch khách hàng thực hậu hosting</span>
              </div>
            </div>
          </div>
          <div class="percentage-stats">
            <div class="percentage-item">
              <div class="percentage-value">85%</div>
              <p class="percentage-label">Trong một tả dịch dầy được thực hiện bởi các trạng thái theo khăng</p>
            </div>
            <div class="percentage-item">
              <div class="percentage-value">85%</div>
              <p class="percentage-label">Trong nghiên cứm đang là các ngành đã các trình nghiệm</p>
            </div>
          </div>
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

.blob-8 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.25) 0%, rgba(53, 122, 189, 0.25) 100%);
  top: -150px;
  left: -100px;
  animation-delay: 4s;
}

.blob-9 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.25) 0%, rgba(255, 140, 66, 0.25) 100%);
  top: 50%;
  right: -100px;
  animation-delay: 9s;
}

.blob-10 {
  width: 350px;
  height: 350px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.25) 0%, rgba(118, 75, 162, 0.25) 100%);
  bottom: 10%;
  left: 50%;
  animation-delay: 6s;
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

/* Trust Section */
.trust-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #001e6c 0%, #003cc5 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.trust-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.trust-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.4;
  animation: fadeInLeft 1s ease-out;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.trust-description {
  opacity: 0.9;
  line-height: 1.8;
  margin-bottom: 2rem;
  animation: fadeInLeft 1s ease-out 0.2s backwards;
}

.trust-stats {
  margin-bottom: 2rem;
  animation: fadeInLeft 1s ease-out 0.4s backwards;
}

.stat-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateX(10px);
}

.stat-icon {
  color: #4caf50;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

.percentage-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

.percentage-value {
  font-size: 3rem;
  font-weight: 700;
  color: #ff8c42;
  margin-bottom: 0.5rem;
  animation: countUp 2s ease-out, glow 2s ease-in-out infinite;
}

@keyframes countUp {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes glow {
  0%, 100% {
    text-shadow: 0 0 5px rgba(255, 140, 66, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(255, 140, 66, 0.8), 0 0 30px rgba(255, 140, 66, 0.6);
  }
}

.percentage-label {
  font-size: 0.9rem;
  opacity: 0.9;
  line-height: 1.6;
}

.trust-illustration {
  position: relative;
  height: 400px;
}

.server-3d {
  position: relative;
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .trust-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .trust-title {
    font-size: 1.75rem;
  }

  .trust-illustration {
    height: 300px;
  }

  .percentage-stats,
  .stat-row {
    grid-template-columns: 1fr;
  }
}
</style>
