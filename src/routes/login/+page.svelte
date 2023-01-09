<script lang="ts">
	import { goto } from '$app/navigation';

	let username = {
		email: '',
		password: ''
	};
	let errorEmail = '';
	let errorUser = '';
	async function loginUser() {
		const response = await fetch('http://localhost:3000/auth/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(username)
		});
		const data = await response.json();
		if (data.error) {
			if (data.message === 'Credentials incorrect') {
				errorUser = 'Неверные учетные данные';
				setTimeout(() => {
					errorEmail = '';
				}, 3000);
			} else {
				errorEmail = 'Проверьте правильность введенного адреса электронной почты';
				setTimeout(() => {
					errorUser = '';
				}, 3000);
			}
		} else if (response.ok) {
			localStorage.setItem('key', data.access_token);
			goto('/dashboard');
		}
	}
</script>

<div class="px-5 flex flex-col justify-center h-[60vh]">
	<form on:submit={loginUser}>
		<span class="text-2xl font-medium  mb-5 justify-center text-center flex">Войти</span>
		<div class="flex gap-4 flex-col">
			<p class=" text-sm text-red-500">{errorEmail}</p>
			<input
				bind:value={username.email}
				placeholder="Email"
				class="p-4 placeholder:text-[#a5b3c1]   border-[#D0D2D3]/40   font-sans focus:border-[#5BC43A ]  focus:outline-none border py-4 rounded"
				type="text"
				name=""
				id="Email"
				required
			/>

			<input
				bind:value={username.password}
				placeholder="Пароль"
				class="p-4  placeholder:text-[#a5b3c1]   border-[#D0D2D3]/40   font-sans focus:border-[#5BC43A ]  focus:outline-none border py-4 rounded"
				type="password"
				name=""
				id="password"
				required
			/>
			<p class=" text-sm text-red-500">{errorUser}</p>
			<button
				type="submit"
				class="transition duration-300 hover:bg-[#54b935] ease-in-out bg-[#5BC43A] p-3 rounded w-full   py-4   font-semibold text-white">Войти</button
			>
		</div>
	</form>
</div>
