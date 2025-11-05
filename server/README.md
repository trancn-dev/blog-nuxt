# Nuxt Server API Routes

Cấu trúc API routes theo chuẩn Nuxt 4 sử dụng Nitro server.

## Cấu trúc thư mục

```
server/
├── api/
│   ├── posts/
│   │   ├── index.get.ts          # GET /api/posts
│   │   └── [slug].get.ts         # GET /api/posts/:slug
│   ├── categories/
│   │   └── index.get.ts          # GET /api/categories
│   ├── tags/
│   │   └── index.get.ts          # GET /api/tags
│   ├── projects/
│   │   ├── index.get.ts          # GET /api/projects
│   │   └── [slug].get.ts         # GET /api/projects/:slug
│   ├── comments/
│   │   ├── index.post.ts         # POST /api/comments
│   │   └── post/
│   │       └── [postId].get.ts   # GET /api/comments/post/:postId
│   ├── skills/
│   │   └── index.get.ts          # GET /api/skills
│   └── admin/
│       ├── posts/
│       │   ├── [id].get.ts       # GET /api/admin/posts/:id (auth required)
│       │   ├── [id].put.ts       # PUT /api/admin/posts/:id (auth required)
│       │   ├── [id].delete.ts    # DELETE /api/admin/posts/:id (auth required)
│       │   └── index.post.ts     # POST /api/admin/posts (auth required)
│       ├── categories/
│       │   ├── [id].get.ts       # GET /api/admin/categories/:id (auth required)
│       │   ├── [id].put.ts       # PUT /api/admin/categories/:id (auth required)
│       │   ├── [id].delete.ts    # DELETE /api/admin/categories/:id (auth required)
│       │   └── index.post.ts     # POST /api/admin/categories (auth required)
│       └── tags/
│           ├── [id].get.ts       # GET /api/admin/tags/:id (auth required)
│           ├── [id].put.ts       # PUT /api/admin/tags/:id (auth required)
│           ├── [id].delete.ts    # DELETE /api/admin/tags/:id (auth required)
│           └── index.post.ts     # POST /api/admin/tags (auth required)
```

## Public API Routes

### Posts
- `GET /api/posts` - Lấy danh sách bài viết (có pagination)
- `GET /api/posts/:slug` - Lấy chi tiết bài viết theo slug

### Categories
- `GET /api/categories` - Lấy danh sách categories

### Tags
- `GET /api/tags` - Lấy danh sách tags

### Projects
- `GET /api/projects` - Lấy danh sách projects
- `GET /api/projects/:slug` - Lấy chi tiết project theo slug

### Comments
- `GET /api/comments/post/:postId` - Lấy comments của bài viết
- `POST /api/comments` - Tạo comment mới

### Skills
- `GET /api/skills` - Lấy danh sách skills

## Admin API Routes (Require Authentication)

Tất cả admin routes yêu cầu Bearer token trong header:
```
Authorization: Bearer <token>
```

### Posts
- `GET /api/admin/posts/:id` - Lấy chi tiết bài viết (admin)
- `POST /api/admin/posts` - Tạo bài viết mới
- `PUT /api/admin/posts/:id` - Cập nhật bài viết
- `DELETE /api/admin/posts/:id` - Xóa bài viết

### Categories
- `GET /api/admin/categories/:id` - Lấy chi tiết category
- `POST /api/admin/categories` - Tạo category mới
- `PUT /api/admin/categories/:id` - Cập nhật category
- `DELETE /api/admin/categories/:id` - Xóa category

### Tags
- `GET /api/admin/tags/:id` - Lấy chi tiết tag
- `POST /api/admin/tags` - Tạo tag mới
- `PUT /api/admin/tags/:id` - Cập nhật tag
- `DELETE /api/admin/tags/:id` - Xóa tag

## Cách sử dụng

### Trong components/pages:
```typescript
// Sử dụng composable
const { postsAPI } = useAPI()

// Lấy danh sách posts
const posts = await postsAPI.getAll({ page: 1 })

// Lấy post theo slug
const post = await postsAPI.getBySlug('my-post-slug')

// Admin: Tạo post mới (cần auth token)
const newPost = await postsAPI.create({
  title: 'New Post',
  content: 'Content...'
})
```

### Direct API call:
```typescript
// GET request
const data = await $fetch('/api/posts')

// POST request với auth
const result = await $fetch('/api/admin/posts', {
  method: 'POST',
  body: { title: 'New Post' },
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

## Environment Variables

Trong file `.env`:
```
NUXT_PUBLIC_API_BASE=http://localhost:8000/api/v1
```

## Lợi ích

1. **Server-side proxy**: Giấu Laravel API URL, tăng bảo mật
2. **Type-safe**: Full TypeScript support
3. **Auto-completion**: IDE hỗ trợ autocomplete
4. **Caching**: Có thể dễ dàng thêm caching layer
5. **Error handling**: Xử lý lỗi tập trung
6. **SSR-ready**: Hoạt động tốt với SSR/SSG
