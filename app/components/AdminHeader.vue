<template>
  <header class="admin-header">
    <div class="header-left">
      <button @click="$emit('toggle-sidebar')" class="menu-btn">
        <span>☰</span>
      </button>

      <div class="breadcrumb">
        <span class="breadcrumb-item">Admin</span>
        <span v-if="currentPage" class="breadcrumb-separator">/</span>
        <span v-if="currentPage" class="breadcrumb-item current">{{
          currentPage
        }}</span>
      </div>
    </div>

    <div class="header-right">
      <button class="header-btn" @click="viewSite">
        <span>🌐</span>
        <span class="btn-text">View Site</span>
      </button>

      <div class="user-menu">
        <button class="user-btn" @click="showUserMenu = !showUserMenu">
          <div class="user-avatar">
            {{ userInitial }}
          </div>
          <span class="user-name">{{ userName }}</span>
          <span class="dropdown-icon">▼</span>
        </button>

        <div v-if="showUserMenu" class="user-dropdown">
          <NuxtLink to="/admin/profile" class="dropdown-item">
            <span>👤</span>
            <span>Profile</span>
          </NuxtLink>
          <NuxtLink to="/admin/settings" class="dropdown-item">
            <span>⚙️</span>
            <span>Settings</span>
          </NuxtLink>
          <hr class="dropdown-divider" />
          <button @click="logout" class="dropdown-item">
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
defineEmits(["toggle-sidebar"]);

const route = useRoute();
const router = useRouter();
const showUserMenu = ref(false);

const userName = ref("Admin User");
const userInitial = computed(() => userName.value.charAt(0).toUpperCase());

const currentPage = computed(() => {
  const path = route.path;
  if (path === "/admin") return "Dashboard";
  const parts = path.split("/");
  const page = parts[parts.length - 1];
  return page.charAt(0).toUpperCase() + page.slice(1);
});

const viewSite = () => {
  window.open("/", "_blank");
};

const logout = async () => {
  // TODO: Implement logout logic
  await router.push("/admin/login");
};

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".user-menu")) {
      showUserMenu.value = false;
    }
  });
});
</script>

<style scoped>
.admin-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.menu-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  color: #374151;
  display: none;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.breadcrumb-item {
  color: #6b7280;
}

.breadcrumb-item.current {
  color: #1f2937;
  font-weight: 600;
}

.breadcrumb-separator {
  color: #d1d5db;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: #374151;
  transition: all 0.2s;
}

.header-btn:hover {
  background: #e5e7eb;
}

.user-menu {
  position: relative;
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.user-btn:hover {
  background: #e5e7eb;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.dropdown-icon {
  font-size: 0.625rem;
  color: #6b7280;
}

.user-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  overflow: hidden;
  z-index: 100;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-size: 0.875rem;
  color: #374151;
  text-decoration: none;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background: #f3f4f6;
}

.dropdown-divider {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 0.25rem 0;
}

@media (max-width: 768px) {
  .menu-btn {
    display: block;
  }

  .btn-text {
    display: none;
  }

  .user-name {
    display: none;
  }
}
</style>
