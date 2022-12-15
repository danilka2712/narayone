<script lang="ts">
	import 'mapbox-gl/dist/mapbox-gl.css';
	import mapboxgl from 'mapbox-gl';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	mapboxgl.accessToken =
		'pk.eyJ1IjoiZGFuaWxrYTI3MTIiLCJhIjoiY2xiamFndWc2MDJoazNwcXZnaXZoNm9hYSJ9.lAMLaj7C67amMgE1yWU_WA';
	onMount(() => {
		//Загрузка карты////////////////////////////////
		const map = new mapboxgl.Map({
			container: 'map',
			style:
				'https://api.maptiler.com/maps/f0650ebb-77aa-4dca-bef9-006920409ea9/style.json?key=EfH47Bb8jzv9Pl57bst7',
			center: [-84.5, 38.05],
			zoom: 12
		});
		//Геолокация////////////////////////////////
		map.addControl(
			new mapboxgl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true
				},
				trackUserLocation: true,
				showUserHeading: true
			})
		);
		//Статический макет////////////////////////////////
		let marker = new mapboxgl.Marker({
			color: '#5BC43A'
		})
			.setLngLat([0, 0])
			.addTo(map);

		map.on('move', function (e) {
			let point = marker.setLngLat(map.getCenter());
			fromWhere = point.getLngLat();
		});
		////////////////////////////////////////////////////
	});
	let fromWhere: any;
	let fromTo: any;

	function driverFrom() {
		const map = new mapboxgl.Map({
			container: 'map',
			style:
				'https://api.maptiler.com/maps/f0650ebb-77aa-4dca-bef9-006920409ea9/style.json?key=EfH47Bb8jzv9Pl57bst7',
			center: fromWhere,
			zoom: 12
		});
		//Геолокация////////////////////////////////
		map.addControl(
			new mapboxgl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true
				},
				trackUserLocation: true,
				showUserHeading: true
			})
		);
		new mapboxgl.Marker({
			color: '#5BC43A'
		})
			.setLngLat(fromWhere)
			.addTo(map);
		//Статический макет////////////////////////////////
		let marker = new mapboxgl.Marker({
			color: '#3e8d26'
		})
			.setLngLat([0, 0])
			.addTo(map);

		map.on('move', function (e) {
			let point = marker.setLngLat(map.getCenter());
			fromTo = point.getLngLat();
		});
	}
	function driverTo() {
		const map = new mapboxgl.Map({
			container: 'map',
			style:
				'https://api.maptiler.com/maps/f0650ebb-77aa-4dca-bef9-006920409ea9/style.json?key=EfH47Bb8jzv9Pl57bst7',
			center: fromWhere,
			zoom: 12
		});
		//Геолокация////////////////////////////////
		map.addControl(
			new mapboxgl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true
				},
				trackUserLocation: true,
				showUserHeading: true
			})
		);
		new mapboxgl.Marker({
			color: '#5BC43A'
		})
			.setLngLat(fromWhere)
			.addTo(map);
		new mapboxgl.Marker({
			color: '#3e8d26'
		})
			.setLngLat(fromTo)
			.addTo(map);
		//Статический макет////////////////////////////////
	}
</script>

<div
	transition:slide={{ delay: 250, duration: 3000, easing: quintOut }}
	id="map"
	class="bg-[#EEEEEE] relative h-[50vh]"
>
	<div class="">
		<button
			class=" left-2 w-[95%] absolute bottom-2 z-10 bg-green-500 rounded-xl text-white p-4  "
			on:click={driverFrom}>Выбор</button
		>
	</div>
</div>
