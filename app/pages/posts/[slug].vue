<template>
  <div class="post-detail-page">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Đang tải bài viết...</p>
    </div>

    <!-- Post Content -->
    <article v-else-if="post" class="post-article">
      <!-- Post Header -->
      <header class="post-header">
        <!-- Author Info -->
        <div class="author-info">
          <NuxtLink :to="`/u/${post.author?.username}`" class="author-avatar">
            <img
              :src="post.author?.avatar || 'https://via.placeholder.com/48'"
              :alt="post.author?.name"
            />
          </NuxtLink>
          <div class="author-details">
            <NuxtLink :to="`/u/${post.author?.username}`" class="author-name">
              {{ post.author?.name }}
            </NuxtLink>
            <span class="author-username">@{{ post.author?.username }}</span>
            <button class="btn-follow">Theo dõi</button>
          </div>
        </div>

        <!-- Post Meta -->
        <div class="post-meta">
          <div class="meta-left">
            <span class="post-stats">{{ post.views_count || 0 }}</span>
            <span class="post-stats">{{ post.likes_count || 0 }}</span>
            <span class="post-stats">{{ post.comments_count || 0 }}</span>
          </div>
          <div class="meta-right">
            <span class="post-date"
              >Đã đăng vào
              {{ formatDate(post.published_at || post.created_at) }}</span
            >
            <span class="read-time"
              >- {{ post.read_time || calculateReadTime(post.content) }} phút
              đọc</span
            >
          </div>
        </div>

        <!-- Title -->
        <h1 class="post-title">{{ post.title }}</h1>

        <!-- Tags -->
        <div class="post-tags" v-if="post.tags && post.tags.length">
          <NuxtLink
            v-for="tag in post.tags"
            :key="tag.id"
            :to="`/tags/${tag.slug}`"
            class="tag"
          >
            {{ tag.name }}
          </NuxtLink>
        </div>
      </header>

      <!-- Post Content Body -->
      <div class="post-body" v-html="post.content"></div>

      <!-- Post Footer Actions -->
      <footer class="post-footer">
        <div class="post-actions">
          <button
            class="action-btn like-btn"
            :class="{ active: isLiked }"
            @click="toggleLike"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              ></path>
            </svg>
            <span>{{ post.likes_count || 0 }}</span>
          </button>

          <button class="action-btn comment-btn" @click="scrollToComments">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              ></path>
            </svg>
            <span>{{ post.comments_count || 0 }}</span>
          </button>

          <button class="action-btn share-btn" @click="sharePost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            <span>Chia sẻ</span>
          </button>

          <button
            class="action-btn bookmark-btn"
            :class="{ active: isBookmarked }"
            @click="toggleBookmark"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
              ></path>
            </svg>
          </button>
        </div>
      </footer>

      <!-- Related Posts -->
      <section class="related-posts" v-if="relatedPosts.length">
        <h3 class="section-title">Bài viết liên quan</h3>
        <div class="related-grid">
          <NuxtLink
            v-for="related in relatedPosts"
            :key="related.id"
            :to="`/p/${related.slug}`"
            class="related-card"
          >
            <h4 class="related-title">{{ related.title }}</h4>
            <div class="related-meta">
              <span class="related-author">{{ related.author?.name }}</span>
              <span class="related-stats"
                >{{ related.read_time || 3 }} phút đọc</span
              >
              <span class="related-stats">{{
                formatNumber(related.views_count)
              }}</span>
              <span class="related-stats">{{ related.likes_count }}</span>
              <span class="related-stats">{{ related.comments_count }}</span>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- Author's Other Posts -->
      <section class="author-posts" v-if="authorPosts.length">
        <h3 class="section-title">Bài viết khác từ {{ post.author?.name }}</h3>
        <div class="author-posts-list">
          <NuxtLink
            v-for="authorPost in authorPosts"
            :key="authorPost.id"
            :to="`/p/${authorPost.slug}`"
            class="author-post-card"
          >
            <h4 class="author-post-title">{{ authorPost.title }}</h4>
            <div class="author-post-meta">
              <span>{{ authorPost.read_time || 3 }} phút đọc</span>
              <span>{{ authorPost.views_count || 0 }}</span>
              <span>{{ authorPost.likes_count || 0 }}</span>
              <span>{{ authorPost.comments_count || 0 }}</span>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- Comments Section -->
      <section class="comments-section" id="comments">
        <h3 class="section-title">Bình luận</h3>

        <!-- Comment Form -->
        <div class="comment-form" v-if="isLoggedIn">
          <textarea
            v-model="commentText"
            placeholder="Viết bình luận..."
            class="comment-input"
            rows="3"
          ></textarea>
          <div class="comment-actions">
            <button
              class="btn-submit"
              @click="submitComment"
              :disabled="!commentText.trim()"
            >
              Gửi bình luận
            </button>
          </div>
        </div>
        <div v-else class="login-prompt">
          <p>Đăng nhập để bình luận</p>
          <NuxtLink to="/login" class="btn-login">Đăng nhập</NuxtLink>
        </div>

        <!-- Comments List -->
        <div class="comments-list">
          <div v-if="comments.length === 0" class="no-comments">
            Chưa có bình luận nào
          </div>
          <div v-else>
            <!-- TODO: Render comments -->
          </div>
        </div>
      </section>
    </article>

    <!-- Error State -->
    <div v-else class="error-state">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
      <h3>Không tìm thấy bài viết</h3>
      <p>Bài viết bạn đang tìm không tồn tại hoặc đã bị xóa</p>
      <NuxtLink to="/" class="btn-back">Về trang chủ</NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "blog",
});
const route = useRoute();
// Sử dụng direct = true để gọi trực tiếp Laravel API
// Hoặc useAPI() hoặc useAPI(false) để gọi qua Nuxt server
const { postsAPI } = useAPI();
const { setupPostSEO } = useSEO();

