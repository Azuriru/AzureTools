<script lang="ts">
    import { Column, Sidebar, Header } from '$lib/components/layout';
</script>

<Sidebar />
<Column layout="min-w-0">
    <Header />
    <slot />
</Column>
