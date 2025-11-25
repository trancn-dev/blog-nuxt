export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  try {
    const response = await $fetch(
      `${config.public.apiBase}${config.public.apiPersonPrefix}/login`,
      {
        method: 'POST',
        body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.response?.status || 401,
      message: error.message || 'Login failed',
    });
  }
});
