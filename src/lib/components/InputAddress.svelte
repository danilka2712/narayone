<script lang="ts">
	import { onMount } from 'svelte';
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import DistanceMeasurementMapLibreGlDirections, {
		config
	} from '$lib/map/distance-measurement-directions';
	let directions: DistanceMeasurementMapLibreGlDirections | undefined = undefined;
	let totalDistance = 0;
	onMount(() => {
		const map = new maplibregl.Map({
			container: 'map',
			style:
				'https://api.maptiler.com/maps/f0650ebb-77aa-4dca-bef9-006920409ea9/style.json?key=EfH47Bb8jzv9Pl57bst7',
			center: [74.1197632, 54.6974034],
			zoom: 11
		});
		map.on('load', () => {
			directions = new DistanceMeasurementMapLibreGlDirections(map, config);
			directions.on('fetchroutesend', (ev) => {
				totalDistance = ev.data?.routes[0].distance as number;
			});
			directions.on('removewaypoint', () => {
				if (directions.waypoints.length < 2) {
					totalDistance = 0;
				}
			});
			directions.interactive = true;
		});
	});
</script>

<p>
	Total Route Distance:
	{#if totalDistance}
		<strong>{totalDistance}m</strong>
	{:else}
		<em>0</em>
	{/if}
</p>
<span class="text-[#8e8e8e]  text-sm">Укажите маршрут</span>
<div class=" relative">
	<form action="">
		<input
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
