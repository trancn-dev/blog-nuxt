export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const config = useRuntimeConfig();

  try {
    const response = await $fetch(
      `${config.public.apiBase}${config.public.apiPersonPrefix}/posts`,
      {
        query,
        headers: {
          Accept: 'application/json',
        },
      }
    );

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.response?.status || 500,
      message: error.message || 'Failed to fetch posts',
    });
  }
});
