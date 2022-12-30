<script lang="ts">
	import { io } from 'socket.io-client';
	import { page } from '$app/stores';
	type Orders = [
		{
			id?: number;
			phone: string;
			content?: string;
		}
	];

	let id: number = Number($page.params.id);

	const socket = io('https://nesttest-production.up.railway.app/');
	let orders: Orders = [];
	async function users() {
		await socket.emit('findOneChat', { id: id }, (response: Orders) => {
			console.log(response);
			orders = response;
		});
	}
	users();
</script>

<h1>{orders.phone}</h1>
