import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ cookies, request }) => {
		const token = 'd512112976df66bf36f8f17e8dd9cc4cfc28f95e';
		const secret = 'eb46be469935c0c3f3ca90aeea4e49e01d4c4b86';
		const data = await request.formData();
		const query = data.get('query');
		const response = await fetch('https://cleaner.dadata.ru/api/v1/clean/address', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Token ' + token,
				'X-Secret': secret
			},
			body: JSON.stringify([query])
		});
		const info = await response.json();
		return {
			info: info[0].result
		};
	}
};
