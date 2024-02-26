<script lang="ts">
    import { Column, Sidebar, Header } from '$lib/components/layout';
</script>

<Sidebar />
<Column layout="min-w-0">
    <Header />
    <Column layout="p-2 overflow-y-auto bg-slate-950">
        <slot />
    </Column>
</Column>
