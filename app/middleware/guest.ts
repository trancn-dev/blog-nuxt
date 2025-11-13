// middleware/guest.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated, loadFromStorage } = useAuth();

  // Load auth từ localStorage nếu chưa có
  if (process.client && !isAuthenticated.value) {
    loadFromStorage();
  }

  // Nếu đã đăng nhập, redirect về trang chủ
  if (isAuthenticated.value) {
    return navigateTo('/');
  }
});
