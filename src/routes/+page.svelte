<script>
	const items = [
		{
			name: 'Эвакуатор',
			description: 'Доставим ваш автомобиль <br/> в любой точку России',
			img: 'car3.svg',
			href: '/evakuator'
		},

		{
			name: 'Помощь на дороге',
			description: 'Лучшие специалисты <br/> в вашем районе.',
			img: 'car2.svg',
			href: '/'
		},
		{
			name: 'Автоподбор',
			description: 'Подберем для вас лучший <br/> вариант на рынке',
			img: 'car4.svg',
			href: '/'
		}
	];
</script>

<div class="px-5">
	<div class=" bg-border-[#5BC43A] h-44 rounded">
		<img class="object-cover rounded w-full h-full" src="padarki.svg" alt="" />
	</div>

	<div class=" flex flex-col gap-3 mt-3 mb-8">
		{#each items as item}
			<a data-sveltekit-reload href={item.href}>
				<div class="p-6 relative bg-[#FFFFFF] border  border-[#ececec] flex rounded">
					<div>
						<p class=" text-lg font-bold mb-2">{item.name}</p>
						<p class="text-sm text-[#b6b6b6]">
							{@html item.description}
						</p>
					</div>
					<div class="">
						<img class="w-32 absolute right-1 top-4" src={item.img} alt="" />
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>
