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

<nav
	use:clickOutside
	on:outclick={() => (hidden = false)}
	use:clickOutside
	on:outclick={() => (menuHiiden = false)}
	class="flex items-center justify-between p-5"
>
	<div class="relative z-20">
		<button on:click={menuHidden} class="">
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
		{#if menuHiiden}
			<div class="z-20 absolute top-10 bg-white w-44 flex flex-col gap-4 rounded p-5 shadow-sm">
				<a on:click={menuHidden} href="/about">О нас</a>
				<a on:click={menuHidden} href="/сontacts">Контакты</a>
				<a on:click={menuHidden} href="/partner">Стать партнером</a>
			</div>
		{/if}
	</div>

	<div class="mb-1">
		<a href="/" class="">
			<img class="w-24" src="/logo.svg" alt="" />
		</a>
	</div>
	<div class="flex relative justify-end">
		<button on:click={userHidden} class="mb-1">
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
		</button>
		{#if hidden}
			<div class="z-20 absolute top-10 bg-white w-44 flex flex-col gap-4 rounded p-5 shadow-sm">
				<a on:click={userHidden} href="/dashboard">Личный кабинет</a>
				<a on:click={userHidden} href="/dashboard/orders">Новые заявки</a>
				<a on:click={userHidden} href="/dashboard/myorder">Принятые заявки</a>
			</div>
		{/if}
	</div>
</nav>

<slot />
