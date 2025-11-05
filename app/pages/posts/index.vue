<template>
  <div class="home-page">
    <!-- Page Title -->
    <div class="page-header">
      <h1 class="page-title">MỚI NHẤT</h1>
      <p class="page-description">
        Khám phá những bài viết mới nhất từ cộng đồng
      </p>
    </div>

    <!-- Post List -->
    <PostList
      :posts="posts"
      :loading="loading"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="handlePageChange"
      @like="handleLike"
      @unlike="handleUnlike"
    />
  </div>
</template>

<script setup>
// Sử dụng direct = true để gọi trực tiếp Laravel API
const { postsAPI } = useAPI(true);

const posts = ref([]);
const loading = ref(true);
const currentPage = ref(1);
const totalPages = ref(1);
const perPage = 10;

onMounted(async () => {
  await loadPosts();
});

const loadPosts = async () => {
  loading.value = true;
  try {
    const response = await postsAPI.getAll({
      page: currentPage.value,
      per_page: perPage,
    });

    // Handle Laravel pagination response
    if (response.data) {
      // Transform API data to match component props
      const transformedPosts = response.data.map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        category: post.category,
        author: post.author || {
          id: 1,
          name: "Anonymous",
          username: "anonymous",
          avatar: "https://via.placeholder.com/40",
        },
        tags: post.tags || [],
        created_at: post.created_at || post.published_at,
        likes_count: post.likes_count || 0,
        comments_count: post.comments_count || 0,
        views_count: post.view_count || 0,
        read_time: post.read_time || calculateReadTime(post.content),
        is_liked: false, // TODO: Check if user liked
        is_featured: post.is_featured || false, // Đánh dấu bài viết nổi bật
        engaged_users: [], // TODO: Load engaged users if needed
      }));

      posts.value = transformedPosts;

      // Calculate total pages from Laravel pagination
      totalPages.value =
        response.last_page || Math.ceil(response.total / perPage);
    } else {
      // Empty result
      posts.value = [];
      totalPages.value = 1;
    }
  } catch (error) {
    console.error("Error loading posts:", error);
    posts.value = [];
  } finally {
    loading.value = false;
  }
};

// Helper function to calculate read time
const calculateReadTime = (content) => {
  if (!content) return 3;
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

const handlePageChange = (page) => {
  currentPage.value = page;
  loadPosts();
};

const handleLike = (postId) => {
  console.log("Like post:", postId);
  // Implement like logic here
  const post = posts.value.find((p) => p.id === postId);
  if (post) {
    post.is_liked = true;
    post.likes_count++;
  }
};

const handleUnlike = (postId) => {
  console.log("Unlike post:", postId);
  // Implement unlike logic here
  const post = posts.value.find((p) => p.id === postId);
  if (post) {
    post.is_liked = false;
    post.likes_count--;
  }
};
</script>

<style scoped>
.home-page {
  width: 100%;
}

.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
}

.page-description {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}
</style>
