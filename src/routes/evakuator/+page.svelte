<script lang="ts">
	import InputAddress from '$lib/components/InputAddress.svelte';
	import carModel from './carModel.json';
	import type { PageData, ActionData } from './$types';
	import { imask } from 'svelte-imask';
	import { query, query1 } from '../../store.js';
	const options = {
		mask: '+{7}(000)000-00-00'
	};
	function complete({ detail: imask }) {
		phone = imask._value;
	}
	export let data: PageData;

	export let form: ActionData;

	function brands() {
		return carModel.map((car) => car.brand);
	}
	let selected = 'Марка';
	let selectedModels = 'Модель';

	let menu = [
		{ name: 'Вытащить с кувета', price: 1500 },
		{ name: 'Заблокировано колесо', price: 500 },
		{ name: 'Заблокирован руль', price: 1050 },
		{ name: 'Нет крюка', price: 300 },
		{ name: 'Вытащить с парковки/гаража', price: 1000 }
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
			price: string;
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
				addressWhere: $query,
				addressTo: $query1,
				price: `${price + number}`
			},
			(response: Orders) => {
				goto(`order/${response.id}`);
			}
		);
	}
	let price = 2390;
	let selection = [0];
	let number = 0;
	$: if (selection.length >= 1) {
		number = selection.reduce((a, b) => Number(a) + Number(b));
	}
	$: if (selection.length === 0) {
		number = 0;
	}
</script>

<form on:submit={sendMessage}>
	<div class="px-5 flex justify-between flex-col">
		<div class="">
			<div class="mb-6">
				<h3 class="text-2xl font-medium">Эвакуатор</h3>
			</div>
			<div class="flex mb-6  flex-col">
				<span class="text-[#565656] mb-3 text-sm">Контактные данные</span>
				<input
					placeholder="Номер телефона"
					class="p-4 focus:border-[#5BC43A] placeholder:text-[#aab1bc]   border-[#ececec] border   font-sans focus:-[#5BC43A ]  focus:outline-none  py-4 rounded"
					use:imask={options}
					name="phone"
					type="tel"
					required
					on:complete={complete}
				/>
			</div>
			<InputAddress />
			<div class="flex flex-col">
				<span class="text-[#565656] mb-3  text-sm">Марка и модель автомобиля</span>

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
			border-solid border-[#ececec] border 
			transition
			ease-in-out rounded
			m-0
			focus:text-gray-700 focus:bg-white focus:border-[#5BC43A] focus:outline-none"
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
					<div class=" w-1/2 relative flex items-center">
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
				border-solid border-[#ececec] border 
				transition
				ease-in-out rounded
				m-0
				focus:text-gray-700 focus:bg-white focus:border-[#5BC43A] focus:outline-none"
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
				<span class="my-4">Стоимость:</span>
				<p class=" text-xl font-semibold font-sans">
					{(number += price)}₽
				</p>
			</div>
			<button
				type="submit"
				class=" bg-[#5BC43A] transition duration-300 hover:bg-[#54b935] ease-in-out p-3 mt-2 rounded w-full   py-4   font-semibold text-white"
				>Оставить заявку</button
			>
		</div>
	</div>
</form>

<style>
	.active {
		color: #aab1bc;
	}
</style>
