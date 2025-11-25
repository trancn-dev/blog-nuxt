<!-- register page using Vuetify components -->
<template>
  <v-container class="register-page">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="5" xl="4">
        <v-card elevation="8" class="pa-6">
          <v-card-title class="text-h5 text-center mb-4">
            Đăng Kí Tài Khoản
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="handleRegister">
              <v-text-field
                v-model="name"
                label="Họ và Tên"
                variant="outlined"
                prepend-inner-icon="mdi-account"
                :rules="[rules.required]"
                required
              />

              <v-text-field
                v-model="userName"
                label="Tên đăng nhập (username)"
                variant="outlined"
                prepend-inner-icon="mdi-at"
                :rules="[rules.required, rules.userName]"
                hint="Ví dụ: abc123 (không dấu, không khoảng trắng)"
                persistent-hint
                required
                class="mt-3"
              />

              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                variant="outlined"
                prepend-inner-icon="mdi-email"
                :rules="[rules.required, rules.email]"
                required
                class="mt-3"
              />

              <v-text-field
                v-model="password"
                label="Mật Khẩu"
                type="password"
                variant="outlined"
                prepend-inner-icon="mdi-lock"
                :rules="[rules.required, rules.minLength]"
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
                Đăng Kí
              </v-btn>

              <!-- đăng kí bằng mạng xã hội -->
              <v-divider class="my-4" />

              <div class="text-center mb-3">
                <span class="text-body-2">Hoặc đăng kí bằng:</span>
              </div>

              <v-btn
                color="error"
                variant="outlined"
                prepend-icon="mdi-google"
                block
                class="mb-2"
                @click="handleGoogleRegister"
                :loading="googleLoading"
              >
                Đăng ký với Google
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
  definePageMeta({
    layout: 'blank',
    middleware: 'guest',
  });

  import { ref } from 'vue';

  const name = ref('');
  const userName = ref('');
  const email = ref('');
  const password = ref('');
  const googleLoading = ref(false);
  const router = useRouter();
  const config = useRuntimeConfig();
  const { setAuth } = useAuth();

  const rules = {
    required: (value: string) => !!value || 'Trường này là bắt buộc',
    email: (value: string) => /.+@.+\..+/.test(value) || 'Email không hợp lệ',
    minLength: (value: string) =>
      value.length >= 6 || 'Mật khẩu phải có ít nhất 6 ký tự',
    userName: (value: string) =>
      /^[a-zA-Z0-9_]+$/.test(value) ||
      'Username chỉ được chứa chữ cái, số và dấu gạch dưới',
  };

  // Đăng ký thông thường
  async function handleRegister() {
    try {
      const response: any = await $fetch(
        `${config.public.apiBase}${config.public.apiPersonPrefix}/register`,
        {
          method: 'POST',
          body: {
            name: name.value,
            user_name: userName.value,
            email: email.value,
            password: password.value,
          },
        }
      );

      console.log('Đăng ký thành công:', response);

      // Lưu token và user info vào store
      setAuth(response.user, response.token);

      alert('Đăng ký thành công!');
      router.push('/');
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      alert('Đăng ký thất bại. Vui lòng thử lại.');
    }
  }

  // Đăng ký bằng Google
  async function handleGoogleRegister() {
    googleLoading.value = true;
    try {
      const { signInWithGoogle } = useFirebaseAuth();
      const user = await signInWithGoogle();

      // Lấy ID token từ Firebase
      const idToken = await user.getIdToken();

      // Gửi token lên backend để tạo tài khoản
      const response: any = await $fetch(`/api/auth/google`, {
        method: 'POST',
        body: {
          idToken,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      });

      console.log('Đăng ký Google thành công:', response);

      // Lưu token và user info vào store
      setAuth(response.user, response.token);

      alert('Đăng ký thành công!');
      router.push('/');
    } catch (error: any) {
      console.error('Lỗi đăng ký Google:', error);
      alert('Đăng ký Google thất bại: ' + error.message);
    } finally {
      googleLoading.value = false;
    }
  }
</script>
<style scoped>
  .register-page {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 !important;
  }
</style>
