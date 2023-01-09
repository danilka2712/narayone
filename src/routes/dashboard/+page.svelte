<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	export let data: PageData;
	const dataId = data.id;
	import { toast, SvelteToast } from '@zerodevx/svelte-toast';

	function removeItem() {
		localStorage.removeItem('key');
		goto('/');
	}
	const username = {
		name: data.name,
		phone: data.phone
	};
	async function updateUser() {
		const response = await fetch(`https://nesttest-production.up.railway.app/users/${String(dataId)}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('key')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(username)
		});
		if (response.ok) {
			toast.push('Успешно!');
			hiddenName = false
			hiddenPhone = false

		}
	}
	let hiddenName = false;
	let hiddenPhone = false;
</script>

<SvelteToast options={{ reversed: true, intro: { y: -192 } }} />

<div class="px-5 h-[80vh] flex flex-col justify-between">
	<div>
		<h1 class=" font-bold text-lg my-4 mb-7">Личный кабинет</h1>
		<div class="flex mb-6  flex-col">
			<div class="flex relative  mb-6  flex-col">
				<span class="text-[#9B9A9A] mb-3 text-sm">Ваше имя</span>
				<input
					on:keypress={() => (hiddenName = true)}
					bind:value={username.name}
					class="p-4  placeholder:text-[#9B9A9A]   border-[#ececec] border   font-sans focus:-[#5BC43A ]  focus:outline-none  py-4 rounded"
					name="name"
					type="text"
					required
				/>
				{#if hiddenName}
					<button on:click={updateUser} class=" text-green-500 font-medium right-4 top-12 absolute"
						>Изменить</button
					>
				{/if}
			</div>
			<div class=" relative flex flex-col">
				<span class="text-[#9B9A9A] mb-3 text-sm">Номер телефона</span>
				<input
					on:keypress={() => (hiddenPhone = true)}
					bind:value={username.phone}
					class="p-4  placeholder:text-[#9B9A9A]   border-[#ececec] border   font-sans focus:-[#5BC43A ]  focus:outline-none  py-4 rounded"
					name="phone"
					type="tel"
					required
				/>
				{#if hiddenPhone}
					<button on:click={updateUser} class=" text-green-500 font-medium right-4 top-12 absolute"
						>Изменить</button
					>
				{/if}
			</div>
		</div>
		<div class="flex mb-6  flex-col">
			<span class="text-[#9B9A9A] mb-3 text-sm">Адрес электронной почты</span>

			<input
				disabled
				bind:value={data.email}
				class="p-4   placeholder:text-[#9B9A9A]   border-[#ececec] border   font-sans focus:-[#5BC43A ]  focus:outline-none  py-4 rounded"
				name="phone"
				type="tel"
				required
			/>
		</div>
	</div>

	<div>
		<button
			on:click={removeItem}
			class=" bg-[#c43a3a] p-3 mt-2 rounded w-full   py-4   font-semibold text-white">Выйти</button
		>
	</div>
</div>
