<script lang="ts">
	import { onMount } from 'svelte';

	let whereCoordinate;
	let toCoordinate;

	const mapOpen = (num) => {
		setTimeout(() => {
			if (num === 1) {
				let map = new maplibregl.Map({
					container: 'map', // container id
					style:
						'https://api.maptiler.com/maps/f0650ebb-77aa-4dca-bef9-006920409ea9/style.json?key=EfH47Bb8jzv9Pl57bst7', // style URL
					center: [74.3342, 55.534543], // starting position [lng, lat]
					zoom: 12 // starting zoom
				});

				let marker = new maplibregl.Marker().setLngLat([0, 0]).addTo(map);
				map.on('move', function (e) {
					let center = marker.setLngLat(map.getCenter());
					whereCoordinate = center.getLngLat().toArray();
				});
			} else if (num === 2) {
				let map = new maplibregl.Map({
					container: 'map', // container id
					style:
						'https://api.maptiler.com/maps/f0650ebb-77aa-4dca-bef9-006920409ea9/style.json?key=EfH47Bb8jzv9Pl57bst7', // style URL
					center: [74.3342, 55.534543], // starting position [lng, lat]
					zoom: 12 // starting zoom
				});
				new maplibregl.Marker().setLngLat(whereCoordinate).addTo(map);
				let marker = new maplibregl.Marker().setLngLat([0, 0]).addTo(map);
				map.on('move', function (e) {
					let center = marker.setLngLat(map.getCenter());
					toCoordinate = center.getLngLat().toArray();
				});
			} else if (num === 3) {
				fetch(
					`https://api.mapbox.com/directions/v5/mapbox/driving/${whereCoordinate};${toCoordinate}?annotations=maxspeed&overview=full&geometries=geojson&access_token=pk.eyJ1IjoiZGFuaWxrYTI3MTIiLCJhIjoiY2xiamFndWc2MDJoazNwcXZnaXZoNm9hYSJ9.lAMLaj7C67amMgE1yWU_WA`
				)
					.then((data) => data.json())
					.then((addresse) => {
						items = addresse.routes[0].geometry.coordinates;
					});
				setTimeout(() => {
					let map = new maplibregl.Map({
						container: 'map', // container id
						style:
							'https://api.maptiler.com/maps/f0650ebb-77aa-4dca-bef9-006920409ea9/style.json?key=EfH47Bb8jzv9Pl57bst7', // style URL
						center: [74.3342, 55.534543], // starting position [lng, lat]
						zoom: 12 // starting zoom
					});
					new maplibregl.Marker().setLngLat(whereCoordinate).addTo(map);
					new maplibregl.Marker().setLngLat(toCoordinate).addTo(map);

					map.on('load', function () {
						map.addSource('route', {
							type: 'geojson',
							data: {
								type: 'Feature',
								properties: {},
								geometry: {
									type: 'LineString',
									coordinates: items
								}
							}
						});
						map.addLayer({
							id: 'route',
							type: 'line',
							source: 'route',
							layout: {
								'line-join': 'round',
								'line-cap': 'round'
							},
							paint: {
								'line-color': '#888',
								'line-width': 8
							}
						});
					});
				}, 1000);
			}
		}, 100);
	};
	let hidden = false;
	function activeMap() {
		hidden = !hidden;
		if (hidden === true) {
			mapOpen(1);
		}
	}
	let items;
</script>

<button on:click={() => mapOpen(2)}>Добавить</button>
<button on:click={() => mapOpen(3)}>Добавить21</button>

<span class="text-[#8e8e8e]  text-sm">Укажите маршрут</span>
<div class=" relative mb-4">
	<form action=" " class=" relative">
		<input
			placeholder="Лукашевича 25"
			class="p-4 border-[#e8e8e8]/75 w-full font-sans focus:border-[#5BC43A]  focus:outline-none border py-4 rounded-2xl"
			type="text"
			name="address"
			id=""
			autocomplete="address-line1"
		/>
		<span on:click={() => activeMap()} class=" absolute p-4 right-0 cursor-pointer">Карта</span>
	</form>
</div>
<div class="mb-4">
	<input
		placeholder="Мира 31"
		class="p-4 border-[#e8e8e8]/75 w-full font-sans focus:border-[#5BC43A]  focus:outline-none border py-4 rounded-2xl"
		type="text"
		name=""
		id=""
	/>
</div>
{#if hidden}
	<div id="map" class="bg-[#EEEEEE] relative h-[50vh]">
		<div class=" absolute bottom-2 z-10 w-full px-4">
			<button class=" text-white w-full  bg-[#5BC43A] rounded-xl p-4 z-10"
				>Выбрать точку отправления</button
			>
		</div>
	</div>
{/if}
