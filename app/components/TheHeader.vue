<template>
  <header class="header">
    <!-- Top Banner -->
    <!-- <div class="banner" v-if="showBanner">
      <img :src="bannerImage" alt="Banner" class="banner-image" />
      <button class="banner-close" @click="showBanner = false">&times;</button>
    </div> -->

    <!-- Main Header -->
    <div class="header-main">
      <div class="container">
        <div class="header-content">
          <!-- Logo -->
          <NuxtLink to="/" class="logo">
            <img :src="logo" alt="Logo" class="logo-image" />
          </NuxtLink>

          <!-- Navigation -->
          <nav class="nav">
            <NuxtLink to="/creator" class="nav-link"
              >NHÀ SÁNG TẠO NỘI DUNG</NuxtLink
            >
            <NuxtLink to="/posts" class="nav-link active">MỚI NHẤT</NuxtLink>
            <NuxtLink to="/series" class="nav-link">SERIES</NuxtLink>
            <NuxtLink to="/editors-choice" class="nav-link"
              >EDITORS' CHOICE</NuxtLink
            >
            <NuxtLink to="/trending" class="nav-link">TRENDING</NuxtLink>
            <NuxtLink to="/videos" class="nav-link">VIDEOS</NuxtLink>
          </nav>

          <!-- Right Actions -->
          <div class="header-actions">
            <!-- Search -->
            <button class="search-btn" @click="showSearch = !showSearch">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>

            <!-- Notification -->
            <button class="notification-btn" v-if="isLoggedIn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span class="badge" v-if="notificationCount">{{
                notificationCount
              }}</span>
            </button>

            <!-- Write Button -->
            <NuxtLink to="/write" class="btn-write" v-if="isLoggedIn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M12 5v14M5 12h14"></path>
              </svg>
              Viết bài
            </NuxtLink>

            <!-- User Menu or Login -->
            <div class="user-menu" v-if="isLoggedIn">
              <button class="user-avatar" @click="showUserMenu = !showUserMenu">
                <img :src="user.avatar" :alt="user.name" />
              </button>
              <div class="user-dropdown" v-if="showUserMenu">
                <NuxtLink to="/profile" class="dropdown-item"
                  >Trang cá nhân</NuxtLink
                >
                <NuxtLink to="/settings" class="dropdown-item"
                  >Cài đặt</NuxtLink
                >
                <div class="dropdown-divider"></div>
                <button class="dropdown-item" @click="logout">Đăng xuất</button>
              </div>
            </div>
            <div v-else class="auth-buttons">
              <NuxtLink to="/login" class="btn-login">Đăng nhập</NuxtLink>
              <NuxtLink to="/register" class="btn-register">Đăng ký</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Overlay -->
    <div class="search-overlay" v-if="showSearch">
      <div class="container">
        <div class="search-box">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm bài viết, tác giả, tags..."
            v-model="searchQuery"
            @input="handleSearch"
            ref="searchInput"
          />
          <button class="close-search" @click="showSearch = false">
            &times;
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
  import bannerImage from '~/assets/banner.png';
  import logo from '~/assets/logo_full.svg';

  const showBanner = ref(true);
  const showSearch = ref(false);
  const showUserMenu = ref(false);
  const searchQuery = ref('');
  const notificationCount = ref(3);
  const searchInput = ref(null);
  const router = useRouter();

  // Sử dụng auth composable
  const {
    isAuthenticated,
    currentUser,
    logout: authLogout,
    loadFromStorage,
  } = useAuth();

  // Load auth từ localStorage khi component mount
  onMounted(() => {
    loadFromStorage();
  });

  // Computed để dùng trong template
  const isLoggedIn = computed(() => isAuthenticated.value);
  const user = computed(
    () =>
      currentUser.value || {
        name: 'User',
        avatar: 'https://via.placeholder.com/40',
      }
  );

  watch(showSearch, (value) => {
    if (value) {
      nextTick(() => {
        searchInput.value?.focus();
      });
    }
  });

  const handleSearch = () => {
    // Implement search logic
    console.log('Searching:', searchQuery.value);
  };

  const logout = () => {
    authLogout();
    showUserMenu.value = false;
    // Không chuyển trang, chỉ xóa thông tin đăng nhập
  };
</script>

<style scoped>
  .header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .banner {
    position: relative;
    width: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .banner-image {
    width: 100%;
    height: auto;
    max-height: 200px;
    object-fit: cover;
  }

  .banner-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-main {
    background: #1a202c;
    color: white;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    gap: 20px;
  }

  .logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
    font-size: 24px;
    font-weight: bold;
  }

  .logo-image {
    height: 30px;
  }

  .nav {
    display: flex;
    gap: 24px;
    flex: 1;
    margin-left: 40px;
  }

  .nav-link {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: color 0.2s;
    white-space: nowrap;
  }

  .nav-link:hover,
  .nav-link.active {
    color: white;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .search-btn,
  .notification-btn {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
    position: relative;
  }

  .search-btn:hover,
  .notification-btn:hover {
    color: white;
  }

  .badge {
    position: absolute;
    top: 4px;
    right: 4px;
    background: #ef4444;
    color: white;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 10px;
    min-width: 16px;
    text-align: center;
  }

  .btn-write {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #3b82f6;
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: background 0.2s;
  }

  .btn-write:hover {
    background: #2563eb;
  }

  .user-menu {
    position: relative;
  }

  .user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.2);
    overflow: hidden;
    cursor: pointer;
    background: none;
    padding: 0;
  }

  .user-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .user-dropdown {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: 200px;
    overflow: hidden;
  }

  .dropdown-item {
    display: block;
    width: 100%;
    padding: 12px 16px;
    text-align: left;
    background: none;
    border: none;
    color: #333;
    text-decoration: none;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .dropdown-item:hover {
    background: #f3f4f6;
  }

  .dropdown-divider {
    height: 1px;
    background: #e5e7eb;
    margin: 4px 0;
  }

  .auth-buttons {
    display: flex;
    gap: 8px;
  }

  .btn-login,
  .btn-register {
    padding: 8px 16px;
    border-radius: 6px;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
  }

  .btn-login {
    color: white;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .btn-login:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .btn-register {
    background: #3b82f6;
    color: white;
  }

  .btn-register:hover {
    background: #2563eb;
  }

  .search-overlay {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.95);
    padding: 40px 0;
    animation: fadeIn 0.2s;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .search-box {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 12px;
    padding: 16px 24px;
    gap: 12px;
  }

  .search-box svg {
    color: #9ca3af;
  }

  .search-box input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 16px;
    color: #333;
  }

  .close-search {
    background: none;
    border: none;
    font-size: 32px;
    color: #9ca3af;
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 1024px) {
    .nav {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .btn-write span {
      display: none;
    }

    .auth-buttons {
      flex-direction: column;
      gap: 4px;
    }
  }
</style>
