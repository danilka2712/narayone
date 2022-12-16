<script lang="ts">
	import { onMount } from 'svelte';
	import { dataset_dev } from 'svelte/internal';

	onMount(() => {
		let map = new maplibregl.Map({
			container: 'map',
			center: [73.3686, 54.9924],
			style:
				'https://api.maptiler.com/maps/f0650ebb-77aa-4dca-bef9-006920409ea9/style.json?key=EfH47Bb8jzv9Pl57bst7',
			zoom: 12
		});
		map.addControl(
			new maplibregl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true
				},
				trackUserLocation: true
			})
		);
		let marker = new maplibregl.Marker().setLngLat([0, 0]).addTo(map);
		map.on('move', function (e) {
			marker.setLngLat(map.getCenter());
		});
	});
	async function sumbit() {
		const address = 'Лукашевича 25';
		const response = await fetch(
			`https://nominatim.openstreetmap.org/search?q=${address}&format=geojson&polygon_geojson=1&addressdetails=1`
		);
		const data = await response.json();
		item = data.features[0].properties.display_name;
	}

	let item = ''
</script>
{item}
<button on:click={() => sumbit()}>Отправить</button>

<div id="map" class="bg-[#EEEEEE] relative h-[50vh]" />
