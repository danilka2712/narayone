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
{#if menuHiiden}
<div  class=" absolute bg-black/5 h-full w-full z-30  ">
	<ul class="flex bg-white absolute top-14 right-5 rounded p-6 w-1/2  flex-col gap-4">
		<li><a href="/dashboard">Личный кабинет</a></li>
		<li><a href="/dashboard/orders">Новые заявки</a></li>
		<li><a href="/dashboard/myorder">Принятые заявки</a></li>
	</ul>
</div>
{/if}

<nav use:clickOutside on:outclick={() => (menuHiiden = false)} class="container relative z-40 flex items-center justify-between  mx-auto px-5 mb-4  h-[7vh] py-8">
	<a href="/">
		<img width="101px" src="/logo.svg" alt="" />
	</a>
	<div class="flex gap-8">
		<img width="26px" src="/Messages.svg" alt="" />
		<button on:click={menuHidden}>
			<img width="26px" src="/User.svg" alt="" />

		</button>
	</div>
</nav>

<slot />
