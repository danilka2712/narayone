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
	}
	const socket = io('https://nesttest-production.up.railway.app/');

	let orders: Order[] = [];
	async function users() {
		await socket.emit('findAllChat', {}, (response: Order[]) => {
			response.map((conten) => {
				if (conten.content === 'Поиск заказчика') {
					orders = [...orders, conten];
				} else {
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

	function addSumbit(id: number) {
		socket.emit('updateChat', { id: id });
	}
</script>

<div>
	{#each orders as o}
		<h1>{o.content}</h1>
		<p>{o.id}</p>
		<button on:click={() => addSumbit(o.id)}>Отправить</button>
	{/each}
</div>
