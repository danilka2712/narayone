<script lang="ts">
	import { io } from 'socket.io-client';
	import { page } from '$app/stores';
	interface Orders {
		id?: number;
		phone?: string;
		content?: string;
	}

	let id: number = Number($page.params.id);

	const socket = io('https://nesttest-production.up.railway.app/');
	let orders: Orders = [];
	async function users() {
		await socket.emit('findOneChat', { id: id }, (response) => {
			orders = response;
			console.log(orders);
		});
	}
	users();
	socket.on('update', (update) => {
		orders = update;
		users();
	});
</script>

{#if orders.id === undefined}
	<div class="flex justify-center items-center h-[80vh]">
		<svg
			class="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
		<p>Загрузка</p>
	</div>
{:else if orders.content === 'Поиск заказчика'}
	<div class="px-5">
		<div>
			<h1 class=" text-lg font-medium font-sans">Заявка №{orders.id}</h1>
		</div>
		<div class="flex justify-center items-center h-[75vh]">
			<span class="flex items-center"
				><svg
					class="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					/>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>Поиск эвакуатора</span
			>
		</div>
	</div>
{:else}
	<div class="px-5">
		<div>
			<h1 class=" text-lg font-medium font-sans">Заявка №{orders.id}</h1>
		</div>
		<div class="my-3">
			<h1>Эвакуатор найден!</h1>
			<div class="flex justify-between my-2">
				<p>Имя</p>
				<p>{orders.author.email}</p>
			</div>
			<div class="flex justify-between my-2">
				<p>Номер телефона</p>
				<p>+79081197279</p>
			</div>
		</div>
	</div>
{/if}
