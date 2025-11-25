<template>
  <NuxtLayout name="blog">
    <!-- Post Title Slot -->
    <template #title>
      <div v-if="post && !loading" class="post-title-header">
        <!-- Title -->

        <h1 class="text-h3 font-weight-bold mb-4">{{ post.title }}</h1>
        <!-- Author Info -->
        <div class="d-flex align-center mb-4">
          <NuxtLink :to="`/u/${post.author?.username}`">
          </NuxtLink>
          <div class="flex-grow-1">
            <NuxtLink
              :to="`/u/${post.author?.username}`"
              class="text-decoration-none"
            >
              <div class="text-subtitle-1 font-weight-medium">
                {{ post.author?.name }}
              </div>
            </NuxtLink>
            <div class="text-caption text-medium-emphasis">
              @{{ post.author?.username }}
            </div>
          </div>
          <v-btn variant="outlined" color="primary" size="small">
            Theo dõi
          </v-btn>
        </div>

        <!-- Post Meta -->
        <div class="d-flex align-center flex-wrap mb-4">
          <v-chip size="small" class="mr-2" prepend-icon="mdi-eye">
            {{ post.views_count || 0 }}
          </v-chip>
          <v-chip size="small" class="mr-2" prepend-icon="mdi-heart">
            {{ post.likes_count || 0 }}
          </v-chip>
          <v-chip size="small" class="mr-2" prepend-icon="mdi-comment">
            {{ post.comments_count || 0 }}
          </v-chip>
          <v-spacer class="d-none d-sm-flex" />
          <div class="text-caption text-medium-emphasis">
            Đã đăng vào
            {{ formatDate(post.published_at || post.created_at) }} -
            {{ post.read_time || calculateReadTime(post.content) }} phút đọc
          </div>
        </div>

        <!-- Tags -->
        <div v-if="post.tags && post.tags.length">
          <v-chip
            v-for="tag in post.tags"
            :key="tag.id"
            :to="`/tags/${tag.slug}`"
            size="small"
            class="mr-2"
            variant="outlined"
          >
            {{ tag.name }}
          </v-chip>
        </div>
      </div>
    </template>

    <v-container class="post-detail-page">
      <!-- Loading State -->
      <v-row v-if="loading" justify="center" class="my-12">
        <v-col cols="12" class="text-center">
          <v-progress-circular indeterminate color="primary" size="64" />
          <p class="mt-4 text-body-1">Đang tải bài viết...</p>
        </v-col>
      </v-row>

      <!-- Post Content -->
      <v-row v-else-if="post" justify="center">
        <v-col cols="12">
          <v-card elevation="0">
            <v-card-text>
              <!-- Post Header now in layout title slot above -->
              <header class="post-header mb-6" style="display: none">
                <!-- Author Info -->
                <div class="d-flex align-center mb-4">
                  <NuxtLink :to="`/u/${post.author?.username}`">
                    <v-avatar size="48" class="mr-3">
                      <v-img
                        :src="
                          post.author?.avatar ||
                          'https://via.placeholder.com/48'
                        "
                        :alt="post.author?.name"
                      />
                    </v-avatar>
                  </NuxtLink>
                  <div class="flex-grow-1">
                    <NuxtLink
                      :to="`/u/${post.author?.username}`"
                      class="text-decoration-none"
                    >
                      <div class="text-subtitle-1 font-weight-medium">
                        {{ post.author?.name }}
                      </div>
                    </NuxtLink>
                    <div class="text-caption text-medium-emphasis">
                      @{{ post.author?.username }}
                    </div>
                  </div>
                  <v-btn variant="outlined" color="primary" size="small">
                    Theo dõi
                  </v-btn>
                </div>

                <!-- Post Meta -->
                <div class="d-flex align-center flex-wrap mb-4">
                  <v-chip size="small" class="mr-2" prepend-icon="mdi-eye">
                    {{ post.views_count || 0 }}
                  </v-chip>
                  <v-chip size="small" class="mr-2" prepend-icon="mdi-heart">
                    {{ post.likes_count || 0 }}
                  </v-chip>
                  <v-chip size="small" class="mr-2" prepend-icon="mdi-comment">
                    {{ post.comments_count || 0 }}
                  </v-chip>
                  <v-spacer class="d-none d-sm-flex" />
                  <div class="text-caption text-medium-emphasis">
                    Đã đăng vào
                    {{ formatDate(post.published_at || post.created_at) }} -
                    {{ post.read_time || calculateReadTime(post.content) }} phút
                    đọc
                  </div>
                </div>

                <!-- Title -->
                <h1 class="text-h3 font-weight-bold mb-4">{{ post.title }}</h1>

                <!-- Tags -->
                <div v-if="post.tags && post.tags.length" class="mb-4">
                  <v-chip
                    v-for="tag in post.tags"
                    :key="tag.id"
                    :to="`/tags/${tag.slug}`"
                    size="small"
                    class="mr-2"
                    variant="outlined"
                  >
                    {{ tag.name }}
                  </v-chip>
                </div>
              </header>

              <!-- Post Content Body -->
              <div class="post-body" v-html="post.content"></div>

              <!-- Post Footer Actions -->
              <v-divider class="my-6" />
              <div class="d-flex align-center flex-wrap ga-2">
                <v-btn
                  :color="isLiked ? 'error' : 'default'"
                  :variant="isLiked ? 'flat' : 'outlined'"
                  @click="toggleLike"
                  prepend-icon="mdi-heart"
                  size="small"
                >
                  {{ post.likes_count || 0 }}
                </v-btn>

                <v-btn
                  variant="outlined"
                  @click="scrollToComments"
                  prepend-icon="mdi-comment"
                  size="small"
                >
                  {{ post.comments_count || 0 }}
                </v-btn>

                <v-btn
                  variant="outlined"
                  @click="sharePost"
                  prepend-icon="mdi-share-variant"
                  size="small"
                >
                  Chia sẻ
                </v-btn>

                <v-btn
                  :color="isBookmarked ? 'primary' : 'default'"
                  :variant="isBookmarked ? 'flat' : 'outlined'"
                  @click="toggleBookmark"
                  icon="mdi-bookmark"
                  size="small"
                />
              </div>
            </v-card-text>
          </v-card>

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
                  <span class="related-stats">{{
                    related.comments_count
                  }}</span>
                </div>
              </NuxtLink>
            </div>
          </section>

          <!-- Author's Other Posts -->
          <section class="author-posts" v-if="authorPosts.length">
            <h3 class="section-title">
              Bài viết khác từ {{ post.author?.name }}
            </h3>
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
            <v-card class="mt-6" elevation="1" v-if="isLoggedIn">
              <v-card-title>Bình luận</v-card-title>
              <v-card-text>
                <v-textarea
                  v-model="commentText"
                  placeholder="Viết bình luận..."
                  variant="outlined"
                  rows="3"
                  hide-details
                />
                <v-btn
                  color="primary"
                  class="mt-3"
                  @click="submitComment"
                  :disabled="!commentText.trim()"
                >
                  Gửi bình luận
                </v-btn>
              </v-card-text>
            </v-card>

            <v-card class="mt-6" elevation="1" v-else>
              <v-card-text class="text-center py-8">
                <p class="mb-4">Đăng nhập để bình luận</p>
                <v-btn
                  :to="{ path: '/login', query: { redirect: route.fullPath } }"
                  color="primary"
                  >Đăng nhập</v-btn
                >
              </v-card-text>
            </v-card>

            <!-- Comments List -->
            <v-card class="mt-6" elevation="1">
              <v-card-title>Bình luận ({{ comments.length }})</v-card-title>
              <v-card-text>
                <div
                  v-if="comments.length === 0"
                  class="text-center text-medium-emphasis py-8"
                >
                  Chưa có bình luận nào
                </div>
                <div v-else>
                  <!-- TODO: Render comments -->
                </div>
              </v-card-text>
            </v-card>
          </section>
        </v-col>
      </v-row>

      <!-- Error State -->
      <v-row v-else justify="center">
        <v-col cols="12" class="text-center py-12">
          <v-icon size="64" color="error">mdi-alert-circle</v-icon>
          <h3 class="text-h5 mt-4">Không tìm thấy bài viết</h3>
          <p class="text-body-1 text-medium-emphasis mt-2">
            Bài viết bạn đang tìm không tồn tại hoặc đã bị xóa
          </p>
          <v-btn to="/" color="primary" class="mt-4">Về trang chủ</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </NuxtLayout>
