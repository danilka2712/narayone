<script lang="ts">
	import { setResponse } from "@sveltejs/kit/node";


	let whereCoordinate = [];
	let toCoordinate = [];
	let addressWhere = 'Омск Лукашевича 25';
	let addressTo = 'Омск Мира 25';

	async function searceWhere() {
		setTimeout(async () => {
			const response = await fetch(
				`https://nominatim.openstreetmap.org/?addressdetails=1&q=${addressWhere}&format=json&limit=1`
			);
			const data = await response.json();
			whereCoordinate = new Array(Number(data[0].lon), Number(data[0].lat));
			console.log(data);
		}, 2000);
	}
	$: addressTo.length > 6 ? searceTo() : '';
	async function searceTo() {
		setTimeout(async () => {
			const response = await fetch(
				`https://nominatim.openstreetmap.org/?addressdetails=1&q=${addressTo}&format=json&limit=1`
			);
			const data = await response.json();
			toCoordinate = new Array(Number(data[0].lon), Number(data[0].lat));
		}, 2000);
	}
	const mapOpen = (num) => {
		setTimeout(async () => {
			if (num === 1 && whereCoordinate.length > 1) {
				numbers = 2;
				console.log('Если есть что то в первом блоке');

				let map = new maplibregl.Map({
					container: 'map', // container id
					style:
						'https://api.maptiler.com/maps/f0650ebb-77aa-4dca-bef9-006920409ea9/style.json?key=EfH47Bb8jzv9Pl57bst7', // style URL
					center: [73.272496, 54.9965753], // starting position [lng, lat]
					zoom: 12 // starting zoom
				});
				new maplibregl.Marker().setLngLat(whereCoordinate).addTo(map);

				let marker = new maplibregl.Marker().setLngLat([0, 0]).addTo(map);
				map.on('move', function (e) {
					let center = marker.setLngLat(map.getCenter());
					toCoordinate = center.getLngLat().toArray();
				});
			} else if (num == 1) {
				console.log('Если нет ничего  первом блоке');
				numbers = 1;
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
			}
			if (num === 2 && toCoordinate.length > 1) {
				console.log('Если есть что то в втором блоке');
				numbers = 3;
				const response = await fetch(
					`https://api.mapbox.com/directions/v5/mapbox/driving/${whereCoordinate};${toCoordinate}?annotations=maxspeed&overview=full&geometries=geojson&access_token=pk.eyJ1IjoiZGFuaWxrYTI3MTIiLCJhIjoiY2xiamFndWc2MDJoazNwcXZnaXZoNm9hYSJ9.lAMLaj7C67amMgE1yWU_WA`
				);
				const data = await response.json();
				items = data.routes[0].geometry.coordinates;

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
			} else if (num == 2) {
				numbers = 2;
				let map = new maplibregl.Map({
					container: 'map', // container id
					style:
						'https://api.maptiler.com/maps/f0650ebb-77aa-4dca-bef9-006920409ea9/style.json?key=EfH47Bb8jzv9Pl57bst7', // style URL
					center: [74.3342, 55.534543], // starting position [lng, lat]
					zoom: 12 // starting zoom
				});
				let marker = new maplibregl.Marker().setLngLat([0, 0]).addTo(map);
				new maplibregl.Marker().setLngLat(whereCoordinate).addTo(map);
				map.on('move', function (e) {
					let center = marker.setLngLat(map.getCenter());
					toCoordinate = center.getLngLat().toArray();
				});
			}
			if (num === 3) {
				numbers = 3;
				const response = await fetch(
					`https://api.mapbox.com/directions/v5/mapbox/driving/${whereCoordinate};${toCoordinate}?annotations=maxspeed&overview=full&geometries=geojson&access_token=pk.eyJ1IjoiZGFuaWxrYTI3MTIiLCJhIjoiY2xiamFndWc2MDJoazNwcXZnaXZoNm9hYSJ9.lAMLaj7C67amMgE1yWU_WA`
				);
				const data = await response.json();
				items = data.routes[0].geometry.coordinates;

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
			}
		}, 100);
	};
	let hidden = false;
	function activeMap() {
		hidden = !hidden;
		if ((hidden === true && toCoordinate.length < 1) || whereCoordinate.length < 1) {
			mapOpen(1);
		} else if (toCoordinate.length > 1) {
			mapOpen(3);
		}
	}
	let numbers = 1;
	let items;
</script>

<span class="text-[#8e8e8e]  text-sm">Укажите маршрут</span>
<div class=" relative mb-4">
	<form action=" " class=" relative">
		<input
			bind:value={addressWhere}
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
		on:click={searceWhere}
		bind:value={addressTo}
		placeholder="Мира 31"
		class="p-4 border-[#e8e8e8]/75 w-full font-sans focus:border-[#5BC43A]  focus:outline-none border py-4 rounded-2xl"
		type="text"
		name=""
		id=""
	/>
</div>
{#if hidden}
	<div id="map" class="bg-[#EEEEEE] relative h-[50vh]">
		{#if numbers === 1}
			<div class=" absolute bottom-2 z-10 w-full px-4">
				<button
					on:click={() => mapOpen(2)}
					class=" text-white w-full  bg-[#5BC43A] rounded-xl p-4 z-10"
					>Выбрать точку отправления</button
				>
			</div>
		{:else if numbers === 2}
			<div class=" absolute bottom-2 z-10 w-full px-4">
				<button
					on:click={() => mapOpen(3)}
					class=" text-white w-full  bg-[#5BC43A] rounded-xl p-4 z-10"
					>Выбрать точку прибытия</button
				>
			</div>
		{:else if numbers === 3}
			<div class=" absolute bottom-2 z-10 w-full px-4">
				<button
					on:click={() => mapOpen(1)}
					class=" text-white w-full  bg-[#5BC43A] rounded-xl p-4 z-10">Очистить</button
				>
			</div>
		{/if}
	</div>
{/if}
