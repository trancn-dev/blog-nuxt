<template>
  <nav class="navbar">
    <div class="container">
      <div class="nav-content">
        <NuxtLink to="/" class="logo">
          <span class="logo-icon">👨‍💻</span>
          <span class="logo-text">Portfolio</span>
        </NuxtLink>

        <button class="mobile-toggle" @click="mobileMenuOpen = !mobileMenuOpen">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul class="nav-links" :class="{ 'mobile-open': mobileMenuOpen }">
          <li><NuxtLink to="/" @click="closeMobileMenu">Trang chủ</NuxtLink></li>
          <li><a href="/#about" @click="closeMobileMenu">Về tôi</a></li>
          <li><a href="/#projects" @click="closeMobileMenu">Dự án</a></li>
          <li><NuxtLink to="/posts" @click="closeMobileMenu">Blog</NuxtLink></li>
          <li><a href="/#contact" @click="closeMobileMenu">Liên hệ</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
const mobileMenuOpen = ref(false)

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<style scoped>
.navbar {
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
  text-decoration: none;
}

.logo-icon {
  font-size: 2rem;
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.mobile-toggle span {
  width: 25px;
  height: 3px;
  background: #667eea;
  border-radius: 2px;
  transition: all 0.3s;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  position: relative;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #667eea;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 0;
  height: 2px;
  background: #667eea;
  transition: width 0.3s;
}

.nav-links a:hover::after,
.nav-links a.router-link-active::after {
  width: 100%;
}

@media (max-width: 768px) {
  .mobile-toggle {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 4rem;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    gap: 0;
    padding: 1rem 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
  }

  .nav-links.mobile-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-links li {
    padding: 1rem 0;
    border-bottom: 1px solid #e5e7eb;
  }

  .nav-links li:last-child {
    border-bottom: none;
  }

  .nav-links a::after {
    display: none;
  }
}
</style>
