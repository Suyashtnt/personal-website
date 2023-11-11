<script lang="ts">
	let className = '';
	export { className as class };
</script>

<div class="flex flex-col items-center justify-around gap-4 md:flex-row{className}">
	<slot />
</div>
