# API Call Strategy

## Hai cách gọi API trong Nuxt

### 1. Qua Nuxt Server Routes (Proxy) - **Recommended**
```typescript
const { postsAPI } = useAPI()  // hoặc useAPI(false)
```

**Ưu điểm:**
- ✅ Bảo mật hơn (ẩn Laravel API URL)
- ✅ Tránh CORS issues
- ✅ SSR-friendly (server-side rendering)
- ✅ Có thể thêm caching layer
- ✅ Có thể transform data trước khi trả về client
- ✅ Rate limiting tập trung

**Nhược điểm:**
- ❌ Thêm 1 network hop (client -> Nuxt -> Laravel)
- ❌ Cần maintain server routes

**Flow:**
```
Browser -> http://localhost:3000/api/posts/slug
         -> Nuxt Server (server/api/posts/[slug].get.ts)
         -> Laravel API (http://localhost:8000/api/v1/posts/slug)
         -> Response trả về browser
```

---

### 2. Gọi trực tiếp Laravel API - **Direct**
```typescript
const { postsAPI } = useAPI(true)  // direct = true
```

**Ưu điểm:**
- ✅ Nhanh hơn (giảm 1 network hop)
- ✅ Đơn giản hơn
- ✅ Không cần maintain server routes

**Nhược điểm:**
- ❌ Expose Laravel API URL ra ngoài
- ❌ Phải config CORS trên Laravel
- ❌ Khó cache
- ❌ Không hoạt động tốt với SSR

**Flow:**
```
Browser -> http://localhost:8000/api/v1/posts/slug
         -> Laravel API
         -> Response trả về browser
```

---

## Cấu hình hiện tại

File `.env`:
```
NUXT_PUBLIC_API_BASE=http://localhost:8000/api/v1
```

## Khi nào dùng gì?

### Dùng Proxy (Recommended cho Production):
- Public-facing website
- Cần bảo mật API endpoint
- Cần caching
- SSR/SSG
- SEO quan trọng

### Dùng Direct (OK cho Development):
- Development nhanh
- Internal tools
- Admin dashboard (đã có auth)
- Không cần SEO

## Thay đổi cấu hình

### Toàn bộ app dùng direct:
Mở từng file page và thay:
```typescript
// Từ
const { postsAPI } = useAPI()

// Thành
const { postsAPI } = useAPI(true)
```

### Hoặc tạo wrapper riêng:
```typescript
// composables/useDirectAPI.ts
export const useDirectAPI = () => useAPI(true)

// Trong page
const { postsAPI } = useDirectAPI()
```

---

## CORS Configuration (Nếu dùng direct)

Trong Laravel (`devkit/config/cors.php`):
```php
return [
    'paths' => ['api/*'],
    'allowed_origins' => ['http://localhost:3000'],
    'allowed_methods' => ['*'],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```
