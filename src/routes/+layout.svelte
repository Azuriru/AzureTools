<script lang="ts">
    import { Column, Sidebar, Header } from '$lib/components/layout';
    import { initializeStores, Toast } from '@skeletonlabs/skeleton';

    initializeStores();

    import '../app.pcss';
    import './styles.css';
</script>

<svelte:head>
    <title>AZtools</title>
</svelte:head>

<Sidebar />
<Column layout="min-w-0">
    <Header />
    <slot />
</Column>

<Toast position="tr" />

<div id="modal-wrapper">
    <div class="modal-backdrop hidden items-center justify-center bg-black/50 fixed top-0 left-0 right-0 bottom-0" />
</div>