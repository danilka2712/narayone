<script lang="ts">
	import postCode from '$lib/components/postCode.json';
	import { addressWhere, addressTo } from '../../store.js';
	let whereCoordinate = [];
	let toCoordinate = [];
	let postcode;
	let postcode1;
	$: $addressWhere.length > 5 ? district() : '';
	const district = () => {
		let searce = postCode.find((dis) => dis.district.toLowerCase() === $addressWhere.toLowerCase());
		if (searce?.district.toLowerCase() === $addressWhere.toLowerCase()) {
			postcode = searce.postcode;
			postcode = postcode;
		}
	};
	$: $addressTo.length > 5 ? district1() : '';
	const district1 = () => {
		let searce = postCode.find((dis) => dis.district.toLowerCase() === $addressTo.toLowerCase());
		if (searce?.district.toLowerCase() === $addressTo.toLowerCase()) {
			postcode1 = searce.postcode;
			postcode1 = postcode1;
		}
	};
	$: $addressWhere.length > 5 ? searceWhere() : '';
	async function searceWhere() {
		const response = await fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places-permanent/${
				postcode + ' ' + $addressWhere + ' ' + 'Омск'
			}.json?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrNnJ6bDdzdzA5cnAza3F4aTVwcWxqdWEifQ.RFF7CVFKrUsZVrJsFzhRvQ&limit=2&fuzzyMatch`
		);
		const data = await response.json();
		whereCoordinate = data.features[0].center;
	}
	$: $addressTo.length > 5 ? searceTo() : '';
	async function searceTo() {
		const response = await fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places-permanent/${
				postcode1 + ' ' + $addressTo + ' ' + 'Омск'
			}.json?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrNnJ6bDdzdzA5cnAza3F4aTVwcWxqdWEifQ.RFF7CVFKrUsZVrJsFzhRvQ&limit=2&fuzzyMatch`
		);
		const data = await response.json();
		toCoordinate = data.features[0].center;
	}
	const mapOpen = (num) => {
		setTimeout(async () => {
			if (num === 1 && whereCoordinate.length > 1) {
				numbers = 2;

				let map = new maplibregl.Map({
					container: 'map', // container id
					style:
						'https://api.maptiler.com/maps/8d081a87-527e-4c3b-ab7f-10a7c83dbc2e/style.json?key=EfH47Bb8jzv9Pl57bst7', // style URL
					center: whereCoordinate, // starting position [lng, lat]
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
					.setLngLat(whereCoordinate)
					.addTo(map);

				let marker = new maplibregl.Marker().setLngLat([0, 0]).addTo(map);
				map.on('move', function (e) {
					let center = marker.setLngLat(map.getCenter());
					toCoordinate = center.getLngLat().toArray();
				});
			} else if (num == 1) {
				numbers = 1;
				let map = new maplibregl.Map({
					container: 'map', // container id
					style:
						'https://api.maptiler.com/maps/8d081a87-527e-4c3b-ab7f-10a7c83dbc2e/style.json?key=EfH47Bb8jzv9Pl57bst7', // style URL
					center: [73.3696882833201, 54.99129109872183], // starting position [lng, lat]
					zoom: 12 // starting zoom
				});
				if (toCoordinate.length > 1) {
					new maplibregl.Marker({
						color: '#5BC43A '
					})
						.setLngLat(toCoordinate)
						.addTo(map);
				}

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
				map.on('move', function (e) {
					let center = marker.setLngLat(map.getCenter());

					whereCoordinate = center.getLngLat().toArray();
				});
			}
			if (num === 2 && toCoordinate.length > 1) {
				numbers = 3;
				const response = await fetch(
					`https://api.mapbox.com/directions/v5/mapbox/driving/${whereCoordinate};${toCoordinate}?annotations=maxspeed&overview=full&geometries=geojson&access_token=pk.eyJ1IjoiZGFuaWxrYTI3MTIiLCJhIjoiY2xiamFndWc2MDJoazNwcXZnaXZoNm9hYSJ9.lAMLaj7C67amMgE1yWU_WA`
				);
				const data = await response.json();
				items = data.routes[0].geometry.coordinates;

				let map = new maplibregl.Map({
					container: 'map', // container id
					style:
						'https://api.maptiler.com/maps/8d081a87-527e-4c3b-ab7f-10a7c83dbc2e/style.json?key=EfH47Bb8jzv9Pl57bst7', // style URL
					center: toCoordinate, // starting position [lng, lat]
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
					.setLngLat(whereCoordinate)
					.addTo(map);
				new maplibregl.Marker({
					color: '#5BC43A '
				})
					.setLngLat(toCoordinate)
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
			} else if (num == 2) {
				numbers = 2;
				let map = new maplibregl.Map({
					container: 'map', // container id
					style:
						'https://api.maptiler.com/maps/8d081a87-527e-4c3b-ab7f-10a7c83dbc2e/style.json?key=EfH47Bb8jzv9Pl57bst7', // style URL
					center: whereCoordinate, // starting position [lng, lat]
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
				new maplibregl.Marker({
					color: '#5BC43A '
				})
					.setLngLat(whereCoordinate)
					.addTo(map);
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
						'https://api.maptiler.com/maps/8d081a87-527e-4c3b-ab7f-10a7c83dbc2e/style.json?key=EfH47Bb8jzv9Pl57bst7', // style URL
					center: whereCoordinate, // starting position [lng, lat]
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
					.setLngLat(whereCoordinate)
					.addTo(map);
				new maplibregl.Marker({
					color: '#5BC43A '
				})
					.setLngLat(toCoordinate)
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
							'line-color': '#AAD6F7',
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

<span class="text-[#a5b3c1]  text-sm">Укажите маршрут</span>
<div class=" my-3">
	<form action=" " class=" relative">
		<div class=" absolute top-6 left-4 bg-[#090f21] rounded-full w-3 h-3" />
		<input
			bind:value={$addressWhere}
			placeholder="Лукашевича 25"
			class="p-4 pl-10 placeholder:text-[#a5b3c1] border-[#D0D2D3]/40  w-full font-sans focus:border-[#5BC43A ]  focus:outline-none border py-4 rounded"
			type="text"
			name="address"
			id=""
			autocomplete="address-line1"
		/>
		<button
			on:click|preventDefault={() => activeMap()}
			class=" absolute text-sm font-medium  right-4 top-5 ">Карта</button
		>
	</form>
</div>
<div class="mb-4 relative">
	<img class=" w-5 absolute top-5 left-3" src="/Location.svg" alt="" />
	<input
		bind:value={$addressTo}
		placeholder="Мира 31"
		class="p-4 pl-10 placeholder:text-[#a5b3c1] border-[#D0D2D3]/40  w-full font-sans focus:border-[#5BC43A ]  focus:outline-none border py-4 rounded"
		type="text"
		name=""
		id=""
	/>
</div>
{#if hidden}
	<div id="map" class="bg-[#F8F9FD] relative h-[60vh]">
		{#if numbers === 1}
			<div class=" absolute bottom-4 z-10 w-full px-4">
				<button
					on:click|preventDefault={() => mapOpen(2)}
					class=" text-white w-full  bg-[#5BC43A ] rounded p-4 z-10"
					>Выбрать точку отправления</button
				>
			</div>
		{:else if numbers === 2}
			<div class=" absolute bottom-4 z-10 w-full px-4">
				<button
					on:click|preventDefault={() => mapOpen(3)}
					class=" text-white w-full  bg-[#5BC43A ] rounded p-4 z-10"
					>Выбрать точку прибытия</button
				>
			</div>
		{:else if numbers === 3}
			<div class=" absolute bottom-4 z-10 w-full px-4">
				<button
					on:click|preventDefault={() => mapOpen(1)}
					class=" text-white w-full  bg-[#5BC43A ] rounded p-4 z-10">Очистить</button
				>
			</div>
		{/if}
	</div>
{/if}
