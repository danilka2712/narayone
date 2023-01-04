<script>
	function removeItem() {
		localStorage.removeItem('lastname');
	}
</script>

<div>
	<h1>Личный кабинет</h1>

	<button on:click={removeItem}>Выйти</button>
</div>