// Use TOC composable instead of provide/inject
const { tableOfContents, activeSection, setTableOfContents, setActiveSection } =
  useTOC();

const post = ref(null);
const relatedPosts = ref([]);
const authorPosts = ref([]);
const comments = ref([]);
const loading = ref(true);
const isLiked = ref(false);
const isBookmarked = ref(false);
const isLoggedIn = ref(false);
const commentText = ref("");

onMounted(async () => {
  await loadPost();
  setupScrollSpy();
});

const loadPost = async () => {
  loading.value = true;
  try {
    const slug = route.params.slug;
    const response = await postsAPI.getBySlug(slug);

    post.value = {
      ...response,
      views_count: response.view_count,
      created_at: response.created_at || response.published_at,
    };

    // Setup SEO meta tags
    if (post.value) {
      setupPostSEO(post.value, {
        siteUrl: "http://localhost:3000",
        siteName: "My Blog",
      });
    }

    // Load related posts and author posts
    // TODO: Implement API calls for these
    relatedPosts.value = [];
    authorPosts.value = [];
    comments.value = [];

    // Generate table of contents after content is loaded
    await nextTick();
    setTimeout(() => {
      generateTableOfContents();
    }, 100);
  } catch (error) {
    console.error("Error loading post:", error);
    post.value = null;
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const calculateReadTime = (content) => {
  if (!content) return 3;
  const wordsPerMinute = 200;
  const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

const formatNumber = (num) => {
  if (!num) return 0;
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num;
};

const toggleLike = () => {
  isLiked.value = !isLiked.value;
  if (isLiked.value) {
    post.value.likes_count++;
  } else {
    post.value.likes_count--;
  }
  // TODO: Call API to like/unlike
};

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value;
  // TODO: Call API to bookmark
};

const sharePost = () => {
  if (navigator.share) {
    navigator.share({
      title: post.value.title,
      url: window.location.href,
    });
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert("Đã copy link bài viết");
  }
};

const scrollToComments = () => {
  document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" });
};

const submitComment = () => {
  if (!commentText.value.trim()) return;
  // TODO: Call API to submit comment
  console.log("Submit comment:", commentText.value);
  commentText.value = "";
};

const generateTableOfContents = () => {
  const postBody = document.querySelector(".post-body");
  console.log("postBody element:", postBody);

  if (!postBody) {
    console.warn("Post body not found yet, retrying...");
    setTimeout(generateTableOfContents, 200);
    return;
  }

  const headings = postBody.querySelectorAll("h1, h2, h3, h4, h5, h6");
  console.log("Found headings:", headings.length);

  if (headings.length === 0) {
    console.warn("No headings found in content");
    return;
  }

  const toc = [];

  headings.forEach((heading, index) => {
    // Add ID to heading if it doesn't have one
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }

    const level = parseInt(heading.tagName.substring(1));
    toc.push({
      id: heading.id,
      text: heading.textContent,
      level: level,
    });
  });

  console.log("Generated TOC:", toc);
  setTableOfContents(toc);
  console.log("Updated tableOfContents.value:", tableOfContents.value);
};

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

const setupScrollSpy = () => {
  if (!process.client) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-100px 0px -66%",
      threshold: 0,
    }
  );

  // Wait for content to be rendered and headings to have IDs
  const observeHeadings = () => {
    const headings = document.querySelectorAll(
      ".post-body h1, .post-body h2, .post-body h3, .post-body h4, .post-body h5, .post-body h6"
    );

    if (headings.length === 0) {
      // Retry if headings not found yet
      setTimeout(observeHeadings, 200);
      return;
    }

    headings.forEach((heading) => {
      observer.observe(heading);
    });
  };

  setTimeout(observeHeadings, 300);

  // Cleanup on unmount
  onBeforeUnmount(() => {
    observer.disconnect();
  });
};

