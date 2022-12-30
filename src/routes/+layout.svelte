<script land="ts">
	import '../app.css';
	import 'mapbox-gl/dist/mapbox-gl.css';
</script>

<nav class="flex justify-between p-5">
	<div class="">
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
	</div>
	<div class=" justify-items-center">
		<a href="/" class="">
			<img class="w-24 mb-1" src="/logo.svg" alt="" />
		</a>
	</div>
	<div class="flex space-x-4 justify-end">
		<button class="">
			<div class=" relative">
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
						d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
					/></svg
				>
				<span class="w-3 absolute -top-1 rounded-full h-3 bg-[#28b820]" />
			</div>
		</button>
	</div>
</nav>

<slot />
