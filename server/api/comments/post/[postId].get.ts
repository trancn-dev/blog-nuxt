export default defineEventHandler(async (event) => {
  const postId = getRouterParam(event, "postId");
  const config = useRuntimeConfig();

  try {
    const response = await $fetch(
      `${config.public.apiBase}/comments/post/${postId}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.response?.status || 500,
      message: error.message || "Failed to fetch comments",
    });
  }
});
