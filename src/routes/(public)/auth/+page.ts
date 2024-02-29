import { redirect, type Load } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { browser } from '$app/environment';
import { currentSession } from '$lib/util/users';

export const load: Load = async () => {
    if (browser) {
        if (get(currentSession)) {
            redirect(307, '/dashboard');
        }
    }
};