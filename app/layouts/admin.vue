<template>
  <div class="admin-layout">
    <AdminSidebar :collapsed="sidebarCollapsed" @toggle="sidebarCollapsed = !sidebarCollapsed" />

    <div class="admin-main" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <AdminHeader @toggle-sidebar="sidebarCollapsed = !sidebarCollapsed" />

      <main class="admin-content">
        <slot />
      </main>

      <footer class="admin-footer">
        <p>&copy; {{ new Date().getFullYear() }} DevKit CMS. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
const sidebarCollapsed = ref(false)
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
}

.admin-main {
  flex: 1;
  margin-left: 260px;
  transition: margin-left 0.3s ease;
  display: flex;
  flex-direction: column;
}

.admin-main.sidebar-collapsed {
  margin-left: 80px;
}

.admin-content {
  flex: 1;
  padding: 2rem;
}

.admin-footer {
  padding: 1.5rem 2rem;
  background: white;
  border-top: 1px solid #e5e7eb;
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .admin-main {
    margin-left: 0;
  }

  .admin-content {
    padding: 1rem;
  }
}
</style>
