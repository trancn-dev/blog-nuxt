<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- Company Info -->
        <div class="footer-section">
          <h3 class="footer-logo">DYCA</h3>
          <p class="footer-desc">
            DYCA là đơn vị chuyên về thiết kế và lập trình website chuyên nghiệp, uy tín với đội ngũ giàu kinh nghiệm.
            Luôn mang tới cho khách hàng sự hài lòng tốt nhất.
          </p>
          <div class="contact-info">
            <p><strong>Theo dõi chúng tôi</strong></p>
            <div class="social-links">
              <a href="#" class="social-icon facebook">f</a>
              <a href="#" class="social-icon twitter">t</a>
              <a href="#" class="social-icon youtube">▶</a>
            </div>
          </div>
        </div>

        <!-- Thông tin Chung -->
        <div class="footer-section">
          <h4 class="footer-title">Thông tin Chung</h4>
          <ul class="footer-links">
            <li><a href="#">Về DYCA</a></li>
            <li><a href="#">Chính sách bảo mật</a></li>
            <li><a href="#">Điều khoản dịch vụ</a></li>
          </ul>
        </div>

        <!-- Dịch vụ của chúng tôi -->
        <div class="footer-section">
          <h4 class="footer-title">Dịch vụ của chúng tôi</h4>
          <ul class="footer-links">
            <li><a href="#">Dịch vụ hosting</a></li>
            <li><a href="#">Thiết kế website</a></li>
            <li><a href="#">SEO & Marketing</a></li>
          </ul>
        </div>

        <!-- Phương thức thanh toán -->
        <div class="footer-section">
          <h4 class="footer-title">Phương thức thanh toán</h4>
          <div class="payment-methods">
            <div class="payment-icon visa">VISA</div>
            <div class="payment-icon mastercard">MC</div>
            <div class="payment-icon jcb">JCB</div>
          </div>
          <!-- Chat Widget -->
          <div class="chat-widget">
            <div class="chat-bubble">
              <span class="chat-icon">💬</span>
              <div class="chat-text">
                <p><strong>DYCA - Chat để được tư vấn</strong></p>
                <p>Chào mừng bạn! Bạn cần được tư vấn về dịch vụ gì?</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="footer-bottom">
        <p>Copyright ©2024 DYCA All Rights Reserved</p>
      </div>
    </div>

    <!-- Floating Chat Button -->
    <div class="floating-chat">
      <button class="chat-button">💬</button>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(135deg, #001e6c 0%, #003cc5 100%);
  color: white;
  padding: 4rem 0 2rem;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-logo {
  font-size: 2rem;
  font-weight: 700;
  color: white;
}

.footer-desc {
  line-height: 1.8;
  opacity: 0.9;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.contact-info {
  margin-top: 2rem;
}

.social-links {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  font-weight: 700;
  transition: transform 0.2s;
}

.social-icon.facebook {
  background: #3b5998;
}

.social-icon.twitter {
  background: #1da1f2;
}

.social-icon.youtube {
  background: #ff0000;
}

.social-icon:hover {
  transform: scale(1.1);
}

.footer-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1.5rem;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.2s;
  font-size: 0.95rem;
}

.footer-links a:hover {
  color: white;
}

.payment-methods {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.payment-icon {
  padding: 0.5rem 1rem;
  background: white;
  color: #001e6c;
  border-radius: 0.25rem;
  font-weight: 700;
  font-size: 0.9rem;
}

.chat-widget {
  margin-top: 2rem;
}

.chat-bubble {
  background: white;
  color: #1a1a1a;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  gap: 0.75rem;
}

.chat-icon {
  font-size: 1.5rem;
}

.chat-text p {
  margin: 0.25rem 0;
  font-size: 0.85rem;
  line-height: 1.4;
}

.chat-text strong {
  color: #001e6c;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 2rem;
  text-align: center;
}

.footer-bottom p {
  opacity: 0.8;
  font-size: 0.9rem;
}

.floating-chat {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
}

.chat-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
  border: none;
  color: white;
  font-size: 1.75rem;
  cursor: pointer;
  box-shadow: 0 5px 20px rgba(255, 107, 53, 0.4);
  transition: transform 0.2s;
  animation: bounce 2s ease-in-out infinite;
}

.chat-button:hover {
  transform: scale(1.1);
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (max-width: 968px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

@media (max-width: 568px) {
  .footer-content {
    grid-template-columns: 1fr;
  }

  .floating-chat {
    bottom: 1rem;
    right: 1rem;
  }

  .chat-button {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
}
</style>
