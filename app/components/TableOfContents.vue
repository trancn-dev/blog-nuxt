<template>
  <aside class="table-of-contents">
    <div class="toc-sticky">
      <h3 class="toc-title">Mục lục</h3>

      <!-- Debug info -->
      <div v-if="tableOfContents.length === 0" class="toc-debug">
        Đang chờ nội dung... ({{ tableOfContents.length }} items)
      </div>

      <nav v-else class="toc-nav">
        <a
          v-for="(item, index) in tableOfContents"
          :key="index"
          :href="`#${item.id}`"
          :class="[
            'toc-link',
            `toc-level-${item.level}`,
            { active: activeSection === item.id },
          ]"
          @click.prevent="scrollToSection(item.id)"
        >
          {{ item.text }}
        </a>
      </nav>
    </div>
  </aside>
</template>

<script setup>
import { watch } from "vue";

const { tableOfContents, activeSection } = useTOC();

console.log("TOC Component - tableOfContents:", tableOfContents);
console.log("TOC Component - tableOfContents.value:", tableOfContents?.value);

// Watch for changes
watch(
  tableOfContents,
  (newVal) => {
    console.log("TOC updated:", newVal);
  },
  { deep: true, immediate: true }
);

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 100; // Account for fixed header
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
</script>

<style scoped>
.table-of-contents {
  width: 100%;
}

.toc-sticky {
  position: sticky;
  top: 80px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  background: #f9fafb;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #e5e7eb;
}

.toc-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 16px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #e5e7eb;
}

.toc-debug {
  padding: 12px;
  background: #fef3c7;
  border-radius: 4px;
  font-size: 13px;
  color: #92400e;
  text-align: center;
}

.toc-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.toc-link {
  display: block;
  padding: 6px 12px;
  font-size: 14px;
  color: #6b7280;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s ease;
  line-height: 1.4;
}

.toc-link:hover {
  background: white;
  color: #3b82f6;
}

.toc-link.active {
  background: white;
  color: #3b82f6;
  font-weight: 500;
  border-left: 3px solid #3b82f6;
  padding-left: 9px;
}

.toc-level-1 {
  font-weight: 600;
  margin-top: 8px;
}

.toc-level-2 {
  padding-left: 16px;
}

.toc-level-3 {
  padding-left: 32px;
  font-size: 13px;
}

.toc-level-4,
.toc-level-5,
.toc-level-6 {
  padding-left: 48px;
  font-size: 13px;
}

/* Scrollbar for TOC */
.toc-sticky::-webkit-scrollbar {
  width: 6px;
}

.toc-sticky::-webkit-scrollbar-track {
  background: transparent;
}

.toc-sticky::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.toc-sticky::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

@media (max-width: 1024px) {
  .table-of-contents {
    display: none;
  }
}
</style>
