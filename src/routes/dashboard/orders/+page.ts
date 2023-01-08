import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	if (browser) {
		const response = await fetch('https://nesttest-production.up.railway.app/users/me', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('key')}`
			}
		});
		const data = await response.json();
		if (data.message === 'Unauthorized') {
			throw redirect(302, '/login');
		}
	}

	return {};
}) satisfies PageLoad;
