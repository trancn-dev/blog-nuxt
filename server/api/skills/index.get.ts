export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    const response = await $fetch(`${config.public.apiBase}/about/skills`, {
      headers: {
        Accept: "application/json",
      },
    });

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.response?.status || 500,
      message: error.message || "Failed to fetch skills",
    });
  }
});
