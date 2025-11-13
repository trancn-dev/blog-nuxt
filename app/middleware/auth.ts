export default defineNuxtRouteMiddleware((to, from) => {
  // Skip on server side
  if (import.meta.server) return;

  const { isAuthenticated, loadFromStorage } = useAuth();

  // Load từ localStorage
  if (!isAuthenticated.value) {
    loadFromStorage();
  }

  // Admin routes
  const auth_token = localStorage.getItem('auth_token');
  if (
    !auth_token &&
    to.path.startsWith('/admin') &&
    to.path !== '/admin/login'
  ) {
    return navigateTo('/admin/login');
  }
  if (auth_token && to.path === '/admin/login') {
    return navigateTo('/admin');
  }

  // End-user protected routes
  if (!isAuthenticated.value && to.meta.requiresAuth) {
    return navigateTo('/login');
  }
});
