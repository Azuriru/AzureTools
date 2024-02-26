<script lang="ts">
    import { initializeStores, Toast } from '@skeletonlabs/skeleton';

    import '../app.pcss';
    import './styles.css';

    initializeStores();
</script>

<svelte:head>
    <title>AZtools</title>
</svelte:head>

<slot />

<Toast position="tr" />

<div id="modal-wrapper">
    <div class="modal-backdrop hidden items-center justify-center bg-black/50 fixed top-0 left-0 right-0 bottom-0" />
</div>