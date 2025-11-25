<template>
  <v-container class="profile-page">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="4">
          <v-card-title
            class="text-h5 d-flex align-center justify-space-between"
          >
            <span>
              <v-icon class="mr-2">mdi-account-circle</v-icon>
              Thông tin cá nhân
            </span>
            <v-btn
              v-if="!isEditing"
              color="primary"
              variant="text"
              @click="toggleEdit"
              prepend-icon="mdi-pencil"
            >
              Chỉnh sửa
            </v-btn>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text class="pa-6">
            <v-progress-linear
              v-if="loading"
              indeterminate
              color="primary"
            ></v-progress-linear>

            <!-- View Mode -->
            <div v-if="!isEditing && !loading">
              <v-list lines="two">
                <v-list-item>
                  <template v-slot:prepend>
                    <v-avatar size="80" color="primary">
                      <v-img
                        v-if="user.avatar"
                        :src="user.avatar"
                        alt="Avatar"
                      ></v-img>
                      <span v-else class="text-h4">{{
                        user.name?.charAt(0).toUpperCase()
                      }}</span>
                    </v-avatar>
                  </template>
                </v-list-item>

                <v-list-item>
                  <v-list-item-title class="text-subtitle-2 text-grey-darken-1"
                    >Họ và tên</v-list-item-title
                  >
                  <v-list-item-subtitle class="text-h6 mt-1">{{
                    user.name
                  }}</v-list-item-subtitle>
                </v-list-item>

                <v-list-item>
                  <v-list-item-title class="text-subtitle-2 text-grey-darken-1"
                    >Email</v-list-item-title
                  >
                  <v-list-item-subtitle class="text-h6 mt-1">{{
                    user.email
                  }}</v-list-item-subtitle>
                </v-list-item>

                <v-list-item v-if="user.avatar">
                  <v-list-item-title class="text-subtitle-2 text-grey-darken-1"
                    >Avatar URL</v-list-item-title
                  >
                  <v-list-item-subtitle class="text-body-2 mt-1">{{
                    user.avatar
                  }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </div>

            <!-- Edit Mode -->
            <v-form
              v-if="isEditing && !loading"
              ref="formRef"
              @submit.prevent="handleUpdate"
            >
              <v-row>
                <v-col cols="12" class="text-center mb-4">
                  <v-avatar size="100" color="primary">
                    <v-img
                      v-if="form.avatar"
                      :src="form.avatar"
                      alt="Avatar"
                    ></v-img>
                    <span v-else class="text-h3">{{
                      form.name?.charAt(0).toUpperCase()
                    }}</span>
                  </v-avatar>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="form.name"
                    label="Họ và tên"
                    variant="outlined"
                    prepend-inner-icon="mdi-account"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="form.email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    prepend-inner-icon="mdi-email"
                    :rules="[rules.required, rules.email]"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="form.avatar"
                    label="Avatar URL"
                    variant="outlined"
                    prepend-inner-icon="mdi-image"
                    hint="URL hình ảnh avatar của bạn"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-divider class="my-2"></v-divider>
                  <p class="text-subtitle-2 text-grey-darken-1 mb-3">
                    Để trống nếu không muốn thay đổi mật khẩu
                  </p>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="form.password"
                    label="Mật khẩu mới"
                    type="password"
                    variant="outlined"
                    prepend-inner-icon="mdi-lock"
                    :rules="passwordRules"
                    hint="Tối thiểu 6 ký tự"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="form.password_confirmation"
                    label="Xác nhận mật khẩu"
                    type="password"
                    variant="outlined"
                    prepend-inner-icon="mdi-lock-check"
                    :rules="confirmPasswordRules"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>

          <v-divider v-if="isEditing"></v-divider>

          <v-card-actions v-if="isEditing" class="pa-4">
            <v-btn @click="cancelEdit" variant="text"> Hủy </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="handleUpdate"
              :loading="updating"
              prepend-icon="mdi-content-save"
            >
              Lưu thay đổi
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'default',
    middleware: 'auth',
    requiresAuth: true,
  });

  const loading = ref(true);
  const updating = ref(false);
  const isEditing = ref(false);
  const formRef = ref(null);

  interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
  }

  const user = ref<User>({
    id: 0,
    name: '',
    email: '',
    avatar: '',
  });

  const form = ref({
    name: '',
    email: '',
    avatar: '',
    password: '',
    password_confirmation: '',
  });

  // Validation rules
  const rules = {
    required: (v: string) => !!v || 'Trường này là bắt buộc',
    email: (v: string) => /.+@.+\..+/.test(v) || 'Email không hợp lệ',
  };

  const passwordRules = computed(() => {
    const rules = [];
    if (form.value.password) {
      rules.push(
        (v: string) =>
          (v && v.length >= 6) || 'Mật khẩu phải có ít nhất 6 ký tự'
      );
    }
    return rules;
  });

  const confirmPasswordRules = computed(() => {
    const rules = [];
    if (form.value.password) {
      rules.push((v: string) => !!v || 'Vui lòng xác nhận mật khẩu');
      rules.push(
        (v: string) => v === form.value.password || 'Mật khẩu không khớp'
      );
    }
    return rules;
  });

  // Fetch user profile
  const fetchProfile = async () => {
    loading.value = true;
    try {
      const auth_token = localStorage.getItem('auth_token');
      if (!auth_token) {
        navigateTo('/login');
        return;
      }

      const response: any = await $fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      });

      if (response.user) {
        user.value = response.user;
        // Copy to form for editing
        form.value = {
          name: response.user.name,
          email: response.user.email,
          avatar: response.user.avatar || '',
          password: '',
          password_confirmation: '',
        };
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      if (error.statusCode === 401) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        navigateTo('/login');
      }
    } finally {
      loading.value = false;
    }
  };

  // Toggle edit mode
  const toggleEdit = () => {
    isEditing.value = true;
    // Reset form to current user data
    form.value = {
      name: user.value.name,
      email: user.value.email,
      avatar: user.value.avatar || '',
      password: '',
      password_confirmation: '',
    };
  };

  // Cancel edit
  const cancelEdit = () => {
    isEditing.value = false;
    form.value.password = '';
    form.value.password_confirmation = '';
  };

  // Update profile
  const handleUpdate = async () => {
    if (!formRef.value) return;

    const { valid } = await (formRef.value as any).validate();
    if (!valid) return;

    updating.value = true;
    try {
      const auth_token = localStorage.getItem('auth_token');
      if (!auth_token) {
        navigateTo('/login');
        return;
      }

      // Prepare data to send
      const updateData: any = {
        name: form.value.name,
        email: form.value.email,
        avatar: form.value.avatar,
      };

      // Only include password if it's filled
      if (form.value.password) {
        updateData.password = form.value.password;
        updateData.password_confirmation = form.value.password_confirmation;
      }

      const response: any = await $fetch('/api/auth/update', {
        method: 'PUT',
        body: updateData,
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      });

      if (response.user) {
        user.value = response.user;
        // Update localStorage
        localStorage.setItem('auth_user', JSON.stringify(response.user));
      }

      // Show success message
      alert('Cập nhật thông tin thành công!');
      isEditing.value = false;
    } catch (error: any) {
      console.error('Error updating profile:', error);
      alert(error.data?.message || 'Có lỗi xảy ra khi cập nhật thông tin');
    } finally {
      updating.value = false;
    }
  };

  // Load profile on mount
  onMounted(() => {
    fetchProfile();
  });
</script>

<style scoped>
  .profile-page {
    padding: 40px 16px;
    min-height: 80vh;
  }
</style>
