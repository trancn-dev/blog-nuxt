<template>
  <div class="layout-blog">
    <TheHeader />
    <div class="layout-container">
      <div class="container">
        <div class="layout-grid">
          <!-- Main Content -->
          <main class="main-content">
            <slot />
          </main>

          <!-- Sidebar with TOC -->
          <aside class="sidebar-wrapper">
            <TableOfContents />
          </aside>
        </div>
      </div>
    </div>

    <TheFooter />
  </div>
</template>

<script setup>
  import TheHeader from '../components/TheHeader.vue';
  import TheFooter from '../components/TheFooter.vue';
  import TableOfContents from '../components/TableOfContents.vue';
</script>

<style scoped>
  .layout-blog {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f9fafb;
  }

  .layout-container {
    flex: 1;
    padding: 24px 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .layout-grid {
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 32px;
    align-items: start;
  }

  .main-content {
    min-width: 0; /* Fix for grid overflow */
  }

  .sidebar-wrapper {
    position: sticky;
    top: 84px; /* Header height + spacing */
  }

  @media (max-width: 1024px) {
    .layout-grid {
      grid-template-columns: 1fr;
    }

    .sidebar-wrapper {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .layout-container {
      padding: 16px 0;
    }

    .container {
      padding: 0 16px;
    }

    .layout-grid {
      gap: 16px;
    }
  }
</style>
