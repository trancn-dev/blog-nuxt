<template>
  <aside class="admin-sidebar" :class="{ collapsed }">
    <div class="sidebar-header">
      <NuxtLink to="/admin" class="logo">
        <span class="logo-icon">🚀</span>
        <span v-if="!collapsed" class="logo-text">DevKit CMS</span>
      </NuxtLink>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-section">
        <p v-if="!collapsed" class="nav-section-title">CONTENT</p>

        <NuxtLink to="/admin/posts" class="nav-link">
          <span class="nav-icon">📝</span>
          <span v-if="!collapsed" class="nav-text">Posts</span>
        </NuxtLink>

        <NuxtLink to="/admin/projects" class="nav-link">
          <span class="nav-icon">💼</span>
          <span v-if="!collapsed" class="nav-text">Projects</span>
        </NuxtLink>

        <NuxtLink to="/admin/comments" class="nav-link">
          <span class="nav-icon">💬</span>
          <span v-if="!collapsed" class="nav-text">Comments</span>
        </NuxtLink>
      </div>

      <div class="nav-section">
        <p v-if="!collapsed" class="nav-section-title">TAXONOMY</p>

        <NuxtLink to="/admin/categories" class="nav-link">
          <span class="nav-icon">📁</span>
          <span v-if="!collapsed" class="nav-text">Categories</span>
        </NuxtLink>

        <NuxtLink to="/admin/tags" class="nav-link">
          <span class="nav-icon">🏷️</span>
          <span v-if="!collapsed" class="nav-text">Tags</span>
        </NuxtLink>
      </div>

      <div class="nav-section">
        <p v-if="!collapsed" class="nav-section-title">PORTFOLIO</p>

        <NuxtLink to="/admin/skills" class="nav-link">
          <span class="nav-icon">⚡</span>
          <span v-if="!collapsed" class="nav-text">Skills</span>
        </NuxtLink>

        <NuxtLink to="/admin/about-sections" class="nav-link">
          <span class="nav-icon">👤</span>
          <span v-if="!collapsed" class="nav-text">About Sections</span>
        </NuxtLink>
      </div>

      <div class="nav-section">
        <p v-if="!collapsed" class="nav-section-title">MEDIA</p>

        <NuxtLink to="/admin/media" class="nav-link">
          <span class="nav-icon">🖼️</span>
          <span v-if="!collapsed" class="nav-text">Media Library</span>
        </NuxtLink>
      </div>
    </nav>

    <div class="sidebar-footer">
      <button @click="$emit('toggle')" class="toggle-btn">
        <span v-if="collapsed">→</span>
        <span v-else>←</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle'])
</script>

<style scoped>
.admin-sidebar {
  width: 260px;
  background: #1f2937;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  z-index: 100;
}

.admin-sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
}

.logo-icon {
  font-size: 1.5rem;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
}

.nav-section {
  margin-bottom: 1.5rem;
}

.nav-section-title {
  padding: 0.5rem 1.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #9ca3af;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: #d1d5db;
  text-decoration: none;
  transition: all 0.2s;
  position: relative;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-link.router-link-active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.nav-link.router-link-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: white;
}

.nav-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.toggle-btn {
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  font-size: 1.25rem;
  transition: background 0.2s;
}

.toggle-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.collapsed .logo-text,
.collapsed .nav-text,
.collapsed .nav-section-title {
  display: none;
}

.collapsed .logo,
.collapsed .nav-link {
  justify-content: center;
}
</style>
