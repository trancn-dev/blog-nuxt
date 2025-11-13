// plugins/api.client.ts
export default defineNuxtPlugin(() => {
  const { token } = useAuth();
  const config = useRuntimeConfig();

  // Tạo custom $fetch với token tự động
  const $api = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ options }) {
      // Attach token vào header nếu có
      if (token.value) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token.value}`,
        };
      }
    },
    onResponseError({ response }) {
      // Nếu 401 Unauthorized, logout và redirect về login
      if (response.status === 401) {
        const { logout } = useAuth();
        logout();
        navigateTo('/login');
      }
    },
  });

  return {
    provide: {
      api: $api,
    },
  };
});
