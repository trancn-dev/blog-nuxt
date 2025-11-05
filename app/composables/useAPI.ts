export const useAPI = (direct = false) => {
  const config = useRuntimeConfig();

  // Nếu direct = true, gọi trực tiếp Laravel API
  // Nếu direct = false (default), gọi qua Nuxt server routes
  const baseURL = direct ? config.public.apiBase : "";

  const fetchAPI = async (endpoint: string, options: any = {}) => {
    try {
      const url = direct ? `${baseURL}${endpoint}` : `/api${endpoint}`;
      const response = await $fetch(url, {
        ...options,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...options.headers,
        },
      });
      return response;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  };

  const fetchAdminAPI = async (endpoint: string, options: any = {}) => {
    try {
      const token = localStorage.getItem("auth_token");
      const url = direct
        ? `${baseURL}/admin${endpoint}`
        : `/api/admin${endpoint}`;
      const response = await $fetch(url, {
        ...options,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
          ...options.headers,
        },
      });
      return response;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  };

  return {
    // Public Posts API
    postsAPI: {
      getAll: (params?: any) => fetchAPI("/posts", { params }),
      getBySlug: (slug: string) => fetchAPI(`/posts/${slug}`),
      getById: (id: number) => fetchAdminAPI(`/posts/${id}`),
      getFeatured: () => fetchAPI("/posts?featured=1"),
      create: (data: any) =>
        fetchAdminAPI("/posts", { method: "POST", body: data }),
      update: (id: number, data: any) =>
        fetchAdminAPI(`/posts/${id}`, { method: "PUT", body: data }),
      delete: (id: number) =>
        fetchAdminAPI(`/posts/${id}`, { method: "DELETE" }),
      bulkDelete: (ids: number[]) =>
        fetchAdminAPI("/posts/bulk-delete", { method: "POST", body: { ids } }),
    },

    // Projects API
    projectsAPI: {
      getAll: (params?: any) => fetchAPI("/projects", { params }),
      getFeatured: () => fetchAPI("/projects?featured=1"),
      getBySlug: (slug: string) => fetchAPI(`/projects/${slug}`),
      getById: (id: number) => fetchAdminAPI(`/projects/${id}`),
      create: (data: any) =>
        fetchAdminAPI("/projects", { method: "POST", body: data }),
      update: (id: number, data: any) =>
        fetchAdminAPI(`/projects/${id}`, { method: "PUT", body: data }),
      delete: (id: number) =>
        fetchAdminAPI(`/projects/${id}`, { method: "DELETE" }),
    },

    // Categories API
    categoriesAPI: {
      getAll: () => fetchAPI("/categories"),
      getById: (id: number) => fetchAdminAPI(`/categories/${id}`),
      create: (data: any) =>
        fetchAdminAPI("/categories", { method: "POST", body: data }),
      update: (id: number, data: any) =>
        fetchAdminAPI(`/categories/${id}`, { method: "PUT", body: data }),
      delete: (id: number) =>
        fetchAdminAPI(`/categories/${id}`, { method: "DELETE" }),
    },

    // Tags API
    tagsAPI: {
      getAll: () => fetchAPI("/tags"),
      getById: (id: number) => fetchAdminAPI(`/tags/${id}`),
      create: (data: any) =>
        fetchAdminAPI("/tags", { method: "POST", body: data }),
      update: (id: number, data: any) =>
        fetchAdminAPI(`/tags/${id}`, { method: "PUT", body: data }),
      delete: (id: number) =>
        fetchAdminAPI(`/tags/${id}`, { method: "DELETE" }),
    },

    // Skills API
    skillsAPI: {
      getAll: () => fetchAPI("/about/skills"),
      getById: (id: number) => fetchAdminAPI(`/skills/${id}`),
      create: (data: any) =>
        fetchAdminAPI("/skills", { method: "POST", body: data }),
      update: (id: number, data: any) =>
        fetchAdminAPI(`/skills/${id}`, { method: "PUT", body: data }),
      delete: (id: number) =>
        fetchAdminAPI(`/skills/${id}`, { method: "DELETE" }),
      reorder: (data: any) =>
        fetchAdminAPI("/skills/reorder", { method: "POST", body: data }),
    },

    // Comments API
    commentsAPI: {
      getAll: (params?: any) => fetchAdminAPI("/comments", { params }),
      getByPost: (postId: number) => fetchAPI(`/comments/post/${postId}`),
      create: (data: any) =>
        fetchAPI("/comments", { method: "POST", body: data }),
      updateStatus: (id: number, status: string) =>
        fetchAdminAPI(`/comments/${id}/status`, {
          method: "PUT",
          body: { status },
        }),
      delete: (id: number) =>
        fetchAdminAPI(`/comments/${id}`, { method: "DELETE" }),
      bulkUpdateStatus: (ids: number[], status: string) =>
        fetchAdminAPI("/comments/bulk-update-status", {
          method: "POST",
          body: { ids, status },
        }),
      bulkDelete: (ids: number[]) =>
        fetchAdminAPI("/comments/bulk-delete", {
          method: "POST",
          body: { ids },
        }),
    },

    // Media API
    mediaAPI: {
      getAll: (params?: any) => fetchAdminAPI("/media", { params }),
      upload: (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        return fetchAdminAPI("/media", { method: "POST", body: formData });
      },
      delete: (id: number) =>
        fetchAdminAPI(`/media/${id}`, { method: "DELETE" }),
      bulkDelete: (ids: number[]) =>
        fetchAdminAPI("/media/bulk-delete", { method: "POST", body: { ids } }),
    },

    // About Sections API
    aboutSectionsAPI: {
      getAll: () => fetchAPI("/about"),
      getById: (id: number) => fetchAdminAPI(`/about-sections/${id}`),
      create: (data: any) =>
        fetchAdminAPI("/about-sections", { method: "POST", body: data }),
      update: (id: number, data: any) =>
        fetchAdminAPI(`/about-sections/${id}`, { method: "PUT", body: data }),
      delete: (id: number) =>
        fetchAdminAPI(`/about-sections/${id}`, { method: "DELETE" }),
      reorder: (data: any) =>
        fetchAdminAPI("/about-sections/reorder", {
          method: "POST",
          body: data,
        }),
      toggleVisibility: (id: number) =>
        fetchAdminAPI(`/about-sections/${id}/toggle-visibility`, {
          method: "POST",
        }),
    },

    // About API (public)
    aboutAPI: {
      get: () => fetchAPI("/about"),
      skills: () => fetchAPI("/about/skills"),
      contact: () => fetchAPI("/about/contact"),
      submitContact: (data: any) =>
        fetchAPI("/about/contact", { method: "POST", body: data }),
    },
  };
};
