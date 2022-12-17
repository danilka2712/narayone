<script lang="ts">
	$: coordinate = [];
	$: coordinate1 = [];
	let items = [];
	$: address = '';
	$: address1 = '';
	let number = 0;
	let hidden = false;
	$: hidden === true ? sumbit() : number = 0
	async function sumbit() {
		number += 1;
		setTimeout(() => {
			if (number === 1) {
				let map = new maplibregl.Map({
					container: 'map', // container id
					style:
						'https://api.maptiler.com/maps/f0650ebb-77aa-4dca-bef9-006920409ea9/style.json?key=EfH47Bb8jzv9Pl57bst7', // style URL
					center: [74.3342, 55.534543], // starting position [lng, lat]
					zoom: 12 // starting zoom
				});

				let marker = new maplibregl.Marker({ color: '#5BC43A' }).setLngLat([0, 0]).addTo(map);

				map.on('dragstart', function (e) {
					address = 'Определяем адрес';
				});
				map.on('dragend', function (e) {
					fetch(
						`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinate[1]}&lon=${coordinate[0]}&zoom=18&addressdetails=1`
					)
						.then((data) => data.json())
						.then((addresse) => (address = addresse.address.road));
				});
				map.on('move', function (e) {
					let coordinates = marker.setLngLat(map.getCenter());
					coordinate = coordinates._lngLat.toArray();
				});
			} else if (number === 2) {
				let map = new maplibregl.Map({
					container: 'map', // container id
					style:
						'https://api.maptiler.com/maps/f0650ebb-77aa-4dca-bef9-006920409ea9/style.json?key=EfH47Bb8jzv9Pl57bst7', // style URL
					center: [74.3342, 55.534543], // starting position [lng, lat]
					zoom: 12 // starting zoom
				});

				let marker = new maplibregl.Marker({ color: '#5BC43A' }).setLngLat([0, 0]).addTo(map);

				map.on('dragstart', function (e) {
					address = 'Определяем адрес';
				});
				map.on('dragend', function (e) {
					fetch(
						`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinate[1]}&lon=${coordinate[0]}&zoom=18&addressdetails=1`
					)
						.then((data) => data.json())
						.then((addresse) => (address = addresse.address.road));
				});
				map.on('move', function (e) {
					let coordinates = marker.setLngLat(map.getCenter());
					coordinate1 = coordinates._lngLat.toArray();
				});
				new maplibregl.Marker().setLngLat(coordinate).addTo(map);
			} else if (number >= 2) {
				let map = new maplibregl.Map({
					container: 'map', // container id
					style:
						'https://api.maptiler.com/maps/f0650ebb-77aa-4dca-bef9-006920409ea9/style.json?key=EfH47Bb8jzv9Pl57bst7', // style URL
					center: [74.3342, 55.534543], // starting position [lng, lat]
					zoom: 12 // starting zoom
				});

				new maplibregl.Marker({ color: '#5BC43A' }).setLngLat(coordinate).addTo(map);

				new maplibregl.Marker({ color: '#5BC43A' }).setLngLat(coordinate1).addTo(map);
				fetch(
					`https://api.mapbox.com/directions/v5/mapbox/driving/${coordinate};${coordinate1}?annotations=maxspeed&overview=full&geometries=geojson&access_token=pk.eyJ1IjoiZGFuaWxrYTI3MTIiLCJhIjoiY2xiamFndWc2MDJoazNwcXZnaXZoNm9hYSJ9.lAMLaj7C67amMgE1yWU_WA`
				)
					.then((data) => data.json())
					.then((addresse) => {
						items = addresse.routes[0].geometry.coordinates;
					});
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
				number = 0
			
			}
		}, 200);
	}

	let item = '';
</script>

<span class="text-[#8e8e8e]  text-sm">Укажите маршрут</span>
<div class=" relative mb-4">
	<form action=" " class=" relative">
		<input
			bind:value={address}
			placeholder="Лукашевича 25"
			class="p-4 border-[#e8e8e8]/75 w-full font-sans focus:border-[#5BC43A]  focus:outline-none border py-4 rounded-2xl"
			type="text"
			name="address"
			id=""
			autocomplete="address-line1"
		/>
		<span on:click={() => hidden = !hidden} class=" absolute p-4 right-0 cursor-pointer">Карта</span>
	</form>
</div>
<div class="mb-4">
	<input
		bind:value={address1}
		placeholder="Мира 31"
		class="p-4 border-[#e8e8e8]/75 w-full font-sans focus:border-[#5BC43A]  focus:outline-none border py-4 rounded-2xl"
		type="text"
		name=""
		id=""
	/>
</div>
{number}
{#if hidden}
	<div id="map" class="bg-[#EEEEEE] relative h-[50vh]">
		{#if number >= 1}
			<button class=" absolute bottom-3 bg-[#5BC43A] rounded-xl p-4 z-10" on:click={() => sumbit()}
				>Выбрать точку отправления</button
			>
		{:else if number === 0}
			<button
				class=" absolute bottom-3 bg-[#5BC43A] rounded-xl p-4 z-10"
				on:click={() => sumbit()}>Очистить</button
			>
		{/if}
	</div>
{/if}
