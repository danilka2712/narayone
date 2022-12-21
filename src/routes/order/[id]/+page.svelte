<script lang="ts">
	let original = 3 * 60; // TYPE NUMBER OF SECONDS HERE
	setInterval(() => {
		if (original > 0) original--;
	}, 1000);

	$: minutes = Math.floor(original / 60);
	$: seconds = Math.floor(original - minutes * 60);
</script>

<div class="px-5 mb-12">
	<div class="  rounded-xl py-8 my-4 p-4">
		<p class=" text-center   text-8xl">{minutes}:{seconds < 10 ? '0' : ''}{seconds}</p>
	</div>
</div>
