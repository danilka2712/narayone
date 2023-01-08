import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import { dataset_dev } from 'svelte/internal';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	if (browser) {
		const response = await fetch('http://localhost:3000/users/me', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('key')}`
			}
		});
		const data = await response.json();
		if(response.ok) {
			throw redirect(302, '/dashboard');
		}
		if (data.message === 'Internal server error') {
			localStorage.removeItem('key');
			throw redirect(302, '/login');
		}

		return {};
	}
}) satisfies PageLoad;
