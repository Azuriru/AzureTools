<script lang="ts">
    import { Column, Row } from '.';
    import MaterialSymbol from '../MaterialSymbol.svelte';

    const sidebarItems = [
        ['dashboard', 'sidebar.dashboard']
    ] as const;
</script>

<Column name="sidebar" grow={0} layout="group w-16 h-full py-2 bg-slate-800 hover:w-72 space-y-4 shadow-md z-10 transition-all">
    <Row name="sidebar-item sidebar-logo" grow={0} layout="h-11">
        <Row
            name="sidebar-icon"
            grow={0}
            shrink={0}
            justify={1}
            layout="w-16 text-4xl"
        >
            <img src="/logo.png" alt="logo" class="w-12" />
        </Row>
        <Row name="sidebar-title" layout="opacity-0 group-hover:opacity-100 transition-opacity">aztools</Row>
    </Row>
    {#each sidebarItems as item (item)}
        {@const [ name, title ] = item}
        <Row name="sidebar-item" grow={0} layout="h-11">
            <Row
                name="sidebar-icon"
                grow={0}
                shrink={0}
                justify={1}
                layout="w-16 text-4xl"
            >
                <MaterialSymbol {name} />
            </Row>
            <Row name="sidebar-title" layout="opacity-0 group-hover:opacity-100 transition-opacity">{title}</Row>
        </Row>

    {/each}
</Column>