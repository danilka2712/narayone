<script lang="ts">
	import { onMount } from 'svelte';

	$: addresse = '';
	async function sumbit() {
		let map = new maplibregl.Map({
			container: 'map', // container id
			style: 'https://api.maptiler.com/maps/f0650ebb-77aa-4dca-bef9-006920409ea9/style.json?key=EfH47Bb8jzv9Pl57bst7', // style URL
			center: [74.3342, 54.534543], // starting position [lng, lat]
			zoom: 12 // starting zoom
		});

		const response = await fetch(
			`https://nominatim.openstreetmap.org/search?q=${
				addresse + ' ' + 'Омск'
			}&countrycodes=ru&format=geojson&polygon_geojson=1&addressdetails=1`
		);
		const data = await response.json();
	}

	let item = '';
</script>

{item}

<span class="text-[#8e8e8e]  text-sm">Укажите маршрут</span>
<div class=" relative">
	<form action="">
		<input
			bind:value={addresse}
			on:click={sumbit}
			placeholder="Лукашевича 25"
			class="p-4 border-[#e8e8e8]/75 w-full font-sans focus:border-[#5BC43A]  focus:outline-none border py-4 rounded-2xl"
			type="text"
			name="address"
			id=""
			autocomplete="address-line1"
		/>
	</form>
</div>
<div class="">
	<input
		placeholder="Мира 31"
		class="p-4 border-[#e8e8e8]/75 w-full font-sans focus:border-[#5BC43A]  focus:outline-none border py-4 rounded-2xl"
		type="text"
		name=""
		id=""
	/>
</div>
<div id="map" class="bg-[#EEEEEE] relative h-[50vh]" />
