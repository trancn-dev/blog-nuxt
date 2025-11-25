export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const headers = getHeaders(event);

  try {
    const response = await $fetch(
      `${config.public.apiBase}${config.public.apiPersonPrefix}/auth/me`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: headers.authorization || '',
        },
      }
    );

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.response?.status || 401,
      message: error.message || 'Unauthorized',
    });
  }
});
