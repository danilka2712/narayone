<script>
	const items = [
		{
			name: 'Эвакуатор',
			description: 'Доставим ваш автомобиль в любой точку России',
			img: 'car3.svg',
			href: '/towtruck'
		},
		{
			name: 'Грузоперевозка',
			description: 'Доставим ваш автомобиль в любой точку России',
			img: 'car1.svg',
			href: '/'
		},
		{
			name: 'Отогрев авто',
			description: 'Доставим ваш автомобиль в любой точку России',
			img: 'car2.svg',
			href: '/'
		},
		{
			name: 'Автоподбор',
			description: 'Доставим ваш автомобиль в любой точку России',
			img: 'car4.svg',
			href: '/'
		}
	];
</script>

<div class="px-5">
	<div class=" bg-[#5BC43A] h-44 border-[#e8e8e8]/75 border rounded-xl">
		<img class="object-cover rounded-xl w-full h-full" src="padarki.svg" alt="" />
	</div>
	<div class=" flex flex-col gap-5 mb-24 mt-6">
		{#each items as item}
			<a href={item.href}>
				<div class="p-6 relative bg-[#F7F7F8] border-[#e8e8e8]/75 border flex rounded-2xl ">
					<div>
						<p class=" text-lg font-semibold mb-2">{item.name}</p>
						<p class="text-sm text-[#8e8e8e]">
							Доставим ваш автомобиль <br /> в любой точку России
						</p>
					</div>
					<div class="">
						<img class="w-32 absolute right-1 top-4" src={item.img} alt="" />
					</div>
				</div></a
			>
		{/each}
	</div>
</div>
