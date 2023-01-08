<script lang="ts">
	import { io } from 'socket.io-client';

	interface Order {
		id: number;
		createdAt: string;
		phone: string;
		marka: string;
		model: string;
		addressTo: string;
		addressWhere: string;
		content: string;
		price: string;
	}
	const socket = io('https://nesttest-production.up.railway.app/');

	let orders: Order[] = [];
	async function users() {
		await socket.emit('findAllChat', {}, (response: Order[]) => {
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

	function addSumbit(id: number) {
		socket.emit('updateChat', { id: Number(id) });
	}
</script>

<div class="">
	{#each orders as o}
		{#if o.content !== 'Выполнено'}
			<div class="mb-5 border border-[#D0D2D3]/40 rounded  mx-4 p-4 bg-white ">
				<div class="">
					<div class="flex items-center gap-2">
						<div class=" bg-[#5BC43A] rounded-full w-2 h-2" />
						<h1 class="">{o.content}</h1>
					</div>
				</div>
				<div class="my-3 border-b border-dashed pb-3 flex justify-between">
					<div class="">
						<span class="text-sm text-[#a5b3c1]">Откуда</span>
						<p class=" font-medium mb-3">{o.addressWhere}</p>
						<span class="text-sm text-[#a5b3c1]">Куда</span>
						<p class=" font-medium">{o.addressTo}</p>
					</div>
				</div>
				<div class="my-3 border-b border-dashed pb-3">
					<p class=" text-sm text-[#a5b3c1]">Марка/Модель</p>
					<h1 class=" font-medium ">{o.marka} {o.model}</h1>
				</div>
				<div class="flex items-center justify-between">
					<span class="my-4 text-sm text-[#a5b3c1] ">Стоимость:</span>
					<p class=" text-lg font-semibold font-sans">{o.price}₽</p>
				</div>
				<div class="flex justify-between">
					<button
						on:click={() => addSumbit(o.id)}
						class=" bg-[#5BC43A] p-3 mt-2 rounded w-full   py-4   font-semibold text-white"
						>Принять</button
					>
				</div>
			</div>
		{/if}
	{/each}
</div>
