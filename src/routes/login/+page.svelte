<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let username = {
		email: '',
		password: ''
	};
	let errorEmail = '';
	$: errorEmail.length > 2
		? setTimeout(() => {
				errorEmail = '';
		  }, 2000)
		: setTimeout(() => {
				errorEmail = '';
		  }, 2000);
	async function loginUser() {
		const response = await fetch('https://nesttest-production.up.railway.app/auth/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(username)
		});
		const data = await response.json();
		localStorage.setItem('lastname', data.access_token);
		if (data.statusCode === 400) {
			errorEmail = data.message;
		}else{
            goto('/dashboard/orders')
        }
	
	}
	onMount(async () => {
		const user = localStorage.getItem('lastname');
		const response = await fetch('https://nesttest-production.up.railway.app/users/me', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${user}`
			}
		});
		const data = await response.json();
		if (data.message !== 'Unauthorized') {
			goto('/dashboard');
		} else if (data.message === 'Unauthorized') {
		}
	});
</script>

<div class="px-5 flex flex-col justify-center h-[60vh]">
	<form on:submit={loginUser}>
		<span class="text-2xl font-medium  mb-5 justify-center text-center flex">Войти</span>
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
		</div>
	</form>
</div>
