<script lang="ts">
	import InputAddress from '$lib/components/InputAddress.svelte';
	import carModel from './carModel.json';

	function brands() {
		return carModel.map((car) => car.brand);
	}
	let selected = 'Марка';
	let selectedModels = 'Модель';

	function models(cars: any) {
		carModel.find(({ brand, models }) => {
			if (brand === cars) {
				model = models;
			}
			return;
		});
	}
	let model = [];
	let hiddenPogruz = false;
</script>

<div class="px-5 mb-12">
	<div>
		<h1 class=" font-bold text-xl my-4 mb-7">Заказать эвакуатор</h1>
	</div>

	<div class="flex mb-6  flex-col">
		<span class="text-[#8e8e8e] mb-3 text-sm">Контактные данные</span>

		<input
			placeholder="Номер телефона"
			class="p-4  placeholder:text-[#bec1c7]   border-[#e8e8e8]/75  font-sans focus:border-[#5BC43A]  focus:outline-none border py-4 rounded-2xl"
			type="text"
			name=""
			id=""
		/>
	</div>
	<InputAddress />
	<div class="flex flex-col">
		<span class="text-[#8e8e8e] mb-3  text-sm">Марка и модель автомобиля</span>

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
		 border border-solid border-[#e8e8e8]/75
		transition
		ease-in-out rounded-2xl
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
            border border-solid border-[#e8e8e8]/75
            transition
            ease-in-out rounded-2xl
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
				<button on:click={() => (hiddenPogruz = !hiddenPogruz)} class="">Сложность погрузки</button>
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

			{#if hiddenPogruz}
				<div class="bg-white h-44 overflow-x-auto gap-4 mt-8 rounded-xl absolute p-5 flex flex-col">
					<label class="flex gap-4 items-center">
						<input type="checkbox" />
						Вытащить с кувета
					</label>
					<label class="flex gap-4 items-center">
						<input type="checkbox" />
						Заблокировано колесо
					</label>
					<label class="flex gap-4 items-center">
						<input type="checkbox" />
						Заблокировано колесо
					</label>
					<label class="flex gap-4 items-center">
						<input type="checkbox" />
						Заблокировано колесо
					</label>
					<label class="flex gap-4 items-center">
						<input type="checkbox" />
						Заблокировано колесо
					</label>
					<label class="flex gap-4 items-center">
						<input type="checkbox" />
						Заблокировано колесо
					</label>
				</div>
			{/if}
		</div>
	</div>
	<div class="mt-6 border-t-2 border-dotted">
		<div class="flex items-center justify-between">
			<span class="my-4 text-[#8e8e8e] text">Стоимость:</span>
			<p class=" text-xl font-semibold font-sans">{selected === 'BMW' ? '1990' : '2390'}₽</p>
		</div>
		<a href="/order/2">
			<button class=" bg-[#5BC43A] p-3 mt-2 rounded-2xl w-full   py-4   font-semibold text-white"
				>Оставить заявку</button
			>
		</a>
	</div>
</div>

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
		color: #bec1c7;
	}
</style>
