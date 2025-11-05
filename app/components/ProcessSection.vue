<template>
  <section class="process-section">
    <div class="container">
      <h2 class="section-title">Xây dựng trang web chuyên nghiệp, hoàn chỉnh của bạn chỉ trong vài ngày</h2>
      <p class="section-subtitle">
        Nhận thiết kế website chuyên nghiệp theo yêu cầu khách hàng trong thời gian nhanh chóng,
        với đội ngũ lập trình viên có tay nghề cao để đảm bảo chất lượng sản phẩm.
      </p>

      <div class="process-content">
        <ul class="process-steps">
          <li>
            <div class="step-icon">1</div>
            <div class="step-text">
              <strong>Khảo sát đặc:</strong> Liên hệ gọi quý khách để hiểu rõ nhu cầu
            </div>
          </li>
          <li>
            <div class="step-icon">2</div>
            <div class="step-text">
              <strong>Tiệm tế chẵng:</strong> Theo tiệm chồng cấp gói danh tay nghề thời gian
            </div>
          </li>
          <li>
            <div class="step-icon">3</div>
            <div class="step-text">
              <strong>Thiết kế - Bảo mật:</strong> Chúng tôi áp dụng theo web tiếp tay
            </div>
          </li>
          <li>
            <div class="step-icon">4</div>
            <div class="step-text">
              <strong>Sự hành đầu - Bảo mật:</strong> Chúng tôi áp cung thanh toán quy trình
            </div>
          </li>
          <li>
            <div class="step-icon">5</div>
            <div class="step-text">
              <strong>Hoàn thiện, bàn giao và hỗ trợ dài hạn</strong>
            </div>
          </li>
        </ul>

        <div class="process-illustration">
          <div class="laptop-graphic">
            <div class="laptop-screen"></div>
          </div>
        </div>
      </div>

      <button class="btn-cta">Liên hệ ngay ➔</button>
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Process Section */
.process-section {
  padding: 5rem 0;
  background: white;
  text-align: center;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.section-subtitle {
  max-width: 800px;
  margin: 0 auto 3rem;
  color: #666;
  line-height: 1.8;
}

.process-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin: 3rem 0;
  text-align: left;
}

.process-steps {
  list-style: none;
  padding: 0;
}

.process-steps li {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: flex-start;
}

.step-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.step-text {
  flex: 1;
  color: #444;
  line-height: 1.6;
}

.process-illustration {
  position: relative;
  height: 400px;
}

.laptop-graphic {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.laptop-screen {
  width: 80%;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
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
  .process-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .process-illustration {
    height: 300px;
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>
