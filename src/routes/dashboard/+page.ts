import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
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
		if (data.message === 'Unauthorized') {
			throw redirect(302, '/login');
		}
		if (data.message === 'Internal server error') {
			localStorage.removeItem('key');
			throw redirect(302, '/login');
		}

		return {
			id: data.id,
			email: data.email,
			name: data.name,
			phone: data.phone
		};
	}
}) satisfies PageLoad;
