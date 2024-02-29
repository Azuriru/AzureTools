import { redirect, type Load } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { defaultLocale, loadTranslations, locale } from '$lib/i18n';
import { persistible } from '$lib/util/store';
import { users, currentUser, currentSession } from '$lib/util/users';
import { browser } from '$app/environment';

export const load: Load = async ({ url }) => {
    const language = persistible('language', defaultLocale);
    const initLocale = locale.get() || get(language);

    await loadTranslations(initLocale, url.pathname);

    if (browser) {
        const session = get(currentSession);

        if (!session && url.pathname !== '/auth') {
            redirect(307, '/auth');
        } else {
            const user = get(users).find(user => user.id === session);

            if (user) {
                currentUser.set(user);
            }
        }
    }
};