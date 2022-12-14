<script>
	import '../app.css';
	import 'mapbox-gl/dist/mapbox-gl.css';
</script>

<nav class="px-5 py-6 flex justify-between items-center">
	<a href="/"><img class=" w-32" src="/logo.svg" alt="" /></a>
	<a href="/register"><img class="w-4 rounded-full" src="/user.svg" alt="" /></a>
</nav>

<a
	class="fixed box bottom-7 left-5 bg-[#F3F3F4] flex items-center justify-center border rounded-xl p-3 w-14 h-14 z-10"
	href="/"
>
	<img class="" src="/home.svg" alt="" /></a
>

<slot />

<style>
	.box {
		display: none;
	}
	.active {
		opacity: 100%;
	}
	@media all and (display-mode: standalone) {
		.box {
			display: flex;
			justify-content: center;
			margin: 0;
		}
	}
</style>
