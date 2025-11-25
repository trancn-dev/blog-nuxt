// composables/useAuth.ts
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export const useAuth = () => {
  const user = useState<User | null>('auth_user', () => null);
  const auth_token = useState<string | null>('auth_token', () => null);

  // Getters
  const isAuthenticated = computed(() => !!auth_token.value);
  const currentUser = computed(() => user.value);

  // Load từ localStorage khi khởi động
  const loadFromStorage = () => {
    if (process.client) {
      const savedToken = localStorage.getItem('auth_token');
      const savedUser = localStorage.getItem('auth_user');

      if (savedToken && savedUser) {
        auth_token.value = savedToken;
        user.value = JSON.parse(savedUser);
      }
    }
  };

  // Lưu thông tin đăng nhập
  const setAuth = (userData: User, authToken: string) => {
    console.log('setAuth called with:', { userData, authToken });

    if (!userData || !authToken) {
      console.error('setAuth: userData hoặc authToken bị undefined');
      return;
    }

    user.value = userData;
    auth_token.value = authToken;

    if (process.client) {
      localStorage.setItem('auth_token', authToken);
      localStorage.setItem('auth_user', JSON.stringify(userData));
      console.log('Đã lưu vào localStorage:', {
        token: localStorage.getItem('auth_token'),
        user: localStorage.getItem('auth_user'),
      });
    }
  };

  // Đăng xuất
  const logout = () => {
    user.value = null;
    auth_token.value = null;

    if (process.client) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
  };

  // Cập nhật thông tin user
  const updateUser = (userData: Partial<User>) => {
    if (user.value) {
      user.value = { ...user.value, ...userData };

      if (process.client) {
        localStorage.setItem('auth_user', JSON.stringify(user.value));
      }
    }
  };

  return {
    user,
    auth_token,
    isAuthenticated,
    currentUser,
    loadFromStorage,
    setAuth,
    logout,
    updateUser,
  };
};
