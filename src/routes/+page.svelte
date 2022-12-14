<script lang="ts">
	import mapboxgl from 'mapbox-gl';
	mapboxgl.accessToken =
		'pk.eyJ1IjoiZGFuaWxrYTI3MTIiLCJhIjoiY2xiamFndWc2MDJoazNwcXZnaXZoNm9hYSJ9.lAMLaj7C67amMgE1yWU_WA';
	function updateSet() {
		ofButton += 1;
		hidden = !hidden;
		if (hidden === true) {
			setTimeout(() => {
				const map = new mapboxgl.Map({
					container: 'map',
					// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
					style: 'https://api.maptiler.com/maps/voyager-v2/style.json?key=EfH47Bb8jzv9Pl57bst7',
					center: [73.28537735766437, 55.00392640477281],
					minZoom: 8,
					zoom: 12
				});
				map.addControl(
					new mapboxgl.GeolocateControl({
						positionOptions: {
							enableHighAccuracy: true
						},
						// When active the map will receive updates to the device's location as it changes.
						trackUserLocation: true,
						// Draw an arrow next to the location dot to indicate which direction the device is heading.
						showUserHeading: true
					})
				);

				let marker = new mapboxgl.Marker().setLngLat([0, 0]).addTo(map);
				map.on('move', function (e) {
					let coord = marker.setLngLat(map.getCenter());
					coordinat = coord.getLngLat();
					console.log();
				});
			}, 500);
		}
	}
	let coordinat;
	let coordinat1;

	function addCoordinat() {
		ofButton += 1;
		const map = new mapboxgl.Map({
			container: 'map',
			// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
			style: 'https://api.maptiler.com/maps/voyager-v2/style.json?key=EfH47Bb8jzv9Pl57bst7',
			center: coordinat,
			minZoom: 8,
			zoom: 12
		});
		fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinat.toArray()}.json?types=address%2Cpoi%2Cdistrict%2Cneighborhood&limit=1&access_token=pk.eyJ1IjoiZGFuaWxrYTI3MTIiLCJhIjoiY2xiamFndWc2MDJoazNwcXZnaXZoNm9hYSJ9.lAMLaj7C67amMgE1yWU_WA`
		)
			.then((data) => data.json())
			.then((coordin) => (address1 = coordin.features[0].place_name));

		new mapboxgl.Marker().setLngLat(coordinat).addTo(map);
		let marker = new mapboxgl.Marker().setLngLat([0, 0]).addTo(map);
		map.on('move', function (e) {
			let coord = marker.setLngLat(map.getCenter());
			coordinat1 = coord.getLngLat();
		});
	}
	function addCoordinat2() {
		ofButton = 1;
		const map = new mapboxgl.Map({
			container: 'map',
			// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
			style: 'https://api.maptiler.com/maps/voyager-v2/style.json?key=EfH47Bb8jzv9Pl57bst7',
			center: coordinat,
			minZoom: 8,
			zoom: 12
		});

		fetch(
			`https://api.mapbox.com/directions/v5/mapbox/driving/${coordinat.toArray()};${coordinat1.toArray()}?access_token=pk.eyJ1IjoiZGFuaWxrYTI3MTIiLCJhIjoiY2xiamFndWc2MDJoazNwcXZnaXZoNm9hYSJ9.lAMLaj7C67amMgE1yWU_WA`
		)
			.then((data) => data.json())
			.then((coss) => (distance = coss.routes[0].distance));
		fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinat1.toArray()}.json?types=address%2Cpoi%2Cdistrict%2Cneighborhood&limit=1&access_token=pk.eyJ1IjoiZGFuaWxrYTI3MTIiLCJhIjoiY2xiamFndWc2MDJoazNwcXZnaXZoNm9hYSJ9.lAMLaj7C67amMgE1yWU_WA`
		)
			.then((data) => data.json())
			.then((coordin) => (address2 = coordin.features[0].place_name));

		new mapboxgl.Marker({
			draggable: true
		})
			.setLngLat(coordinat)
			.addTo(map);

		const marker = new mapboxgl.Marker({
			draggable: true
		})
			.setLngLat(coordinat1)
			.addTo(map);

		const coordinates = document.getElementById('coordinates');
		function onDragEnd() {
			coordinat1 = marker.getLngLat();
		}

		marker.on('dragend', onDragEnd);
	}
	let ofButton = 1;
	let address1;
	let address2;
	let hidden = false;
</script>

<div class="grid grid-cols-1 gap-3 mb-6">
	<div class="flex flex-col">
		<span class="text-[#8e8e8e] mb-3 text-sm">Укажите маршрут</span>
		<div class=" relative">
			<span class="font-medium absolute  p-4 rounded-l-xl   h-full ">Откуда</span>
			<button
				class="font-medium absolute right-0  p-4 rounded-l-xl   h-full"
				on:click={() => updateSet()}>Карта</button
			>

			<form class="">
				<input
					bind:value={address1}
					autocomplete="city state street-address1"
					placeholder="Омск, ул.Мира"
					class=" border-[#e8e8e8]/75 font-sans focus:border-[#5BC43A] pl-24 focus:outline-none w-[100%] border p-4 rounded-2xl"
					type="text"
					name=""
					id=""
				/>
			</form>
		</div>
	</div>
	<div class="flex flex-col">
		<div class=" relative">
			<span class=" font-medium  absolute  p-4 rounded-l-xl   h-full  ">Куда</span>
			<form>
				<input
					bind:value={address2}
					autocomplete="street-address1"
					placeholder="Омск, ул.Лукашевича"
					class=" border-[#e8e8e8]/75 font-sans focus:border-[#5BC43A] pl-24 focus:outline-none w-[100%] border p-4 rounded-2xl"
					type="text"
					name=""
					id=""
				/>
			</form>
		</div>
	</div>
</div>
{#if hidden}
	<div id="map" class=" relative h-[30rem] top-0 z-0 ">
		<div class="z-10 absolute w-full bottom-0">
			{#if ofButton === 2}
				<button
					on:click={() => addCoordinat()}
					class=" bg-[#5BC43A] z-10 p-3 rounded-2xl  w-full   py-4   font-semibold text-white"
					>Первая точка</button
				>
			{:else if ofButton === 3}
				<button
					on:click={() => addCoordinat2()}
					class=" bg-[#5BC43A]  z-10 p-3 rounded-2xl w-full  py-4   font-semibold text-white"
					>Вторая точка</button
				>
			{/if}
		</div>
	</div>
{/if}
