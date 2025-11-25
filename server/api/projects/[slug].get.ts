export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  const config = useRuntimeConfig();

  try {
    const response = await $fetch(
      `${config.public.apiBase}${config.public.apiPersonPrefix}/projects/${slug}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.response?.status || 404,
      message: error.message || 'Project not found',
    });
  }
});
