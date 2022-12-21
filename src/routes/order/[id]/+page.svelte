<script lang="ts">
	let original = 3 * 60; // TYPE NUMBER OF SECONDS HERE
	setInterval(() => {
		if (original > 0) original--;
	}, 1000);

	$: minutes = Math.floor(original / 60);
	$: seconds = Math.floor(original - minutes * 60);
</script>

<div class="h-[85vh] flex flex-col justify-between   px-5">
	<div class=" items-end  rounded-xl flex justify-between mt-5">
		<p class="font-medium animate-pulse text-[#8e8e8e]">Мы подбираем для вас эвакуатор</p>
	</div>
	<div class=" flex justify-center">
		<img src="/car3.svg" class="w-44 animate-pulse "  alt="">
	</div>
	<a class="bottom-5  " href="/">
		<button
			class="font-sans bg-[#0d1722] p-3 mt-2 rounded-2xl w-full   py-4   font-semibold text-white"
			>Поиск займет примерно: {minutes}:{seconds < 10 ? '0' : ''}{seconds}</button
		>
	</a>
</div>
