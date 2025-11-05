<template>
  <section class="hero">
    <!-- Animated Blobs -->
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>

    <!-- Floating Particles -->
    <div class="particle particle-1"></div>
    <div class="particle particle-2"></div>
    <div class="particle particle-3"></div>
    <div class="particle particle-4"></div>
    <div class="particle particle-5"></div>
    <div class="particle particle-6"></div>

    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">Thiết kế website chuyên nghiệp & giải pháp phần mềm</h1>
          <p class="hero-subtitle">
            DYCA là đơn vị chuyên tạo lập & thiết kế website, hướng dẫn chạy quảng cáo để bán
            hàng, tối ưu từ khóa & nội dung SEO, đăng ký tên miền, cho thuê/bán thiết kế giao
            diện web, kích tăng khách hàng tiềm năng
          </p>
          <button class="btn-cta">Đăng ký ngay</button>
        </div>
        <div class="hero-illustration">
          <div class="illustration-3d">
            <div class="server-stack">
              <div class="server-item"></div>
              <div class="server-item"></div>
              <div class="server-item"></div>
            </div>
            <div class="data-circle"></div>
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

.blob-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.4) 0%, rgba(118, 75, 162, 0.4) 100%);
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.blob-2 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.3) 0%, rgba(255, 140, 66, 0.3) 100%);
  top: 50%;
  right: -150px;
  animation-delay: 5s;
}

.blob-3 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.4) 0%, rgba(53, 122, 189, 0.4) 100%);
  bottom: -50px;
  left: 20%;
  animation-delay: 10s;
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

/* Floating Particles */
.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  opacity: 0.6;
  animation: particleFloat 15s ease-in-out infinite;
}

.particle-1 {
  width: 8px;
  height: 8px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.particle-2 {
  width: 12px;
  height: 12px;
  top: 40%;
  left: 80%;
  animation-delay: 2s;
}

.particle-3 {
  width: 6px;
  height: 6px;
  top: 60%;
  left: 15%;
  animation-delay: 4s;
}

.particle-4 {
  width: 10px;
  height: 10px;
  top: 30%;
  left: 70%;
  animation-delay: 1s;
}

.particle-5 {
  width: 8px;
  height: 8px;
  top: 80%;
  left: 50%;
  animation-delay: 3s;
}

.particle-6 {
  width: 14px;
  height: 14px;
  top: 15%;
  left: 45%;
  animation-delay: 5s;
}

@keyframes particleFloat {
  0%, 100% {
    transform: translateY(0) translateX(0);
    opacity: 0.6;
  }
  25% {
    transform: translateY(-100px) translateX(50px);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-200px) translateX(-30px);
    opacity: 0.4;
  }
  75% {
    transform: translateY(-150px) translateX(80px);
    opacity: 0.9;
  }
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #001e6c 0%, #003cc5 50%, #0055ff 100%);
  color: white;
  padding: 5rem 0;
  position: relative;
  overflow: hidden;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-text {
  animation: fadeInUp 1s ease-out;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 1.5rem;
  animation: slideInLeft 1s ease-out;
}

.hero-subtitle {
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  opacity: 0.95;
  animation: slideInLeft 1s ease-out 0.2s backwards;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
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

.hero-illustration {
  position: relative;
  height: 400px;
}

.illustration-3d {
  position: relative;
  width: 100%;
  height: 100%;
}

.server-stack {
  position: absolute;
  right: 20%;
  top: 50%;
  transform: translateY(-50%);
}

.server-item {
  width: 150px;
  height: 30px;
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  margin-bottom: 1rem;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  animation: float 3s ease-in-out infinite;
}

.server-item:nth-child(2) {
  animation-delay: 0.5s;
}

.server-item:nth-child(3) {
  animation-delay: 1s;
}

.data-circle {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.3) 0%, rgba(53, 122, 189, 0.3) 100%);
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.3);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: translateY(-50%) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-50%) scale(1.1);
    opacity: 0.8;
  }
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .hero-title {
    font-size: 1.75rem;
  }

  .hero-illustration {
    height: 300px;
  }
}
</style>
