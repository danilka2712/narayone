<script lang="ts">
	import InputAddress from '$lib/components/InputAddress.svelte';
	import carModel from './carModel.json';
	import { addressWhere, addressTo } from '../../store.js';
	function brands() {
		return carModel.map((car) => car.brand);
	}
	let selected = 'Марка';
	let selectedModels = 'Модель';

	let menu = [
		{ name: 'Вытащить с кувета', price: 200 },
		{ name: 'Заблокировано колесо', price: 12200 },
		{ name: 'Заблокирован руль', price: 100 },
		{ name: 'Нет крюка', price: 1500 },
		{ name: 'Вытащить с парковки/гаража', price: 12040 }
	];

	function models(cars: any) {
		carModel.find(({ brand, models }) => {
			if (brand === cars) {
				model = models;
			}
			return;
		});
	}
	let model: Models | any = [];
	type Models = {
		brand: string;
		models: string;
	};

	let hiddenPogruz = false;
	import { io } from 'socket.io-client';
	import { goto } from '$app/navigation';
	type Orders = [
		{
			id: number;
			phone: string;
			content?: string;
		}
	];
	let phone: string = '';
	const socket = io('https://nesttest-production.up.railway.app/');

	async function sendMessage() {
		await socket.emit(
			'createChat',
			{
				phone: phone,
				marka: selected,
				model: selectedModels,
				addressWhere: $addressWhere,
				addressTo: $addressTo
			},
			(response: Orders) => {
				goto(`order/${response.id}`);
			}
		);
	}
	let price = 2390;
	let selection = [0];
	let user;
	$: if (selection.length >= 1) {
		user = selection.reduce((a, b) => Number(a) + Number(b));
	}
</script>

<form on:submit={sendMessage}>
	<div class="px-5 flex justify-between flex-col">
		<div class="">
			<div>
				<h1 class=" font-bold text-lg my-4 mb-7">Заказать эвакуатор</h1>
			</div>

			<div class="flex mb-6  flex-col">
				<span class="text-[#a5b3c1] mb-3 text-sm">Контактные данные</span>

				<input
					bind:value={phone}
					placeholder="Номер телефона"
					class="p-4  placeholder:text-[#a5b3c1]   border-[#D0D2D3]/40   font-sans focus:border-[#5BC43A ]  focus:outline-none border py-4 rounded"
					type="text"
					name=""
					id=""
					required
				/>
			</div>
			<InputAddress />
			<div class="flex flex-col">
				<span class="text-[#a5b3c1] mb-3  text-sm">Марка и модель автомобиля</span>

				<div class=" flex gap-3 ">
					<div class=" relative w-1/2 flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="100%"
							height="100%"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="feather right-4 absolute feather-chevron-up rotate-180 w-4 h-4"
						>
							<polyline points="18 15 12 9 6 15" />
						</svg>
						<select
							class:active={selected === 'Марка'}
							bind:value={selected}
							on:change={() => models(selected)}
							class="form-select appearance-none
			block
			w-full
			px-4
			py-4
			text-base
			font-normal
			bg-white bg-clip-padding bg-no-repeat
			 border border-solid border-[#D0D2D3]/40 
			transition
			ease-in-out rounded
			m-0
			focus:text-gray-700 focus:bg-white focus:border-[#5BC43A ] focus:outline-none"
							aria-label="Default select example"
						>
							<option class="text-black font-semibold" selected>Марка</option>

							{#each brands() as question}
								<option class="text-black " value={question}>
									{question}
								</option>
							{/each}
						</select>
					</div>
					<div class="a  w-1/2 relative flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="100%"
							height="100%"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="feather  right-4 absolute feather-chevron-up  rotate-180 w-4 h-4"
						>
							<polyline points="18 15 12 9 6 15" />
						</svg>
						<select
							bind:value={selectedModels}
							class:active={selectedModels === 'Модель'}
							class="form-select  appearance-none
				block
				w-full
				px-4
				py-4
				text-base
				font-normal
				bg-white bg-clip-padding bg-no-repeat
				border border-solid border-[#D0D2D3]/40 
				transition
				ease-in-out rounded
				m-0
				focus:text-gray-700 focus:bg-white focus:border-[#5BC43A ] focus:outline-none"
							aria-label="Default select example"
						>
							<option class="text-black font-semibold" selected>Модель</option>

							{#each model as m}
								<option class="text-black" value={m}>
									{m}
								</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="mt-5 flex">
					<div class="flex items-center gap-2">
						{#if hiddenPogruz}
						<div
							class="bg-white mb-64 h-56 overflow-x-auto gap-4 rounded absolute p-5 flex flex-col"
						>
							{#each menu as m}
								<label class="flex gap-4 items-center">
									<input bind:group={selection} value={m.price} type="checkbox" />
									{m.name}
								</label>
							{/each}
						</div>
					{/if}
						<button on:click|preventDefault={() => (hiddenPogruz = !hiddenPogruz)} class=""
							>Сложность погрузки</button
						>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="100%"
							height="100%"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="feather mt-1 feather-chevron-up rotate-180 w-4 h-4"
						>
							<polyline points="18 15 12 9 6 15" />
						</svg>
					</div>

					
				</div>
			</div>
		</div>
		<div class="mt-6 border-t-2 border-dotted">
			<div class="flex items-center justify-between">
				<span class="my-4 text-[#a5b3c1] text">Стоимость:</span>
				<p class=" text-xl font-semibold font-sans">
					{(user += price)}₽
				</p>
			</div>
			<button
				type="submit"
				class=" bg-[#5BC43A] p-3 mt-2 rounded w-full   py-4   font-semibold text-white"
				>Оставить заявку</button
			>
		</div>
	</div>
</form>

<style>
	@media all and (display-mode: standalone) {
		.box {
			position: fixed;
			left: 20px;
			bottom: 100px;
			margin: 0;
			width: 90%;
		}
	}
	.active {
		color: #a5b3c1;
	}
</style>
