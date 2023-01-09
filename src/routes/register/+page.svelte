<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte/internal';

	let username = {
		email: '',
		password: ''
	};
	async function loginUser() {
		const response = await fetch('https://nesttest-production.up.railway.app/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(username)
		});

		if (response.ok) {
			goto('/login');
		}
	}

</script>

<div class="px-5 flex flex-col justify-center h-[60vh]">
	<form on:submit={loginUser}>
		<span class="text-2xl font-medium  mb-5 justify-center text-center flex">Регистрация</span>
		<div class="flex gap-4 flex-col">
			<input
				bind:value={username.email}
				placeholder="Email"
				class="p-4 focus:-[#5BC43A] placeholder:text-[#a5b3c1]   border-[#ececec] border   font-sans focus:-[#5BC43A ]  focus:outline-none  py-4 rounded"
				type="text"
				name=""
				id=""
				required
			/>

			<input
				bind:value={username.password}
				placeholder="Пароль"
				class="p-4 focus:-[#5BC43A] placeholder:text-[#a5b3c1]   border-[#ececec] border   font-sans focus:-[#5BC43A ]  focus:outline-none  py-4 rounded"
				type="password"
				name=""
				id=""
				required
			/>
			<button
				type="submit"
				class=" bg-[#5BC43A] transition duration-300 hover:bg-[#54b935] ease-in-out p-3 rounded w-full   py-4   font-semibold text-white">Зарегистрироваться</button
			>
			<a class=" text-center" href="/login">Войти</a>
		</div>
	</form>
</div>
