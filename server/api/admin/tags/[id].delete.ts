export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, "authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  const token = authHeader.substring(7);
  const id = getRouterParam(event, "id");
  const config = useRuntimeConfig();

  try {
    const response = await $fetch(`${config.public.apiBase}/admin/tags/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.response?.status || 500,
      message: error.message || "Failed to delete tag",
    });
  }
});
