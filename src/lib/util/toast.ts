import { type ToastSettings } from '@skeletonlabs/skeleton';
import { t } from '$lib/i18n';

export const toastMessage = (message: string): ToastSettings => {
    let background: string | undefined;

    if (message.includes('success')) {
        background = 'variant-filled-success';
    }

    if (message.includes('warn')) {
        background = 'variant-filled-warning';
    }

    if (message.includes('error') || message.includes('fail')) {
        background = 'variant-filled-error';
    }

    return {
        message: t.get(message),
        background
    }
}