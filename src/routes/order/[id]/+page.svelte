<script lang="ts">
	import { io } from 'socket.io-client';
	import { page } from '$app/stores';

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

	let id: number = Number($page.params.id);

	const socket = io('https://nesttest-production.up.railway.app/');
	let orders: Order[] = [];
	async function users() {
		await socket.emit('findOneChat', { id: id }, (response: Order[]) => {
			orders = response;
		});
	}
	users();
	socket.on('update', (update) => {
		orders = update;
		users();
	});
</script>

{#if orders.id === undefined}
	<div class="flex  justify-center items-center h-[80vh]">
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
<div class=" flex flex-col px-5 h-[80vh] justify-between">
	<div class="">
		<h1 class=" text-lg font-medium font-sans">Заявка №{orders.id}</h1>
		<div class="my-3">
			<div>
				<h1>Спасибо за ожидание!</h1>
				<p>В течение нескольких секунд с вами свяжится водитель для подверждения заказа</p>
			</div>

			<div class=" border border-[#D0D2D3]/40 p-4 rounded bg-white  my-4">
			<p class=" font-medium font-sans">	Контакты водителя</p>
				<div class=" my-3">
					<span class="text-sm text-[#a5b3c1]">Имя</span>
					<p class=" mb-2 font-sans ">{orders.author.name}</p>
					<span class="text-sm text-[#a5b3c1]">Номер телефона</span>
					<p class=" font-sans">{orders.author.phone}</p>
				</div>
				<div class="my-3">
					<div class=" flex items-center gap-2">
						<a href="" class="bg-[#5BC43A] p-3 mt-2 flex gap-2 justify-center rounded w-full   py-4   font-semibold text-white ">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								preserveAspectRatio="xMidYMid meet"
								viewBox="0 0 48 48"
								><mask id="ipSPhoneCall0"
									><g fill="none" stroke="#fff" stroke-linejoin="round" stroke-width="4"
										><path
											stroke-linecap="round"
											d="M41.78 20.607a13.06 13.06 0 0 0-.25-5.102a12.939 12.939 0 0 0-3.415-6.018a12.94 12.94 0 0 0-6.018-3.416a13.068 13.068 0 0 0-5.102-.249m7.195 13.981a5.991 5.991 0 0 0-1.692-5.132a5.991 5.991 0 0 0-5.132-1.691"
										/><path
											fill="#fff"
											d="M14.376 8.794a2 2 0 0 1 1.748 1.03l2.447 4.406a2 2 0 0 1 .04 1.866l-2.357 4.713s.683 3.512 3.541 6.37c2.859 2.858 6.359 3.53 6.359 3.53l4.712-2.357a2 2 0 0 1 1.867.041l4.42 2.457a2 2 0 0 1 1.027 1.748v5.074c0 2.583-2.4 4.45-4.848 3.623c-5.028-1.696-12.832-4.927-17.78-9.873c-4.946-4.947-8.176-12.752-9.873-17.78c-.826-2.448 1.04-4.848 3.624-4.848h5.073Z"
										/></g
									></mask
								><path fill="white" d="M0 0h48v48H0z" mask="url(#ipSPhoneCall0)" /></svg
							>
							<p class=" text-sm text-white">Позвонить</p>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div>
		<button
		type="submit"
		class=" bg-[#c43a3a] p-3 mt-2 rounded w-full   py-4   font-semibold text-white"
		>Отменить заявку</button
	>
	</div>
</div>
	
{/if}
