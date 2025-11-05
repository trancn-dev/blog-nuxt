<template>
  <section class="posts-section">
    <!-- Animated Blobs -->
    <div class="blob blob-posts-1"></div>
    <div class="blob blob-posts-2"></div>

    <div class="container">
      <h2 class="section-title">Bài viết mới nhất</h2>
      <p class="section-subtitle">
        Khám phá các bài viết về công nghệ, lập trình và thiết kế web
      </p>

      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Đang tải bài viết...</p>
      </div>

      <div v-else-if="posts && posts.length > 0" class="posts-grid">
        <article v-for="post in posts" :key="post.id" class="post-card">
          <NuxtLink :to="`/posts/${post.slug}`" class="post-link">
            <div class="post-image-wrapper">
              <img
                v-if="post.featured_image"
                :src="post.featured_image"
                :alt="post.title"
                class="post-image"
              />
              <div v-else class="post-image-placeholder">
                <span>📝</span>
              </div>
              <div v-if="post.category" class="post-category-badge">
                {{ post.category.name }}
              </div>
            </div>
            <div class="post-content">
              <div class="post-meta">
                <span class="post-date">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {{ formatDate(post.published_at || post.created_at) }}
                </span>
                <span v-if="post.views_count" class="post-views">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                    ></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  {{ post.views_count }}
                </span>
              </div>
              <h3 class="post-title">{{ post.title }}</h3>
              <p class="post-excerpt">
                {{ truncate(post.excerpt || post.content, 120) }}
              </p>
              <div class="post-footer">
                <span class="read-more">Đọc thêm →</span>
                <div v-if="post.author" class="post-author">
                  <span>{{ post.author.name }}</span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </article>
      </div>

      <div v-else class="empty-state">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
        >
          <path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
          ></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        <p>Chưa có bài viết nào</p>
      </div>

      <div class="view-all-btn">
        <NuxtLink to="/posts" class="btn-cta">Xem tất cả bài viết →</NuxtLink>
      </div>
    </div>
  </section>
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
});

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const truncate = (text, length) => {
  if (!text) return "";
  const plainText = text.replace(/<[^>]*>/g, "");
  if (plainText.length <= length) return plainText;
  return plainText.substring(0, length) + "...";
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Animated Blobs */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  z-index: 0;
  animation: blob-animation 20s infinite;
}

.blob-posts-1 {
  top: 10%;
  right: 10%;
  width: 400px;
  height: 400px;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.1) 0%,
    rgba(118, 75, 162, 0.1) 100%
  );
}

.blob-posts-2 {
  bottom: 10%;
  left: 10%;
  width: 350px;
  height: 350px;
  background: linear-gradient(
    135deg,
    rgba(118, 75, 162, 0.1) 0%,
    rgba(102, 126, 234, 0.1) 100%
  );
  animation-delay: 10s;
}

@keyframes blob-animation {
  0%,
  100% {
    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
    transform: translate(0, 0) scale(1);
  }
  25% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    transform: translate(30px, -50px) scale(1.1);
  }
  50% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
    transform: translate(-20px, 20px) scale(0.9);
  }
  75% {
    border-radius: 70% 30% 50% 50% / 30% 70% 50% 60%;
    transform: translate(50px, 30px) scale(1.05);
  }
}

/* Posts Section */
.posts-section {
  padding: 5rem 0;
  background: #f8f9fa;
  position: relative;
  overflow: hidden;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.section-subtitle {
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

.post-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: slideInUp 0.6s ease-out;
}

.post-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.post-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.post-image-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.post-card:hover .post-image {
  transform: scale(1.1);
}

.post-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
}

.post-category-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.post-content {
  padding: 1.5rem;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #666;
}

.post-meta span {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.post-meta svg {
  width: 16px;
  height: 16px;
}

.post-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #1a1a1a;
  line-height: 1.4;
}

.post-excerpt {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.read-more {
  color: #3b82f6;
  font-weight: 500;
  text-decoration: none;
}

.read-more:hover {
  text-decoration: underline;
}

.post-author {
  color: #888;
  font-size: 0.875rem;
}

.loading {
  text-align: center;
  padding: 3rem 0;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.empty-state {
  text-align: center;
  padding: 3rem 0;
  color: #666;
}

.empty-state svg {
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.view-all-btn {
  display: flex;
  justify-content: center;
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
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.btn-cta::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
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
  .posts-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 1.75rem;
  }
}
</style>
