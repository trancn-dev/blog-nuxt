export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  const config = useRuntimeConfig();

  try {
    const laravelUrl = `${config.public.apiBase}${config.public.apiPersonPrefix}/posts/${slug}`;
    console.log('🔵 [Nuxt Server] Fetching post with slug:', slug);
    console.log('🔵 [Nuxt Server] Calling Laravel API:', laravelUrl);

    const response = await $fetch(laravelUrl, {
      headers: {
        Accept: 'application/json',
      },
    });

    console.log('✅ [Nuxt Server] Got response from Laravel');
    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.response?.status || 404,
      message: error.message || 'Post not found',
    });
  }
});