</template>

<script setup>
  definePageMeta({
    layout: false,
  });
  const route = useRoute();
  // Sử dụng direct = true để gọi trực tiếp Laravel API
  // Hoặc useAPI() hoặc useAPI(false) để gọi qua Nuxt server
  const { postsAPI } = useAPI();
  const { setupPostSEO } = useSEO();

  // Use TOC composable instead of provide/inject
  const {
    tableOfContents,
    activeSection,
    setTableOfContents,
    setActiveSection,
  } = useTOC();

  const post = ref(null);
  const relatedPosts = ref([]);
  const authorPosts = ref([]);
  const comments = ref([]);
  const loading = ref(true);
  const isLiked = ref(false);
  const isBookmarked = ref(false);
  const commentText = ref('');

  // Use auth composable
  const { isAuthenticated } = useAuth();
  const isLoggedIn = computed(() => isAuthenticated.value);

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
        ...response.Data,
        views_count: response.view_count,
        created_at: response.created_at || response.published_at,
      };

      // Setup SEO meta tags
      if (post.value) {
        setupPostSEO(post.value, {
          siteUrl: 'http://localhost:3000',
          siteName: 'My Blog',
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
      console.error('Error loading post:', error);
      post.value = null;
    } finally {
      loading.value = false;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calculateReadTime = (content) => {
    if (!content) return 3;
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const formatNumber = (num) => {
    if (!num) return 0;
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
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
      alert('Đã copy link bài viết');
    }
  };

  const scrollToComments = () => {
    document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' });
  };

  const submitComment = () => {
    if (!commentText.value.trim()) return;
    // TODO: Call API to submit comment
    console.log('Submit comment:', commentText.value);
    commentText.value = '';
  };

  const generateTableOfContents = () => {
    const postBody = document.querySelector('.post-body');
    console.log('postBody element:', postBody);

    if (!postBody) {
      console.warn('Post body not found yet, retrying...');
      setTimeout(generateTableOfContents, 200);
      return;
    }

    const headings = postBody.querySelectorAll('h1, h2, h3, h4, h5, h6');
    console.log('Found headings:', headings.length);

    if (headings.length === 0) {
      console.warn('No headings found in content');
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

    console.log('Generated TOC:', toc);
    setTableOfContents(toc);
    console.log('Updated tableOfContents.value:', tableOfContents.value);
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
        behavior: 'smooth',
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
        rootMargin: '-100px 0px -66%',
        threshold: 0,
      }
    );

    // Wait for content to be rendered and headings to have IDs
    const observeHeadings = () => {
      const headings = document.querySelectorAll(
        '.post-body h1, .post-body h2, .post-body h3, .post-body h4, .post-body h5, .post-body h6'
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
    setActiveSection('');
  });
</script>

<style scoped>
  .post-detail-page {
    min-height: 100vh;
    padding-top: 24px;
    padding-bottom: 48px;
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
</style>
