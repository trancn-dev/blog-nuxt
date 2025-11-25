export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const headers = getHeaders(event);
  const body = await readBody(event);

  try {
    const response = await $fetch(
      `${config.public.apiBase}${config.public.apiPersonPrefix}/auth/update`,
      {
        method: 'PUT',
        body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: headers.authorization || '',
        },
      }
    );

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.response?.status || 500,
      message: error.message || 'Failed to update profile',
    });
  }
});
