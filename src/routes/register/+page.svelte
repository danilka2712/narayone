<script lang="ts">
	import { goto } from '$app/navigation';

	let username = {
		email: '',
		password: ''
	};
	async function loginUser() {
		await fetch('https://nesttest-production.up.railway.app/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(username)
		});
		goto('/login');
	}
</script>

<div class="px-5 flex flex-col justify-center h-[60vh]">
	<form on:submit={loginUser}>
		<span class="text-2xl font-medium  mb-5 justify-center text-center flex">Регистрация</span>
		<div class="flex gap-4 flex-col">
			<input
				bind:value={username.email}
				placeholder="Email"
				class="p-4 placeholder:text-[#a5b3c1]   border-[#D0D2D3]/40   font-sans focus:border-[#5BC43A ]  focus:outline-none border py-4 rounded"
				type="text"
				name=""
				id=""
				required
			/>

			<input
				bind:value={username.password}
				placeholder="Пароль"
				class="p-4  placeholder:text-[#a5b3c1]   border-[#D0D2D3]/40   font-sans focus:border-[#5BC43A ]  focus:outline-none border py-4 rounded"
				type="text"
				name=""
				id=""
				required
			/>
			<button
				type="submit"
				class=" bg-[#5BC43A] p-3 rounded w-full   py-4   font-semibold text-white">Войти</button
			>
			<a class=" text-center" href="/login">Войти</a>
		</div>
	</form>
</div>
