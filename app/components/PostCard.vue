<template>
  <article class="post-card" :class="{ 'is-featured': post.is_featured }">
    <!-- Featured Badge -->
    <div class="featured-badge" v-if="post.is_featured">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <polygon
          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        />
      </svg>
      <span>NỔI BẬT</span>
    </div>

    <!-- Header with category badge -->
    <div class="post-header" v-if="post.category">
      <span class="category-badge">{{ post.category }}</span>
    </div>

    <!-- Author Info -->
    <div class="author-section">
      <NuxtLink :to="`/u/${post.author.username}`" class="author-link">
        <img
          :src="post.author.avatar || 'https://via.placeholder.com/32'"
          :alt="post.author.name"
          class="author-avatar"
        />
        <span class="author-name">{{ post.author.name }}</span>
      </NuxtLink>
      <span class="post-time">{{ formatTime(post.created_at) }}</span>
      <span class="read-time"
        >- {{ post.read_time || calculateReadTime(post.content) }} phút
        đọc</span
      >
    </div>

    <!-- Post Title -->
    <h3 class="post-title">
      <NuxtLink :to="`/posts/${post.slug}`">
        {{ post.title }}
      </NuxtLink>
    </h3>

    <!-- Tags -->
    <div class="tags" v-if="post.tags && post.tags.length">
      <NuxtLink
        v-for="tag in post.tags.slice(0, 5)"
        :key="tag.id"
        :to="`/tags/${tag.slug}`"
        class="tag"
      >
        {{ tag.name }}
      </NuxtLink>
    </div>

    <!-- Stats and Actions -->
    <div class="post-footer">
      <div class="stats">
        <!-- Likes -->
        <button class="stat-item stat-button" @click="toggleLike">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            :class="{ filled: post.is_liked }"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            ></path>
          </svg>
          <span>{{ formatNumber(post.likes_count) }}</span>
        </button>

        <!-- Comments -->
        <NuxtLink :to="`/p/${post.slug}#comments`" class="stat-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            ></path>
          </svg>
          <span>{{ formatNumber(post.comments_count) }}</span>
        </NuxtLink>

        <!-- Views -->
        <div class="stat-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <span>{{ formatNumber(post.views_count) }}</span>
        </div>
      </div>

      <!-- Engaged Users (who liked or commented) -->
      <div
        class="engaged-users"
        v-if="post.engaged_users && post.engaged_users.length"
      >
        <div class="user-avatars">
          <img
            v-for="user in post.engaged_users.slice(0, 3)"
            :key="user.id"
            :src="user.avatar || 'https://via.placeholder.com/24'"
            :alt="user.name"
            :title="user.name"
            class="engaged-avatar"
          />
        </div>
        <span class="engaged-count" v-if="post.engaged_users.length > 3">
          +{{ post.engaged_users.length - 3 }}
        </span>
      </div>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["like", "unlike"]);

const toggleLike = () => {
  if (props.post.is_liked) {
    emit("unlike", props.post.id);
  } else {
    emit("like", props.post.id);
  }
};

const formatTime = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) {
    return `khoảng ${diffMins} phút trước`;
  } else if (diffHours < 24) {
    return `khoảng ${diffHours} giờ trước`;
  } else if (diffDays === 1) {
    return "Hôm qua";
  } else if (diffDays < 7) {
    return `${diffDays} ngày trước`;
  } else {
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
};

const calculateReadTime = (content) => {
  if (!content) return 3;
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

const formatNumber = (num) => {
  if (!num) return 0;
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num;
};
</script>

<style scoped>
.post-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s;
  cursor: pointer;
  position: relative;
}

.post-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: #d1d5db;
}

/* Featured Badge */
.post-card.is-featured {
  border: 2px solid #fbbf24;
  background: linear-gradient(
    to bottom,
    rgba(251, 191, 36, 0.03) 0%,
    white 100%
  );
}

.featured-badge {
  position: absolute;
  top: -12px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  color: white;
  font-size: 11px;
  font-weight: 700;
  border-radius: 20px;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(251, 191, 36, 0.3);
  z-index: 1;
}

.featured-badge svg {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.post-header {
  margin-bottom: 12px;
}

.category-badge {
  display: inline-block;
  padding: 4px 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.author-section {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 13px;
  color: #6b7280;
}

.author-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #111827;
  font-weight: 500;
  transition: color 0.2s;
}

.author-link:hover {
  color: #3b82f6;
}

.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-size: 14px;
}

.post-time,
.read-time {
  font-size: 13px;
  color: #9ca3af;
}

.post-title {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: #111827;
}

.post-title a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
}

.post-title a:hover {
  color: #3b82f6;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  padding: 4px 10px;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 12px;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s;
}

.tag:hover {
  background: #3b82f6;
  color: white;
}

.post-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid #f3f4f6;
}

.stats {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6b7280;
  font-size: 13px;
  text-decoration: none;
  transition: color 0.2s;
}

.stat-item:hover {
  color: #3b82f6;
}

.stat-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: inherit;
}

.stat-item svg {
  flex-shrink: 0;
}

.stat-item svg.filled {
  fill: #ef4444;
  stroke: #ef4444;
}

.engaged-users {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-avatars {
  display: flex;
  align-items: center;
  margin-left: -4px;
}

.engaged-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid white;
  margin-left: -8px;
  object-fit: cover;
}

.engaged-avatar:first-child {
  margin-left: 0;
}

.engaged-count {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

@media (max-width: 768px) {
  .post-card {
    padding: 16px;
  }

  .post-title {
    font-size: 16px;
  }

  .stats {
    gap: 12px;
  }
}
</style>
