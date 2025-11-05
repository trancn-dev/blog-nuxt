<template>
  <section v-if="projects && projects.length > 0" class="projects-section">
    <div class="container">
      <h2 class="section-title">Dự án nổi bật</h2>
      <div class="projects-grid">
        <div v-for="project in projects" :key="project.id" class="project-card">
          <img
            v-if="project.image_url"
            :src="project.image_url"
            :alt="project.title"
            class="project-image"
          />
          <div class="project-content">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <div class="project-links">
              <a v-if="project.demo_url" :href="project.demo_url" target="_blank" class="btn-link">
                Demo
              </a>
              <a v-if="project.github_url" :href="project.github_url" target="_blank" class="btn-link">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  projects: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Projects Section */
.projects-section {
  padding: 5rem 0;
  background: white;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #1a1a1a;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.project-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.project-card:hover {
  transform: translateY(-5px);
}

.project-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.project-content {
  padding: 1.5rem;
}

.project-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.project-content p {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.btn-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.btn-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
