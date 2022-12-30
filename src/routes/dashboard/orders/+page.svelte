<script lang="ts">
	import { io } from 'socket.io-client';
	type Orders = [
		{
			id?: number;
			phone: string;
			content?: string;
		}
	];
	const socket = io('https://nesttest-production.up.railway.app');
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
		<div class=" border-b py-5">
			<h1>{o.phone}</h1>
			{#if o.content === 'Поиск заказчика'}
				<form on:submit={sendOrders}>
					<button
						class=" bg-[#5BC43A] p-3 mt-2 rounded-xl w-full   py-4   font-semibold text-white"
						on:click={() => (id = o.id)}
						type="submit">{o.content}</button
					>
				</form>
			{:else}
				<p>Заказ принят</p>
			{/if}
		</div>
	{/each}
</div>
