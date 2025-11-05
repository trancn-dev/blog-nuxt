export default defineNuxtRouteMiddleware((to, from) => {
  // Skip on server side
  if (import.meta.server) return

  const token = localStorage.getItem('auth_token')

  // If no token and trying to access admin pages (except login)
  if (!token && to.path.startsWith('/admin') && to.path !== '/admin/login') {
    return navigateTo('/admin/login')
  }

  // If has token and trying to access login page
  if (token && to.path === '/admin/login') {
    return navigateTo('/admin')
  }
})
