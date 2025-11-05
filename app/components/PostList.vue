<template>
  <div class="post-list">
    <!-- Featured/Pinned Post -->
    <div class="featured-post" v-if="featuredPost">
      <div class="featured-banner">
        <span class="featured-badge">📌 BÀI VIẾT NỔI BẬT</span>
      </div>
      <PostCard
        :post="featuredPost"
        @like="handleLike"
        @unlike="handleUnlike"
      />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Đang tải bài viết...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="!posts || posts.length === 0" class="empty-state">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        ></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
      <h3>Chưa có bài viết nào</h3>
      <p>Hãy quay lại sau nhé!</p>
    </div>

    <!-- Post List -->
    <div v-else class="posts">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @like="handleLike"
        @unlike="handleUnlike"
      />
    </div>

    <!-- Pagination -->
    <div class="pagination" v-if="!loading && totalPages > 1">
      <!-- Previous Button -->
      <button
        class="pagination-btn"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <!-- Page Numbers -->
      <button
        v-for="page in visiblePages"
        :key="page"
        class="pagination-btn"
        :class="{ active: page === currentPage, dots: page === '...' }"
        @click="page !== '...' && goToPage(page)"
        :disabled="page === '...'"
      >
        {{ page }}
      </button>

      <!-- Next Button -->
      <button
        class="pagination-btn"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <!-- Jump to Last -->
      <button
        class="pagination-btn jump-last"
        v-if="currentPage < totalPages - 2"
        @click="goToPage(totalPages)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="13 17 18 12 13 7"></polyline>
          <polyline points="6 17 11 12 6 7"></polyline>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  posts: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  totalPages: {
    type: Number,
    default: 1,
  },
  featuredPost: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["page-change", "like", "unlike"]);

const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit("page-change", page);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const visiblePages = computed(() => {
  const pages = [];
  const total = props.totalPages;
  const current = props.currentPage;

  if (total <= 7) {
    // Show all pages if total is 7 or less
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);

    if (current > 3) {
      pages.push("...");
    }

    // Show pages around current
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 2) {
      pages.push("...");
    }

    // Always show last page
    pages.push(total);
  }

  return pages;
});

const handleLike = (postId) => {
  emit("like", postId);
};

const handleUnlike = (postId) => {
  emit("unlock", postId);
};
</script>

<style scoped>
.post-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.featured-post {
  margin-bottom: 8px;
}

.featured-banner {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  padding: 8px 16px;
  border-radius: 12px 12px 0 0;
  display: flex;
  align-items: center;
}

.featured-badge {
  color: white;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.featured-post .post-card {
  border-radius: 0 0 12px 12px;
  border-top: none;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 16px;
  color: #6b7280;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f4f6;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 16px;
  color: #6b7280;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}

.empty-state svg {
  opacity: 0.5;
}

.empty-state h3 {
  margin: 0;
  color: #111827;
  font-size: 20px;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}

.posts {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px 0;
  flex-wrap: wrap;
}

.pagination-btn {
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0 12px;
}

.pagination-btn:hover:not(:disabled):not(.dots) {
  background: #f3f4f6;
  border-color: #3b82f6;
  color: #3b82f6;
}

.pagination-btn.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-btn.dots {
  border: none;
  background: transparent;
  cursor: default;
}

.pagination-btn.dots:hover {
  background: transparent;
}

.pagination-btn.jump-last {
  margin-left: 4px;
}

@media (max-width: 768px) {
  .post-list {
    gap: 12px;
  }

  .pagination {
    padding: 16px 0;
    gap: 6px;
  }

  .pagination-btn {
    min-width: 36px;
    height: 36px;
    padding: 0 8px;
    font-size: 13px;
  }
}
</style>
