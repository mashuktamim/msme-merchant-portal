import { useMutation } from '@tanstack/react-query';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/use-auth-store';
import { loginRequest } from '../-api';

export const useLogin = () => {
  const navigate = useNavigate();
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: async (data) => {
      login(data.user, data.token);
      toast.success('Logged in successfully!');
      
      // Invalidate the router to ensure all beforeLoad hooks re-run with the new context
      await router.invalidate();
      
      navigate({ to: '/' });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to login');
    },
  });
};
