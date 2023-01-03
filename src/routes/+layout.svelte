<script land="ts">
	import '../app.css';
	import 'mapbox-gl/dist/mapbox-gl.css';
</script>

<nav class="flex justify-between p-5">
	<button class=" relative z-20">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 6h16M4 12h16M4 18h7"
			/></svg
		>
	</button>
	<div class=" justify-items-center">
		<a href="/" class="">
			<img class="w-24 mt-2" src="/logo.svg" alt="" />
		</a>
	</div>
	<div class="flex space-x-4 justify-end">
		<a href="/register" class="">
			<div class=" relative">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1.5em"
					height="2em"
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0 7c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1Z"
					/></svg
				>
			</div>
		</a>
	</div>
</nav>

<slot />