// Clear TOC on unmount
onBeforeUnmount(() => {
  setTableOfContents([]);
  setActiveSection("");
});
</script>

<style scoped>
.post-detail-page {
  width: 100%;
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

.post-article {
  background: white;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
}

.post-header {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.author-info {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.author-avatar img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.author-details {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-name {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  text-decoration: none;
}

.author-name:hover {
  color: #3b82f6;
}

.author-username {
  font-size: 14px;
  color: #6b7280;
}

.btn-follow {
  margin-left: auto;
  padding: 6px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-follow:hover {
  background: #2563eb;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 14px;
  color: #6b7280;
  flex-wrap: wrap;
  gap: 12px;
}

.meta-left,
.meta-right {
  display: flex;
  gap: 12px;
}

.post-stats::before {
  content: "•";
  margin-right: 8px;
}

.post-stats:first-child::before {
  content: "";
  margin-right: 0;
}

.post-title {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  line-height: 1.3;
  margin: 0 0 16px 0;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 6px 12px;
  background: #f3f4f6;
  color: #374151;
  font-size: 13px;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s;
}

.tag:hover {
  background: #3b82f6;
  color: white;
}

.post-body {
  font-size: 16px;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 32px;
}

.post-body :deep(h1),
.post-body :deep(h2),
.post-body :deep(h3) {
  margin-top: 32px;
  margin-bottom: 16px;
  font-weight: 600;
  color: #111827;
}

.post-body :deep(h1) {
  font-size: 28px;
}
.post-body :deep(h2) {
  font-size: 24px;
}
.post-body :deep(h3) {
  font-size: 20px;
}

.post-body :deep(p) {
  margin-bottom: 16px;
}

.post-body :deep(pre) {
  background: #1f2937;
  color: #f3f4f6;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 16px 0;
}

.post-body :deep(code) {
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 14px;
}

.post-body :deep(pre code) {
  background: transparent;
  padding: 0;
}

.post-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 16px 0;
}

.post-footer {
  padding: 24px 0;
  border-top: 1px solid #e5e7eb;
  margin-bottom: 32px;
}

.post-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  color: #6b7280;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #f3f4f6;
  border-color: #3b82f6;
  color: #3b82f6;
}

.action-btn.active {
  background: #eff6ff;
  border-color: #3b82f6;
  color: #3b82f6;
}

.like-btn.active svg {
  fill: #ef4444;
  stroke: #ef4444;
}

.bookmark-btn.active svg {
  fill: #fbbf24;
  stroke: #fbbf24;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 16px 0;
}

.related-posts,
.author-posts {
  margin-bottom: 32px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.related-card {
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s;
}

.related-card:hover {
  background: #f3f4f6;
}

.related-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.related-meta {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: #6b7280;
  flex-wrap: wrap;
}

.author-posts-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.author-post-card {
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s;
}

.author-post-card:hover {
  background: #f3f4f6;
}

.author-post-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
}

.author-post-meta {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: #6b7280;
}

.comments-section {
  margin-top: 32px;
  padding-top: 32px;
  border-top: 2px solid #e5e7eb;
}

.comment-form {
  margin-bottom: 24px;
}

.comment-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  font-family: inherit;
}

.comment-input:focus {
  outline: none;
  border-color: #3b82f6;
}

.comment-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

.btn-submit {
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-submit:hover:not(:disabled) {
  background: #2563eb;
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.login-prompt {
  padding: 24px;
  background: #f9fafb;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 24px;
}

.login-prompt p {
  margin: 0 0 12px 0;
  color: #6b7280;
}

.btn-login {
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  display: inline-block;
}

.no-comments {
  padding: 32px;
  text-align: center;
  color: #6b7280;
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 16px;
  background: white;
  border-radius: 12px;
}

.error-state svg {
  color: #ef4444;
  opacity: 0.5;
}

.error-state h3 {
  margin: 0;
  color: #111827;
  font-size: 20px;
}

.error-state p {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}

.btn-back {
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .post-article {
    padding: 20px;
  }

  .post-title {
    font-size: 24px;
  }

  .post-body {
    font-size: 15px;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
