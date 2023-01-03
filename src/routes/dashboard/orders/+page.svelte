<script lang="ts">
	import { goto } from '$app/navigation';
	import { io } from 'socket.io-client';
	import { onMount } from 'svelte';
	type Orders = [
		{
			id?: number;
			phone: string;
			content?: string;
			addressWhere: string;
			addressTo: string;
		}
	];
	const socket = io('https://nesttest-production.up.railway.app/');
	let orders: Orders = [];
	async function users() {
		await socket.emit('findAllChat', {}, (response: Orders) => {
			response.map((conten) => {
				if (conten.content === 'Поиск заказчика') {
					orders = [...orders, conten];
				}else{
					orders = [];
				}
			});
		});
	}
	users();

	socket.on('message', (message) => {
		orders.push(message);
		users();
	});
	socket.on('update', (update) => {
		orders.push(update);
		users();
	});

	let id: number | undefined;

	function sendOrders() {
		socket.emit('updateChat', { id: id });
	}
	interface userName {
		id: number;
		createdAt: string;
		updatedAt: string;
		email: string;
		name: string;
	}
	let userName: userName | any = {};
	onMount(async () => {
		const user = localStorage.getItem('lastname');
		const response = await fetch('https://nesttest-production.up.railway.app/users/me', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${user}`
			}
		});
		const data = await response.json();
		if (data.message === 'Unauthorized') {
			goto('/');
		}

		userName = data;
	});

	const username = {
		email: 'danilka27121@yandex.ru',
		password: '123465'
	};

	async function loginUser() {
		const response = await fetch('http://localhost:3000/auth/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(username)
		});
		const data = await response.json();

		localStorage.setItem('lastname', data.access_token);
	}
	let hidden = true;
	setTimeout(() => {
		hidden = false;
	}, 3000);
</script>

{JSON.stringify(orders)}
{#if orders.length < 1}
	{#if hidden}
		Загрузка
	{:else}
		Новых заказов нет!
	{/if}
{:else}
	<div class="flex px-5 flex-col gap-5">
		{#each orders as o}
			<div class=" border-b bg-white rounded p-5">
				<div>
					<h1 class=" font-sans"><span class="text-lg">Заказ </span>#{o.id}</h1>
				</div>
				<div class="flex my-4 items-center justify-between">
					<label>
						<span class="text-[#a5b3c1] mb-3 text-sm">Откуда</span>

						<p class=" font-medium">{o.addressWhere}</p>
					</label>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="2em"
						height="2em"
						preserveAspectRatio="xMidYMid meet"
						viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="m14 18l-1.4-1.45L16.15 13H4v-2h12.15L12.6 7.45L14 6l6 6Z"
						/></svg
					>
					<label>
						<span class="text-[#a5b3c1] mb-3 text-sm">Куда</span>

						<p class=" font-medium">{o.addressTo}</p>
					</label>
				</div>
				{#if o.content === 'Поиск заказчика'}
					<form on:submit={sendOrders}>
						<button
							class=" bg-[#5BC43A] p-3 mt-2 rounded w-full   py-4   font-semibold text-white"
							on:click={() => (id = o.id)}
							type="submit">Принять заказ</button
						>
					</form>
				{:else}
					<p>Заказ принят</p>
				{/if}
			</div>
		{/each}
	</div>
{/if}
