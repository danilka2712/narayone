<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	let hidden = 0;
</script>

<div class="px-5">
	{#if data.Product === undefined}
		<div>Загрузка</div>
	{:else}
		<div class="">
			<h1 class=" font-bold text-lg my-4 mb-7">Принятые заявки</h1>

			{#each data.Product as o}
				<div class="mb-5  border-[#ececec] border rounded  p-5 bg-white ">
					<div class="">
						<div class="flex items-center gap-2">
							<div class=" bg-[#5BC43A] rounded-full w-2 h-2" />
							<h1 class="font-sans font-medium">Заявка принята:</h1>
							<h1 class="font-sans font-medium">
								{new Date(o.createdAt).toLocaleString(['rus', 'id'])}
							</h1>
						</div>
					</div>
					<div class="my-3 border-b border-dashed pb-3 flex justify-between">
						<div class="">
							<span class="text-sm text-[#9B9A9A]">Откуда</span>
							<p class=" font-sans  mb-3">{o.addressWhere}</p>
							<span class="text-sm text-[#9B9A9A]">Куда</span>
							<p class="font-sans ">{o.addressTo}</p>
						</div>
					</div>

					{#if hidden === o.id}
						<div class="my-3 border-b border-dashed pb-3">
							<p class=" text-sm text-[#9B9A9A]">Марка/Модель</p>
							<h1 class=" font-medium ">{o.marka} {o.model}</h1>
						</div>
						<div class="flex items-center justify-between">
							<span class="my-4 text-sm text-[#9B9A9A] ">Стоимость:</span>
							<p class=" text-lg font-semibold font-sans">{o.price}₽</p>
						</div>
					{/if}
					<div class="flex pt-3 justify-center">
						<button class="flex  text-sm gap-2 items-center" on:click={() => (hidden = o.id)}
							>Подробная информация
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
								class="feather   feather-chevron-up  rotate-180 w-4 h-4"
							>
								<polyline points="18 15 12 9 6 15" />
							</svg>
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
