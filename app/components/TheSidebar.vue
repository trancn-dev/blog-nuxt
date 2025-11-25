<template>
  <aside class="sidebar">
    <!-- Community Notice -->
    <div class="notice-card">
      <div class="notice-icon">📢</div>
      <p class="notice-text">
        Tham gia Facebook group "Viblo Community" để cùng nhau học tập và kết
        nối
      </p>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button
        class="tab"
        :class="{ active: activeTab === 'posts' }"
        @click="activeTab = 'posts'"
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
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <button
        class="tab"
        :class="{ active: activeTab === 'grid' }"
        @click="activeTab = 'grid'"
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
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      </button>
    </div>

    <!-- Filter by Highlight/Color -->
    <div class="filter-section">
      <div class="filter-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
        <span>webjob-tap-highlight-color</span>
      </div>
      <div class="filter-tags">
        <button class="filter-tag">0</button>
        <button class="filter-tag">1k</button>
        <button class="filter-tag">3k</button>
        <button class="filter-tag">5k</button>
      </div>
    </div>

    <!-- Trending Projects -->
    <div class="section">
      <h3 class="section-title">Ý tưởng lập project cá nhân</h3>
      <div class="project-list">
        <div
          class="project-item"
          v-for="project in trendingProjects"
          :key="project.id"
        >
          <div class="project-info">
            <p class="project-name">{{ project.name }}</p>
            <div class="project-meta">
              <span class="project-author">{{ project.author }}</span>
              <span class="project-stat">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {{ project.time }}
              </span>
              <span class="project-stat">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                {{ project.views }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Trending Topics -->
    <div class="section">
      <h3 class="section-title">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
        CÁC CHỦ ĐỀ ĐANG HOT
      </h3>
      <div class="topic-list">
        <NuxtLink
          to="#"
          class="topic-item"
          v-for="topic in trendingTopics"
          :key="topic.name"
        >
          {{ topic.name }}
        </NuxtLink>
      </div>
    </div>

    <!-- Top Members -->
    <div class="section">
      <h3 class="section-title">Top members</h3>
      <div class="member-list">
        <div class="member-item" v-for="member in topMembers" :key="member.id">
          <img :src="member.avatar" :alt="member.name" class="member-avatar" />
          <div class="member-info">
            <p class="member-name">{{ member.name }}</p>
            <p class="member-username">@{{ member.username }}</p>
          </div>
          <button class="btn-follow" :class="{ following: member.isFollowing }">
            {{ member.isFollowing ? 'Đang theo dõi' : 'Theo dõi' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Tags -->
    <div class="section">
      <h3 class="section-title">Các chủ đề phổ biến</h3>
      <div class="tag-list">
        <NuxtLink to="#" class="tag-item" v-for="tag in popularTags" :key="tag">
          #{{ tag }}
        </NuxtLink>
      </div>
    </div>
  </aside>
</template>

<script setup>
  const activeTab = ref('posts');

  const trendingProjects = ref([
    {
      id: 1,
      name: 'Ý tưởng lập project cá nhân',
      author: 'Nguyen Van A',
      time: '2h',
      views: '1.2k',
    },
    {
      id: 2,
      name: 'Làm chánh công nghệ nghiệp',
      author: 'Tran Thi B',
      time: '5h',
      views: '856',
    },
    {
      id: 3,
      name: 'Y Tuong lam project ca nhan',
      author: 'Le Van C',
      time: '1d',
      views: '3.4k',
    },
  ]);

  const trendingTopics = ref([
    { name: 'Phân Tích Kỹ Nghệ' },
    { name: 'Nhập môn nghệ' },
    { name: 'Thảo luận đặc biệt' },
    { name: '#TdayChung đây' },
    { name: 'Nghề lập trình' },
  ]);

  const topMembers = ref([
    {
      id: 1,
      name: 'Phúc Nguyễn Mãi Hương',
      username: 'phuct',
      avatar: '',
      isFollowing: false,
    },
    {
      id: 2,
      name: 'Phan Ngoc',
      username: 'phanngoc123',
      avatar: '',
      isFollowing: true,
    },
    {
      id: 3,
      name: 'gtrankt01',
      username: 'gtrankt01',
      avatar: '',
      isFollowing: false,
    },
  ]);

  const popularTags = ref([
    'JavaScript',
    'Python',
    'React',
    'Vue',
    'Node.js',
    'Laravel',
    'Docker',
    'AWS',
    'DevOps',
    'AI',
  ]);
</script>

<style scoped>
  .sidebar {
    width: 100%;
    max-width: 320px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .notice-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 16px;
    border-radius: 12px;
    display: flex;
    gap: 12px;
    align-items: flex-start;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  .notice-icon {
    font-size: 24px;
    flex-shrink: 0;
  }

  .notice-text {
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
  }

  .tabs {
    display: flex;
    gap: 8px;
    background: #f3f4f6;
    padding: 4px;
    border-radius: 8px;
  }

  .tab {
    flex: 1;
    padding: 8px;
    border: none;
    background: transparent;
    border-radius: 6px;
    cursor: pointer;
    color: #6b7280;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab:hover {
    background: #e5e7eb;
  }

  .tab.active {
    background: white;
    color: #3b82f6;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .filter-section {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 16px;
  }

  .filter-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 12px;
  }

  .filter-tags {
    display: flex;
    gap: 8px;
  }

  .filter-tag {
    flex: 1;
    padding: 6px;
    border: 1px solid #e5e7eb;
    background: white;
    border-radius: 6px;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .filter-tag:hover {
    background: #f3f4f6;
    border-color: #3b82f6;
  }

  .section {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 16px;
  }

  .section-title {
    font-size: 15px;
    font-weight: 600;
    color: #111827;
    margin: 0 0 16px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .project-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .project-item {
    padding-bottom: 12px;
    border-bottom: 1px solid #f3f4f6;
  }

  .project-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .project-name {
    font-size: 14px;
    font-weight: 500;
    color: #111827;
    margin: 0 0 6px 0;
    line-height: 1.4;
  }

  .project-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 12px;
    color: #6b7280;
  }

  .project-author {
    font-weight: 500;
  }

  .project-stat {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .topic-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .topic-item {
    color: #374151;
    text-decoration: none;
    font-size: 14px;
    padding: 8px 12px;
    border-radius: 6px;
    transition: all 0.2s;
  }

  .topic-item:hover {
    background: #f3f4f6;
    color: #3b82f6;
  }

  .member-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .member-item {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .member-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  .member-info {
    flex: 1;
    min-width: 0;
  }

  .member-name {
    font-size: 14px;
    font-weight: 500;
    color: #111827;
    margin: 0 0 2px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .member-username {
    font-size: 12px;
    color: #6b7280;
    margin: 0;
  }

  .btn-follow {
    padding: 6px 12px;
    border: 1px solid #3b82f6;
    background: white;
    color: #3b82f6;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .btn-follow:hover {
    background: #3b82f6;
    color: white;
  }

  .btn-follow.following {
    background: #3b82f6;
    color: white;
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag-item {
    padding: 6px 12px;
    background: #f3f4f6;
    color: #374151;
    border-radius: 6px;
    font-size: 13px;
    text-decoration: none;
    transition: all 0.2s;
  }

  .tag-item:hover {
    background: #3b82f6;
    color: white;
  }

  @media (max-width: 1024px) {
    .sidebar {
      max-width: 100%;
    }
  }
</style>
