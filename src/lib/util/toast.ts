import { type ToastSettings } from '@skeletonlabs/skeleton';

export const toastMessage = (message: string): ToastSettings => {
    let background: string | undefined;

    if (message.includes('success')) {
        background = 'variant-filled-success';
    }

    if (message.includes('error')) {
        background = 'variant-filled-error';
    }

    return {
        message: `toast.${message}`,
        background
    }
}