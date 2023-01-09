<script lang="ts">
	import maplibregl from 'maplibre-gl';
	import { address } from '../../store.js';
	import { query, query1 } from '../../store.js';

	const token = 'd512112976df66bf36f8f17e8dd9cc4cfc28f95e';
	let result: string = '';
	let hidden: boolean = false;
	$: if ($query.length > 4) {
		addAddress();
	}
	function addHidden(r) {
		$query = r;
		setTimeout(() => {
			hidden = false;
		}, 100);
	}
	async function addAddress() {
		hidden = true;
		if ($query.length <= 5) {
			hidden = false;
		}
		const response = await fetch(
			'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
			{
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: 'Token ' + token
				},
				body: JSON.stringify({ query: $query, count: 4 })
			}
		);
		const data = await response.json();
		result = data.suggestions.map((i) => i.value);
		let items = data.suggestions[0].data.geo_lon + ',' + data.suggestions[0].data.geo_lat;
		$address[0] = JSON.parse('[' + items + ']');
	}

	let result1: string = '';
	let hidden1: boolean = false;
	$: if ($query1.length > 4) {
		addAddress1();
	}
	function addHidden1(r) {
		$query1 = r;
		setTimeout(() => {
			hidden1 = false;
		}, 100);
	}
	async function addAddress1() {
		hidden1 = true;
		if ($query1.length <= 5) {
			hidden1 = false;
		}
		const response = await fetch(
			'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
			{
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: 'Token ' + token
				},
				body: JSON.stringify({ query: $query1, count: 4 })
			}
		);
		const data = await response.json();
		result1 = data.suggestions.map((i) => i.value);
		let items = data.suggestions[0].data.geo_lon + ',' + data.suggestions[0].data.geo_lat;
		$address[1] = JSON.parse('[' + items + ']');
	}
	let mapHidden = false;
	async function mapActive() {
		mapHidden = !mapHidden;
		if (mapHidden === true) {
			setTimeout(async () => {
				if ($address[0].length === 0) {
					let map = new maplibregl.Map({
						container: 'map', // container id
						style:
							'https://api.maptiler.com/maps/8d081a87-527e-4c3b-ab7f-10a7c83dbc2e/style.json?key=EfH47Bb8jzv9Pl57bst7', // style URL
						center: [0, 0], // starting position [lng, lat]
						zoom: 12 // starting zoom
					});
					let marker = new maplibregl.Marker({
						color: '#5BC43A '
					})
						.setLngLat([0, 0])
						.addTo(map);
					map.on('drag', (e) => {
						marker.setLngLat(map.getCenter());
					});
					map.on('dragend', async (e) => {
						let coordinates = { lat: marker._lngLat.lat, lon: marker._lngLat.lng, count: 1 };
						const response = await fetch(
							'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address',
							{
								method: 'POST',
								mode: 'cors',
								headers: {
									'Content-Type': 'application/json',
									Accept: 'application/json',
									Authorization: 'Token ' + token
								},
								body: JSON.stringify(coordinates)
							}
						);
						const data = await response.json();
						$query = data.suggestions[0].value;
					});

					map.addControl(
						new maplibregl.GeolocateControl({
							positionOptions: {
								enableHighAccuracy: true
							},
							trackUserLocation: true
						})
					);
				} else if ($address[1].length === 0) {
					let map = new maplibregl.Map({
						container: 'map', // container id
						style:
							'https://api.maptiler.com/maps/8d081a87-527e-4c3b-ab7f-10a7c83dbc2e/style.json?key=EfH47Bb8jzv9Pl57bst7', // style URL
						center: [0, 0], // starting position [lng, lat]
						zoom: 12 // starting zoom
					});
					map.addControl(
						new maplibregl.GeolocateControl({
							positionOptions: {
								enableHighAccuracy: true
							},
							trackUserLocation: true
						})
					);
					let marker = new maplibregl.Marker({
						color: '#5BC43A '
					})
						.setLngLat([0, 0])
						.addTo(map);
					map.on('drag', (e) => {
						marker.setLngLat(map.getCenter());
					});
					map.on('dragend', async (e) => {
						let coordinates = { lat: marker._lngLat.lat, lon: marker._lngLat.lng, count: 1 };
						const response = await fetch(
							'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address',
							{
								method: 'POST',
								mode: 'cors',
								headers: {
									'Content-Type': 'application/json',
									Accept: 'application/json',
									Authorization: 'Token ' + token
								},
								body: JSON.stringify(coordinates)
							}
						);
						const data = await response.json();
						$query1 = data.suggestions[0].value;
					});
					new maplibregl.Marker({
						color: '#5BC43A '
					})
						.setLngLat($address[0])
						.addTo(map);
				} else {
					const response = await fetch(
						`https://api.mapbox.com/directions/v5/mapbox/driving/${$address[0]};${$address[1]}?annotations=maxspeed&overview=full&geometries=geojson&access_token=pk.eyJ1IjoiZGFuaWxrYTI3MTIiLCJhIjoiY2xiamFndWc2MDJoazNwcXZnaXZoNm9hYSJ9.lAMLaj7C67amMgE1yWU_WA`
					);
					const data = await response.json();
					let items = data.routes[0].geometry.coordinates;
					let map = new maplibregl.Map({
						container: 'map', // container id
						style:
							'https://api.maptiler.com/maps/8d081a87-527e-4c3b-ab7f-10a7c83dbc2e/style.json?key=EfH47Bb8jzv9Pl57bst7', // style URL
						center: $address[0], // starting position [lng, lat]
						zoom: 12 // starting zoom
					});
					map.addControl(
						new maplibregl.GeolocateControl({
							positionOptions: {
								enableHighAccuracy: true
							},
							trackUserLocation: true
						})
					);
					new maplibregl.Marker({
						color: '#5BC43A '
					})
						.setLngLat($address[0])
						.addTo(map);
					new maplibregl.Marker({
						color: '#5BC43A '
					})
						.setLngLat($address[1])
						.addTo(map);
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
			}, 300);
		}
	}
</script>

{$query}
<form method="POST" action="?/login">
	<span class="text-[#a5b3c1]  text-sm">Укажите маршрут</span>
	<div class=" relative my-3">
		<div class=" absolute top-6 left-4 bg-[#090f21] rounded-full w-3 h-3" />
		<input
			on:click={() => (hidden = false)}
			bind:value={$query}
			placeholder="Лукашевича 25"
			class="p-4 focus:-[#5BC43A] pl-10 placeholder:text-[#a5b3c1] border-[#ececec] border  w-full font-sans focus:-[#5BC43A ]  focus:outline-none  py-4 rounded"
			type="text"
			name="query"
			id=""
		/>
		<button class=" bg-white p-3 top-1 absolute  right-1" on:click|preventDefault={mapActive}
			>Карта</button
		>
		{#if hidden}
			<div class=" absolute top-14 border-[#ececec] border -b -x z-20 w-full  bg-white p-4">
				<div class="flex flex-col gap-5">
					{#each result as r}
						<button class="flex text-left" on:click|preventDefault={() => addHidden(r)}>{r}</button>
					{/each}
				</div>
			</div>
		{/if}
	</div>
	<div class="mb-4 relative">
		<img class=" w-5 absolute top-5 left-3" src="/Location.svg" alt="" />
		<input
			on:click={() => (hidden1 = false)}
			bind:value={$query1}
			placeholder="Мира 31"
			class="p-4 focus:-[#5BC43A] pl-10 placeholder:text-[#a5b3c1] border-[#ececec] border  w-full font-sans focus:-[#5BC43A ]  focus:outline-none  py-4 rounded"
			type="text"
			name=""
			id=""
		/>
		{#if hidden1}
			<div
				class=" absolute h-fit  top-14 border-[#ececec] border -b -x z-20 w-full  bg-white p-4"
			>
				<div class="flex flex-col gap-5">
					{#each result1 as r}
						<button class="flex text-left" on:click|preventDefault={() => addHidden1(r)}>{r}</button
						>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</form>
{#if mapHidden}
	<div id="map" class=" h-96" />
{/if}
