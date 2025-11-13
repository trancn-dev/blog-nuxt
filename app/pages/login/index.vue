<!-- login page using Vuetify components -->
<template>
  <v-container class="login-page">
    <v-row justify="center" align="center">
      <v-col cols="8">
        <v-card elevation="8" class="pa-6">
          <v-card-title class="text-h5 text-center mb-4">
            Đăng nhập
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="email"
                label="Tên Đăng Nhập"
                variant="outlined"
                prepend-inner-icon="mdi-account"
                :rules="[rules.required]"
                required
              />

              <v-text-field
                v-model="password"
                label="Mật Khẩu"
                type="password"
                variant="outlined"
                prepend-inner-icon="mdi-lock"
                :rules="[rules.required]"
                required
                class="mt-3"
              />

              <v-btn
                type="submit"
                color="primary"
                size="large"
                block
                class="mt-4"
              >
                Đăng nhập
              </v-btn>

              <!-- đăng nhập bằng mạng xã hội -->
              <v-divider class="my-4" />

              <div class="text-center mb-3">
                <span class="text-body-2">Hoặc đăng nhập bằng:</span>
              </div>

              <v-btn
                color="error"
                variant="outlined"
                prepend-icon="mdi-google"
                block
                class="mb-2"
                @click="handleGoogleLogin"
                :loading="googleLoading"
              >
                Đăng nhập với Google
              </v-btn>

              <v-btn
                color="#3b5998"
                variant="outlined"
                prepend-icon="mdi-facebook"
                block
                disabled
              >
                Facebook (Sắp ra mắt)
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
        <div class="text-center mt-6">
          <v-btn
            color="primary"
            variant="tonal"
            prepend-icon="mdi-home"
            class="mx-auto"
            to="/"
          >
            Về trang chủ
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  // use layout blank for login page
  definePageMeta({
    layout: 'blank',
    middleware: 'guest',
  });

  import { ref } from 'vue';

  const email = ref('');
  const password = ref('');
  const googleLoading = ref(false);
  const router = useRouter();
  const config = useRuntimeConfig();
  const { setAuth } = useAuth();

  const rules = {
    required: (value: string) => !!value || 'Trường này là bắt buộc',
  };

  // Đăng nhập thông thường (email/password)
  // Lưu lại đường dẫn trước khi chuyển sang login
  const route = useRoute();
  const redirectPath = ref(route.query.redirect || '/');

  async function handleLogin() {
    try {
      const response: any = await $fetch(
        `${config.public.apiBase}/auth/login`,
        {
          method: 'POST',
          body: {
            email: email.value,
            password: password.value,
          },
        }
      );

      console.log('Đăng nhập thành công:', response);

      // Lưu token và user info vào store
      setAuth(response.user, response.token);

      // Chuyển về trang trước đó
      router.push(redirectPath.value);
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    }
  }

  // Đăng nhập bằng Google
  async function handleGoogleLogin() {
    googleLoading.value = true;
    try {
      const { signInWithGoogle } = useFirebaseAuth();
      const user = await signInWithGoogle();

      // Lấy ID token từ Firebase
      const idToken = await user.getIdToken();

      // Gửi token lên backend để xác thực
      const response: any = await $fetch(
        `${config.public.apiBase}/auth/google`,
        {
          method: 'POST',
          body: {
            idToken,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
        }
      );

      console.log('Đăng nhập Google thành công:', response);

      // Lưu token và user info vào store
      setAuth(response.user, response.token);

      // Chuyển về trang trước đó
      router.push(redirectPath.value);
    } catch (error: any) {
      console.error('Lỗi đăng nhập Google:', error);
      alert('Đăng nhập Google thất bại: ' + error.message);
    } finally {
      googleLoading.value = false;
    }
  }
</script>
<style scoped>
  .login-page {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 !important;
  }
</style>
