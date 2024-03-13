import { redirect, type Load } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { currentSession } from '$lib/util/client/users';

export const load: Load = async () => {
    const session = get(currentSession);

    if (session) {
        redirect(308, '/dashboard');
    }
};