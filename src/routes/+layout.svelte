<script land="ts">
	import '../app.css';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { clickOutside } from '../click_outside.js';
	let hidden = false;
	function userHidden() {
		menuHiiden = false;
		hidden = !hidden;
	}
	let menuHiiden = false;
	function menuHidden() {
		hidden = false;
		menuHiiden = !menuHiiden;
	}
</script>


<nav class="container flex items-center justify-between  mx-auto px-5 mb-4  h-[7vh] py-4">
	<a href="/">
		<img width="101px" src="/logo.svg" alt="" />
	</a>
	<div class="flex gap-8">
		<img width="26px" src="/Messages.svg" alt="" />
		<img width="26px" src="/User.svg" alt="" />
	</div>
</nav>


<slot />
