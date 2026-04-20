import { toast } from "sonner";

export default function useToastMessage() {
  const toastSuccess = (message: string) => {
    toast.dismiss();
    toast.success(message);
  };

  const toastError = (message: string) => {
    toast.dismiss();
    toast.error(message);
  };

  const toastLoading = (message: string) => {
    toast.dismiss();
    toast.loading(message);
  };
  return {
    toastSuccess,
    toastError,
    toastLoading,
  };
}
