import { toast, TypeOptions } from 'react-toastify';

type ToastType = TypeOptions;

export default function notification(
  message: string,
  type: ToastType = 'default',
) {
  return toast(message, {
    type,
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}
