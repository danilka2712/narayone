<script lang="ts">
	import { onMount } from 'svelte';

	let original = 3 * 60; // TYPE NUMBER OF SECONDS HERE
	setInterval(() => {
		if (original > 0) original--;
	}, 1000);
	$: minutes = Math.floor(original / 60);
	$: seconds = Math.floor(original - minutes * 60);
	let hidden = true;
	$: hidden = original <= 175 ? false : true;
</script>

<div class="h-[85vh] flex flex-col justify-between   px-5">
	{#if hidden}
		<div class=" items-end  rounded-xl flex justify-between mt-5">
			<p class="font-medium animate-pulse text-[#a5b3c1]">Мы подбираем для вас эвакуатор</p>
		</div>
		<div class=" flex justify-center">
			<img src="/car3.svg" class="w-44 animate-pulse " alt="" />
		</div>
	{:else}
		<div class=" ">
			<h1 class=" font-bold text-xl my-4 mb-7">Водитель найден!</h1>
			<div class="bg-white p-4 rounded-xl">
				<div class="pb-3 justify-between items-end flex">
					<span class="text-[#a5b3c1] font-medium text-sm">Имя водителя</span>
					<p class="font-sans font-medium ">Даниил</p>
				</div>
				<div class="border-line  border-[#f9fafc] border-t pt-8 justify-between items-end flex">
					<span class="text-[#a5b3c1] font-medium  text-sm">Номер автомобиля</span>
					<p class=" font-sans font-medium ">Н938ХС55</p>
				</div>
			</div>
		</div>
	{/if}
	{#if hidden}
		<div class=" flex flex-col">
			<a class=" " href="/">
				<button
					class="font-sans bg-[#0d1722] p-3 mt-2 rounded-xl w-full   py-4   font-semibold text-white"
					>Поиск займет примерно: {minutes}:{seconds < 10 ? '0' : ''}{seconds}</button
				>
			</a>
			<a class=" font-semibold text-center mt-4" href="">Отменить</a>
		</div>
	{:else}
		<a class="flex items-center" href="/">
			<button
				class="font-sans flex items-center justify-center gap-2 bg-[#5BC43A ] p-3 mt-2 rounded-xl w-full   py-4   font-semibold text-white"
			>
				<img class=" " src="/Calling.svg" alt="" /> Позвонить</button
			>
		</a>
	{/if}
</div>
