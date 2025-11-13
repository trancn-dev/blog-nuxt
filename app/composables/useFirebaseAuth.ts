// composables/useFirebaseAuth.ts
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';

export const useFirebaseAuth = () => {
  const { $firebaseApp } = useNuxtApp();
  const auth = getAuth($firebaseApp as any);
  const user = useState<User | null>('firebaseUser', () => null);
  const loading = useState<boolean>('firebaseLoading', () => true);

  // Sign in with Google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      user.value = result.user;
      return result.user;
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      user.value = null;
    } catch (error: any) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Listen to auth state changes
  const initAuthListener = () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser;
      loading.value = false;
    });
  };

  return {
    user,
    loading,
    signInWithGoogle,
    logout,
    initAuthListener,
  };
};
