import { useToast } from '@/hooks/use-toast';

export function useOnboardingToasts() {
  const { toast } = useToast();

  const showSuccessToast = (message: string) => {
    toast({
      title: "Success",
      description: message,
      duration: 5000,
    });
  };

  const showErrorToast = (message: string) => {
    toast({
      variant: "destructive",
      title: "Error",
      description: message,
      duration: 7000,
    });
  };

  const showWarningToast = (message: string) => {
    toast({
      variant: "default",
      title: "Warning",
      description: message,
      duration: 5000,
    });
  };

  return {
    showSuccessToast,
    showErrorToast,
    showWarningToast,
  };
}