<script lang="ts">
	import { io } from 'socket.io-client';
	type Orders = [
		{
			id?: number;
			phone: string;
			content?: string;
			addressWhere: string;
			addressTo: string;
		}
	];
	const socket = io('http://localhost:3000');
	let orders: Orders = [];
	async function users() {
		await socket.emit('findAllChat', {}, (response: Orders) => {
			orders = response;
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
</script>

<div class="flex px-5 flex-col gap-5">
	{#each orders as o}
		<div class=" border-b bg-white rounded-xl p-5">
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
						class=" bg-[#5BC43A] p-3 mt-2 rounded-xl w-full   py-4   font-semibold text-white"
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
