import { type ToastSettings } from '@skeletonlabs/skeleton';

export const toastMessage = (message: string): ToastSettings => {
    let background: string | undefined;

    if (message.includes('success')) {
        background = 'variant-filled-success';
    }

    if (message.includes('warn')) {
        background = 'variant-filled-warn';
    }

    if (message.includes('error') || message.includes('fail')) {
        background = 'variant-filled-error';
    }

    return {
        message: `toast.${message}`,
        background
    }
}