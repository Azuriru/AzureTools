import { type ToastSettings } from '@skeletonlabs/skeleton';
import { t } from '$lib/i18n';

export const toastMessage = (message: string): ToastSettings => {
    let background: string | undefined;

    if (message.includes('success')) {
        background = 'bg-emerald-500';
    }

    if (message.includes('warn')) {
        background = 'bg-amber-500';
    }

    if (message.includes('error') || message.includes('fail')) {
        background = 'bg-red-500';
    }

    return {
        message: t.get(message),
        background
    }
}